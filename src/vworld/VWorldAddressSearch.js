import createAxios from "@com/api/creatAxios";


class VWorldAddressSearch{

  _size = '&pageunit=10'

  constructor() {
    this.apiKey = '59AF06C1-DBD7-38D5-B6CC-9944FBA2A1F9';
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