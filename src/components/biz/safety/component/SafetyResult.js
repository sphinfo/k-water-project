import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAFETY_CLICK_MODE, SAFETY_DETAIL_RESET, SAFETY_RESET_LAYER, SAFETY_SELECT_BOX, SAFETY_SELECT_DISPLACE_LEVEL, SAFETY_SELECT_RESULT } from "@redux/actions";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray, G$getDateType } from "@gis/util";
import img from "@images/Safety-20231113_L3TD_A2_YONGDAM_ASC.jpg"
import Button from "@mui/material/Button";
import { getSafety3LevelResult, getSafetydisplaceResult } from "@common/axios/safety";
import { getL3Layers } from "@common/axios/common";
import dayjs from "dayjs";
//Safety-20231114_L4TD_YONGDAM_UD.jpg

//sample 데이터
const example = [
  {name:'ASC',  date: '23.11.10~23.11.16', main:'PSI', mainName: '(고정산란체)', checked: false, store:'Safety', layer: 'L3TD_A2_YONGDAM_ASC'},
  {name:'DESC', date: '23.11.10~23.11.16', main:'PSI', mainName: '(고정산란체)', checked: false, store:'safety', layer: 'L3TD_A2_YONGDAM_DSC' },
  {name:'ASC',  date: '23.11.10~23.11.16', main:'SBAS', mainName: '(분산산란체)', checked: false, store:'Safety', layer: 'L3TD_A2_YONGDAM_ASC'},
  {name:'DESC', date: '23.11.10~23.11.16', main:'SBAS', mainName: '(분산산란체)', checked: false, store:'safety', layer: 'L3TD_A2_YONGDAM_DSC' },
]

const SafetyResult = () => {
    
    const dispatch = useDispatch()

    // 안전 검색조건
    const { text, selectBox, select4Level, select3Level } = useSelector(state => state.safety)

    const [layerList, setLayerList] = useState([])

    //debouncing timer
    const [timer, setTimer] = useState(null);

    //변위등급 button
    const [levelButton, setLevelButton] = useState(false)

    //변위등급 데이터
    const [displaceLevelData, setDisplaceLevelData] = useState(false)

    //변위등급 레이어 on / off
    useEffect(()=>{
      levelButton ? dispatch({type:SAFETY_SELECT_DISPLACE_LEVEL, displaceLevel: displaceLevelData}) : dispatch({type:SAFETY_SELECT_DISPLACE_LEVEL, displaceLevel: false})
      if(levelButton){
        //변위등급이 선택되면 비교 클릭모드 OFF
        dispatch({type:SAFETY_CLICK_MODE, compLayerClick: false})
      }
    },[levelButton])

    //3레벨이 해제되면 변위등급도 OFF
    useEffect(()=>{
      setLevelButton(false)
      //setDisplaceLevelData
    },[select3Level, select4Level])

    //변위등급 변화
    // useEffect(()=>{
    //     if(select4Level){
    //       setLevelButton(false)
    //     }
    // },[select4Level])

    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{

      dispatch({type:SAFETY_RESET_LAYER})

      if(text.name !== ''){

        if (timer) {
          clearTimeout(timer)
        }

        const delayRequest = setTimeout(() => {
          if (text.code && text.code !== '') {
            
            //변위 등급 초기화
            setDisplaceLevelData(false)
            //*******API************* getL3Layers: 레벨3 결과값/
            let params = {type:'safety', level: 'L3', location: text.code, from:dayjs().format('YYYYMMDD'), to:dayjs().format('YYYYMMDD')}
            getL3Layers(params).then((response) => {
              
              if(response.result.data.length > 0){

                let resultList = []
                response.result.data.map((obj)=>{

                  let store = obj.dataType
                  let layer = obj.name
                  let group = obj.level
                  let groupNm = obj.level === 'L3' ? '변위탐지' : '변위등급'
                  let categoryNm = obj.category.indexOf('L3TD_A1') > 0 ? '고정산란체' : obj.category.indexOf('L3TD_A2') > 0 ? '분산산란체' : ''
                  

                  if(obj.level === 'L3'){
                    resultList.push({...obj, store, layer, group, categoryNm, groupNm})
                  }else{
                    setDisplaceLevelData({...obj, store, layer, group, categoryNm, groupNm})
                  }

                })

                const groupArray = G$BaseSelectBoxArray(resultList)
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
      
    },[text])
    
    

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
                  return { ...item, checked: false }; // 기존 선택 해제
              });
              return updatedSubArray;
          }
          return subArray.map(item => ({ ...item, checked: false })); // 다른 항목들의 선택 해제
      });
      setLayerList(updatedList);

      //이베트 발생 위치 확인후 
      const selectedItem = updatedList[outerIndex][innerIndex]

      //선택이 해제되었으면 reset / 선택이 되었으면 select3level reduce 전송
      if (!selectedItem.checked) {
          dispatch({ type: SAFETY_RESET_LAYER });
      } else {
          dispatch({ type: SAFETY_SELECT_RESULT, select3Level: selectedItem })
      }
    }


    //결과값 출력
    const renderResult = (obj, i) =>(
        <>
            {obj.length > 0 &&
                <div className="content-row">
                    <div className="content-list-wrap">
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
          <ListItem key={i2} selected={true}>
            <ListItemButton
              className={`content-list-item ${obj.checked ? 'item-on' : ''}`}
              selected={true}
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
                  <p className="list-info">{obj.groupNm}</p>
                  <p className="list-info">{obj.category}</p>
                  <p className="list-info">{`${obj.category === 'L3TDA1' ? '고정산란체' : obj.category === 'L3TDA2' ? '분산산란체' : ''}`}</p>
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
                <ListItem selected={true}>
                  <ListItemButton
                    className={`content-list-item ${levelButton ? 'item-on' : ''}`}
                    selected={true}
                    disableTouchRipple={true}
                    color={'primary'}
                    onClick={()=>{setLevelButton(!levelButton)}}
                  >
                    <div className="list-body">
                      <div className="img-box">
                        <div className="list-shadow"></div>
                          <img src={displaceLevelData.thumbnailUrl}/>
                        </div>
                        <div className="list-info-wrap">
                          <p className="list-info">{displaceLevelData.groupNm}</p>
                          <p className="list-info">{displaceLevelData.category}</p>
                          <p className="list-info">{`${displaceLevelData.satellite}`}</p>
                          <p className="list-info">{`${G$getDateType(displaceLevelData.startedAt)}${displaceLevelData.endedAt ? '~'+G$getDateType(displaceLevelData.endedAt) : ''}`}</p>
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
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
              <h3 className="empty-text">연구대상 지역을 선택해주세요</h3>
              <Button className="btn empty-btn" onClick={()=>{{dispatch({type:SAFETY_SELECT_BOX, selectBox: !selectBox})}}}>지역검색</Button>
            </div>
          </div>
        }

        {layerList.length > 0 && layerList.map((obj, i)=> renderResult(obj, i))}

        {displaceLevelData && renderSafetyLevel()}
        
      </div>
    )
}

export default React.memo(SafetyResult);
