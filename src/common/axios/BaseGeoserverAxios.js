import axios from "axios";
/* wms 레이어 feature 가져오기 */
class BaseGeoserverAxios {

    constructor(){
        this.axios = axios.create()
        this.serviceUrl = '/starGeo/'
        this.params = {
            service: "WFS",
            version: "1.0.0",
            request: "GetFeature",
            outputFormat: "application/json",
            PROPERTYNAME: "*",
            urlType: "geoServer",
            srsName: 'EPSG:4326'
        }

        this.config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
    }

    // get Feature
    async getFeature( store, layer, cql='1=1' ) {
        try {
            let url = this.serviceUrl + store +'/ows?';
            let params = {
                typeName: `${store}:${layer}`,
                //CQL_FILTER: cql,
                ...this.params
            }

            const response = await this.axios.get(url, {params}, this.config);

            return response.data;
        } catch (error) {
            throw new Error('Error fetching GetFeatureInfo: ' + error.message);
        }
    }
    
    // get Features
    async getFeatures(requests) {
        try {
          const responses = await axios.all(requests);
          return responses.map(response => response);
        } catch (error) {
          throw new Error('Error fetching GetFeatureInfo batch: ' + error.message);
        }
    }

}

export default BaseGeoserverAxios;