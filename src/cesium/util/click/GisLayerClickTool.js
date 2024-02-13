import MapManager from "@gis/MapManager";
import { Math, ScreenSpaceEventHandler, ScreenSpaceEventType, defined } from "cesium";
import { G$TypeOf, G$cartesianToLongLat, G$getWmsLayerForId } from "..";
import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";

class GisLayerClickTool {
	
	_bizs = {}
    _bizProps = {}
    _listeners = {};
	_clickHandler = null

	_axios = null

	constructor() {
	  	this.map = null
		this._axios = new BaseGeoserverAxios()
	  	
	}
  
	//click event 등록
	setClickHandle(){
		if(MapManager.map){
			this._clickHandler = new ScreenSpaceEventHandler(MapManager.map.scene.canvas);
			this._clickHandler.setInputAction(this.handleMapClick.bind(this), ScreenSpaceEventType.LEFT_CLICK);
		}
	}
  
	//click callback 
	async handleMapClick(event) {

		for (const [biz, isUse] of Object.entries(this._bizs)) {
			if (isUse) {
				const bizeProps = this._bizProps[biz];
				const {callback, layers} = bizeProps;

				//callback function이 존재하고(callback) , 검색레이어가 존재할시(layers)
				if (callback  && layers.length > 0) {

					let features = []

					/* WFS 레이어 GET ENTITY ( ENTITY 하나만 가지고 올수 있도록 *PITCH 이슈* ) */
					const clickPosition = event.endPosition || event.position;

					let ray = null
					//let cartesianPosition = null
					let intersection = null
					let lonlat = null

					// 클릭 이벤트 위치의 화면 좌표가 정상적으로 존재하는지 확인
					if (defined(clickPosition)) {
						// 화면 좌표를 지구 표면 좌표로 변환
						ray = MapManager.map.scene.camera.getPickRay(clickPosition)
						//lonlat = this.map.scene.globe.pick(ray, this.map.scene)
						intersection = MapManager.map.scene.globe.pick(ray, MapManager.map.scene)

						// 화면 좌표가 지구 표면과 교차하는지 확인
						if (defined(intersection)) {
							//cartesianPosition = MapManager.map.scene.globe.ellipsoid.cartesianToCartographic(intersection)
							// 클릭된 위치의 지구 좌표를 구한 후, 해당 좌표에서 entity를 찾음
							const pickedEntities = MapManager.map.scene.drillPick(clickPosition)
							
							if(pickedEntities.length > 0){
								
								//방위각이 틀어지면 위아래로 entity 여러가지 선택이됨 ??  이유 모르겠음 찾아봐도 
								// ********* 클린된 위치랑 가장 가까운 entity는 배열 가장 마지막에 담긴다 *********
								const pickedEntity = pickedEntities[pickedEntities.length-1].id

								layers.map((layerId)=>{
									if(layerId === pickedEntity.name){
										features.push({id: pickedEntity.name, properties: pickedEntity.properties.getValue(''), clickPosition: event.position, entity: pickedEntity})
									}
								})
							}
						}
					}

					// wms promis
					let wmsPromises = []

					//map click wms position properties  (WMS)
					bizeProps.layers.map(async(layerId)=>{
						let layer = G$getWmsLayerForId(layerId)
						if(layer){
							let store = layer.id.split(':')[0]
							let layerId = layer.id.split(':')[1]
							let url = layer._imageryProvider.url
							try {
								wmsPromises.push(this._axios.getFeaturePosition(store, layerId, 'cql', url, event.position))
							} catch(error){
								console.error('Error fetching GetFeaturePosition:', error)
							}
						}

					})

					//wms 레이어 GetFeatureInfo 비동기 처리
					const wmsResults = await Promise.all(wmsPromises);
					wmsResults.map((wmsObj)=>{
						wmsObj.data.features.map((featureObj)=>{
							featureObj.id = wmsObj.config.params.typeName
							featureObj.clickPosition = G$cartesianToLongLat(intersection)
							//featureObj.clickPosition = intersection
							features.push(featureObj)
						})
						
					})


					//결과값이 존재할때만 callback action
					if(features.length > 0){
						if (callback.hasOwnProperty('current')) {
							//ref return
							if (callback.current.getFeatures) {
								callback.current.getFeatures(features);
							}
						} else if (G$TypeOf(callback, 'object')) {
							if (callback.getFeatures) {
								callback.getFeatures(features);
							}
						} else if (G$TypeOf(callback, 'function') || G$TypeOf(callback, 'AsyncFunction'))  {
							callback(features);
						}
					}

                }

			}
		}
	}

	//feature callback 등록
	addBiz(biz, callback, layers=[]) {

		if(!this._clickHandler){
			this.setClickHandle()
		}

		this._bizs[biz] = true
        this.parseBizProps(biz, callback, layers);
	}

	//biz layer 초기화
	resetLayer(biz){
		this._bizProps[biz].layers = []
	}

	//biz layer  등록
	addLayer(biz, layers=[]){
		this._bizProps[biz].layers = [...this._bizProps[biz].layers, ...layers]
	}

	//
	parseBizProps(biz, callback, layers) {
		this._bizProps[biz] = {
            callback: callback,
			layers: layers ? layers : []
        }
	}

	//이벤트 활성화
	enable(biz) {
		for (const key of Object.keys(this._bizs)) {
			this._bizs[key] = key === biz ? true : false
		}
	}
  
	//이벤트 중지
	disable(biz) {
	  if (this.map) {
		this._bizs[biz] = false
	  }
	}
	
	//이벤트 삭제
	destroyBiz(biz){
		this._bizs[biz] = null
	}

  }

export default new GisLayerClickTool();