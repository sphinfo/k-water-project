import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray, G$getDateType } from "@gis/util";
import { DROUGHT_CLEAR_LAEYRS, DROUGHT_RESET, DROUGHT_RESET_LAYER, DROUGHT_RESULT_TAB, DROUGHT_SELECT_BOX, DROUGHT_SELECT_LAYER, DROUGHT_SET_LAYERS } from "@redux/actions";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from "@mui/material";
import img from "@images/Safety-20231113_L3TD_A2_YONGDAM_ASC.jpg"
import { getL3Layers } from "@common/axios/common";
import { TabContext, TabPanel } from "@mui/lab";


const DroughtResult = () => {
    
    const dispatch = useDispatch()

    // 가뭄 검색조건
    const { searchOn, text, startDate, endDate, selectBox, selectResultTab } = useSelector(state => state.drought)

    const [layerList, setLayerList] = useState([])

    //debouncing timer
    const [timer, setTimer] = useState(null);

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

      if(searchOn && text.length > 0){
        
        if (timer) {
          clearTimeout(timer)
        }
        const delayRequest = setTimeout(() => {
          if (text.length > 0) {

            let location = text.map(item => item.code).join(',')

            let params = {type:'drought', level: 'L3', location: location, from: startDate, to: endDate}
            getL3Layers(params).then((response) => {
              if(response?.result?.data?.length > 0){
                let resultList = []
                response.result.data.map((obj)=>{

                  let store = obj.dataType
                  let layer = obj.name
                  let group = obj.category.indexOf('A1') > 0 ? 'A1' : obj.category.indexOf('A2') > 0 ? 'A2' : obj.category.indexOf('A3') > 0 ? 'A3' : ''
                  let groupNm = '토양수분'
                  let categoryNm = obj.category.indexOf('A1') > 0 ? '물리모형' : obj.category.indexOf('A2') > 0 ? '강우자료' : obj.category.indexOf('A3') > 0 ? '토양특성' : ''
                  resultList.push({...obj, store, layer, group, categoryNm, groupNm})
                })

                resultList.map((obj)=>{
                  if(obj.group === 'A1'){
                    setA1Cnt(prevCount => prevCount + 1)
                  }else if(obj.group === 'A2'){
                    setA2Cnt(prevCount => prevCount + 1)
                  }else if(obj.group === 'A3'){
                    setA3Cnt(prevCount => prevCount + 1)
                  }
                })

                const groupArray = G$BaseSelectBoxArray(resultList, 'group')
                const resultArray = groupArray.grouped
                setLayerList(resultArray)
              }else{
                setLayerList([])
              }
            })
            
          } else {
            setLayerList([])
          }
        }, 1000)
  
        // 타이머 설정
        setTimer(delayRequest)

      }else{
        setLayerList([])
      }
    },[searchOn, startDate, endDate])

    // 초기화
    useEffect(()=>{
        setLayerList([])
        return()=>{
          dispatch({ type: DROUGHT_SELECT_LAYER, selectDroughtLayer: false });
        }
    },[])

    //체크박스 다시 그리기
    const checkboxChange = (outerIndex, innerIndex) =>{

      //layerList 전체 데이터
      const updatedList = layerList.map((subArray, i) => {
          if (outerIndex === i) {
              const updatedSubArray = subArray.map((item, j) => {
                  if (innerIndex === j) {
                      return { ...item, checked: !item.checked }
                  }
                  return { ...item } 
              });
              return updatedSubArray;
          }
          return subArray.map(item => ({ ...item }))
      });
      setLayerList(updatedList);

      //이벤트 발생 위치 확인후 
      const selectedItem = updatedList[outerIndex][innerIndex]
      //reducer에게 레이어 info 전달
      dispatch({ type: DROUGHT_SET_LAYERS, layerInfo: selectedItem, setType: selectedItem.checked })


    }


    //결과값 출력 ( 데이터 구성을 2중 배열로 사용하려고 생각중 )
    const renderResult = (obj, i) =>(
        <>
            {obj.length > 0 &&
                <div className="content-row" key={`result-${i}`} >
                    <div className="content-list-wrap" key={`wrap-${i}`} >
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

    //list item 설정
    const renderItem = (obj, i, i2) => (
        <>
        <ListItem key={i2} selected={true}>
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
                  <p className="list-info">{obj.groupNm}</p>
                  <p className="list-info">{`${obj.category} | ${obj.categoryNm}`}</p>
                  <p className="list-info">{`${obj.satellite}`}</p>
                  <p className="list-info">{`${G$getDateType(obj.startedAt)}${obj.endedAt ? '~'+G$getDateType(obj.endedAt) : ''}`}</p>
                </div>
              </div>
            </ListItemButton>
          </ListItem>
        </>
    )

    return (
        <>
          <div className={"content-body border-top filled"}>
            {
              layerList.length === 0 &&
              <div className="content-row empty-wrap">
                <div className="empty-message">
                  <h3 className="empty-text">연구대상 지역을 선택해주세요</h3>
                  <Button className="btn empty-btn" onClick={()=>{{dispatch({type:DROUGHT_SELECT_BOX, selectBox: !selectBox})}}}>지역검색</Button>
                </div>
              </div>
            }

            <div className="content-row">
              {layerList.length > 0 &&
                <div className="form-control">
                  <Tabs className={"toggle-btn-wrap toggle-btn-variant"} value={selectResultTab} onChange={(e, v)=>{dispatch({type: DROUGHT_RESULT_TAB, selectResultTab: v})}}>
                    <Tab className={"tab-item"} label={'물리'} value={'A1'}></Tab>
                    <Tab className={"tab-item"} label={'강우'} value={'A2'}></Tab>
                    <Tab className={"tab-item"} label={'토양'} value={'A3'}></Tab>
                  </Tabs>
                </div>
              }
              
            </div>
            {/* {layerList.length > 0 && layerList.map((obj, i)=> renderResult(obj, i))} */}

            <TabContext value={selectResultTab} >

              <TabPanel value={"A1"} style={{display: layerList.length === 0 ? 'none': ''}}>
                {layerList.length > 0 && layerList.map((obj, i)=> {
                  if(obj[0].group === 'A1'){
                    return renderResult(obj, i)
                  }
                })}
                {a1Cnt === 0 && <div className="empty-message"> 데이터가 존재하지 않습니다. <br/> 연구 대상 지역 또는 기간을 변경해주세요. </div>}
              </TabPanel>

              <TabPanel value={"A2"} style={{display: layerList.length === 0 ? 'none': ''}}>
                {layerList.length > 0 && layerList.map((obj, i)=> {
                  if(obj[0].group === 'A2'){
                    return renderResult(obj, i)
                  }
                })}
                {a2Cnt === 0 && <div className="empty-message"> 데이터가 존재하지 않습니다. <br/> 연구 대상 지역 또는 기간을 변경해주세요. </div>}
              </TabPanel>

              <TabPanel value={"A3"} style={{display: layerList.length === 0 ? 'none': ''}}>
                {layerList.length > 0 && layerList.map((obj, i)=> {
                  if(obj[0].group === 'A3'){
                    return renderResult(obj, i)
                  }
                })}
                {a3Cnt === 0 && <div className="empty-message"> 데이터가 존재하지 않습니다. <br/> 연구 대상 지역 또는 기간을 변경해주세요. </div>}
              </TabPanel>
            </TabContext>

          </div>
        </>
    )
}

export default React.memo(DroughtResult);
