import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray } from "@gis/util";
import EnvironmentResultTab from "./EnvironmentResultTab";
import { ENV_RESET, ENV_RESET_LAYER, ENV_SELECT_BOX, ENV_SELECT_LAYER } from "@redux/actions";
import { Button } from "@mui/material";
import img from "@images/Safety-20231113_L3TD_A2_YONGDAM_ASC.jpg"
import { getL3Layers } from "@common/axios/common";


//sample 데이터
const example = [
  {name:'DATA1',  date: '23.11.10~23.11.16', main:'수변피복', checked: false, store:'LandCover', layer: 'RF_20220914_clip'},
  {name:'DATA2', date: '23.11.10~23.11.16', main:'수변피복', checked: false, store:'LandCover', layer: 'RF_20221101_clip' },
  {name:'DATA1', date: '23.11.10~23.11.16', main:'부유물', checked: false, store:'Garbage', layer: 'Chlorophyll_Map_2' },
  {name:'DATA1', date: '23.11.10~23.11.16', main:'녹조', checked: false, store:'Garbage', layer: 'Chlorophyll_Map_2' },
]

const EnvironmentResult = () => {
    
    const dispatch = useDispatch()

    // 가뭄 검색조건
    const { text, startDate, endDate, environmentResultTab, selectBox } = useSelector(state => state.environment)

    const [layerList, setLayerList] = useState([])

    //debouncing timer
    const [timer, setTimer] = useState(null);

    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{

      dispatch({type:ENV_RESET_LAYER})
      //*******API*************/

      if(text.name !== ''){
        
        if (timer) {
          clearTimeout(timer)
        }
        const delayRequest = setTimeout(() => {
          if (text.code && text.code !== '') {
            //*******API************* getL3Layers: 레벨3 결과값/
            let params = {type:'environment', level: 'L3', location: text.code, from: startDate, to: endDate}
            getL3Layers(params).then((response) => {
              if(response.result.data.length > 0){
                let resultList = []
                response.result.data.map((obj)=>{

                  let store = obj.dataType.toLowerCase()
                  let layer = obj.name

                 /* <div className="img-box" >
                  <div className="list-shadow"></div>
                  <img src={obj.thumbnailUrl}/>
                </div>
                <div className="list-info-wrap">
                  <p className="list-info">{obj.categoryNm}</p> 수변피복 / 부우물 탐지 , 녹조탐지
                  <p className="list-info">{obj.category}</p>
                  <p className="list-info">{`${obj.satellite}`}</p>
                  <p className="list-info">{`${obj.startedAt}~${obj.endedAt}`}</p>*/

                  console.info(obj.category)
                  let group = obj.category === 'L3GA' ? 'Garbage' : obj.category === 'L3AE' ? 'Garbage': obj.category === 'L3AL' ? 'Garbage' : obj.category === 'L3LCA1' ? 'LandCover' : obj.category === 'L3LCA2' ? 'LandCover' : 'a'
                  let categoryNm = obj.category === 'L3GA' ? '부유물' : obj.category === 'L3AE' ? '녹조 농도' : obj.category === 'L3AL' ? '녹조 탐지' : obj.category === 'L3LCA1' ? '수변피복' : obj.category === 'L3LCA2' ? '수변피복' : 'b'
                  let groupNm = obj.category === 'L3GA' ? '부유물' : obj.category === 'L3AE' ? '녹조 농도' : obj.category === 'L3AL' ? '녹조 탐지' : obj.category === 'L3LCA1' ? 'AI 알고리즘' : obj.category === 'L3LCA2' ? '광학자료' : 'c'




                  resultList.push({...obj, store, layer, group, groupNm, categoryNm})
                })

                //environmentResultTab
                //
                const groupArray = G$BaseSelectBoxArray(resultList, 'group')
                const resultArray = groupArray.grouped
                console.info(resultArray)
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
      
    },[text, startDate, endDate])

    

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

      //이벤트 발생 위치 확인후 
      const selectedItem = updatedList[outerIndex][innerIndex];
      let value = !selectedItem.checked ? false : selectedItem

      dispatch({ type: ENV_SELECT_LAYER, selectEnvironmentLayer: value });

    }


    //결과값 출력 ( 데이터 구성을 2중 배열로 사용하려고 생각중 )
    const renderResult = (obj, i) =>(
        <>
            {obj.length > 0 &&
                <div className="content-row"  style={{display: obj[0].group === environmentResultTab ? '' : 'none'}}>
                    <div className="content-list-wrap">
                      <h4 className="content-list-title">{obj[0].main}</h4>
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
            button={true}
            color={'primary'}
            onClick={() => checkboxChange(i, i2)}
          >
            <div className="list-body">
              <div className="img-box" >
                <div className="list-shadow"></div>
                <img src={obj.thumbnailUrl}/>
              </div>
              <div className="list-info-wrap">
                <p className="list-info">{obj.categoryNm}</p>
                <p className="list-info">{obj.category}</p>
                <p className="list-info">{`${obj.satellite}`}</p>
                <p className="list-info">{`${obj.startedAt}${obj.endedAt ? '~'+obj.endedAt : ''}`}</p>
              </div>
            </div>
          </ListItemButton>
        </ListItem>
    )

    return (
        <>
          <div className={"content-body border-top filled"} >
            {
              layerList.length === 0 &&
              <div className="content-row empty-wrap">
                <div className="empty-message">
                  <h3 className="empty-text">연구대상 지역을 선택해주세요</h3>
                  <Button className="btn empty-btn" onClick={()=>{{dispatch({type:ENV_SELECT_BOX, selectBox: !selectBox})}}}>지역검색</Button>
                </div>
              </div>
            }  

            {layerList.length > 0 && <EnvironmentResultTab />}
            {layerList.length > 0 && layerList.map((obj, i)=> renderResult(obj, i))}
          </div>
        </>
    )
}

export default React.memo(EnvironmentResult);
