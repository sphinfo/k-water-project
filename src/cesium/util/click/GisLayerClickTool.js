import MapManager from "@gis/MapManager";
import { Cartesian2, Cartographic, Math, ScreenSpaceEventHandler, ScreenSpaceEventType, defined } from "cesium";
import { G$TypeOf, G$getLayerForId, G$getWmsLayerForId } from "..";
import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";

class GisLayerClickTool {
	
	_bizs = {}
    _bizProps = {}
    _listeners = {};
	_clickHandler = null

	_axios = null

	constructor() {
		//console.info(MapManager.map)
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

		const screenPosition = new Cartesian2(event.clientX, event.clientY);
		const cartesianPosition = MapManager.map.scene.pickPosition(screenPosition);
		console.info(cartesianPosition)

		for (const [biz, isUse] of Object.entries(this._bizs)) {
			if (isUse) {
				const bizeProps = this._bizProps[biz];
				const {callback, layers} = bizeProps;

				//callback function이 존재하고(callback) , 검색레이어가 존재할시(layers)
				if (callback  && layers.length > 0) {

					let features = []

					//map click entity position properties  (WFS)
					const pickedObject = MapManager.map.scene.pick(event.position);
					if (defined(pickedObject) && defined(pickedObject.id)) {
						const pickedEntity = pickedObject.id

						//biz에 등록된 레이어 명칭만 callback에 담기
						layers.map((layerId)=>{
							if(layerId === pickedEntity.name){
								features.push({id: pickedEntity.name, properties: pickedEntity.properties.getValue('')})
							}
						})
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