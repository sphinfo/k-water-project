import { WebMapServiceImageryProvider } from "cesium";

class BaseWmsLayer extends WebMapServiceImageryProvider {

	constructor(layer, store) {

		if (!layer || !store) {
			throw new Error("'layers' and 'store' parameters are required.");
		}

		const wmsUrl = `/waterGeo/${store}/wms`;
        const wmsParameters = {
            layers: layer,
            format: 'image/png',
            transparent: true, //투명도
        };

		super({
			url: wmsUrl,
			layers: wmsParameters.layers,
            parameters: wmsParameters,
		})

		this.id = `${store}:${layer}`
		
	}
}

export default BaseWmsLayer;