import {Tile as TileLayer, Image } from "ol/layer";
import { TileWMS, ImageWMS } from "ol/source";

class TestTileLayer extends TileLayer {

	name = 'image'

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
			name: 'image'
		}

		super(layerOptions)

	}

	
}

export default TestTileLayer;