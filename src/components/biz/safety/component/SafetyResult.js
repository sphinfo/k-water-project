import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAFETY_CLEAR_LAEYRS, SAFETY_CLICK_MODE, SAFETY_RESET_LAYER, SAFETY_SELECT_BOX, SAFETY_SELECT_DISPLACE_LEVEL, SAFETY_SELECT_RESULT, SAFETY_SET_LAYERS } from "@redux/actions";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray, G$getDateType, G$getKoreanName, G$sortArrayObject } from "@gis/util";
import Button from "@mui/material/Button";
import { getL3Layers } from "@common/axios/common";
import dayjs from "dayjs";

const SafetyResult = () => {
    
    const dispatch = useDispatch()

    // 안전 검색조건
    const { text, selectBox, searchOn } = useSelector(state => state.safety)

    const [layerList, setLayerList] = useState([])

    //debouncing timer
    const [timer, setTimer] = useState(null)

    //변위등급 데이터
    const [displaceLevelData, setDisplaceLevelData] = useState([])

    const [message, setMessage] = useState("연구대상 지역을 선택해주세요")


    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{

      dispatch({type:SAFETY_RESET_LAYER})
      dispatch({type:SAFETY_CLEAR_LAEYRS})

      if(searchOn && text.length > 0){

        if (timer) {
          clearTimeout(timer)
        }

        const delayRequest = setTimeout(() => {
          if (text.length > 0) {
            
            //변위 등급 초기화
            setDisplaceLevelData([])

            let location = text.map(item => item.code).join(',')

            //*******API************* getL3Layers: 레벨3 결과값/
            let params = {type:'safety', level: 'L3', location: location, from:dayjs().format('YYYYMMDD'), to:dayjs().format('YYYYMMDD')}
            getL3Layers(params).then((response) => {
              
              if(response?.result?.data?.length > 0){

                let resultList = []
                let displaceResultList = []
                response.result.data.map((obj)=>{

                  let store = obj.dataType.toLowerCase()
                  let layer = obj.name
                  let group = obj.level
                  let groupNm = obj.level === 'L3' ? '변위탐지' : '변위등급'
                  let categoryNm = obj.category.indexOf('L3TD_A1') > 0 ? '고정산란체' : obj.category.indexOf('L3TD_A2') > 0 ? '분산산란체' : ''
                  let locationKr = G$getKoreanName(obj.testLocation.split('-'))
                  //satellite
                  obj.satellite = obj.satellite === "S1X" ? "S1A" : obj.satellite

                  if(obj.level === 'L3'){
                    resultList.push({...obj, store, layer, group, categoryNm, groupNm, locationKr})
                  }else{
                    //L4DC 변위등급도
                    if(obj.category === 'L4DC'){
                      displaceResultList.push({...obj, store, layer, group, categoryNm, groupNm, locationKr})                    
                    }
                    
                  }
                })

                
                const groupArray = G$BaseSelectBoxArray(G$sortArrayObject(resultList, 'startedAt', true))
                const resultArray = groupArray.grouped

                //변위 등급 리스트
                setDisplaceLevelData(displaceResultList)
                //3레벨 레이어 리스트
                setLayerList(resultArray)
              }else{
                setLayerList([])
                setMessage("데이터가 존재하지 않습니다.")
              }

            })
            
          } else {
            setLayerList([])
            setMessage("데이터가 존재하지 않습니다.")
          }
        }, 1000)
  
        // 타이머 설정
        setTimer(delayRequest)

      }else{
        setLayerList([])
      }
      
    },[searchOn])
    
    

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
                  return { ...item }
              });
              return updatedSubArray;
          }
          return subArray.map(item => ({ ...item }))
      });
      setLayerList(updatedList);

      //이베트 발생 위치 확인후 
      const selectedItem = updatedList[outerIndex][innerIndex]
      dispatch({ type: SAFETY_SET_LAYERS, layerInfo: selectedItem, setType: selectedItem.checked })

    }

    //변위등급 선택
    const setSafetyLevel = (obj, index) =>{
      const updatedArray = displaceLevelData.map((item, i) => {
          if (index === i) {
              return { ...item, checked: !item.checked };
          }
          return { ...item }
      })

      const selectedItem = updatedArray[index]
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
                  <p className="list-info">{`${obj.satellite}`}</p>
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
                                  <p className="list-info">{`${obj.satellite}`}</p>
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

    <div className="content-body border-top filled">
      {
        layerList.length === 0 &&
          <div className="content-row empty-wrap">
            <div className="empty-message">
              <h3 className="empty-text">{message}</h3>
              <Button className="btn empty-btn" onClick={()=>{{dispatch({type:SAFETY_SELECT_BOX, selectBox: !selectBox})}}}>지역검색</Button>
            </div>
          </div>
        }

        {layerList.length > 0 && layerList.map((obj, i)=> renderResult(obj, i))}

        {displaceLevelData.length > 0 && renderSafetyLevel()}
        
      </div>
    )
}

export default React.memo(SafetyResult);
