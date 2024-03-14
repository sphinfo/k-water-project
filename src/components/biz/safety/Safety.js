import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAFETY_SELETE_FEATURE, SAFETY_DETAIL_RESET, SAFETY_CLICK_MODE, SAFETY_SELECT_DISPLACE_LEVEL, SAFETY_CLICK_OBS } from "@redux/actions";
import { G$addWidget, G$removeLayer, G$removeWidget } from "@gis/util";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import SafetyResult from "./component/SafetyResult";
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import SafetyL4 from "./component/l4Component/SafetyL4";
import SafetyOverlay from "@gis/util/overlay/SafetyOverlay";
import BaseLegendgGradientWidget from "@components/legend/BaseLegendgGradientWidget";
import BaseLegendWidget from "@components/legend/BaseLegendWidget";
import LegendSafety from "@components/legend/LegendSafety";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import SafetyObsConfig from "@gis/config/SafetyObsConfig";
import { getSafetyDisplace } from "@common/axios/safety";
import SafetyObsOverlay from "@gis/util/overlay/SafetyObsOverlay";
import pin1 from "@images/map-icon-safety.svg";
import pin2 from "@images/map-icon-safety-clicked.svg";
/**
 *  안전 메인 페이지
 */

const Safety = () => {

    const dispatch = useDispatch()

    /**
     * bizName : 메뉴 명 ( 공통으로 reducer에 사용될 예정 ? )
     * select3Level : 3레벨 검색결과 선택 결과
     * compLayerClick :  4레벨 비교 탭 선택시 4레벨 레이어 click event on
     * select4Level : 표출데이터 선택
     * displaceLevel : 변위등릅 레이어 선택
     */
    const {bizName, select4Level, displaceLevel, compLayerClick, obsClick, selectFeature, layers, mainSearchEnd} = useSelector(state => state.safety)

    //안전 4레벨 레이어 생성
    const safety4LevelLayerRef = useRef()
    //안전 4레벨 관측소 레이어 생성
    const safety4LevelObsLayerRef = useRef()

    const overlayRef = useRef(new SafetyOverlay())

    const obsRef = useRef()

    /* 레이어 선택 callback Ref */
    const layerSelectRef = useRef();
    useImperativeHandle(layerSelectRef, ()=>({
        getFeatures(features){
            /* 지점비교분석 (L3 / 변위등급) 하나일때만 클릭이벤트 실행 */
            if(layerIdx === 1){
                features.map((feature)=>{
                    if(feature?.id === 'SafetyObsLayer'){
                        
                        obsPinRest()
                        if(!compLayerClick && !displaceLevel){
                            G$addWidget('SafetyL4LevelObsWidget')
                            feature.entity.billboard.image = pin2
                            dispatch({type:SAFETY_SELETE_FEATURE, selectFeature: feature})
                        }
                    }else{
                        //지점비교분석 ON
                        if(compLayerClick){
                            if(feature?.id?.indexOf('L4DC') === -1){
                                const featureInfo = {...feature, ...layers[feature?.id]}
                                dispatch({type:SAFETY_SELETE_FEATURE, selectFeature: featureInfo})
                            }
                        }

                        //변위등급 ON
                        if(displaceLevel){
                            G$addWidget('SafetyL4LevelDataWidget')
                            const {clickPosition, properties} = feature
                            dispatch({type:SAFETY_SELETE_FEATURE, selectFeature: feature})
                            overlayRef.current._addOverlay(clickPosition.longitude, clickPosition.latitude, properties)
                        }
                    }
                })
            }
        }
    }));

    useEffect(()=>{

        //안전 4레벨 레이어 생성 wms로 될거같음
        safety4LevelLayerRef.current = new BaseWmsImageLayer({store:'Safety',layerId:''})
        //안전 4레벨 관측소 기반 데이터
        safety4LevelObsLayerRef.current = new BaseEntityCollection({name:'SafetyObsLayer', image: pin1,  overlay: new SafetyObsOverlay()})
        //레이어 클릭 callback 등록
        GisLayerClickTool.addBiz(bizName, layerSelectRef, [])
        //레이어 클릭 callback 활성화
        GisLayerClickTool.enable(bizName)

        //초기에 UD/EW API 가져오기
        obsRef.current = SafetyObsConfig
        


        return()=>{

            //안전 4레벨 레이어 삭제
            G$removeLayer(safety4LevelLayerRef.current.layer)
            G$removeLayer(safety4LevelObsLayerRef.current.layer)
            GisLayerClickTool.destroyBiz(bizName)

            //조건 리셋
            dispatch({type:SAFETY_DETAIL_RESET})

            overlayRef.current.removeAll()

            //범례 삭제
            G$removeWidget('BaseAddLegendWidget')
            G$removeWidget('SafetyL4LevelDataWidget')
            G$removeWidget('SafetyL4LevelObsWidget')


        }

    },[])

    useEffect(()=>{
        if(!selectFeature){
            overlayRef.current.removeAll()
            obsPinRest()
        }

    },[selectFeature])

    const obsPinRest = () =>{
        if(safety4LevelObsLayerRef.current?.entities?.values?.length > 0){
            safety4LevelObsLayerRef.current?.entities?.values.map((obj)=>{ obj.billboard.image = pin1 })
        }
    }

    const [layerIdx, setLayerIdx] = useState(0)
    const [mainLayer, setMainLayer] = useState(false)
    useEffect(()=>{
        let layerCnt = Object.keys(layers).length
        setLayerIdx(layerCnt)
        setMainLayer(false)
        //click이벤트 초기화
        GisLayerClickTool.resetLayer(bizName)
        dispatch({type: SAFETY_CLICK_MODE, compLayerClick: false})
        dispatch({type: SAFETY_SELECT_DISPLACE_LEVEL, displaceLevel: false})

        //하나만 선택되었을때 레이어 클릭이벤트 활성화
        if(layerCnt === 1){
            Object.keys(layers).map((layerId, i)=>{
                
                const { store, layer, ...other } = layers[layerId]?.props
                if(i === 0){
                    //클릭이벤트 등록
                    GisLayerClickTool.addLayer(bizName, [`${store ? store.toLowerCase() : ''}:${layer}`])
                    setMainLayer(other)
                    legendSetting()
                    //변위등급이 켜졌을경우 변위등급 widget open ( L4DC 변위등급 )
                    if(layer.indexOf('L4DC') > -1){
                        G$addWidget('SafetyL4LevelDataWidget')
                    }else{
                        G$removeWidget('BaseLegendWidget')
                        G$removeWidget('SafetyL4LevelDataWidget')
                    }
                }
            })
        }else{
            G$removeWidget('SafetyL4LevelDataWidget')
        }

    },[layers, mainSearchEnd])

    useEffect(()=>{
        legendSetting()
    },[layerIdx])

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
            tooltip = legendGroup.length === 1 ? <LegendSafety props={legendOption[0]}/> : false
            uniqueArray.map((group)=>{
                if(group === 'L3'){
                    legends.push(<BaseLegendgGradientWidget params={{title:'변위 속도(cm/year)', min:-5, max: 5, datas:['#000083', '#003CAA', '#019ED5', '#03FFFF', '#8DFF74', '#FFFF00', '#FD8000', '#FA0100', '#800000'], tooltip:tooltip }}/>)
                }else if(group === 'L4'){
                    legends.push(<BaseLegendWidget params={{ title:'변위등급',  datas: [{label:'안전', color:'BLUE'} ,{label:'보통', color:'GREEN'} ,{label:'위험', color:'RED'}], tooltip:tooltip }}/>)
                }else if(group === 'L4TD'){
                    legends.push(<BaseLegendgGradientWidget params={{title:'L4TD 시계열변위',min:-5, max: 5, datas:['#000083', '#003CAA', '#019ED5', '#03FFFF', '#8DFF74', '#FFFF00', '#FD8000', '#FA0100', '#800000'], tooltip:tooltip }}/>)
                }

            })
            G$addWidget('BaseAddLegendWidget', {children:legends})
        }
    }


    //4레벨 레이어 선택되었을시
    useEffect(()=>{
        GisLayerClickTool.resetLayer(bizName)
        G$removeWidget('SafetyL4LevelObsWidget')
        safety4LevelObsLayerRef.current?.entities.removeAll()
        if(select4Level){
            const {store, layer, id, name} = select4Level
            safety4LevelLayerRef.current.changeParameters({store:store, layerId:layer})
            getL4ObsInfo(name)
            GisLayerClickTool.addLayer(bizName, [`${store ? store.toLowerCase() : ''}:${layer}`])
            legendVisible(['L4TD'])
        }else{
            legendSetting()
            safety4LevelLayerRef.current.remove()
        }

        if(layerIdx > 0){
            Object.keys(layers).map((layerId, i)=>{
                const { store, layer, ...other } = layers[layerId]?.props

                //4레벨 레이어가 선택이 되면 기존 레이어들은 hide
                layers[layerId].layer.show = select4Level ? false : true
                //4레벨이 해제가 되면 3레벨 레이어 클릭이벤트 등록
                if(layerIdx === 1){
                    if(!select4Level){
                        GisLayerClickTool.addLayer(bizName, [`${store ? store.toLowerCase() : ''}:${layer}`])
                    }
                }
            })
        }
    },[select4Level])

    const getL4ObsInfo = (name) =>{
        /** api L4 지점 리스트 가져오기 L4 ID 를 통해서 예상 */
        GisLayerClickTool.addLayer(bizName, ['SafetyObsLayer'])

        let direction = name === 'UP-DOWN' ? 'U-D' : name === 'EAST-WEST' ? 'E-W' : false

        if(direction){
            getSafetyDisplace({direction: direction}).then((response)=>{
                if(response?.result?.data?.data?.length > 0){
                    
                    const uniqueDisplace = response?.result?.data?.data.reduce((accumulator, currentValue) => {
                        const existingItem = accumulator.find(item => item.displacement === currentValue.displacement)
                            if (existingItem) {
                                existingItem.data.push(currentValue);
                            } else {
                                accumulator.push({
                                    ...currentValue,
                                    data: [currentValue],
                                })
                            }

                            return accumulator;
                    }, [])

                    if(uniqueDisplace.length > 0){
                        uniqueDisplace.map((obsObj)=>{
                            const {longitude, latitude} = obsObj
                            safety4LevelObsLayerRef.current._addFeature({lng:longitude, lat:latitude, properties:obsObj, hover: true})
                        })
                    }
                }
            })
        }
    }

    return (
        <>
            {/* 결과결과 영역 */}            
            <div className="panel panel-left">
                <SafetyResult />
            </div>
            {/* 4레벨 결과 영역 ( 3레벨이 레이어가 1개 선택되었을시 / 여러개 선택이 되면 레이어 보는 기능 )*/}
            {layerIdx === 1 &&
                (
                    <div className="side-content side-content-has-inner">
                        <SafetyL4 mainLayer={mainLayer}/>
                    </div>
                )
            }
        </>
    )
}

export default React.memo(Safety)
