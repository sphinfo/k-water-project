import axios from "axios"

class VWorldAddressSearch  {

	constructor() {
		this.apiKey = '59AF06C1-DBD7-38D5-B6CC-9944FBA2A1F9';
	  }
	
	  async searchAddress(query) {
		const url = `/vworld/search?request=search&type=ADDRESS&category=PARCEL&key=${this.apiKey}&query=${encodeURIComponent(query)}`;
	  
		try {
		  const response = await axios.get(url);
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