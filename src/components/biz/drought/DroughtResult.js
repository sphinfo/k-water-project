import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray, G$getDateType, G$getKoreanName, G$sortArrayObject, G$getMapExtentParam } from "@gis/util";
import { DROUGHT_CLEAR_LAEYRS, DROUGHT_RESET, DROUGHT_RESET_LAYER, DROUGHT_RESULT_TAB, DROUGHT_SELECT_BOX, DROUGHT_SELECT_LAYER, DROUGHT_SET_LAYERS, SELECT_BOX } from "@redux/actions";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import img from "@images/Safety-20231113_L3TD_A2_YONGDAM_ASC.jpg"
import { getL3Layers } from "@common/axios/common";
import { TabContext, TabPanel } from "@mui/lab";
import BaseResultCntTooltip from "../common/BaseResultCntTooltip";


const DroughtResult = () => {
    
    const dispatch = useDispatch()

    // 가뭄 검색조건
    const { selectResultTab, layers } = useSelector(state => state.drought)
    const { mainOptions, mainSearchOn, geoSearch, startDate, endDate } = useSelector(state => state.main)

    const [layerList, setLayerList] = useState([])

    const [resultInfos, setResultInfos] = useState({})

    //debouncing timer
    const [timer, setTimer] = useState(null);

    const [multiSelect, setMultiSelect] = useState(false)

    const [loading, setLoading] = useState(false)

    const [a1Cnt, setA1Cnt] = useState(0)
    const [a2Cnt, setA2Cnt] = useState(0)
    const [a3Cnt, setA3Cnt] = useState(0)

    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{
      dispatch({type:DROUGHT_RESET_LAYER})
      dispatch({type:DROUGHT_CLEAR_LAEYRS})    
      setA1Cnt(0)
      setA2Cnt(0)
      setA3Cnt(0)
      setResultInfos({})

      

      /*let location = mainOptions.map(item => item.code).join(',')
      let params = {type:'drought', level: 'L3', location: location, from: startDate, to: endDate}*/
      let location = mainOptions.map(item => item.code).join(',')
      let param = {type:'drought', level: 'L3', from: startDate, to: endDate, geoSearch}
      const params = geoSearch ? { ...param, ...G$getMapExtentParam() } : { ...param, location }

      setLoading(true)
      getL3Layers(params).then((response) => {
        if(response?.result?.data?.length > 0){
          let resultList = []
          response.result.data.map((obj)=>{

            let store = obj.dataType
            let layer = obj.name
            let group = obj.category.indexOf('A1') > 0 ? 'A1' : obj.category.indexOf('A2') > 0 ? 'A2' : obj.category.indexOf('A3') > 0 ? 'A3' : ''
            let groupNm = '토양수분'
            let categoryNm = obj.category.indexOf('A1') > 0 ? '물리모형' : obj.category.indexOf('A2') > 0 ? '강우자료' : obj.category.indexOf('A3') > 0 ? '토양특성' : ''
            let locationKr = G$getKoreanName(obj.testLocation.split('-'))

            if(obj.level === 'L3'){
              resultList.push({...obj, store, layer, group, categoryNm, groupNm, locationKr})
            }
            
          })

          resultList.map((obj)=>{
            if(obj.level === 'L3'){
              if(obj.group === 'A1'){
                setA1Cnt(prevCount => prevCount + 1)
              }else if(obj.group === 'A2'){
                setA2Cnt(prevCount => prevCount + 1)
              }else if(obj.group === 'A3'){
                setA3Cnt(prevCount => prevCount + 1)
              }
            }
          })

          setResultInfos(G$BaseSelectBoxArray(resultList, 'category'))
          const groupArray = G$BaseSelectBoxArray(G$sortArrayObject(resultList, 'startedAt', true), 'group')
          const resultArray = groupArray.grouped

          let firstGroup = resultArray[0]?.[0]?.group === 'A1' ? resultArray[0][0] :
          resultArray[1]?.[0]?.group === 'A1' ? resultArray[1][0] :
          resultArray[2]?.[0]?.group === 'A1' ? resultArray[2][0] : false 

          if(firstGroup){
            firstGroup.checked = true
            dispatch({ type: DROUGHT_SET_LAYERS, layerInfo: firstGroup, setType: true })
          }
          setLayerList(resultArray)
        }else{
          setLayerList([])
        }

        setTimeout(() => {
          setLoading(false)
        }, 500)
      })

    
    },[mainSearchOn])

    // 초기화
    useEffect(()=>{
        setLayerList([])
        return()=>{
          dispatch({ type: DROUGHT_SELECT_LAYER, selectDroughtLayer: false });
        }
    },[])

    //체크박스 다시 그리기
    const checkboxChange = (outerIndex, innerIndex) =>{

      // ...(a ? { checked: false } : {})
      //layerList 전체 데이터
      const updatedList = layerList.map((subArray, i) => {
          if (outerIndex === i) {
              const updatedSubArray = subArray.map((item, j) => {
                  if (innerIndex === j) {
                      //return { ...item, checked: !item.checked }
                      //1개이상 선택되어있고 단일 선택으로 변경시 클릭된건 check 다른항목들을 false (240228)
                      return { ...item, checked: Object.keys(layers).length > 1 && !multiSelect ? true : !item.checked }
                  }
                  return { ...item, ...(multiSelect ? {} : { checked: false }) } 
              });
              return updatedSubArray;
          }
          return subArray.map(item => ({ ...item, ...(multiSelect ? {} : { checked: false }) }))
      });
      setLayerList(updatedList);

      //이벤트 발생 위치 확인후 
      const selectedItem = updatedList[outerIndex][innerIndex]
      //reducer에게 레이어 info 전달
      if(!multiSelect) { dispatch({ type: DROUGHT_CLEAR_LAEYRS }) }
      dispatch({ type: DROUGHT_SET_LAYERS, layerInfo: selectedItem, setType: selectedItem.checked })


    }


    //결과값 출력 ( 데이터 구성을 2중 배열로 사용하려고 생각중 )
    const renderResult = (obj, i) =>(
        <>
            {obj.length > 0 &&
                <div className="content-row" key={`result-${i}`} >
                    <div className="content-list-wrap" >
                        <List className="content-list" sx={{overflow: 'auto'}} key={`list-${i}`}>
                            {
                                obj.map((item, i2) => (
                                  <React.Fragment key={`item-${i2}`}>
                                      {renderItem(item, i, i2)}
                                  </React.Fragment>
                              ))
                            }
                        </List>
                    </div>
                </div>
            }
        </>
    )

    //list item 설정
    const renderItem = (obj, i, i2) => (
        <>
        <ListItem key={`${i}-${i2}`} selected={true}>
            <ListItemButton
              className={`content-list-item ${obj.checked ? 'item-on' : ''}`}
              selected={true}
              disableTouchRipple={true}
              button={"true"}
              color={'primary'}
              onClick={() => checkboxChange(i, i2)}
            >
              <div className="list-body">
                <div className="img-box" >
                  <div className="list-shadow"></div>
                  <img src={obj.thumbnailUrl}/>
                </div>
                <div className="list-info-wrap">
                  <p className="list-info">{obj.locationKr}</p>
                  <p className="list-info">{obj.groupNm}</p>
                  <p className="list-info">{`${obj.category} | ${obj.categoryNm}`}</p>
                  <p className="list-info">{obj.satellite === 'S1A' ? 'Sentinel-1' :  obj.satellite === 'S2A' ? 'Sentinel-2' : obj.satellite}</p>
                  <p className="list-info">{`${G$getDateType(obj.startedAt)}${obj.endedAt ? '~'+G$getDateType(obj.endedAt) : ''}`}</p>
                </div>
              </div>
            </ListItemButton>
          </ListItem>
        </>
    )

    return (
        <>
          <div className={"content-body"} onClick={()=>{ dispatch({type:DROUGHT_SELECT_BOX, selectBox: false}) }}>
            {
              loading && <div className="content-row empty-wrap" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress color="primary" size={50} thickness={4} /></div>
            }
            {
              layerList.length === 0 && !loading &&
              <div className="content-row empty-wrap">
                <div className="empty-message">
                  <h3 className="empty-text">연구대상 지역을 선택해주세요</h3>
                  <Button className="btn empty-btn" onClick={(e)=>{{
                      e.stopPropagation()
                      dispatch({type:SELECT_BOX, selectBox: true})
                    }}}>지역검색</Button>
                </div>
              </div>
            }

            <div className="content-row">
              {layerList.length > 0 && !loading &&
                <div className="form-control">
                  <Tabs className={"toggle-btn-wrap toggle-btn-variant"} value={selectResultTab} onChange={(e, v)=>{dispatch({type: DROUGHT_RESULT_TAB, selectResultTab: v})}}>
                    <Tab className={"tab-item"} label={'위성토양수분'} value={'A1'}></Tab>
                    <Tab className={"tab-item"} label={'+ 강우자료'} value={'A2'}></Tab>
                    <Tab className={"tab-item"} label={'+ 토양자료'} value={'A3'}></Tab>
                  </Tabs>
                </div>
              }
              
            </div>
            {
              <div className="multiple-select-wrap" style={{display: layerList.length > 0 && !loading ? '' : 'none'}}>
                  <FormControlLabel
                      label="다중 선택"
                      control={
                          <Checkbox
                              checked={multiSelect}
                              tabIndex={-1}
                              disableRipple
                              className={'check-box'}
                              onChange={(e)=>{setMultiSelect(e.target.checked)}}
                          />
                      }
                  />
              </div>
            }
            {
              !loading &&
              <TabContext value={selectResultTab}>

                <TabPanel key={'A1'} value={"A1"} style={{display: layerList.length === 0 ? 'none': ''}}>
                  {layerList.length > 0 && layerList.map((obj, i)=> {
                    if(obj[0].group === 'A1'){
                      return renderResult(obj, i)
                    }
                  })}
                  {a1Cnt === 0 && <div className="empty-message"> 데이터가 존재하지 않습니다. <br/> 연구 대상 지역 또는 기간을 변경해주세요. </div>}
                </TabPanel>

                <TabPanel key={'A2'} value={"A2"} style={{display: layerList.length === 0 ? 'none': ''}}>
                  {layerList.length > 0 && layerList.map((obj, i)=> {
                    if(obj[0].group === 'A2'){
                      return renderResult(obj, i)
                    }
                  })}
                  {a2Cnt === 0 && <div className="empty-message"> 데이터가 존재하지 않습니다. <br/> 연구 대상 지역 또는 기간을 변경해주세요. </div>}
                </TabPanel>

                <TabPanel key={'A3'} value={"A3"} style={{display: layerList.length === 0 ? 'none': ''}}>
                  {layerList.length > 0 && layerList.map((obj, i)=> {
                    if(obj[0].group === 'A3'){
                      return renderResult(obj, i)
                    }
                  })}
                  {a3Cnt === 0 && <div className="empty-message"> 데이터가 존재하지 않습니다. <br/> 연구 대상 지역 또는 기간을 변경해주세요. </div>}
                </TabPanel>
              </TabContext>

            }

            

          </div>
          <BaseResultCntTooltip resultInfos={resultInfos}/>
        </>
    )
}

export default React.memo(DroughtResult);
