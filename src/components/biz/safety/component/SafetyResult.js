import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAFETY_CLEAR_LAEYRS, SAFETY_CLICK_MODE, SAFETY_RESET_LAYER, SAFETY_SELECT_BOX, SAFETY_SELECT_DISPLACE_LEVEL, SAFETY_SELECT_RESULT, SAFETY_SET_LAYERS, SELECT_BOX } from "@redux/actions";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray, G$getDateType, G$getKoreanName, G$sortArrayObject } from "@gis/util";
import Button from "@mui/material/Button";
import { getL3Layers } from "@common/axios/common";
import dayjs from "dayjs";
import BaseResultCntTooltip from "@components/biz/common/BaseResultCntTooltip";
import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";

const SafetyResult = () => {
    
    const dispatch = useDispatch()

    // 안전 검색조건
    const { text, selectBox, searchOn } = useSelector(state => state.safety)
    const { mainOptions, startDate, endDate, mainSearchOn } = useSelector(state => state.main)

    const [layerList, setLayerList] = useState([])

    const [resultInfos, setResultInfos] = useState({})

    //debouncing timer
    const [timer, setTimer] = useState(null)

    const [multiSelect, setMultiSelect] = useState(true)

    const [loading, setLoading] = useState(false)

    //변위등급 데이터
    const [displaceLevelData, setDisplaceLevelData] = useState([])

    const [message, setMessage] = useState("연구대상 지역을 선택해주세요")


    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{

      dispatch({type:SAFETY_RESET_LAYER})
      dispatch({type:SAFETY_CLEAR_LAEYRS})
      setResultInfos({})

      if(mainOptions.length > 0){
        //변위 등급 초기화
        setDisplaceLevelData([])

        let location = mainOptions.map(item => item.code).join(',')

        //*******API************* getL3Layers: 레벨3 결과값/
        let params = {type:'safety', level: 'L3', location: location, from:dayjs().format('YYYYMMDD'), to:dayjs().format('YYYYMMDD')}
        setLoading(true)
        getL3Layers(params).then((response) => {
          
          if(response?.result?.data?.length > 0){

            let resultList = []
            let displaceResultList = []
            response.result.data.map((obj)=>{

              let store = obj.dataType.toLowerCase()
              let layer = obj.name
              let group = obj.level
              let groupNm = obj.level === 'L3' ? '변위탐지' : '변위등급'
              let udew = obj.filename.indexOf('_D_') > -1 ? 'DESC' : obj.filename.indexOf('_A_') > -1 ? 'ASC' : ''
              let categoryNm = obj.category.indexOf('L3TD_A1') > 0 ? '고정산란체' : obj.category.indexOf('L3TD_A2') > 0 ? '분산산란체' : ''
              let locationKr = G$getKoreanName(obj.testLocation.split('-'))
              //satellite
              obj.satellite = obj.satellite === "S1X" ? "S1A" : obj.satellite

              if(obj.level === 'L3'){
                resultList.push({...obj, store, layer, group, categoryNm, groupNm, locationKr, udew})
              }else{
                //L4DC 변위등급도
                if(obj.category === 'L4DC'){
                  displaceResultList.push({...obj, store, layer, group, categoryNm, groupNm, locationKr})                    
                }
                
              }
            })

            setResultInfos(G$BaseSelectBoxArray([...resultList, ...displaceResultList], 'category'))
            const groupArray = G$BaseSelectBoxArray(G$sortArrayObject(resultList, 'startedAt', true))
            const resultArray = groupArray.grouped

            let firstGroup = resultArray[0]?.[0]?.group === 'L3' ? resultArray[0][0] :
            resultArray[1]?.[0]?.group === 'L3' ? resultArray[1][0] : false 

            if(firstGroup){
              firstGroup.checked = true
              dispatch({ type: SAFETY_SET_LAYERS, layerInfo: firstGroup, setType: true })
            }

            //변위 등급 리스트
            setDisplaceLevelData(displaceResultList)
            //3레벨 레이어 리스트
            setLayerList(resultArray)
          }else{
            setLayerList([])
            setMessage("데이터가 존재하지 않습니다.")
          }

          setTimeout(() => {
            setLoading(false)
          }, 500)
        })
      }else{
        setLayerList([])
        setDisplaceLevelData([])
      }
      
    },[mainSearchOn])
    
    

    //변위탐지 선택
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
                  return { ...item, ...(multiSelect ? {} : { checked: false }) }
              });
              return updatedSubArray;
          }
          return subArray.map(item => ({ ...item, ...(multiSelect ? {} : { checked: false }) }))
      });
      setLayerList(updatedList);

      //이베트 발생 위치 확인후 
      const selectedItem = updatedList[outerIndex][innerIndex]
      if(!multiSelect) { dispatch({ type: SAFETY_CLEAR_LAEYRS }); checkboxResetL4() }
      dispatch({ type: SAFETY_SET_LAYERS, layerInfo: selectedItem, setType: selectedItem.checked })

    }

    //체크박스 다시 그리기
    const checkboxResetL3 = () =>{
      //layerList 전체 데이터
      const updatedList = layerList.map((subArray, i) => {
          return subArray.map(item => ({ ...item, checked: false }))
      });
      setLayerList(updatedList)
    }

    //체크박스 다시 그리기
    const checkboxResetL4 = () =>{
      const updatedArray = displaceLevelData.map((item, i) => {
        return { ...item, checked: false  }
      })
      setDisplaceLevelData(updatedArray)
    }



    //변위등급 선택
    const setSafetyLevel = (obj, index) =>{
      const updatedArray = displaceLevelData.map((item, i) => {
          if (index === i) {
              return { ...item, checked: !item.checked };
          }
          return { ...item, ...(multiSelect ? {} : { checked: false })  }
      })

      const selectedItem = updatedArray[index]
      if(!multiSelect) { dispatch({ type: SAFETY_CLEAR_LAEYRS }); checkboxResetL3() }
      dispatch({ type: SAFETY_SET_LAYERS, layerInfo: selectedItem, setType: selectedItem.checked })
      setDisplaceLevelData(updatedArray)
    }


    //결과값 출력
    const renderResult = (obj, i) =>(
        <>
            {obj.length > 0 &&
                <div className="content-row" key={`result-${i}`} >
                    <div className="content-list-wrap" key={`wrap-${i}`} >
                        {/** <h4 className="content-list-title">{obj[0].groupNm}</h4> */}
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

    const renderItem = (obj, i, i2) => (
        <>
          <ListItem key={i2} selected={true} >
            <ListItemButton
              key={`listBtn-${i}`}
              className={`content-list-item ${obj.checked ? 'item-on' : ''}`}
              selected={true}
              button={"true"}
              disableTouchRipple={true}
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
                  <p className="list-info">{`${obj.category} | ${obj.category === 'L3TDA1' ? '고정산란체' : obj.category === 'L3TDA2' ? '분산산란체' : ''}`}</p>
                  <p className="list-info">{`${obj.satellite === 'S1A' ? 'sentinel 1' :  obj.satellite === 'S2A' ? 'sentinel 2' : obj.satellite} ${obj.udew ? ' | '+obj.udew : obj.udew}`}</p>
                  <p className="list-info">{`${G$getDateType(obj.startedAt)}${obj.endedAt ? '~'+G$getDateType(obj.endedAt) : ''}`}</p>
                </div>
              </div>
            </ListItemButton>
          </ListItem>
        </>
    )


    //변위등급 
    const renderSafetyLevel = () =>{
      return (
        <div className="content-row">
          <div className="content-list-wrap">
            <h4 className="content-list-title">변위등급</h4>
              <List className="content-list" sx={{overflow: 'auto'}} key={`list`}>

                {
                  displaceLevelData.map((obj, i)=>{

                    return (
                      <>
                        <ListItem selected={true}>
                          <ListItemButton
                            className={`content-list-item ${obj.checked ? 'item-on' : ''}`}
                            selected={true}
                            button={"true"}
                            disableTouchRipple={true}
                            color={'primary'}
                            onClick={()=>{setSafetyLevel(obj, i)}}
                          >
                            <div className="list-body">
                              <div className="img-box">
                                <div className="list-shadow"></div>
                                  <img src={obj.thumbnailUrl}/>
                                </div>
                                <div className="list-info-wrap">
                                  <p className="list-info">{obj.locationKr}</p>
                                  <p className="list-info">{obj.groupNm}</p>
                                  <p className="list-info">{obj.category}</p>
                                  <p className="list-info">{`${obj.satellite === 'S1A' ? 'sentinel 1' :  obj.satellite === 'S2A' ? 'sentinel 2' : obj.satellite}`}</p>
                                  <p className="list-info">{`${G$getDateType(obj.startedAt)}${obj.endedAt ? '~'+G$getDateType(obj.endedAt) : ''}`}</p>
                              </div>
                            </div>
                          </ListItemButton>
                        </ListItem>
                      </>
                    )
                  })
                }
                
              </List>
          </div>
        </div>
      )
        
    }

  return (
    <>
      <div className="content-body scroll" onClick={()=>{ dispatch({type:SAFETY_SELECT_BOX, selectBox: false}) }}>
          {
              loading && <div className="content-row empty-wrap" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress color="primary" size={50} thickness={4} /></div>
          }
          {
            layerList.length === 0 && !loading &&
            <div className="content-row empty-wrap">
              <div className="empty-message">
                <h3 className="empty-text">{message}</h3>
                <Button className="btn empty-btn" onClick={(e)=>{{
                        e.stopPropagation()
                        dispatch({type:SELECT_BOX, selectBox: true})
                      }}}>지역검색</Button>
              </div>
            </div>
          }

          {
              <div className="multiple-select-wrap" style={{display: layerList.length > 0 && !loading ? '' : 'none', marginTop: 15}}>
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

          {layerList.length > 0 && !loading && layerList.map((obj, i)=> renderResult(obj, i))}

          {displaceLevelData.length > 0 && !loading && renderSafetyLevel()}
          
        </div>
        <BaseResultCntTooltip resultInfos={resultInfos}/>
      </>
    )
}

export default React.memo(SafetyResult);
