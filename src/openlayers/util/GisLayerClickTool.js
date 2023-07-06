import { G$TypeOf } from ".";
import LayerManager from "../LayerManager";
import GisLayerFeatureInfo from "./GisLayerFeatureInfo";

class GisLayerClickTool {
	
	_bizs = {}
    _bizProps = {}
    _listeners = {};

	constructor() {
	  //this.selectInteraction = new Select();
	  this.map = null;
	  
	}
  
	//지도 등록 및 이벤트 등록
	setMap(map) {
	  this.map = map;
	  this.map.on('click', this.handleMapClick.bind(this))
	}
  
	//click callback 
	handleMapClick(event) {

		for (const [biz, isUse] of Object.entries(this._bizs)) {

			if (isUse) {

				const bizeProps = this._bizProps[biz];
				const {callback} = bizeProps;

				if (callback) {
					
					let wmsSources = []

					// biz등록할떄 feature 가져올 레이어 선택하기
					if(this._bizProps[biz].layers.length > 0){
						this._bizProps[biz].layers.map((layerId)=>{
							if(LayerManager._layerInstance[layerId]){
								wmsSources.push(LayerManager._layerInstance[layerId].getSource())
							}
						})
					}else{

						//등록되어 있지 않으면 전체
						for (const key of Object.keys(LayerManager._layerInstance)) {
							wmsSources.push(LayerManager._layerInstance[key])
						}
					}

					this._setFeaturesCallback(event, wmsSources, callback)

                }

			}
		}
	}

	//callback return
	_setFeaturesCallback(event, wmsSources, callback){

		let features = []

		const featureInfo = new GisLayerFeatureInfo()
		const viewResolution = this.map.getView().getResolution()
		const viewProjection =  this.map.getView().getProjection()
		const coordinate = event.coordinate

		this.map.forEachFeatureAtPixel(event.pixel, (feature, layer)=>{
			features.push(feature)
		})

		//get wms feature 
		const requests = wmsSources.map((source)=>{
			const url = source.getFeatureInfoUrl( coordinate, viewResolution, viewProjection, { 'INFO_FORMAT': 'application/json' } )
			return featureInfo.getFeatureInfo(url)
		})

		//get wms feature request ( *** data 단으로 들어가 feature 리스형태로 보여줘야할지는 프로젝트 진행후 변경 ***)
		featureInfo.getFeaturesInfo(requests).then(response =>{

			if(response.length > 0){
				response.map((responseObj)=>{
					features = [...features, ...responseObj.features]
				})
			}

			if (callback.hasOwnProperty('current')) {
				//ref return
				if (callback.current.getFeatures) {
					callback.current.getFeatures(features);
				}
			} else if (G$TypeOf(callback, 'object')) {
				if (callback.getFeatures) {
					callback.getFeatures(features);
				}
			} else if (G$TypeOf(callback, 'function')) {
				callback(features);
			} else {
				console.info('please check callback process!');
			}
		})

	}

	//feature callback 등록
	addBiz(biz, callback, layers) {
		this._bizs[biz] = false;
        this.parseBizProps(biz, callback, layers);
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
	  if (this.map) {
		for (const key of Object.keys(this._bizs)) {
            this._bizs[key] = key === biz ? true : false
        }
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
		
	}

  }

export default new GisLayerClickTool();