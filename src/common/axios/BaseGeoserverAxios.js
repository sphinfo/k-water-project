import MapManager from "@gis/MapManager";
import axios from "axios";
import { Cartographic, Math as MathC } from "cesium";
/* wms 레이어 feature 가져오기 */
class BaseGeoserverAxios {

    constructor(){
        this.axios = axios.create()
        this.serviceUrl = '/waterGeo/'
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
    async getFeature( store, layer, cql='1=1', layerUrl=null) {
        try {

            let url = layerUrl ? layerUrl : this.serviceUrl + store +'/ows?';
            let params = {
                typeName: `${store}:${layer}`,
                CQL_FILTER: cql,
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

    // get Feature
    async getFeaturePosition( store, layer, cql='1=1', layerUrl=null, clickPosition) {
        try {
            let longitude, latitude
            var scene = MapManager.map.scene
            //var cartesian = MapManager.map.scene.pickPosition(clickPosition)

            const ray = MapManager.map.camera.getPickRay(clickPosition)
            const position = scene.globe.pick(ray, scene);

            var cartographic = Cartographic.fromCartesian(position)
            longitude = MathC.toDegrees(cartographic.longitude)
            latitude = MathC.toDegrees(cartographic.latitude)

            let url = layerUrl ? layerUrl : this.serviceUrl + store +'/ows?';
            let params = {
                service: 'WMS',
                version: '1.1.1',
                request: 'GetFeatureInfo',
                layers: layer,
                bbox: `${(longitude - 0.0001)},${(latitude - 0.0001)},${(longitude + 0.0001)},${(latitude + 0.0001)}`,
                width: scene.canvas.clientWidth,
                height: scene.canvas.clientHeight,
                srs: 'EPSG:4326',
                query_layers: layer,
                typeName: `${store}:${layer}`,
                info_format: 'application/json',
                x: Math.floor(clickPosition.x),
                y: Math.floor(clickPosition.y),
            }

            const response = await this.axios.get(url, {params}, this.config);

            return response;
        } catch (error) {
            throw new Error('Error fetching GetFeatureInfo: ' + error.message);
        }
    }

}

export default BaseGeoserverAxios;