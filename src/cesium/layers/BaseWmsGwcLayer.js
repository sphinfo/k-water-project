import { WebMapServiceImageryProvider } from "cesium";

class BaseWmsGwcLayer extends WebMapServiceImageryProvider {

	constructor(store, layer,  server) {

		if (!layer || !store) {
			throw new Error("'layers' and 'store' parameters are required.");
		}

		const wmsUrl = `/${server}/gwc/service/wms`;
        const wmsParameters = {
            layers: `${store}:${layer}`,
            format: 'image/png',
            transparent: true, //투명도
			crs: 'EPSG:4326',
			srs: 'EPSG:4326',
			version: '1.3.0',
			TILED: true,

        };

		super({
			url: wmsUrl,
			layers: wmsParameters.layers,
            parameters: wmsParameters,
		})

		this.id = `${store}:${layer}`
		this.type = 'wms'
		
	}
}

export default BaseWmsGwcLayer;