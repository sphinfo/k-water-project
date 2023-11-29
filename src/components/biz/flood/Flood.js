import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FLOOD_DAMAGE_LAYER, FLOOD_RESET, FLOOD_SELECT_WATER_LEVEL, SET_SIDE_PANEL } from "@redux/actions";
import { G$removeLayer } from "@gis/util";
import WaterLevelOverlay from "@gis/util/overlay/WaterLevelOverlay";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import FloodL4 from "./component/FloodL4";
import FloodOptions from "./FloodOptions";
import FloodResult from "./FloodResult";
import pin from "@images/map-icon-st.svg"
import pin2 from "@images/map-icon-st-clicked.svg"
import DroughtObsrvConfig from "@gis/config/DroughtObsrvConfig";
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";

/* 홍수 */
const Flood = () => {

    const dispatch = useDispatch()
  
    /**
     * bizName : biz 명칭
     * selectFloodLayer : 홍수 - 수체 레이어 선택
     * selectFloodDamageLayer : 홍수 - 수체 - 침수피해 레이어 선택
     */
    const { bizName, selectFloodLayer, selectFloodDamageLayer } = useSelector(state => state.flood)
    const { panelVisible } = useSelector(state => state.main)

    //홍수 - 수체 레이어 (3level)
    const floodLayer = useRef()
    //홍수 - 수체 - 변화탐지 레이어  (4level)
    const floodDamageLayer = useRef()

    //홍수 - 수위 Point Wfs
    const floodWaterLevelLayer = useRef()


    /* 레이어 선택 callback Ref */
    const layerSelectRef = useRef();
    useImperativeHandle(layerSelectRef, ()=>({
        getFeatures(features){
            
            const {store, layer} = selectFloodLayer
            //수위일시 onclick 이벤트 활성화
            if(store === 'WaterLevel'){
                dispatch({type: FLOOD_SELECT_WATER_LEVEL, selectWaterLevel: features[0]})

            }
            
        }
    }));


    /* 초기 세팅 사항 */
    useEffect(()=>{

        //홍수 - 수체 레이어 (3level)
        floodLayer.current = new BaseWmsImageLayer('','')
        //홍수 - 수체 - 변화탐지 레이어  (4level)
        floodDamageLayer.current = new BaseWmsImageLayer('','')

        //홍수 - 수위 Point Wfs
        floodWaterLevelLayer.current = new BaseEntityCollection({name:'floodWaterLevelLayer', image: pin, overlay: new WaterLevelOverlay()})

        //레이어 클릭 callback 등록
        GisLayerClickTool.addBiz(bizName, layerSelectRef, ['floodWaterLevelLayer'])
        //레이어 클릭 callback 활성화
        GisLayerClickTool.enable(bizName)

        return()=>{
            //홍수 레이어 삭제
            G$removeLayer(floodLayer.current.layer)
            G$removeLayer(floodDamageLayer.current.layer)
            G$removeLayer(floodWaterLevelLayer.current.layer)

            //레이어 클릭 callback 비활성화
            GisLayerClickTool.destroyBiz(bizName)

            dispatch({type:FLOOD_RESET})

        }
    },[])

    /**
     * 수체 레이어 on / off
     */
    useEffect(()=>{

        //수체 레이어가 변경될시 4레벨 레이어 ( 침수지도 ) off
        dispatch({type:FLOOD_DAMAGE_LAYER, selectFloodDamageLayer: false})
        //수위 레이어 선택 초기화
        dispatch({type:FLOOD_SELECT_WATER_LEVEL, selectWaterLevel: false})

        if(selectFloodLayer){
            const {store, layer} = selectFloodLayer

            
            if(store === 'WaterBody'){ // 수체
                
                //수체 레이어 그리기
                floodLayer.current.changeParameters({store:store, layerId:layer})
                //수위 레이어 삭제
                floodWaterLevelLayer.current.entities.removeAll()
                
                
            }else if(store === 'WaterLevel'){ // 수위                

                //수위 임시 샘플 데이터 
                let obsList = DroughtObsrvConfig
                obsList.map((properties)=>{
                    floodWaterLevelLayer.current._addFeature({lng:properties.Lon, lat:properties.Lat, properties, hover: true})
                })

                //수체 레이어 삭제
                floodLayer.current.remove()

            }
        }else{

            floodWaterLevelLayer.current.entities.removeAll()
            floodLayer.current.remove()
            
        }

    },[selectFloodLayer])



    /**
     * 침수피해지도 ON / OFF
     */
    useEffect(()=>{
        if(selectFloodDamageLayer){
            const {store, layer} = selectFloodDamageLayer
            floodDamageLayer.current.changeParameters({store:store, layerId:layer})
        }else{
            floodDamageLayer.current.remove()
        }
    },[selectFloodDamageLayer])

    //사이드 위치 조정 on
    useEffect(()=>{
        selectFloodLayer ? dispatch({type: SET_SIDE_PANEL, panelSide: true}) : dispatch({type: SET_SIDE_PANEL, panelSide: false})
    },[selectFloodLayer])

    return (
        <>
            {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
            <FloodOptions />
            {/* 결과결과 영역 */}
            <FloodResult />

            {/* 홍수 3레벨 레이어 선택되었을시 ( 활용주제도 open )*/}
            
            {selectFloodLayer && ( 
                <div className={`panel side-panel ${!panelVisible ? 'fold' : ''}` }>
                    <FloodL4 /> 
                </div>
            )}
        </>
    )
}

export default React.memo(Flood);
