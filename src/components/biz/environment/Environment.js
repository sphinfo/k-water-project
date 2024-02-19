import React, { useEffect, useRef, useState } from "react";
import EnvironmentOptions from "./EnvironmentOptions";
import EnvironmentResult from "./EnvironmentResult";
import { useDispatch, useSelector } from "react-redux";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import { G$RandomId, G$addWidget, G$flyToExtent, G$flyToPoint, G$removeLayer, G$removeWidget } from "@gis/util";
import { ENV_RESET } from "@redux/actions";
import EnvironmentL4 from "./component/EnvironmentL4";
import BasePolygonEntityCollection from "@gis/layers/BasePolygonEntityCollection";
import BaseSelectExpUnt from "../common/BaseSelectExpUnt";
import LegendEnvi from "@components/legend/LegendEnvi";
import BaseLegendWidget from "@components/legend/BaseLegendWidget";
import BaseLegendgGradientWidget from "@components/legend/BaseLegendgGradientWidget";

/* 환경 */
const Environment = () => {

  const dispatch = useDispatch()
  
  /**
   * selectEnvironmentLayer : 환경 레이어 선택
   * landCoverDetection : 변화 탐지 선택
   */
  const { landCoverDetection, layers } = useSelector(state => state.environment)

  //변화탐지 레이어 
  const landCoverDetectionLayer = useRef()


  /* 초기 세팅 사항 */
  useEffect(()=>{

    //변화탐지 레이어
    landCoverDetectionLayer.current = new BaseWmsImageLayer({store:'',layerId:''})
    
    return()=>{
        //변화탐지 레이어 삭제
        G$removeLayer(landCoverDetectionLayer.current.layer)

        //전역변수 리셋
        dispatch({type:ENV_RESET})
    }
  },[])


  
  const [layerIdx, setLayerIdx] = useState(0)
  const [mainLayer, setMainLayer] = useState(false)
  useEffect(()=>{
      let layerCnt = Object.keys(layers).length
      setLayerIdx(layerCnt)
      //레이어가 켜저 있으면 지점 on
      if(layerCnt === 1){
          Object.keys(layers).map((layerId, i)=>{
            const { store, layer, ...other } = layers[layerId]?.props
            if(i === 0){
                setMainLayer(other)
            }
        })
          
      }else{
        setMainLayer(false)
      }
  },[layers])


  useEffect(()=>{
    legendSetting()
  },[layerIdx,layers])


  const legendSetting = () =>{
      let legendGroup = []
      let legendOption = []
      if(layerIdx > 0){
          Object.keys(layers).map((layerId, i)=>{
              const { category, group=category, ...other } = layers[layerId]?.props
              legendGroup.push(group)
              legendOption.push(layers[layerId]?.props)
          })
      }
      legendVisible(legendGroup, legendOption)
  }

  const legendVisible = (legendGroup=[], legendOption=[]) =>{
      G$removeWidget('BaseAddLegendWidget')
      if(legendGroup.length > 0){
          let legends = []
          let tooltip = false
          const uniqueArray = [...new Set(legendGroup)]
          tooltip = legendGroup.length === 1 ? <LegendEnvi props={legendOption[0]}/> : false
          uniqueArray.map((group)=>{
              if(group === 'LandCover'){
                
                let datas = [{label:'수체', color:'#012FFF'} ,{label:'나지', color:'#FF9E01'} ,{label:'초지', color:'#FFFB07'} ,{label:'목지', color:'#35783B'} ,{label:'건물', color:'#FF0000'}]
                if(landCoverDetection){
                  datas = [{label:'수체', color:'#012FFF'} ,{label:'나지', color:'#FF9E01'} ,{label:'초지', color:'#FFFB07'} ,{label:'목지', color:'#35783B'} ,{label:'건물', color:'#FF0000'} ,{label:'변화탐지', color:'#DE3CFF'}]
                }

                legends.push(<BaseLegendWidget params={{ title:'피복 분류', datas: datas, tooltip:tooltip }}/>)
              }else if(group === 'Garbage'){
                legends.push(<BaseLegendWidget params={{title:'부유물 폐기성', datas:[{label:'부유물 발생', color:'#FF9F9F'}], tooltip:tooltip }}/>)
              }else if(group === 'Green'){
                legends.push(<BaseLegendgGradientWidget params={{title:'녹조 농도 (mg/m3)', min:0, max: 300, datas:['#0000ff','#00ffff',  '#00ff00', '#ffff00', '#ff0000'], tooltip:tooltip }}/>)
              }
              
          })
          G$addWidget('BaseAddLegendWidget', {children:legends})
      }
  }


  //변화탐지 레이어
  useEffect(()=>{
    legendSetting()
    if(landCoverDetection){
      const { store, layer, id } = landCoverDetection
      landCoverDetectionLayer.current.changeParameters({store:store, layerId:layer})
      G$addWidget('EnvironmentLandCoverWidget', {params:{id:id}} )
    }else{
      landCoverDetectionLayer.current.remove()
      G$removeWidget('EnvironmentLandCoverWidget')
    }

  },[landCoverDetection])


  return (
    <>
      {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
      <EnvironmentOptions />

      {/* 결과결과 영역 */}
      <EnvironmentResult />

      {/* 레이어 선택시 단일 선택시 */}
      {layerIdx === 1 && (
          <div className="side-content">
              {/** <BaseSelectExpUnt baseName={'Env'}/> */}
              <EnvironmentL4 mainLayer={mainLayer}/>
          </div>

      )}
    </>
  )
}

export default React.memo(Environment)