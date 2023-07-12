import createAxios from "@com/api/creatAxios";


class VWorldAddressSearch {

  _size = '&size=20'

  constructor() {
    this.apiKey = '59AF06C1-DBD7-38D5-B6CC-9944FBA2A1F9';
  }

  async searchAddress(query, page=null, size=null) {
	
	const { request, get } = createAxios();
	
    //주소
    const urlA = `/vworld/req/search?request=search${this._size}&type=ADDRESS&category=PARCEL&key=${this.apiKey}&query=${encodeURIComponent(query)}`;
    //도로명
    const urlR = `/vworld/req/search?request=search${this._size}&type=ROAD&category=PARCEL&key=${this.apiKey}&query=${encodeURIComponent(query)}`;

    try {

      const responseA = await request(urlA);
      const responseR = await request(urlR);
      const { data: dataA } = responseA;
      const { data: dataR } = responseR;

      if (dataA.response && dataA.response.status === "OK" || dataR.response && dataR.response.status === "OK") {

        const resultsA = dataA.response;
        const resultsR = dataR.response;

        const resultDatas = {
          addr: resultsA, 
          road: resultsR
        }

        return resultDatas
        //return results;
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