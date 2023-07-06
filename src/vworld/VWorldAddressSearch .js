import createAxios from "@com/api/creatAxios";


class VWorldAddressSearch {
  constructor() {
    this.apiKey = '59AF06C1-DBD7-38D5-B6CC-9944FBA2A1F9';
  }

  async searchAddress(query) {
	
	const { request, get } = createAxios();
	
    const urlA = `/vworld/search?request=search&size=1000&type=ADDRESS&category=PARCEL&key=${this.apiKey}&query=${encodeURIComponent(query)}`;
    const urlR = `/vworld/search?request=search&size=1000&type=ROAD&category=PARCEL&key=${this.apiKey}&query=${encodeURIComponent(query)}`;

    try {

      const requests = [get(urlA), get(urlR)]

      Promise.all(requests).then((aaa)=>{
        console.info(aaa)
      })
      
      const response = await request(urlA);
      const { data } = response;

      if (data.response && data.response.status === 'OK') {
        const results = data.response.result;
        // 처리할 결과 데이터를 여기에 추가적으로 작성
        return results;
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