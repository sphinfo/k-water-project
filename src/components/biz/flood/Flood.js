import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FLOOD_RESET } from "@redux/actions";
import { G$addWidget, G$flyToPoint, G$paramWidget, G$removeLayer, G$removeWidget } from "@gis/util";
import WaterLevelOverlay from "@gis/util/overlay/WaterLevelOverlay";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import FloodL4 from "./component/FloodL4";
import FloodResult from "./FloodResult";
import pin from "@images/map-icon-st.svg"
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import BaseLegendWidget from "@components/legend/BaseLegendWidget";
import LegendFlood from "@components/legend/LegendFlood";

/* 홍수 */
const Flood = () => {

    const dispatch = useDispatch()
  
    /**
     * bizName : biz 명칭
     * selectFloodDamageLayer : 홍수 - 수체 - 침수피해 레이어 선택
     * layers: wms 레이어 목록
     */
    const { bizName, selectFloodDamageLayer, selectWaterLevel, floodResultTab, layers } = useSelector(state => state.flood)

    //홍수 - 수체 - 변화탐지 레이어  (4level)
    const floodDamageLayer = useRef()

    //홍수 - 수위 Point Wfs
    const floodWaterLevelLayer = useRef()

    const [layerIdx, setLayerIdx] = useState(0)
    useEffect(()=>{
        let layerCnt = Object.keys(layers).length
        setLayerIdx(layerCnt)
    },[layers])

    
    //수위 선택되면 chart widget 생성
    useEffect(()=>{
        floodWaterLevelLayer.current?.entities.removeAll()
        if(selectWaterLevel){
            G$addWidget('FloodL4WaterLevelWidget')
            //수위 데이터 선택되면 feature 그리고 이동
            G$flyToPoint([selectWaterLevel.lng, selectWaterLevel.lat], 46000)
            floodWaterLevelLayer.current._addFeature({lng:selectWaterLevel.lng, lat:selectWaterLevel.lat, properties:selectWaterLevel, hover: true})
            G$paramWidget('FloodL4WaterLevelWidget', {subTitle: ` ${selectWaterLevel.krNm}`})
        }else{
            G$removeWidget('FloodL4WaterLevelWidget')
        }
    },[selectWaterLevel])

    /* 초기 세팅 사항 */
    useEffect(()=>{
        
        //홍수 - 수위 지점 point
        floodWaterLevelLayer.current = new BaseEntityCollection({name:'floodWaterLevelLayer', image: pin, overlay: new WaterLevelOverlay()})

        //홍수 - 수체 - 침수피해(l4)
        floodDamageLayer.current = new BaseWmsImageLayer({store:'flood', fly: false})

        return()=>{
            //범례 삭제
            G$removeWidget('BaseAddLegendWidget')
            G$removeWidget('FloodL4WaterLevelWidget')

            G$removeLayer(floodWaterLevelLayer.current.layer)
            G$removeLayer(floodDamageLayer.current.layer)

            if(floodWaterLevelLayer.current.hoverHandler){
                floodWaterLevelLayer.current.hoverHandler.destroy()
                floodWaterLevelLayer.current.hoverHandler = undefined
            }

            //레이어 클릭 callback 비활성화
            GisLayerClickTool.destroyBiz(bizName)

            //홍수 전역변수 초기화
            dispatch({type:FLOOD_RESET})

        }
    },[])

    /**
     * 침수피해지도 ON / OFF
     */
    useEffect(()=>{
        
        if(selectFloodDamageLayer){
            G$addWidget('BaseAddLegendWidget',{children:[<BaseLegendWidget params={{ title:'수변 피복', tooltip:<LegendFlood />, datas: [{label:'목지', color:'#35783B'},{label:'건물', color:'#FF0000'},{label:'나지', color:'#FF9E01'},{label:'초지', color:'#FFFB07'}]}}/>]})
            const {store, layer} = selectFloodDamageLayer
            floodDamageLayer.current.changeParameters({store:store, layerId:layer})
            //floodDamageLayer.current.setOpacity(0.5)
        }else{
            floodDamageLayer.current.remove()
            G$removeWidget('BaseAddLegendWidget')
        }
    },[selectFloodDamageLayer])


    useEffect(()=>{
        if(floodResultTab === 'WaterBody'){
            //floodLayer.current.setVisible(true)
            visibleLayers(true)
            floodDamageLayer.current.setVisible(true)
            floodWaterLevelLayer.current.show = false

        }else if(floodResultTab === 'WaterLevel'){
            //floodLayer.current.setVisible(false)
            visibleLayers(false)
            floodDamageLayer.current.setVisible(false)
            floodWaterLevelLayer.current.show = true
        }

    },[floodResultTab])

    const visibleLayers = (visible=true) =>{
        if(Object.keys(layers).length > 0){
            Object.keys(layers).map((layerId)=>{
                layers[layerId].layer.show = visible
            })
        }
    }
    

    return (
        <>
            <div className="panel panel-left">
                <FloodResult />
            </div>
            {/* 홍수 3레벨 레이어 선택되었을시 ( 활용주제도 open )*/}
            {layerIdx > 0 && (
                <div className="side-content">
                    {
                        layerIdx === 1 && 
                        (
                            <FloodL4/>
                        )
                    }
                    
                </div>
            )}
        </>
    )
}

export default React.memo(Flood);
