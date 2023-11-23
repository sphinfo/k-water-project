import React, { useEffect, useRef, useState } from "react";
import EnvironmentOptions from "./EnvironmentOptions";
import EnvironmentResult from "./EnvironmentResult";
import { useDispatch, useSelector } from "react-redux";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import { G$removeLayer } from "@gis/util";
import EnvironmentLandCover from "./component/EnvironmentLandCover";
import { SET_SIDE_PANEL } from "@redux/actions";

/* 환경 */
const Environment = () => {

  const dispatch = useDispatch()

  
  /**
   * selectEnvironmentLayer : 환경 레이어 선택
   * landCoverDetection : 변화 탐지 선택
   */
  const { selectEnvironmentLayer, landCoverDetection } = useSelector(state => state.environment)
  const { panelVisible } = useSelector(state => state.main)

  //환경 레이어
  const environmentLayer = useRef()

  //변화탐지 레이어 
  const landCoverDetectionLayer = useRef()


  /* 초기 세팅 사항 */
  useEffect(()=>{

    //환경 메인 레이어
    environmentLayer.current = new BaseWmsImageLayer('','')

    //변화탐지 레이어
    landCoverDetectionLayer.current = new BaseWmsImageLayer('','')

    return()=>{
        //환경 레이어 삭제
        G$removeLayer(environmentLayer.current.layer)

        //변화탐지 레이어 삭제
        G$removeLayer(landCoverDetectionLayer.current.layer)
    }
  },[])

  useEffect(()=>{

    //변화탐지 레이어 삭제
    landCoverDetectionLayer.current.remove()

    if(selectEnvironmentLayer){
      const {store, layer} = selectEnvironmentLayer
      environmentLayer.current.changeParameters({store:store, layerId:layer})
    }else{
      environmentLayer.current.remove()
    }
  },[selectEnvironmentLayer])

  //변화탐지 레이어
  useEffect(()=>{
    if(landCoverDetection){
      landCoverDetectionLayer.current.changeParameters({store:'LandCover', layerId:'change_detection'})
    }else{
      landCoverDetectionLayer.current.remove()
    }

  },[landCoverDetection])

  //사이드 위치 조정 on
  useEffect(()=>{
    selectEnvironmentLayer && selectEnvironmentLayer.store === 'LandCover' ? dispatch({type: SET_SIDE_PANEL, panelSide: true}) : dispatch({type: SET_SIDE_PANEL, panelSide: false})
  },[selectEnvironmentLayer])

  return (
    <>
      {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
      <EnvironmentOptions />

      {/* 결과결과 영역 */}
      <EnvironmentResult />

      {/* 관측소 선택결과 ( 관측소가 선택되었을시 활용주제도 open )*/}
      {selectEnvironmentLayer && selectEnvironmentLayer.store === 'LandCover' && ( 
        <div className={`panel side-panel ${!panelVisible ? 'fold' : ''}` }>
          <EnvironmentLandCover /> 
        </div>
      
      )}
    </>
)
}

export default React.memo(Environment);
