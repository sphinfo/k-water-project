import {Tile as TileLayer, Image } from "ol/layer";
import { TileWMS, ImageWMS } from "ol/source";

class TimeSeriesLayer extends TileLayer {

	constructor(opt) {
		const source = new TileWMS({
			url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi',
			params: {
				'LAYERS': 'nexrad-n0r-wmst'
			},
			serverType: 'geoserver',
			crossOrigin: 'anonymous'
		})	
		
		const layerOptions = {
			source: source,
			name: 'timeSeriesTest'
		}
		super(layerOptions)
	}

    updateParam(v){
        this.getSource().updateParams({'TIME': v.toISOString()})
    }
	
}

export default TimeSeriesLayer;