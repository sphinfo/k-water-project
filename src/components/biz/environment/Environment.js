import React, { useEffect, useRef, useState } from "react";
import EnvironmentOptions from "./EnvironmentOptions";
import EnvironmentResult from "./EnvironmentResult";
import { useDispatch, useSelector } from "react-redux";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import { G$RandomId, G$addWidget, G$flyToExtent, G$flyToPoint, G$removeLayer, G$removeWidget } from "@gis/util";
import { ENV_RESET } from "@redux/actions";
import EnvironmentL4 from "./component/EnvironmentL4";
import BasePolygonEntityCollection from "@gis/layers/BasePolygonEntityCollection";

/* 환경 */
const Environment = () => {

  const dispatch = useDispatch()

  
  /**
   * selectEnvironmentLayer : 환경 레이어 선택
   * landCoverDetection : 변화 탐지 선택
   */
  const { selectEnvironmentLayer, landCoverDetection, text } = useSelector(state => state.environment)
  const { panelVisible } = useSelector(state => state.main)

  //환경 수변피복 레이어
  const environmentLayer = useRef()

  //변화탐지 레이어 
  const landCoverDetectionLayer = useRef()

  const l3aeLayer = useRef()


  /* 초기 세팅 사항 */
  useEffect(()=>{

    //환경 메인 레이어
    environmentLayer.current = new BaseWmsImageLayer('','','', false)

    //변화탐지 레이어
    landCoverDetectionLayer.current = new BaseWmsImageLayer('','')

    //녹조 레이어 임시
    //l3aeLayer.current = new BasePolygonEntityCollection({name:'l3aeLayer'})
    
    
    return()=>{
        //환경 레이어 삭제
        G$removeLayer(environmentLayer.current.layer)

        //변화탐지 레이어 삭제
        G$removeLayer(landCoverDetectionLayer.current.layer)

        //녹조레이어 삭제
        //G$removeLayer(l3aeLayer.current.layer)


        //범례 삭제
        G$removeWidget('BaseLegendWidget')
        G$removeWidget('BaseLegendgGradientWidget')

        //전역변수 리셋
        dispatch({type:ENV_RESET})
    }
  },[])

  useEffect(()=>{

    //변화탐지 레이어 삭제
    landCoverDetectionLayer.current.remove()
    //l3aeLayer.current.entities.removeAll()

    if(selectEnvironmentLayer){
      const {store, layer} = selectEnvironmentLayer
      environmentLayer.current.changeParameters({store:store, layerId:layer})

      if(text.name.indexOf('댐') > -1){
          if(text.x && text.y && text.z){
              G$flyToPoint([text.y, text.x], text.z)
          }
      }
      
      // if(selectEnvironmentLayer.group === 'LandCover'){
      //   //const {xmin, xmax, ymin, ymax} = text
      //   //l3aeLayer.current._addFeature({xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, properties:{id:G$RandomId()}})
      //   //G$flyToPoint([xmin,ymin],103000)


      // }else if(selectEnvironmentLayer.group === 'Garbage'){
      //   //l3aeLayer.current._addFeature({xmin: 127.505519, ymin: 36.41462133, xmax: 127.5096512, ymax: 36.41048908, properties:{id:G$RandomId()}})
      //   //G$flyToPoint([127.505519,36.41462133],8000)
      // }

      //


    }else{
      environmentLayer.current.remove()
    }
  },[selectEnvironmentLayer])

  //변화탐지 레이어
  useEffect(()=>{
    if(landCoverDetection){
      landCoverDetectionLayer.current.changeParameters({store:'environment', layerId:'20231212113940_environment_L4LC_Q8eh_DAEJEON-DAECHEONG-YONGDAM-SEJONG-ANDONG-SAYEON-UNMUN-MIHO-CHANGNYEONG-SOYANG'})
    }else{
      landCoverDetectionLayer.current.remove()
    }

  },[landCoverDetection])


  //
  //범례 change 이벤트
  useEffect(()=>{
    if(selectEnvironmentLayer.group === 'LandCover'){
      G$addWidget('BaseLegendWidget', { params: { title:'피복 분류', datas: [{label:'수체', color:'#557BDF'} ,{label:'나지', color:'#F3AC50'} ,{label:'초지', color:'#A1F8A5'} ,{label:'목지', color:'#35783B'} ,{label:'건물', color:'#DD59B2'}]} })
      G$removeWidget('BaseLegendgGradientWidget')
    }else if(selectEnvironmentLayer.group === 'Garbage'){
      G$removeWidget('BaseLegendWidget')
      G$addWidget('BaseLegendgGradientWidget', { params: {title:'부유물 농도', min:0, max: 300, datas:['#FF0000', '#FFA500', '#FAFAD2', '#87CEFA', '#1E90FF']}})
    }else if(selectEnvironmentLayer.group === 'Green'){
      G$removeWidget('BaseLegendWidget')
      G$addWidget('BaseLegendgGradientWidget', { params: {title:'녹조 농도 (mg/m3)', min:0, max: 300, datas:['#1E90FF', '#87CEFA', '#FAFAD2', '#FFA500', '#FF0000']}})

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
