import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray } from "@gis/util";
import { FLOOD_SELECT_BOX, FLOOD_SELECT_LAYER } from "@redux/actions";
import FloodResultTab from "./FloodResultTab";
import { Button } from "@mui/material";


//sample 데이터
const example = [
  {name:'DATA1',  date: '23.11.10~23.11.16', main:'AI 알고리즘', checked: false, store:'WaterBody', layer: '20230718T21water_GS_RGB000102'},
  {name:'DATA2', date: '23.11.10~23.11.16', main:'물리적 특성', checked: false, store:'WaterBody', layer: '20230718T21water_GS_landuse_RGB000102' },
  {name:'DATA1', date: '23.11.10~23.11.16', main:'', checked: false, store:'WaterBody', layer: '20230723T21water_JL_RGB000102' },
  
  {name:'DATA1',  date: '23.11.10~23.11.16', main:'AI 알고리즘', checked: false, store:'WaterLevel', layer: '20230718T21water_GS_RGB000102'},
  {name:'DATA2', date: '23.11.10~23.11.16', main:'물리적 특성', checked: false, store:'WaterLevel', layer: '20230718T21water_GS_landuse_RGB000102' },
]

const FloodResult = () => {
    
    const dispatch = useDispatch()

    // 홍수 검색조건
    const { text, startDate, endDate, floodResultTab, selectBox } = useSelector(state => state.flood)

    const [exampleList, setExampleList] = useState([])

    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{
      if(text !== ''){
        const groupArray = G$BaseSelectBoxArray(example, 'main')
        const resultArray = groupArray.grouped
        setExampleList(resultArray)
      }else{
        setExampleList([])
      }
    },[text, startDate, endDate])

    

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

      //이벤트 발생 위치 확인후 
      const selectedItem = updatedList[outerIndex][innerIndex];
      let value = !selectedItem.checked ? false : selectedItem
      dispatch({ type: FLOOD_SELECT_LAYER, selectFloodLayer: value });

    }


    //결과값 출력 ( 데이터 구성을 2중 배열로 사용하려고 생각중 )
    const renderResult = (obj, i) =>(
      <List className={'content-list'} sx={{
        overflow: 'auto',
      }}>
        {obj.length > 0 && obj.map((obj, i2)=> renderItem(obj, i, i2))}
      </List>
    )

    //list item 설정
    const renderItem = (obj, i, i2) => (
        <>
          <div className="content-list-inner" style={{display: obj.store === floodResultTab ? '' : 'none'}}>
            {/* {i2 === 0 ? obj.main : ''} */}
            <ListItem key={i2} selected={true}>
              <ListItemButton
                className={`content-list-item ${obj.checked ? 'item-on' : ''}`}
                selected={true}
                disableTouchRipple={true}
                button={true}
                color={'primary'}
                onClick={() => checkboxChange(i, i2)}
              >
                <div className="list-title-wrap">
                  <h3 className={'list-title'}>{obj.name}</h3>
                  <h4 className="list-title-sub">{obj.date}</h4>
                </div>
                <div className="list-body">
                  <div className="list-shadow"></div>
                  <div className="img-box">{/*images*/}</div>
                </div>
              </ListItemButton>
            </ListItem>
          </div>
        </>
    )

    return (
        <>
          <div className={"content-body border-top filled"} >
            {
              exampleList.length === 0 &&
              <div className="content-row empty-wrap">
                <div className="empty-message">
                  <h3 className="empty-text">연구대상 지역을 선택해주세요</h3>
                  <Button className="btn empty-btn" onClick={()=>{{dispatch({type:FLOOD_SELECT_BOX, selectBox: !selectBox})}}}>지역검색</Button>
                </div>
              </div>
            }  

            { exampleList.length > 0 && <FloodResultTab />}
            <div className="content-row">
                
                <div className={'content-list-wrap'}>
                  {exampleList.length > 0 && exampleList.map((obj, i)=> renderResult(obj, i))}
                </div>
              </div>
          </div>
        </>
    )
}

export default React.memo(FloodResult);