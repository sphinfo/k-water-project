import MapManager from "@gis/MapManager";
import { G$addLayer, G$flyToExtent, G$removeLayerForId } from "@gis/util";
import { WebMapServiceImageryProvider } from "cesium";

class BaseWmsImageLayer {

	constructor(store, layerId, cqlFIlter=null, fly=true) {

		this.fly = fly
		this.props = {
			store
			,layerId
			,cqlFIlter
			,wmsUrl: `/waterGeo/${store}/wms`
			,wmsParameters: {
				format: 'image/png',
				transparent: true, //투명도
			}
		}
		
		//layerId와 store가 있는지 확인
		if (!layerId || !store) {
			return console.info("'layers' and 'store' parameters are required.")
		}
		this._createImageryLayer()

	}

	//레이어 생성
	_createImageryLayer() { 

		//기존 레이어 삭제
		if (this.layer) {
			G$removeLayerForId(this.layer.id)
			this.layer=null
		}

		if(this.props.cqlFilter){
			this.props.wmsParameters = {...this.props.wmsParameters, CQL_FILTER:this.props.cqlFilter}
		}
	  
		console.info(this.props.wmsParameters)
		
		this.layer = MapManager.addImageLayer(
			new WebMapServiceImageryProvider({
				url: this.props.wmsUrl,
				layers: this.props.layerId,
				parameters: this.props.wmsParameters,
		}))

		// 변경된 이미지 레이어 설정
		this.layer.id = `${this.props.store}:${this.props.layerId}`
		
		
		if(this.fly){
			this._flyToExtent()
		}

	}

	//wms 레이어 변경
	changeParameters(other) {
		this.props = {...this.props, ...other}
		this._createImageryLayer()
	}

	//레이어 on / off
	setVisible(visible=true){
		if(this.layer){
			this.layer.show = visible

			//다시 켰을시 지점 wms extent 이동
			if(visible){
				if(this.fly){
					this._flyToExtent()
				}
			}
		}
	}

	//투명도 조절
	setOpacity(value=1){
		if(this.layer){
			this.layer.alpha = value
		}
	}

	//지점 extent 이동
	_flyToExtent(){

		//layers: this.props.layerId,
		//레이어 위치 이동
		fetch(`${this.props.wmsUrl}?service=wms&version=1.3.0&request=GetCapabilities&layers=${this.props.layerId}`).then(response => response.text()).then(data => {
			// Parse the XML response
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(data, 'text/xml');
			
			// Find the layer's extent information in the XML
			const layerExtent = xmlDoc.querySelector('Layer > EX_GeographicBoundingBox');
			const westBound = parseFloat(layerExtent.querySelector('westBoundLongitude').textContent);
			const eastBound = parseFloat(layerExtent.querySelector('eastBoundLongitude').textContent);
			const southBound = parseFloat(layerExtent.querySelector('southBoundLatitude').textContent);
			const northBound = parseFloat(layerExtent.querySelector('northBoundLatitude').textContent);

			console.info(westBound)
			console.info(westBound, southBound, eastBound, northBound)
			// Create an extent array
			const extent = [westBound, southBound, eastBound, northBound];

			G$flyToExtent(extent)
		});

	}
}

export default BaseWmsImageLayer;