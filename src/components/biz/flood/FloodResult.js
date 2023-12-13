import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { G$BaseSelectBoxArray, G$flyToPoint } from "@gis/util";
import { FLOOD_RESET, FLOOD_SELECT_BOX, FLOOD_SELECT_LAYER, LOADING } from "@redux/actions";
import FloodResultTab from "./FloodResultTab";
import { Button } from "@mui/material";
import { getL3Layers } from "@common/axios/common";


//sample 데이터
const example = [
  {name:'DATA1',  date: '23.11.10~23.11.16', main:'AI 알고리즘', checked: false, store:'WaterBody', layer: '20230718T21water_GS_RGB000102'},
  {name:'DATA2', date: '23.11.10~23.11.16', main:'물리적 특성', checked: false, store:'WaterBody', layer: '20230718T21water_GS_landuse_RGB000102' },
  {name:'DATA1', date: '23.11.10~23.11.16', main:'', checked: false, store:'WaterBody', layer: '20230723T21water_JL_RGB000102' },
  {name:'DATA1',  date: '23.11.10~23.11.16', main:'수위', checked: false, store:'WaterLevel', layer: '',},
]


const FloodResult = ({waterObsList=[], ...props}) => {
    
    const dispatch = useDispatch()

    // 홍수 검색조건
    const { text, startDate, endDate, floodResultTab, selectBox } = useSelector(state => state.flood)

    const [layerList, setLayerList] = useState([])

    const [noData, setNoData] = useState(false)

    //debouncing timer
    const [timer, setTimer] = useState(null);
    //검색조건이 변동될떄마다 검색결과 재검색
    useEffect(()=>{
      dispatch({type:FLOOD_RESET})
      //*******API*************/
      if(text.code !== ''){
        if (timer) {
          clearTimeout(timer)
        }

        const delayRequest = setTimeout(() => {
          if (text.code && text.code !== '') {
            //*******API************* getL3Layers: 레벨3 결과값/
            let params = {type:'flood', level: 'L3', location: text.code, from: startDate, to: endDate}
            

            getL3Layers(params).then((response) => {
              if(response.result.data.length > 0){
                let resultList = []
                response.result.data.map((obj)=>{

                  let store = obj.dataType
                  let layer = obj.name
                  let group = 'WaterBody'
                  let groupNm = '수체탐지'
                  let categoryNm = obj.category === 'L3WBA1' ? 'AI 알고리즘' : obj.category === 'L3WBA2' ? '물리' : obj.category
                  resultList.push({...obj, store, layer, group, categoryNm, groupNm})
                })


                //수위 지점 리스트 ( 초기에 가져온 값에서 확인 가능함 )
                if(waterObsList.length > 0){
                  waterObsList.map((obj)=>{
                    if(obj.name.indexOf(text.code) > 0){
                      //수위 지점 따로 추가 해야함 ( 관측소 정보 가져온데이터와 비교 하여 있으면 표출 )
                      resultList.push({krNm: text.name, group: 'WaterLevel',groupNm: '지점수위', category: '3WL', satellite: 'Sentinel 1',code: text.code, ...obj})
                    }
                  })
                }

                const groupArray = G$BaseSelectBoxArray(resultList, 'store')
                const resultArray = groupArray.grouped

                setLayerList(resultArray)
                setNoData(false)
              }else{
                setLayerList([])
                setNoData(true)
              }
            })
          } else {
            setLayerList([])
            setNoData(false)
          }
        }, 1000)
  
        // 타이머 설정
        setTimer(delayRequest)

      }else{
        setLayerList([])
        
      }
    },[text, startDate, endDate])

    useEffect(()=>{
      //수위 탭이 생성되면 수위 첫번째 buttn click 이벤트 
      if(floodResultTab === 'WaterLevel'){
        layerList.map((obj,i)=>{
          if(obj[0].group === 'WaterLevel'){
            G$flyToPoint([obj[0].lng, obj[0].lat], 46000)
            checkboxChange(i,0)
          }
        })
      }
    },[floodResultTab])

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
      dispatch({ type: FLOOD_SELECT_LAYER, selectFloodLayer: value });

    }


    //결과값 출력 ( 데이터 구성을 2중 배열로 사용하려고 생각중 )
    const renderResult = (obj, i) =>(
      <>
        {obj.length > 0 &&
          <div className="content-row" style={{display: obj[0].group === floodResultTab ? '' : 'none'}}>
              <div className="content-list-wrap">
                  <h4 className="content-list-title" key={i}>{obj[0].main}</h4>
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
          <ListItem key={i2} selected={true} style={{display: obj.group === floodResultTab ? '' : 'none'}}>
            <ListItemButton
              className={`content-list-item ${obj.checked ? 'item-on' : ''}`}
              selected={true}
              disableTouchRipple={true}
              button={true}
              color={'primary'}
              onClick={() => checkboxChange(i, i2)}
            >
              <div className="list-body">
                
                {
                  obj.group === 'WaterBody' && 
                  <>
                    <div className="img-box" >
                      <div className="list-shadow"></div>
                      <img src={obj.thumbnailUrl}/>
                    </div>
                    <div className="list-info-wrap">
                      <p className="list-info">{obj.groupNm}</p>
                      <p className="list-info">{obj.category}</p>
                      <p className="list-info">{`${obj.satellite}|${obj.categoryNm}`}</p>
                      <p className="list-info">{`${obj.startedAt}~${obj.endedAt}`}</p>
                    </div>
                  </>
                }
                {
                  obj.group === 'WaterLevel' && 
                  <>
                    <div className="list-info-wrap">
                      <p className="list-info">{obj.groupNm}</p>
                      <p className="list-info">{obj.category}</p>
                      <p className="list-info">{`${obj.satellite}`}</p>
                      <p className="list-info">{`${obj.date}`}</p>
                    </div>
                  </>
                }
                
              </div>
            </ListItemButton>
          </ListItem>
        </>
    )

    return (
        <>
          <div className={"content-body border-top filled"} >
            {
              layerList.length === 0 &&
              <div className="content-row empty-wrap">
                <div className="empty-message">
                  <h3 className="empty-text">{noData ? '데이터가 존재하지 않습니다.' : '연구대상 지역을 선택해주세요'}</h3>
                  <Button className="btn empty-btn" onClick={()=>{{dispatch({type:FLOOD_SELECT_BOX, selectBox: !selectBox})}}}>지역검색</Button>
                </div>
              </div>
            }

            {layerList.length > 0 && <FloodResultTab />}
            {layerList.length > 0 && layerList.map((obj, i)=> renderResult(obj, i))}
          </div>
        </>
    )
}

export default React.memo(FloodResult);
