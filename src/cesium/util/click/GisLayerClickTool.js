import MapManager from "@gis/MapManager";
import { ScreenSpaceEventHandler, ScreenSpaceEventType, defined } from "cesium";
import { G$TypeOf, G$getLayerForId } from "..";

class GisLayerClickTool {
	
	_bizs = {}
    _bizProps = {}
    _listeners = {};
	_clickHandler = null

	constructor() {
		//console.info(MapManager.map)
	  	this.map = null
	  	
	}
  
	//click event 등록
	setClickHandle(){
		if(MapManager.map){
			this._clickHandler = new ScreenSpaceEventHandler(MapManager.map.scene.canvas);
			this._clickHandler.setInputAction(this.handleMapClick.bind(this), ScreenSpaceEventType.LEFT_CLICK);
		}
	}
  
	//click callback 
	handleMapClick(event) {

		console.info(this._bizs)

		for (const [biz, isUse] of Object.entries(this._bizs)) {
			if (isUse) {
				const bizeProps = this._bizProps[biz];
				const {callback} = bizeProps;

				if (callback) {

					let features = []

					//map click entity position properties
					const pickedObject = MapManager.map.scene.pick(event.position);
					if (defined(pickedObject) && defined(pickedObject.id)) {
						const pickedEntity = pickedObject.id
						features.push(pickedEntity.name)
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
					} else if (G$TypeOf(callback, 'function') || G$TypeOf(callback, 'AsyncFunction'))  {
						callback(features);
					}

                }

			}
		}
	}

	//callback return
	_setFeaturesCallback(event, wmsSources, callback){

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