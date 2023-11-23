import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray } from "@gis/util";
import EnvironmentResultTab from "./EnvironmentResultTab";
import { ENV_SELECT_LAYER } from "@redux/actions";


//sample 데이터
const example = [
  {name:'DATA1',  date: '23.11.10~23.11.16', main:'AI 알고리즘', checked: false, store:'LandCover', layer: 'RF_20220914_clip'},
  {name:'DATA2', date: '23.11.10~23.11.16', main:'광학자료', checked: false, store:'LandCover', layer: 'RF_20221101_clip' },
  {name:'DATA1', date: '23.11.10~23.11.16', main:'', checked: false, store:'Garbage', layer: 'Chlorophyll_Map_2' },
]

const EnvironmentResult = () => {
    
    const dispatch = useDispatch()

    // 가뭄 검색조건
    const { text, startDate, endDate, environmentResultTab } = useSelector(state => state.environment)

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
      dispatch({ type: ENV_SELECT_LAYER, selectEnvironmentLayer: value });

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
          <div className="content-list-inner" style={{display: obj.store === environmentResultTab ? '' : 'none'}}>
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
                  <h3 className={'list-title'}>{obj.name} ---------- {obj.date}</h3>
                </div>
              </ListItemButton>
            </ListItem>
          </div>
        </>
    )

    return (
        <>
          <div className={"content-body border-top filled"}>
            <EnvironmentResultTab />
            <div className="content-row">
                <div className={'content-list-wrap'}>
                  {exampleList.length > 0 && exampleList.map((obj, i)=> renderResult(obj, i))}
                </div>
              </div>
          </div>
        </>
    )
}

export default React.memo(EnvironmentResult);
