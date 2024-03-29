import { G$flyToExtent } from "@gis/util";
import { WebMapServiceImageryProvider } from "cesium";

class BaseWmsLayer extends WebMapServiceImageryProvider {

	constructor(store, layer, cqlFIlter=null ) {

		if (!layer || !store) {
			throw new Error("'layers' and 'store' parameters are required.");
		}

		const wmsUrl = `/waterGeo/${store}/wms`;
        let wmsParameters = {
            layers: layer,
            format: 'image/png',
            transparent: true, //투명도
        };

		if(cqlFIlter){
			wmsParameters = {...wmsParameters, CQL_FILTER:cqlFIlter}
		}

		super({
			url: wmsUrl,
			layers: wmsParameters.layers,
            parameters: wmsParameters,
		})

		//wmslayer에 id 또는 name이 존재하지 않아서 임의적인 id 부여
		this.id = `${store}:${layer}`
		this.type = 'wms'

		fetch(`${wmsUrl}?service=wms&version=1.3.0&request=GetCapabilities`).then(response => response.text()).then(data => {
			// Parse the XML response
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(data, 'text/xml');
			
			// Find the layer's extent information in the XML
			const layerExtent = xmlDoc.querySelector('Layer > EX_GeographicBoundingBox');
			const westBound = parseFloat(layerExtent.querySelector('westBoundLongitude').textContent);
			const eastBound = parseFloat(layerExtent.querySelector('eastBoundLongitude').textContent);
			const southBound = parseFloat(layerExtent.querySelector('southBoundLatitude').textContent);
			const northBound = parseFloat(layerExtent.querySelector('northBoundLatitude').textContent);

			// Create an extent array
			const extent = [westBound, southBound, eastBound, northBound];

			G$flyToExtent(extent)
		});
		
	}

	changeParams(other) {
		this._resource._queryParameters = {...this._resource._queryParameters, ...other}
		this._reload()
	}
}

export default BaseWmsLayer;