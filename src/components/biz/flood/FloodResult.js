import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray, G$findEngNmFilter, G$flyToPoint, G$getDateType } from "@gis/util";
import { FLOOD_RESET, FLOOD_RESET_LAYER, FLOOD_SELECT_BOX, FLOOD_SELECT_LAYER, FLOOD_SELECT_WATER_LEVEL, FLOOD_SET_LAYERS, LOADING } from "@redux/actions";
import FloodResultTab from "./FloodResultTab";
import { Button } from "@mui/material";
import { getL3Layers } from "@common/axios/common";
import { TabContext, TabPanel } from "@mui/lab";
import { getFloodL3Search } from "@common/axios/flood";
import dayjs from "dayjs";

const FloodResult = ({waterObsList=[], ...props}) => {
    
    const dispatch = useDispatch()

    // 홍수 검색조건
    const { text, startDate, endDate, floodResultTab, selectBox, searchOn } = useSelector(state => state.flood)

    const [layerList, setLayerList] = useState([])

    const [noData, setNoData] = useState(false)

    //debouncing timer
    const [timer, setTimer] = useState(null)

    const [wbCnt, setWbCnt] = useState(0)
    const [wlCnt, setWlCnt] = useState(0)

    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{
      dispatch({type:FLOOD_RESET_LAYER})
      setWbCnt(0)
      setWlCnt(0)
      //*******API*************/
      if(searchOn && text.length > 0){
        if (timer) {
          clearTimeout(timer)
        }

        const delayRequest = setTimeout(() => {
          if (text.length > 0) {
            
            let location = text.map(item => item.code).join(',')
            let params = {type:'flood', level: 'L3', location: location, from: startDate, to: endDate}
            
            getFloodL3Search(params).then((response)=>{

              if(response?.length > 0){
                let resultList = []

                response.map((resObj)=>{
                  //수체
                  if(resObj.config?.url === '/api/layers/getAll'){

                    if(resObj?.data?.data?.length > 0){
                      setWbCnt(resObj?.result?.data?.length)
                      resObj.data.data.map((obj)=>{
                        let store = obj.dataType
                        let layer = obj.name
                        let group = 'WaterBody'
                        let groupNm = '수체탐지'
                        let categoryNm = obj.category === 'L3WBA1' ? 'AI 알고리즘' : obj.category === 'L3WBA2' ? '물리 기반' : obj.category
                        resultList.push({...obj, store, layer, group, categoryNm, groupNm})
                      })
                    }
                  }else if(resObj.config?.url === "/api/flood/getObservatory"){

                    if(resObj?.data?.data?.length > 0){
                      setWlCnt(resObj?.data?.data?.length)
                      resObj.data.data.map((obj)=>{
                        let group = 'WaterLevel'
                        let groupNm = '지점수위'
                        let satellite= 'Sentinel 1'
                        let krNm = G$findEngNmFilter(obj.name)[0]?.items[0]?.name
                        resultList.push({group, krNm, groupNm, satellite, ...obj})
                      })
                    }
                  }

                  const groupArray = G$BaseSelectBoxArray(resultList, 'store')
                  const resultArray = groupArray.grouped

                  setLayerList(resultArray)

                })
              }

            })

            /*
            getL3Layers(params).then((response) => {

              if(response?.result?.data?.length > 0){
                let resultList = []
                response.result.data.map((obj)=>{

                  let store = obj.dataType
                  let layer = obj.name
                  let group = 'WaterBody'
                  let groupNm = '수체탐지'
                  let categoryNm = obj.category === 'L3WBA1' ? 'AI 알고리즘' : obj.category === 'L3WBA2' ? '물리 기반' : obj.category
                  resultList.push({...obj, store, layer, group, categoryNm, groupNm})
                })


                //수위 지점 리스트 ( 초기에 가져온 값에서 확인 가능함 )
                if(waterObsList.length > 0){
                  waterObsList.map((obj)=>{
                    if(obj.name.indexOf(text.code) > 0){
                      //수위 지점 따로 추가 해야함 ( 관측소 정보 가져온데이터와 비교 하여 있으면 표출 )
                      resultList.push({krNm: text.name, group: 'WaterLevel',groupNm: '지점수위', category: 'L3WL', satellite: 'Sentinel 1',code: text.code, ...obj})
                    }
                  })
                }


                resultList.map((obj)=>{
                  if(obj.group === 'WaterBody'){
                    setWbCnt(prevCount => prevCount + 1)
                  }else if(obj.group === 'WaterLevel'){
                    setWlCnt(prevCount => prevCount + 1)
                  }
                })

                const groupArray = G$BaseSelectBoxArray(resultList, 'store')
                const resultArray = groupArray.grouped

                setLayerList(resultArray)
                setNoData(false)
              }else{
                setLayerList([])
                setNoData(true)
              }
            })*/


          } else {
            setLayerList([])
            setNoData(false)
          }
        }, 1000)
  
        // 타이머 설정
        setTimer(delayRequest)

      }else{
        setLayerList([])
        
      }
    },[searchOn, startDate, endDate])

    /*useEffect(()=>{
      //수위 탭이 생성되면 수위 첫번째 buttn click 이벤트 
      if(floodResultTab === 'WaterLevel'){
        layerList.map((obj,i)=>{
          if(obj[0].group === 'WaterLevel'){
            G$flyToPoint([obj[0].lng, obj[0].lat], 46000)
            checkboxChange(i,0)
          }
        })
      }
    },[floodResultTab])*/

    //임시 검색결과 도출
    useEffect(()=>{
        setLayerList([])
    },[])

    //체크박스 다시 그리기
    const checkboxChange = (outerIndex, innerIndex) =>{

      //layerList 전체 데이터
      const updatedList = layerList.map((subArray, i) => {

          if (outerIndex === i) {
              const updatedSubArray = subArray.map((item, j) => {
                  if (innerIndex === j) {
                      return { ...item, checked: !item.checked };
                  }

                  if(outerIndex === 1){
                    return { ...item, checked: false }; // 기존 선택 해제
                  }else{
                    return { ...item }; // 기존 선택 해제
                  }

                  
              });
              return updatedSubArray;
          }
          return subArray.map(item => ({ ...item })); // 다른 항목들의 선택 해제
      });
      setLayerList(updatedList);

      //이벤트 발생 위치 확인후 
      const selectedItem = updatedList[outerIndex][innerIndex]
      //수위 지점 제외
      if(selectedItem.group === 'WaterBody'){
        dispatch({ type: FLOOD_SET_LAYERS, layerInfo: selectedItem, setType: selectedItem.checked })
      }else if(selectedItem.group === 'WaterLevel'){
        dispatch({type: FLOOD_SELECT_WATER_LEVEL, selectWaterLevel: selectedItem})
      }
    }


    //결과값 출력 ( 데이터 구성을 2중 배열로 사용하려고 생각중 )
    const renderResult = (obj, i) =>(
      <>
        {obj.length > 0 &&
          <div className="content-row" key={`result-${i}`} >
              <div className="content-list-wrap" key={`wrap-${i}`} >
                  {/** <h4 className="content-list-title" key={i}>{obj[0].main}</h4> */}
                  <List className="content-list" sx={{overflow: 'auto'}} key={`list-${i}`}>
                      {
                          obj.map((item, i2) => (
                              <>
                                  {renderItem(item, i, i2)}
                              </>
                          ))
                      }
                  </List>
              </div>
          </div>
        }
      </>
   )

    const renderWaterBody = (obj)=>{
      return (
        <>
          <div className="img-box" >
            <div className="list-shadow"></div>
            <img src={obj.thumbnailUrl}/>
          </div>
          <div className="list-info-wrap">
            <p className="list-info">{obj.groupNm}</p>
            <p className="list-info">{`${obj.category} | ${obj.categoryNm}`}</p>
            <p className="list-info">{obj.satellite}</p>
            <p className="list-info">{`${G$getDateType(obj.startedAt)}${obj.endedAt ? '~'+G$getDateType(obj.endedAt) : ''}`}</p>
          </div>
        </>
      )
    }

    const renderWaterLevel = (obj)=>{
      return (
        <>
          <div className="list-info-wrap">
            <p className="list-info">{obj.krNm}</p>
            <p className="list-info">{obj.groupNm}</p>
            <p className="list-info">{`${obj.satellite}`}</p>
            <p className="list-info">{`${dayjs(obj.date).format('YYYY-MM-DD')}`}</p>
          </div>
        </>
      )
    }

    //list item 설정
    const renderItem = (obj, i, i2) => (
      <>
          <ListItem key={i2} selected={true} style={{display: obj.group === floodResultTab ? '' : 'none'}}>
            <ListItemButton
              className={`content-list-item ${obj.checked ? 'item-on' : ''}`}
              selected={true}
              disableTouchRipple={true}
              button={"true"}
              color={'primary'}
              onClick={() => checkboxChange(i, i2)}
            >
              <div className="list-body">
                {
                  obj.group === 'WaterBody' && 
                    renderWaterBody(obj)
                }
                {
                  obj.group === 'WaterLevel' && 
                    renderWaterLevel(obj)
                }
                
              </div>
            </ListItemButton>
          </ListItem>
        </>
    )

    return (
        <>
          <div className={"content-body border-top filled"} >
            {
              layerList.length === 0 &&
              <div className="content-row empty-wrap">
                <div className="empty-message">
                  <h3 className="empty-text">{noData ? '데이터가 존재하지 않습니다. ' : '연구대상 지역을 선택해주세요'}</h3>
                  {noData && <> <h3 className="empty-text">{"연구 대상 지역 또는 기간을 변경해주세요."}</h3> </>}
                  <Button className="btn empty-btn" onClick={()=>{{dispatch({type:FLOOD_SELECT_BOX, selectBox: !selectBox})}}}>지역검색</Button>
                </div>
              </div>
            }

            
            <TabContext value={floodResultTab} >
              {layerList.length > 0 && <FloodResultTab />}
              <TabPanel value={"WaterBody"} style={{display: layerList.length === 0 ? 'none': ''}}>
                {layerList.length > 0 && layerList.map((obj, i)=> {
                  if(obj[0].group === 'WaterBody'){
                    return renderResult(obj, i)
                  }
                })}
                {wbCnt === 0 && <div className="empty-message"> 데이터가 존재하지 않습니다. <br/> 연구 대상 지역 또는 기간을 변경해주세요. </div>}
              </TabPanel>
              <TabPanel value={"WaterLevel"} style={{display: layerList.length === 0 ? 'none': ''}}>
                {layerList.length > 0 && layerList.map((obj, i)=> {
                  if(obj[0].group === 'WaterLevel'){
                    return renderResult(obj, i)
                  }
                })}
                {wlCnt === 0 && <div className="empty-message"> 데이터가 존재하지 않습니다. <br/> 연구 대상 지역 또는 기간을 변경해주세요. </div>}
              </TabPanel>
            </TabContext>
            
            
          </div>
        </>
    )
}

export default React.memo(FloodResult);
