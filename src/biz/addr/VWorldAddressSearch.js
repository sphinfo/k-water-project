import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";
import createAxios from "@common/axios/creatAxios";


class VWorldAddressSearch{

  _size = '&pageunit=10'

  constructor() {
    this.apiKey = '77143F13-AD7D-3DC3-8B6F-673CD59B01B6';

    this._geoAxios = new BaseGeoserverAxios()

  }

  async searchAddress( query, page=1 , searchType=null) {
	
	const { request, get } = createAxios();
	
    //주소
    const urlA = `/mapVworld/search.do?category=jibun&q=${encodeURIComponent(query)}${this._size}&output=json&pageIndex=${page}&apiKey=${this.apiKey}`;

    //도로명
    const urlR = `/mapVworld/search.do?category=juso&q=${encodeURIComponent(query)}${this._size}&output=json&pageIndex=${page}&apiKey=${this.apiKey}`;


    try {

      let responseA
      let responseR
      

      if(!searchType || searchType === 'addr'){
        responseA = await request(urlA);
      }
      
      if(!searchType || searchType === 'road'){
        responseR = await request(urlR);
      }

      const dataA = responseA ? responseA.data : null;
      const statusA = responseA ? responseA.status : null;
      const dataR = responseR ? responseR.data : null;
      const statusR = responseR ? responseR.status : null;
      
      

      if (statusA === 200 || statusR === 200) {

        
        

        const resultDatas = {
          addr: dataA, 
          road: dataR
        }

        console.info(resultDatas)
        return resultDatas
      } else {
        // API 응답이 실패한 경우에 대한 처리
        return null;
      }
    } catch (error) {
      // API 요청이 실패한 경우에 대한 처리
      return null;
    }
  }
}

export default VWorldAddressSearch;