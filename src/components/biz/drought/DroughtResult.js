import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray } from "@gis/util";
import { DROUGHT_RESULT_TAB, DROUGHT_SELECT_BOX, DROUGHT_SELECT_LAYER } from "@redux/actions";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from "@mui/material";
import img from "@images/Safety-20231113_L3TD_A2_YONGDAM_ASC.jpg"
import { getL3Layers } from "@common/axios/common";


//sample 데이터
const example = [
  {name:'SCENE1',  date: '23.11.10~23.11.16', main:'', checked: false, store:'Drought', layer: 'S1A_IW_GRDH_1SDV_20170315T092248_20170315T092317_015701_019D6E_150C'},
  {name:'SCENE2', date: '23.11.10~23.11.16', main:'', checked: false, store:'Drought', layer: 'S1A_IW_GRDH_1SDV_20170315T092317_20170315T092342_015701_019D6E_4283' },
  {name:'SCENE3', date: '23.11.10~23.11.16', main:'', checked: false, store:'Drought', layer: 'S1A_IW_GRDH_1SDV_20170315T092342_20170315T092407_015701_019D6E_425F' },
]

const DroughtResult = () => {
    
    const dispatch = useDispatch()

    // 가뭄 검색조건
    const { text, startDate, endDate, selectBox, selectResultTab } = useSelector(state => state.drought)

    const [exampleList, setExampleList] = useState([])

    //debouncing timer
    const [timer, setTimer] = useState(null);

    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{
      
      if(text.name !== ''){
        
        if (timer) {
          clearTimeout(timer)
        }

        const delayRequest = setTimeout(() => {
          if (text.name !== '') {

            //*******API************* getL3Layers: 레벨3 결과값/
            let params = {type:'drought', level: 'L3'}
            getL3Layers(params).then((result) => {

              const groupArray = G$BaseSelectBoxArray(example)
              const resultArray = groupArray.grouped
              setExampleList(resultArray)

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
    },[text, startDate, endDate])

    

    // 초기화
    useEffect(()=>{
        setExampleList([])

        return()=>{
          dispatch({ type: DROUGHT_SELECT_LAYER, selectDroughtLayer: false });
        }
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

      //이벤트 발생 위치 확인후 
      const selectedItem = updatedList[outerIndex][innerIndex];

      //선택이 되었으면 layerItem 전송 / 선택이 해제되었으면 false
      let value = !selectedItem.checked ? false : selectedItem
      dispatch({ type: DROUGHT_SELECT_LAYER, selectDroughtLayer: value });

    }


    //결과값 출력 ( 데이터 구성을 2중 배열로 사용하려고 생각중 )
    const renderResult = (obj, i) =>(
        <>
            {obj.length > 0 &&
                <div className="content-row">
                    <div className="content-list-wrap">
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
                  <p className="list-info">{`obj.layer`}</p>
                  <p className="list-info">{obj.main + obj.mainName}</p>
                  <p className="list-info">{obj.date}</p>
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
              exampleList.length === 0 &&
              <div className="content-row empty-wrap">
                <div className="empty-message">
                  <h3 className="empty-text">연구대상 지역을 선택해주세요</h3>
                  <Button className="btn empty-btn" onClick={()=>{{dispatch({type:DROUGHT_SELECT_BOX, selectBox: !selectBox})}}}>지역검색</Button>
                </div>
              </div>
            }

            <div className="content-row">
              {exampleList.length > 0 &&
                <div className="form-control">
                  <Tabs className={"toggle-btn-wrap"} exclusive fullWidth={true} value={selectResultTab} onChange={(e, v)=>{dispatch({type: DROUGHT_RESULT_TAB, selectResultTab: v})}}>
                    <Tab className={"tab-item"} label={'물리'} value={'A1'}></Tab>
                    <Tab className={"tab-item"} label={'강우'} value={'A2'}></Tab>
                    <Tab className={"tab-item"} label={'토양'} value={'A3'}></Tab>
                  </Tabs>
                </div>
              }
              
            </div>
            {exampleList.length > 0 && exampleList.map((obj, i)=> renderResult(obj, i))}
          </div>
        </>
    )
}

export default React.memo(DroughtResult);
