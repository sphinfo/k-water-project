import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAFETY_DETAIL_RESET, SAFETY_SELECT_RESULT } from "@redux/actions";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray } from "@gis/util";


//sample 데이터
const example = [
  {name:'ASC',  date: '23.11.10~23.11.16', main:'PSI', checked: false, store:'Safety', layer: 'L3TD_A2_YONGDAM_ASC'},
  {name:'DESC', date: '23.11.10~23.11.16', main:'PSI', checked: false, store:'safety', layer: 'L3TD_A2_YONGDAM_DSC' },
  {name:'ASC',  date: '23.11.10~23.11.16', main:'SBAS', checked: false, store:'Safety', layer: 'L3TD_A2_YONGDAM_ASC'},
  {name:'DESC', date: '23.11.10~23.11.16', main:'SBAS', checked: false, store:'safety', layer: 'L3TD_A2_YONGDAM_DSC' },
]

const SafetyResult = ({changeParam, ingre}) => {
    
    const dispatch = useDispatch()

    // 안전 검색조건
    const { text } = useSelector(state => state.safety)


    const [exampleList, setExampleList] = useState([])

    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{

      dispatch({type:SAFETY_DETAIL_RESET})

      if(text !== ''){
        const groupArray = G$BaseSelectBoxArray(example, 'main')
        const resultArray = groupArray.grouped
        setExampleList(resultArray)
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
      const selectedItem = updatedList[outerIndex][innerIndex];
      //선택이 해제되었으면 reset / 선택이 되었으면 select3level reduce 전송
      if (!selectedItem.checked) {
          dispatch({ type: SAFETY_DETAIL_RESET });
      } else {
          dispatch({ type: SAFETY_SELECT_RESULT, select3Level: selectedItem });
      }
    }


    //결과값 출력
    const renderResult = (obj, i) =>(
      <List className={'content-list'} sx={{
        overflow: 'auto',
      }}>
        {obj.length > 0 && obj.map((obj, i2)=> renderItem(obj, i, i2))}
      </List>
    )

    const renderItem = (obj, i, i2) => (
        <>
          {i2 === 0 ? obj.main : ''}
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
          <div className={"content-body bg-grey filled"}>
            <div className="content-row">
                <div className={'content-list-wrap'}>
                    {exampleList.length > 0 && exampleList.map((obj, i)=> renderResult(obj, i))}
                </div>
              </div>
          </div>
        </>
    )
}

export default React.memo(SafetyResult);
