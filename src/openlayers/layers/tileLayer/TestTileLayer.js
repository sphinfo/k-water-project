import {Image as ImageLayer } from "ol/layer";
import {ImageWMS, ImageStatic} from "ol/source";

import MapManager from "../../MapManager";
import { G$addLayer } from "../../util";

class TestTileLayer extends ImageLayer {

	name = 'image'

	constructor(opt) {
		const source = new ImageWMS({
			url: '/ceGeo/ETRI/wms?',
			params: {
				'LAYERS': 'ETRI:R033006B002_2020_04_28_2_150_4_chla',
				'FORMAT': 'image/png',
				'VERSION': '1.3.0',
				'urlType': 'geoServer'
			},
			serverType: 'geoserver',
			crossOrigin: 'anonymous'
		})	
		
		const layerOptions = {
			source: source
			
		}

		
		super(layerOptions)
	}

	
}

export default TestTileLayer;