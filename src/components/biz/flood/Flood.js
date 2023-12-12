import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FLOOD_DAMAGE_LAYER, FLOOD_RESET, FLOOD_SELECT_WATER_LEVEL, SET_SIDE_PANEL } from "@redux/actions";
import { G$addWidget, G$flyToPoint, G$paramWidget, G$removeLayer, G$removeWidget } from "@gis/util";
import WaterLevelOverlay from "@gis/util/overlay/WaterLevelOverlay";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import FloodL4 from "./component/FloodL4";
import FloodOptions from "./FloodOptions";
import FloodResult from "./FloodResult";
import pin from "@images/map-icon-st.svg"
import pin2 from "@images/map-icon-st-clicked.svg"
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import { getFloodObs } from "@common/axios/flood";

/* 홍수 */
const Flood = () => {

    const dispatch = useDispatch()
  
    /**
     * bizName : biz 명칭
     * selectFloodLayer : 홍수 - 수체 레이어 선택
     * selectFloodDamageLayer : 홍수 - 수체 - 침수피해 레이어 선택
     */
    const { bizName, selectFloodLayer, selectFloodDamageLayer, selectWaterLevel, text, floodResultTab } = useSelector(state => state.flood)

    //홍수 - 수체 레이어 (3level)
    const floodLayer = useRef()
    //홍수 - 수체 - 변화탐지 레이어  (4level)
    const floodDamageLayer = useRef()

    //홍수 - 수위 Point Wfs
    const floodWaterLevelLayer = useRef()

    const [waterObsList, setWaterObsList] = useState([])

    const [station, setStation] = useState(false)

    /* 레이어 선택 callback Ref */
    const layerSelectRef = useRef();
    useImperativeHandle(layerSelectRef, ()=>({
        getFeatures(features){

            //수위일시 onclick 이벤트 활성화
            if(floodResultTab === 'WaterLevel'){

                if(selectWaterLevel){
                    selectWaterLevel.entity.billboard.image = pin
                }
    
                if(station === features[0].properties.name){
                    dispatch({type: FLOOD_SELECT_WATER_LEVEL, selectWaterLevel: false})
                    setStation(false)
                }else{
                    features[0].entity.billboard.image = pin2
                    G$paramWidget('FloodL4WaterLevelWidget', {subTitle: '123'})
                    dispatch({type: FLOOD_SELECT_WATER_LEVEL, selectWaterLevel: features[0]})
                    setStation(features[0].properties.name)
                }

            }
            
        }
    }));

    useEffect(()=>{
        
        //WIDGET 창이 닫혔을시
        if(!selectWaterLevel){
            setStation(false)
        }

    },[selectWaterLevel])

    /* 초기 세팅 사항 */
    useEffect(()=>{

        //홍수 - 수체 레이어 (3level)
        floodLayer.current = new BaseWmsImageLayer('flood','')
        //홍수 - 수체 - 변화탐지 레이어  (4level)
        floodDamageLayer.current = new BaseWmsImageLayer('flood','')

        //홍수 - 수위 Point Wfs
        floodWaterLevelLayer.current = new BaseEntityCollection({name:'floodWaterLevelLayer', image: pin, overlay: new WaterLevelOverlay()})

        //레이어 클릭 callback 등록
        GisLayerClickTool.addBiz(bizName, layerSelectRef, ['floodWaterLevelLayer'])
        //레이어 클릭 callback 활성화
        GisLayerClickTool.enable(bizName)

        //*******API************* 초기 지점 데이터 가져오기/
        getFloodObs().then((response) => {
            let obsList = []
            if(response.result.data.length > 0){
                response.result.data.map((obj)=>{
                    obsList.push(obj)
                    floodWaterLevelLayer.current._addFeature({lng:obj.lng, lat:obj.lat, properties:obj, hover: true})
                })
            }

            //지점정보 저장
            setWaterObsList(obsList)
        })

        return()=>{
            //범례 삭제
            G$removeWidget('BaseLegendWidget')

            //홍수 레이어 삭제
            G$removeLayer(floodLayer.current.layer)
            G$removeLayer(floodDamageLayer.current.layer)
            G$removeLayer(floodWaterLevelLayer.current.layer)

            //레이어 클릭 callback 비활성화
            GisLayerClickTool.destroyBiz(bizName)

            //홍수 전역변수 초기화
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
            const {store, group, layer} = selectFloodLayer
            
            if(group === 'WaterBody'){ // 수체
                //수체 레이어 그리기
                floodLayer.current.changeParameters({store:store, layerId:layer})
                //수위 레이어 삭제
                floodWaterLevelLayer.current.show = false
                //floodWaterLevelLayer.current.entities.removeAll()
            }else if(group === 'WaterLevel'){ // 수위
                floodWaterLevelLayer.current.show = true
                //floodWaterLevelLayer.current.entities.removeAll()
                
                /*obsList.map((properties)=>{
                    //text
                    if(properties.name === text.code){
                        zoom = properties
                    }
                    floodWaterLevelLayer.current._addFeature({lng:properties.lon, lat:properties.lat, properties, hover: true})
                })
                if(zoom){
                    G$flyToPoint([zoom.lon, zoom.lat], 46000)
                }*/

                //수체 레이어 삭제
                floodLayer.current.remove()

            }
        }else{

            //floodWaterLevelLayer.current.entities.removeAll()
            floodLayer.current.remove()
            
        }

    },[selectFloodLayer])



    /**
     * 침수피해지도 ON / OFF
     */
    useEffect(()=>{

        if(selectFloodDamageLayer){
            //침수피해 범례 on
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

            const {store, layer} = selectFloodDamageLayer
            floodDamageLayer.current.changeParameters({store:store, layerId:layer})
        }else{
            floodDamageLayer.current.remove()
            G$removeWidget('BaseLegendWidget')
        }
    },[selectFloodDamageLayer])

    //사이드 위치 조정 on
    useEffect(()=>{
        selectFloodLayer ? dispatch({type: SET_SIDE_PANEL, panelSide: true}) : dispatch({type: SET_SIDE_PANEL, panelSide: false})
    },[selectFloodLayer])

    useEffect(()=>{

        if(floodResultTab === 'WaterBody'){
            floodLayer.current.setVisible(true)
            floodDamageLayer.current.setVisible(true)
            floodWaterLevelLayer.current.show = false

        }else if(floodResultTab === 'WaterLevel'){
            floodLayer.current.setVisible(false)
            floodDamageLayer.current.setVisible(false)
            floodWaterLevelLayer.current.show = true
        }

    },[floodResultTab])

    return (
        <>
            {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
            <FloodOptions />
            {/* 결과결과 영역 */}
            <FloodResult waterObsList={waterObsList}/>

            {/* 홍수 3레벨 레이어 선택되었을시 ( 활용주제도 open )*/}
            
            {selectFloodLayer && ( 
                <FloodL4 /> 
            )}
        </>
    )
}

export default React.memo(Flood);
