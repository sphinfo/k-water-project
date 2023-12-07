import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import DroughtResult from "./DroughtResult";
import DroughtOptions from "./DroughtOptions";
import pin from "@images/map-icon-dr.svg"
import pin2 from "@images/map-icon-dr-clicked.svg"
import { G$addWidget, G$randomCoordinates, G$removeLayer, G$removeWidget } from "@gis/util";
import { DROUGHT_RESET, DROUGHT_SELECT_FEATURE, SET_SIDE_PANEL } from "@redux/actions";
import DroughtObsrv from "./component/DroughtL4";
import DroughtOverlay from "@gis/util/overlay/DroughtOverlay";
import DroughtObsrvConfig from "@gis/config/DroughtObsrvConfig";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import DroughtL4 from "./component/DroughtL4";

const Drought = () => {

    const dispatch = useDispatch()

    /**
     * bizName : 메뉴 명 ( 공통으로 reducer에 사용될 예정 )
     * selectObs : 선택된 관측소 정보
     * selectDroughtLayer : 가뭄 메인 레이어
     */
    const { bizName, selectObs, selectDroughtLayer } = useSelector(state => state.drought)
    const { panelVisible } = useSelector(state => state.main)
//

    //가뭄 레이어 (  )
    const droughtLayer = useRef()

    //관측소 레이어
    const droughtObsrvLayer = useRef()

    const [station, setStation] = useState(false)

    /* 레이어 선택 callback Ref */
    const layerSelectRef = useRef();
    useImperativeHandle(layerSelectRef, ()=>({
        getFeatures(features){

            //기존에 선택된 레이어가 있으면 이미지 변경
            if(selectObs){
                selectObs.entity.billboard.image = pin
            }

            if(station === features[0].properties.Station){
                dispatch({type:DROUGHT_SELECT_FEATURE, selectObs: false})
                setStation(false)
            }else{

                
                features[0].entity.billboard.image = pin2

                dispatch({type:DROUGHT_SELECT_FEATURE, selectObs: features[0]})
                setStation(features[0].properties.Station)
            }
            
            
        }
    }));


    /* 초기 세팅 사항 */
    useEffect(()=>{

        //가뭄 관측소 레이어 생성
        droughtObsrvLayer.current = new BaseEntityCollection({name:'droughtObsrvLayer', image: pin, overlay: new DroughtOverlay()})

        //가뭄 메인 레이어
        droughtLayer.current = new BaseWmsImageLayer('Drought','')

        //let samplePoint = G$randomCoordinates(100)
        let obsList = DroughtObsrvConfig
        obsList.map((properties)=>{
            droughtObsrvLayer.current._addFeature({lng:properties.Lon, lat:properties.Lat, properties, hover: true})
        })

        //레이어 클릭 callback 등록
        GisLayerClickTool.addBiz(bizName, layerSelectRef, ['droughtObsrvLayer'])
        //레이어 클릭 callback 활성화
        GisLayerClickTool.enable(bizName)

        return()=>{

            //레이어 클릭 callback 비활성화
            GisLayerClickTool.destroyBiz(bizName)
            
            //관측소 레이어 삭제
            G$removeLayer(droughtObsrvLayer.current.layer)
            if(droughtObsrvLayer.current.hoverHandler){
                droughtObsrvLayer.current.hoverHandler.destroy()
                droughtObsrvLayer.current.hoverHandler = undefined
            }

            //가뭄 레이어 삭제
            G$removeLayer(droughtLayer.current.layer)

            //가뭄 reducer 초기화
            dispatch({type:DROUGHT_RESET})

            G$removeWidget('BaseLegendgGradientWidget')
        }

    },[])


    //가뭄 레이어 선택되었을때
    useEffect(()=>{

        if(selectDroughtLayer){
            const {store, layer} = selectDroughtLayer
            droughtLayer.current.changeParameters({store:store, layerId:layer})

            G$addWidget('BaseLegendgGradientWidget', { params: {title:'토양수분', min:10, max: 25, datas:['#FF0000', '#FFA500', '#FAFAD2', '#87CEFA', '#1E90FF']}})

        }else{
            droughtLayer.current.remove()

            G$removeWidget('BaseLegendgGradientWidget')
        }

    },[selectDroughtLayer])

    //사이드 위치 조정 on
    useEffect(()=>{
        selectObs ? dispatch({type: SET_SIDE_PANEL, panelSide: true}) : dispatch({type: SET_SIDE_PANEL, panelSide: false})
    },[selectObs])

    return (
        <>
        {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
        <DroughtOptions />

        {/* 결과결과 영역 */}
        <DroughtResult />

        {/* 관측소 선택결과 ( 관측소가 선택되었을시 활용주제도 open )*/}
        {selectObs && ( <DroughtL4 /> )}
        </>
    )
}

export default React.memo(Drought);
