import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";
import createAxios from "@common/axios/creatAxios";


class VWorldAddressSearch{

  _size = '&pageunit=10'

  constructor() {
    this.apiKey = '4660313D-1779-3BEA-8424-812231F3B59D';

    this._geoAxios = new BaseGeoserverAxios()

  }

  async searchAddress( query, page=1 , searchType=null) {
	
	const { request, get } = createAxios();
	

    // /vworld/req/search?service=search&request=search&version=2.0&size=10&page=${page}&query=${encodeURIComponent(query)}&type=place&format=json&errorformat=json&key=${this.apiKey}

    const url = `/vworld/req/search?service=search&request=search&version=2.0&size=1000&query=${encodeURIComponent(query)}&type=place&format=json&errorformat=json&key=${this.apiKey}`

    //주소
    //const urlA = `/mapVworld/search.do?category=jibun&q=${encodeURIComponent(query)}${this._size}&output=json&pageIndex=${page}&apiKey=${this.apiKey}`;

    //도로명
    //const urlR = `/mapVworld/search.do?category=juso&q=${encodeURIComponent(query)}${this._size}&output=json&pageIndex=${page}&apiKey=${this.apiKey}`;


    try {

      let response = await request(url);
      //let responseA
      //let responseR
      

      // if(!searchType || searchType === 'addr'){
      //   responseA = await request(urlA);
      // }
      
      // if(!searchType || searchType === 'road'){
      //   responseR = await request(urlR);
      // }

      const data = response ? response.data : null;
      const status = response ? response.status : null;
      // const dataA = responseA ? responseA.data : null;
      // const statusA = responseA ? responseA.status : null;
      // const dataR = responseR ? responseR.data : null;
      // const statusR = responseR ? responseR.status : null;
      
      

      //if (statusA === 200 || statusR === 200) {
      if (status === 200) {

        // const resultDatas = {
        //   addr: dataA, 
        //   road: dataR
        // }

        const resultDatas = data

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