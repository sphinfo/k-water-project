import axios from "axios";
/* wms 레이어 feature 가져오기 */
class GisLayerFeatureInfo {

    constructor(){
        this.axios = axios.create()
    }

    // 하나의 레이어에서 feaeture 가져오기
    async getFeatureInfo(url, params) {
        try {
            const response = await this.axios.get(url, { params });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching GetFeatureInfo: ' + error.message);
        }
    }
    
    // 여러개의 레이어에서 feaeture 가져오기
    async getFeaturesInfo(requests) {
        try {
          const responses = await axios.all(requests);
          return responses.map(response => response);
        } catch (error) {
          throw new Error('Error fetching GetFeatureInfo batch: ' + error.message);
        }
    }

}

export default GisLayerFeatureInfo;