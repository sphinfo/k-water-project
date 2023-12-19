import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";
import createAxios from "@common/axios/creatAxios";
import MapManager from "@gis/MapManager";


class VWorldAddressSearch{

  _size = '&pageunit=10'

  constructor() {
    this.apiKey = MapManager._vworld_key;

    this._geoAxios = new BaseGeoserverAxios()

  }

  async searchAddress( query, page=1 , searchType=null) {
	
	const { request, get } = createAxios();
	

    const url = `/vworld/req/search?service=search&request=search&version=2.0&size=1000&query=${encodeURIComponent(query)}&type=place&format=json&errorformat=json&key=${this.apiKey}`

    //주소
    //const urlA = `/mapVworld/search.do?category=jibun&q=${encodeURIComponent(query)}${this._size}&output=json&pageIndex=${page}&apiKey=${this.apiKey}`;

    //도로명
    //const urlR = `/mapVworld/search.do?category=juso&q=${encodeURIComponent(query)}${this._size}&output=json&pageIndex=${page}&apiKey=${this.apiKey}`;


    try {

      let response = await request(url)

      const data = response ? response.data : null
      const status = response ? response.status : null
      if (status === 200) {

        const resultDatas = data
        return resultDatas
      } else {
        // API 응답이 실패한 경우에 대한 처리
        return null
      }
    } catch (error) {
      // API 요청이 실패한 경우에 대한 처리
      return null
    }
  }
}

export default VWorldAddressSearch;