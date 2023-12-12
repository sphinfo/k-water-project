import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAFETY_CLICK_MODE, SAFETY_DETAIL_RESET, SAFETY_SELECT_BOX, SAFETY_SELECT_DISPLACE_LEVEL, SAFETY_SELECT_RESULT } from "@redux/actions";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray } from "@gis/util";
import img from "@images/Safety-20231113_L3TD_A2_YONGDAM_ASC.jpg"
import Button from "@mui/material/Button";
import { getSafety3LevelResult } from "@common/axios/safety";
import { getL3Layers } from "@common/axios/common";
//Safety-20231114_L4TD_YONGDAM_UD.jpg

//sample 데이터
const example = [
  {name:'ASC',  date: '23.11.10~23.11.16', main:'PSI', mainName: '(고정산란체)', checked: false, store:'Safety', layer: 'L3TD_A2_YONGDAM_ASC'},
  {name:'DESC', date: '23.11.10~23.11.16', main:'PSI', mainName: '(고정산란체)', checked: false, store:'safety', layer: 'L3TD_A2_YONGDAM_DSC' },
  {name:'ASC',  date: '23.11.10~23.11.16', main:'SBAS', mainName: '(분산산란체)', checked: false, store:'Safety', layer: 'L3TD_A2_YONGDAM_ASC'},
  {name:'DESC', date: '23.11.10~23.11.16', main:'SBAS', mainName: '(분산산란체)', checked: false, store:'safety', layer: 'L3TD_A2_YONGDAM_DSC' },
]

const displaceLevelData = {name:'변위등급', store:'Safety', layer: '20231114_SAFETY_YONGDAM', checked: false}

const SafetyResult = () => {
    
    const dispatch = useDispatch()

    // 안전 검색조건
    const { text, selectBox, select4Level, select3Level } = useSelector(state => state.safety)

    const [exampleList, setExampleList] = useState([])

    //debouncing timer
    const [timer, setTimer] = useState(null);

    //변위등급 button
    const [levelButton, setLevelButton] = useState(false)

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
      if(!select3Level){
        setLevelButton(false)
      }

    },[select3Level])

    //변위등급 변화
    useEffect(()=>{
        if(select4Level){
          setLevelButton(false)
        }
    },[select4Level])

    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{

      dispatch({type:SAFETY_DETAIL_RESET})

      if(text.name !== ''){

        if (timer) {
          clearTimeout(timer)
        }

        const delayRequest = setTimeout(() => {
          if (text.code && text.code !== '') {
            
            //*******API************* getL3Layers: 레벨3 결과값/
            let params = {type:'safety', level: 'L3', location: text.code}
            getL3Layers(params).then((response) => {

              console.info(response)
              
              if(response.result.data.length > 0){

                let resultList = []
                response.result.data.map((obj)=>{

                  //groupNm
                  //category
                  // ? | ? | ?
                  // date
                  let store = obj.dataType
                  let layer = obj.name
                  let group = ''
                  let groupNm = '변위탐지'
                  let categoryNm = obj.category.indexOf('L3TD_A1') > 0 ? '고정산란체' : obj.category.indexOf('L3TD_A2') > 0 ? '분산산란체' : ''
                  resultList.push({...obj, store, layer, group, categoryNm, groupNm})
                })

                console.info(resultList)

                //const groupArray = G$BaseSelectBoxArray(example)
                const groupArray = G$BaseSelectBoxArray(resultList)
                const resultArray = groupArray.grouped
                setExampleList(resultArray)
              }else{
                setExampleList([])
              }

            })
            
          } else {
            setExampleList([])
          }
        }, 1000)
  
        // 타이머 설정
        setTimer(delayRequest)

      }else{
        setExampleList([])
      }
      
    },[text])
    
    

    //임시 검색결과 도출
    useEffect(()=>{
        setExampleList([])
    },[])

    //체크박스 다시 그리기
    const checkboxChange = (outerIndex, innerIndex) =>{
      //exampleList 전체 데이터
      const updatedList = exampleList.map((subArray, i) => {
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
      setExampleList(updatedList);

      //이베트 발생 위치 확인후 
      const selectedItem = updatedList[outerIndex][innerIndex]

      //선택이 해제되었으면 reset / 선택이 되었으면 select3level reduce 전송
      if (!selectedItem.checked) {
          dispatch({ type: SAFETY_DETAIL_RESET });
      } else {
          dispatch({ type: SAFETY_SELECT_RESULT, select3Level: selectedItem });
      }
    }


    //결과값 출력
    const renderResult = (obj, i) =>(
        <>
            {obj.length > 0 &&
                <div className="content-row">
                    <div className="content-list-wrap">
                        {/** <h4 className="content-list-title">{obj[0].main + obj[0].mainName}</h4>*/}
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
              button={true}
              color={'primary'}
              onClick={() => checkboxChange(i, i2)}
            >
              <div className="list-body">
                <div className="img-box">
                  <div className="list-shadow"></div>
                  <img src={img}/>
                </div>
                <div className="list-info-wrap">
                  <p className="list-info">{obj.name}</p>
                  <p className="list-info">{obj.layer}</p>
                  <p className="list-info">{obj.main + obj.mainName}</p>
                  <p className="list-info">{obj.date}</p>
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
                    button={true}
                    color={'primary'}
                    onClick={()=>{setLevelButton(!levelButton)}}
                  >
                    <div className="list-body">
                      <div className="img-box">
                        <div className="list-shadow"></div>
                        <img src={img}/>
                      </div>
                      <div className="list-info-wrap">
                        <p className="list-info">변위등급</p>
                        <p className="list-info">변위등급</p>
                        <p className="list-info">변위등급</p>
                        <p className="list-info">변위등급</p>
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
        exampleList.length === 0 &&
          <div className="content-row empty-wrap">
            <div className="empty-message">
              <h3 className="empty-text">연구대상 지역을 선택해주세요</h3>
              <Button className="btn empty-btn" onClick={()=>{{dispatch({type:SAFETY_SELECT_BOX, selectBox: !selectBox})}}}>지역검색</Button>
            </div>
          </div>
        }

        {exampleList.length > 0 && exampleList.map((obj, i)=> renderResult(obj, i))}

        {/*exampleList.length > 0 && displaceLevelData && renderSafetyLevel()*/}
        
      </div>
    )
}

export default React.memo(SafetyResult);
