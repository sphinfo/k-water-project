import React, { useEffect, useRef, useState } from "react";
import EnvironmentOptions from "./EnvironmentOptions";
import EnvironmentResult from "./EnvironmentResult";
import { useDispatch, useSelector } from "react-redux";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import { G$RandomId, G$addWidget, G$removeLayer, G$removeWidget } from "@gis/util";
import { ENV_RESET, SET_SIDE_PANEL } from "@redux/actions";
import EnvironmentL4 from "./component/EnvironmentL4";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import BasePolygonEntityCollection from "@gis/layers/BasePolygonEntityCollection";

/* 환경 */
const Environment = () => {

  const dispatch = useDispatch()

  
  /**
   * selectEnvironmentLayer : 환경 레이어 선택
   * landCoverDetection : 변화 탐지 선택
   */
  const { selectEnvironmentLayer, landCoverDetection } = useSelector(state => state.environment)
  const { panelVisible } = useSelector(state => state.main)

  //환경 수변피복 레이어
  const environmentLayer = useRef()

  //변화탐지 레이어 
  const landCoverDetectionLayer = useRef()

  const l3aeLayer = useRef()


  /* 초기 세팅 사항 */
  useEffect(()=>{

    //환경 메인 레이어
    environmentLayer.current = new BaseWmsImageLayer('','')

    //변화탐지 레이어
    landCoverDetectionLayer.current = new BaseWmsImageLayer('','')

    //녹조 레이어
    l3aeLayer.current = new BasePolygonEntityCollection({name:'l3aeLayer'})
    

    return()=>{
        //환경 레이어 삭제
        G$removeLayer(environmentLayer.current.layer)

        //변화탐지 레이어 삭제
        G$removeLayer(landCoverDetectionLayer.current.layer)

        //녹조레이어 삭제
        G$removeLayer(l3aeLayer.current.layer)


        //범례 삭제
        G$removeWidget('BaseLegendWidget')

        //전역변수 리셋
        dispatch({type:ENV_RESET})
    }
  },[])

  useEffect(()=>{

    //변화탐지 레이어 삭제
    landCoverDetectionLayer.current.remove()

    if(selectEnvironmentLayer){
      const {store, layer} = selectEnvironmentLayer
      environmentLayer.current.changeParameters({store:store, layerId:layer})
      environmentLayer.current.setOpacity(0.5)

      //xmin: 127.13132143969365, ymin: 37.124692874903765, xmax: 127.21297046703523, ymax: 37.15921662499071
      //floodWaterLevelLayer.current._addFeature({lng:obj.lng, lat:obj.lat, properties:obj, hover: true})
      
      l3aeLayer.current._addFeature({xmin: 125.91287239770594, ymin: 33.13214078423106, xmax: 126.97424130801869, ymax: 33.60135814408788, properties:{id:G$RandomId()}})
    }else{
      environmentLayer.current.remove()
    }
  },[selectEnvironmentLayer])

  //변화탐지 레이어
  useEffect(()=>{
    if(landCoverDetection){
      landCoverDetectionLayer.current.changeParameters({store:'LandCover', layerId:'change_detection'})
      landCoverDetectionLayer.current.setOpacity(0.5)
    }else{
      landCoverDetectionLayer.current.remove()
    }

  },[landCoverDetection])

  //사이드 위치 조정 on
  // useEffect(()=>{
  //   selectEnvironmentLayer && selectEnvironmentLayer.store === 'LandCover' ? dispatch({type: SET_SIDE_PANEL, panelSide: true}) : dispatch({type: SET_SIDE_PANEL, panelSide: false})
  // },[selectEnvironmentLayer])


  //범례 change 이벤트
  useEffect(()=>{

    if(selectEnvironmentLayer.group === 'LandCover'){
      G$addWidget('BaseLegendWidget', { 
        params: {
            title:'피복 분류', 
            datas: [{label:'목지', color:'#35783B'}
                ,{label:'수체', color:'#557BDF'}
                ,{label:'빌딩', color:'#DD59B2'}
                ,{label:'초지', color:'#A1F8A5'}
                ,{label:'나지', color:'#F3AC50'}
        ]} 
      })
    }else{
      G$removeWidget('BaseLegendWidget')
    }
    


  },[selectEnvironmentLayer])

  return (
    <>
      {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
      <EnvironmentOptions />

      {/* 결과결과 영역 */}
      <EnvironmentResult />

      {/* 관측소 선택결과 ( 관측소가 선택되었을시 활용주제도 open )*/}
      {selectEnvironmentLayer && (
          <div className="side-content">
              <EnvironmentL4/>
          </div>

      )}
    </>
  )
}

export default React.memo(Environment);
