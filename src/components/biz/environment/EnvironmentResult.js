import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray, G$getDateType, G$getKoreanName, G$sortArrayObject, G$getMapExtent } from "@gis/util";
import EnvironmentResultTab from "./EnvironmentResultTab";
import { ENV_CLEAR_LAEYRS, ENV_RESET_LAYER, ENV_SELECT_BOX, ENV_SET_LAYERS, SELECT_BOX } from "@redux/actions";
import { Button, Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import { getL3Layers } from "@common/axios/common";
import { TabContext, TabPanel } from "@mui/lab";
import BaseResultCntTooltip from "../common/BaseResultCntTooltip";


const EnvironmentResult = () => {
    
    const dispatch = useDispatch()

    // 가뭄 검색조건
    const { environmentResultTab, layers } = useSelector(state => state.environment)
    const { mainOptions, startDate, endDate, mainSearchOn, geoSearch } = useSelector(state => state.main)

    const [layerList, setLayerList] = useState([])

    const [resultInfos, setResultInfos] = useState({})


    //debouncing timer
    const [timer, setTimer] = useState(null)

    const [multiSelect, setMultiSelect] = useState(false)

    const [loading, setLoading] = useState(false)

    const [garbageCnt, setGarbageCnt] = useState(0)
    const [greenCnt, setGreenCnt] = useState(0)
    const [landCoverCnt, setLandCoverCnt] = useState(0)

    const groupRef = useRef('')

    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{

      dispatch({type:ENV_RESET_LAYER})
      dispatch({type:ENV_CLEAR_LAEYRS})
      setGarbageCnt(0)
      setGreenCnt(0)
      setLandCoverCnt(0)
      setResultInfos({})


      if (mainOptions.length > 0) {
        /*let location = mainOptions.map(item => item.code).join(',')
        let params = {type:'environment', level: 'L3', location: location, from: startDate, to: endDate}*/

        let location = mainOptions.map(item => item.code).join(',')
        let param = {type:'environment', level: 'L3', from: startDate, to: endDate}
        const params = geoSearch ? { ...param, ...G$getMapExtent() } : { ...param, location }

        setLoading(true)
        getL3Layers(params).then((response) => {
          if(response?.result?.data?.length > 0){
            let resultList = []
            response.result.data.map((obj)=>{

              let store = obj.dataType.toLowerCase()
              let layer = obj.name

              let group = obj.category === 'L3GA' ? 'Garbage' : obj.category === 'L3AE' ? 'Green': obj.category === 'L3AL' ? 'Garbage' : obj.category === 'L3LCA1' ? 'LandCover' : obj.category === 'L3LCA2' ? 'LandCover' : 'a'
              let categoryNm = obj.category === 'L3GA' ? '부유물' : obj.category === 'L3AE' ? '녹조 농도' : obj.category === 'L3AL' ? '녹조 탐지' : obj.category === 'L3LCA1' ? '수변피복' : obj.category === 'L3LCA2' ? '수변피복' : 'b'
              let groupNm = obj.category === 'L3GA' ? '부유물' : obj.category === 'L3AE' ? '녹조 농도' : obj.category === 'L3AL' ? '녹조 탐지' : obj.category === 'L3LCA1' ? 'AI 알고리즘' : obj.category === 'L3LCA2' ? '광학자료' : 'c'
              let locationKr = G$getKoreanName(obj.testLocation.split('-'))
              resultList.push({...obj, store, layer, group, groupNm, categoryNm, locationKr})

            })

            resultList.map((obj)=>{
              if(obj.group === 'Garbage'){
                setGarbageCnt(prevCount => prevCount + 1)
              }else if(obj.group === 'Green'){
                setGreenCnt(prevCount => prevCount + 1)
              }else if(obj.group === 'LandCover'){
                setLandCoverCnt(prevCount => prevCount + 1)
              }
            })

            setResultInfos(G$BaseSelectBoxArray(resultList, 'category'))
            const groupArray = G$BaseSelectBoxArray(G$sortArrayObject(resultList, 'startedAt', true), 'group')
            const resultArray = groupArray.grouped

            let firstGroup = resultArray[0]?.[0]?.group === 'LandCover' ? resultArray[0][0] :
            resultArray[1]?.[0]?.group === 'LandCover' ? resultArray[1][0] :
            resultArray[2]?.[0]?.group === 'LandCover' ? resultArray[2][0] : false 

            if(firstGroup){
              firstGroup.checked = true
              groupRef.current = firstGroup.group
              dispatch({ type: ENV_SET_LAYERS, layerInfo: firstGroup, setType: true })
            }

            setLayerList(resultArray)
          }else{
            setLayerList([])
          }
        })
        
        setTimeout(() => {
          setLoading(false)
        }, 500)
      } else {
        setLayerList([])
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
                      //return { ...item, checked: !item.checked }
                      //1개이상 선택되어있고 단일 선택으로 변경시 클릭된건 check 다른항목들을 false (240228)
                      return { ...item, checked: Object.keys(layers).length > 1 && !multiSelect ? true : !item.checked }
                  }
                  return { ...item, ...(multiSelect ? {} : { checked: false })  }
              });
              return updatedSubArray
          }
          return subArray.map(item => ({ ...item, checked: false })) // 다른 항목들의 선택 해제
      });
      setLayerList(updatedList);

      //이벤트 발생 위치 확인후 
      const selectedItem = updatedList[outerIndex][innerIndex]
      if(groupRef.current !== selectedItem.group){
        groupRef.current = selectedItem.group
        dispatch({ type: ENV_CLEAR_LAEYRS })  
      }

      if(!multiSelect) { dispatch({ type: ENV_CLEAR_LAEYRS }) }
      dispatch({ type: ENV_SET_LAYERS, layerInfo: selectedItem, setType: selectedItem.checked })

    }


    //결과값 출력 ( 데이터 구성을 2중 배열로 사용하려고 생각중 )
    const renderResult = (obj, i) =>(
        <>
            {obj.length > 0 &&
                <div className="content-row" key={`result-${i}`}  style={{display: obj[0].group === environmentResultTab ? '' : 'none'}}>
                    <div className="content-list-wrap" key={`wrap-${i}`} >
                      <h4 className="content-list-title" key={`title-${i}`}>{obj[0].main}</h4>
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
      <ListItem key={i2} selected={true} style={{display: obj.group === environmentResultTab ? '' : ''}}>
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
                <p className="list-info">{obj.categoryNm}</p>
                <p className="list-info">{`${obj.category} | ${obj.groupNm}`}</p>
                <p className="list-info">{`${obj.satellite === 'S1A' ? 'sentinel 1' :  obj.satellite === 'S2A' ? 'sentinel 2' : obj.satellite === 'S2B' ? 'sentinel 2' : obj.satellite}`}</p>
                <p className="list-info">{`${G$getDateType(obj.startedAt)}${obj.endedAt ? '~'+G$getDateType(obj.endedAt) : ''}`}</p>
              </div>
            </div>
          </ListItemButton>
        </ListItem>
    )

    return (
        <>
          <div className={"content-body"} onClick={()=>{ dispatch({type:ENV_SELECT_BOX, selectBox: false}) }}>
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

            
            {
               !loading &&
                <TabContext value={environmentResultTab} >
                {layerList.length > 0 && <EnvironmentResultTab />}

                {
                  <div className="multiple-select-wrap" style={{display: layerList.length > 0 ? '' : 'none'}}>
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

                <TabPanel value={"LandCover"} style={{display: layerList.length === 0 ? 'none': ''}}>
                  {layerList.length > 0 && layerList.map((obj, i)=> {
                    if(obj[0].group === 'LandCover'){
                      return renderResult(obj, i)
                    }
                  })}
                  {landCoverCnt === 0 && <div className="empty-message"> 데이터가 존재하지 않습니다. <br/> 연구 대상 지역 또는 기간을 변경해주세요. </div>}
                </TabPanel>
                <TabPanel value={"Garbage"} style={{display: layerList.length === 0 ? 'none': ''}}>
                  {layerList.length > 0 && layerList.map((obj, i)=> {
                    if(obj[0].group === 'Garbage'){
                      return renderResult(obj, i)
                    }
                  })}
                  {garbageCnt === 0 && <div className="empty-message"> 데이터가 존재하지 않습니다. <br/> 연구 대상 지역 또는 기간을 변경해주세요. </div>}
                </TabPanel>
                <TabPanel value={"Green"} style={{display: layerList.length === 0 ? 'none': ''}}>
                  {layerList.length > 0 && layerList.map((obj, i)=> {
                    if(obj[0].group === 'Green'){
                      return renderResult(obj, i)
                    }
                  })}
                  {greenCnt === 0 && <div className="empty-message"> 데이터가 존재하지 않습니다. <br/> 연구 대상 지역 또는 기간을 변경해주세요. </div>}
                </TabPanel>
              </TabContext>
            }
            

          </div>
          <BaseResultCntTooltip resultInfos={resultInfos}/>
        </>
    )
}

export default React.memo(EnvironmentResult);
