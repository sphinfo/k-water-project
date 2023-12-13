import MapManager from "@gis/MapManager";
import { G$addLayer, G$flyToExtent, G$removeLayerForId } from "@gis/util";
import { Rectangle, WebMapServiceImageryProvider, WebMercatorTilingScheme } from "cesium";
/**
 *  공동 WMS 레이어 Class 
 */
class BaseWmsImageLayer {

	constructor(store, layerId, cqlFIlter=null, fly=true) {

		//지도이동
		this.fly = fly

		//레이어 props 설정
		this.props = {
			store
			,layerId
			,cqlFIlter
			,wmsUrl: `/waterGeo/${store.toLowerCase()}/wms`
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

		//cqlFilter 사용시
		if(this.props.cqlFilter){
			this.props.wmsParameters = {...this.props.wmsParameters, CQL_FILTER:this.props.cqlFilter}
		}
		
		console.info(this.props)
		//지도추가
		this.layer = MapManager.addImageLayer(
			new WebMapServiceImageryProvider({
				url: this.props.wmsUrl,
				layers: `${this.props.store.toLowerCase()}:${this.props.layerId}`,
				parameters: this.props.wmsParameters,
				// tilingScheme: new WebMercatorTilingScheme(),
            	// rectangle: Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0)
		}))

		// 변경된 이미지 레이어 설정 ( Geoserver 사용 store:layer )
		this.layer.id = `${this.props.store.toLowerCase()}:${this.props.layerId}`
		
		// 이동
		if(this.fly){
			this._flyToExtent()
		}

	}

	//레이어 생성
	remove(){
		if (this.layer) {
			G$removeLayerForId(this.layer.id)
			this.layer=null
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

			const layers = xmlDoc.querySelectorAll('Layer > Name');

			

			let targetLayer;
			for (let i = 0; i < layers.length; i++) {
				if (layers[i].textContent === this.props.layerId || layers[i].textContent === `${this.props.store}:${this.props.layerId}`) {
					targetLayer = layers[i].parentNode;
					break;
				}
			}
			
			if (targetLayer) {
				const boundingBox = targetLayer.querySelector('EX_GeographicBoundingBox');
				if (boundingBox) {
				  const westBound = parseFloat(boundingBox.querySelector('westBoundLongitude').textContent);
				  const eastBound = parseFloat(boundingBox.querySelector('eastBoundLongitude').textContent);
				  const southBound = parseFloat(boundingBox.querySelector('southBoundLatitude').textContent);
				  const northBound = parseFloat(boundingBox.querySelector('northBoundLatitude').textContent);

				  //왼쪽 패널때문에 가려지는 현상 보완 근사치
				  const extent = [westBound+((westBound - eastBound) * 0.3), southBound, eastBound+((westBound - eastBound) * 0.3), northBound];

				G$flyToExtent(extent)

				} else {
				  console.log('EX_GeographicBoundingBox not found for the specified layer.');
				}
			} else {
				console.log('Layer not found.');
			}

		});

	}
}

export default BaseWmsImageLayer;