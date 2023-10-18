import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";

/* 메인화면 하천/?/? 검색 */
class MainGeoserverSearch{

  constructor() {
    this._geoAxios = new BaseGeoserverAxios()
  }

  //geoserver로 검색 
  async searchName(props=[], text) {
	
    let result = []

    if(props.length > 0){
      let axiosList = []

      props.map((obj)=>{
        if(obj.store && obj.layerId){
          axiosList.push(this._geoAxios.getFeature(obj.store, obj.layerId, `${obj.column} LIKE '%${text}%'`))
        }
      })


      if(axiosList.length > 0){
        const riverNetworkResults = await Promise.all(axiosList)
        riverNetworkResults.map((obj)=>{
          result = [...result, ...obj.features]
        })
      }
    }

    return result

  }
}

export default MainGeoserverSearch;