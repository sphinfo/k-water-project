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

/* 환경 */
const Environment = () => {

  const dispatch = useDispatch()
  
  /**
   * selectEnvironmentLayer : 환경 레이어 선택
   * landCoverDetection : 변화 탐지 선택
   */
  const { selectEnvironmentLayer, landCoverDetection, layers } = useSelector(state => state.environment)

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


  //변화탐지 레이어
  useEffect(()=>{
    if(landCoverDetection){
      landCoverDetectionLayer.current.changeParameters({store:'environment', layerId:'20231212113940_environment_L4LC_Q8eh_DAEJEON-DAECHEONG-YONGDAM-SEJONG-ANDONG-SAYEON-UNMUN-MIHO-CHANGNYEONG-SOYANG'})
    }else{
      landCoverDetectionLayer.current.remove()
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
              <BaseSelectExpUnt baseName={'Env'}/>
              <EnvironmentL4 mainLayer={mainLayer}/>
          </div>

      )}
    </>
  )
}

export default React.memo(Environment)