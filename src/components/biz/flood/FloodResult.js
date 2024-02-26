import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray, G$findEngNmFilter, G$flyToPoint, G$getDateType, G$getKoreanName, G$getMapExtent, G$sortArrayObject } from "@gis/util";
import { FLOOD_CLEAR_LAEYRS, FLOOD_RESET, FLOOD_RESET_LAYER, FLOOD_SELECT_BOX, FLOOD_SELECT_LAYER, FLOOD_SELECT_WATER_LEVEL, FLOOD_SET_LAYERS, LOADING, SELECT_BOX } from "@redux/actions";
import FloodResultTab from "./FloodResultTab";
import { Button, CircularProgress } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { getFloodL3Search } from "@common/axios/flood";
import dayjs from "dayjs";
import BaseResultCntTooltip from "../common/BaseResultCntTooltip";

const FloodResult = ({waterObsList=[], ...props}) => {
    
    const dispatch = useDispatch()

    // 홍수 검색조건
    const { floodResultTab } = useSelector(state => state.flood)
    const { mainOptions, startDate, endDate, mainSearchOn, geoSearch } = useSelector(state => state.main)

    const [layerList, setLayerList] = useState([])

    const [resultInfos, setResultInfos] = useState({})

    const [noData, setNoData] = useState(false)

    //debouncing timer
    const [timer, setTimer] = useState(null)

    const [wbCnt, setWbCnt] = useState(0)
    const [wlCnt, setWlCnt] = useState(0)

    const [loading, setLoading] = useState(false)

    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{
      dispatch({type:FLOOD_RESET_LAYER})
      dispatch({type:FLOOD_CLEAR_LAEYRS})
      setWbCnt(0)
      setWlCnt(0)
      setResultInfos({})
      //*******API*************/
      if (mainOptions.length > 0) {
            
        let location = mainOptions.map(item => item.code).join(',')
        let param = {type:'flood', level: 'L3', from: startDate, to: endDate}
        const params = geoSearch ? { ...param, ...G$getMapExtent() } : { ...param, location }

        setLoading(true)
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
                    let locationKr = G$getKoreanName(obj.testLocation.split('-'))
                    let categoryNm = obj.category === 'L3WBA1' ? 'AI 알고리즘' : obj.category === 'L3WBA2' ? '물리 기반' : obj.category
                    resultList.push({...obj, store, layer, group, categoryNm, groupNm, locationKr})
                  })
                }
              }else if(resObj.config?.url === "/api/flood/getObservatory"){

                if(resObj?.data?.data?.length > 0){
                  setWlCnt(resObj?.data?.data?.length)
                  resObj.data.data.map((obj)=>{
                    let group = 'WaterLevel'
                    let groupNm = '지점수위'
                    let satellite= 'Sentinel 1'
                    let krNm = G$findEngNmFilter(obj.name)[0]?.options[0]?.name
                    let startedAt = dayjs(obj.date).format('YYYYMMDD')
                    resultList.push({group, krNm, groupNm, satellite, startedAt, ...obj})
                  })
                }
              }

            })

            setResultInfos(G$BaseSelectBoxArray(resultList, 'category'))
            const groupArray = G$BaseSelectBoxArray(resultList, 'store')
            const resultArray = groupArray.grouped

            resultArray.map((result)=>{
              result = G$sortArrayObject(result, 'startedAt', true)
            })

            let firstGroup = resultArray[0]?.[0]?.group === 'WaterBody' ? resultArray[0][0] :
            resultArray[1]?.[0]?.group === 'WaterBody' ? resultArray[1][0] : false 

            if(firstGroup){
              firstGroup.checked = true
              dispatch({ type: FLOOD_SET_LAYERS, layerInfo: firstGroup, setType: true })
            }

            setLayerList(resultArray)

            setTimeout(() => {
              setLoading(false)
            }, 500)
          }

        })

        
      } else {
        setLayerList([])
        setNoData(false)
      }
    },[mainSearchOn])

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
            <p className="list-info">{obj.locationKr}</p>
            <p className="list-info">{obj.groupNm}</p>
            <p className="list-info">{`${obj.category} | ${obj.categoryNm}`}</p>
            <p className="list-info">{obj.satellite === 'S1A' ? 'Sentinel 1' 
              : obj.satellite === 'S1B' ? 'Sentinel 1' 
              :  obj.satellite === 'S2A' ? 'Sentinel 2' 
              :  obj.satellite === 'S2B' ? 'Sentinel 2' 
              : obj.satellite}</p>
            <p className="list-info">{`${G$getDateType(obj.startedAt)}${obj.endedAt ? '~'+G$getDateType(obj.endedAt) : ''}`}</p>
          </div>
        </>
      )
    }

    const renderWaterLevel = (obj)=>{
      return (
        <>
          <div className="list-info-wrap list-info-wrap-variant">
            <div className="list-info-wrap-variant-inner">
              <p className="list-info">{obj.krNm}</p>
              <p className="list-info">{obj.groupNm}</p>
              <p className="list-info">{`${obj.satellite}`}</p>
            </div>
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
          <div className={"content-body"} onClick={()=>{ dispatch({type:FLOOD_SELECT_BOX, selectBox: false}) }}>
            {
              loading && <div className="content-row empty-wrap" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress color="primary" size={50} thickness={4} /></div>
            }
            {
              layerList.length === 0 && !loading &&
              <div className="content-row empty-wrap">
                <div className="empty-message">
                  <h3 className="empty-text">{noData ? '데이터가 존재하지 않습니다. ' : '연구대상 지역을 선택해주세요'}</h3>
                  {noData && <> <h3 className="empty-text">{"연구 대상 지역 또는 기간을 변경해주세요."}</h3> </>}
                  <Button className="btn empty-btn" onClick={(e)=>{{
                      e.stopPropagation()
                      dispatch({type:SELECT_BOX, selectBox: true})
                    }}}>지역검색</Button>
                </div>
              </div>
            }

            {
              !loading &&
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

            }
            
          </div>
          <BaseResultCntTooltip resultInfos={resultInfos}/>
        </>
    )
}

export default React.memo(FloodResult);
