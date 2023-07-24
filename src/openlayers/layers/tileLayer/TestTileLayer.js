import { G$addOverlay, G$getGeometrySize } from "@gis/util";
import GisLayerClickTool from "@gis/util/GisLayerClickTool";
import GisOverlay from "@gis/util/GisOverlay/GisOverlay";
import {Tile as TileLayer, Image } from "ol/layer";
import { TileWMS, ImageWMS } from "ol/source";


const name = 'TestTileLayer'
class TestTileLayer extends TileLayer {
	name = name
	constructor(opt) {
		const source = new TileWMS({
			url: '/starGeo/sckmpp/wms?',
			params: {
				'LAYERS': 'sckmpp:SGG_SKT_VPOP_TOT',
				'FORMAT': 'image/png',
				'VERSION': '1.3.0',
				'urlType': 'geoServer'
			},
			serverType: 'geoserver',
			crossOrigin: 'anonymous'
		})	
		
		const layerOptions = {
			source: source,
			name: name
		}

		super(layerOptions)

		this._addClickEvent()

	}

	/* add callback event */
	_addClickEvent(){
		GisLayerClickTool.addBiz(name, this._getFeatures.bind(this), [name])
		GisLayerClickTool.enable(name)
	}

	/* callback feature */
	_getFeatures(f, coordinate){
		if(f.length > 0){
			this._setOverlay(f[0], coordinate)
		}
		
	}

	/* add overlay */
	_setOverlay(feature, coordinate){
		let ov = new GisOverlay({id:'TestTileLayer'})
		G$addOverlay(ov._overlay)
		ov.setElement(`value: ${feature.properties.vpop_tot}`)
		ov.setPosition(coordinate)
	}


	
}

export default TestTileLayer;