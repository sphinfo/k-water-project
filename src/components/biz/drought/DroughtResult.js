import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray } from "@gis/util";
import { DROUGHT_SELETE_LAYER } from "@redux/actions";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


//sample 데이터
const example = [
  {name:'SCENE1',  date: '23.11.10~23.11.16', main:'', checked: false, store:'Drought', layer: 'S1A_IW_GRDH_1SDV_20170315T092248_20170315T092317_015701_019D6E_150C'},
  {name:'SCENE2', date: '23.11.10~23.11.16', main:'', checked: false, store:'Drought', layer: 'S1A_IW_GRDH_1SDV_20170315T092317_20170315T092342_015701_019D6E_4283' },
  {name:'SCENE3', date: '23.11.10~23.11.16', main:'', checked: false, store:'Drought', layer: 'S1A_IW_GRDH_1SDV_20170315T092342_20170315T092407_015701_019D6E_425F' },
]

const DroughtResult = () => {
    
    const dispatch = useDispatch()

    // 가뭄 검색조건
    const { text, startDate, endDate } = useSelector(state => state.drought)

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

      //선택이 되었으면 layerItem 전송 / 선택이 해제되었으면 false
      let value = !selectedItem.checked ? false : selectedItem
      dispatch({ type: DROUGHT_SELETE_LAYER, selectDroughtLayer: value });

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
        </>
    )

    return (
        <>
          <div className={"content-body border-top filled"}>
            <div className="content-row">
              <div className="form-control">
              <ToggleButtonGroup
                className={"toggle-btn-wrap"}
                color={"primary"}
                exclusive={true}
                aria-label="toggle group"
                fullWidth={true}>
                <ToggleButton selected={true}>물리</ToggleButton>
                <ToggleButton>강우</ToggleButton>
                <ToggleButton>토양</ToggleButton>
                <ToggleButton>유출</ToggleButton>
              </ToggleButtonGroup>
              </div>
            </div>
            <div className="content-row">
                <div className={'content-list-wrap'}>
                    {exampleList.length > 0 && exampleList.map((obj, i)=> renderResult(obj, i))}
                </div>
              </div>
          </div>
        </>
    )
}

export default React.memo(DroughtResult);
