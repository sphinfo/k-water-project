import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAFETY_SELETE_FEATURE, SAFETY_DETAIL_RESET, SAFETY_SELECT_4_LEVEL_RESET, SAFETY_DETAIL_SEARCH_TAB_TYPE } from "@redux/actions";
import { G$RandomId, G$addLayer, G$addWidget, G$flyToPoint,G$removeLayer, G$removeWidget } from "@gis/util";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";

import SafetyOptions from "./component/SafetyOptions";
import SafetyResult from "./component/SafetyResult";
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import BaseNormalizeGridLayer from "@gis/layers/BaseNormalizeGridLayer";
import SafetyL4 from "./component/l4Component/SafetyL4";
import SafetyOverlay from "@gis/util/overlay/SafetyOverlay";

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
    const {bizName, select3Level, select4Level, displaceLevel, compLayerClick} = useSelector(state => state.safety)

    {/** 안전3레벨 / 안전4레벨 / 변위등급 ( 데이터가 있는한 정적인 레이어 ) */}
    //안전 3레벨 레이어 생성
    const safety3LevelLayerRef = useRef()

    //안전 4레벨 레이어 생성
    const safety4LevelLayerRef = useRef()

    //변위등급 레이어 생성
    const safetyDisplaceLevelLayerRef = useRef()

    const overlayRef = useRef(new SafetyOverlay())

    /* 레이어 선택 callback Ref */
    const layerSelectRef = useRef();
    useImperativeHandle(layerSelectRef, ()=>({
        getFeatures(features){
            if(compLayerClick){
                dispatch({type:SAFETY_SELETE_FEATURE, selectFeature: features[0]})
            }

            //변위등급이 켜져 있는 경우 ovelay 
            if(displaceLevel){
                const {clickPosition, properties} = features[0]
                overlayRef.current._addOverlay(clickPosition.longitude, clickPosition.latitude, properties)
            }
        }
    }));

    useEffect(()=>{

        //안전 3레벨 레이어 생성
        safety3LevelLayerRef.current = new BaseWmsImageLayer('Safety','')

        //안전 4레벨 레이어 생성 wms로 될거같음
        safety4LevelLayerRef.current = new BaseWmsImageLayer('Safety','')

        //변위 등급 레이어 생성
        safetyDisplaceLevelLayerRef.current = new BaseWmsImageLayer('Safety','')

        //레이어 클릭 callback 등록
        GisLayerClickTool.addBiz(bizName, layerSelectRef, [])
        //레이어 클릭 callback 활성화
        GisLayerClickTool.enable(bizName)

        return()=>{

            //안전 3레벨 레이어 삭제
            G$removeLayer(safety3LevelLayerRef.current.layer)
            //안전 4레벨 레이어 삭제
            G$removeLayer(safety4LevelLayerRef.current.layer)
            //안전 4레벨 레이어 삭제
            G$removeLayer(safetyDisplaceLevelLayerRef.current.layer)
            //레이어 클릭 callback 비활성화
            GisLayerClickTool.destroyBiz(bizName)

            //조건 리셋
            dispatch({type:SAFETY_DETAIL_RESET})

            overlayRef.current.removeAll()

            //범례 삭제
            G$removeWidget('BaseLegendWidget')
            G$removeWidget('BaseLegendgGradientWidget')

        }

    },[])


    /* 변위등급 on / off */
    useEffect(()=>{

        GisLayerClickTool.resetLayer(bizName)
        if(displaceLevel){

            //변위 등급 선택시 비교탭 off 및 비교클릭이벤트 해제
            dispatch({type:SAFETY_DETAIL_SEARCH_TAB_TYPE, detailSearchTabType:'datas' })

            safety3LevelLayerRef.current.setVisible(false)
            safety4LevelLayerRef.current.setVisible(false)

            const {store, layer} = displaceLevel
            safetyDisplaceLevelLayerRef.current.changeParameters({store:store, layerId:layer})
            GisLayerClickTool.addLayer(bizName, [`${store}:${layer}`])

        }else{

            safetyDisplaceLevelLayerRef.current.remove()


            //변위등급을 껏을시 4레벨이 선택되어 있으면 4레벨만 켜기  /  4레벨이 꺼져있으면 3레벨 켜기
            if(select4Level){
                safety4LevelLayerRef.current.setVisible(true)
            }else{
                safety3LevelLayerRef.current.setVisible(true)
            }

            //오버레이 삭제
            overlayRef.current.removeAll()

            //범례 삭제
            G$removeWidget('BaseLegendWidget')
            G$removeWidget('BaseLegendgGradientWidget')
        }

    },[displaceLevel])

    //안전 3레벨 선택시 레이어 on / off
    useEffect(()=>{
        //callback 리셋
        GisLayerClickTool.resetLayer(bizName)
        if(select3Level){

            const {store, layer} = select3Level
            safety3LevelLayerRef.current.changeParameters({store:store, layerId:layer})
            
            //callback 레이어로 추가
            GisLayerClickTool.addLayer(bizName, [`${store}:${layer}`])
            //console.info(safety3LevelLayerRef.current)
            //3레벨 선택이 되었을시 4레벨 데이터를 가져와야함 2안을 적용했을시 / 1안이 적용되었으면 조건입력후 4레벨 데이터 가져오기 ( SafetyDisplaceLevelTemp )


        }else{
            //3레벨 선택없을시 삭제
            safety3LevelLayerRef.current.remove()

        }
    },[select3Level])

    //안전 4레벨 선택시 레이어 on / off
    useEffect(()=>{

        //3레벨 레이어 visible off
        safety3LevelLayerRef.current.setVisible(false)

        //callback 리셋
        GisLayerClickTool.resetLayer(bizName)
        
        //4레벨 레이어가 선택되었을시 3레벨 레이어 OFF 
        if(select4Level){
            const {store, layer} = select4Level
            safety4LevelLayerRef.current.changeParameters({store:store, layerId:layer})
            GisLayerClickTool.addLayer(bizName, [`${store}:${layer}`])

        }else{
            //4레벨 레이어 지우기
            safety4LevelLayerRef.current.remove()

            //3레벨 레이어 켜기
            safety3LevelLayerRef.current.setVisible(true)

            let id = safety3LevelLayerRef.current.layer ? safety3LevelLayerRef.current.layer.id : null
            //3레벨 레이어 click 콜백 켜기
            if(id){
                GisLayerClickTool.addLayer(bizName, [safety3LevelLayerRef.current.layer.id])
            }

            dispatch({type:SAFETY_SELECT_4_LEVEL_RESET})
        }

    },[select4Level])


    //범례 change 이벤트
    useEffect(()=>{

        G$removeWidget('BaseLegendWidget')
        G$removeWidget('BaseLegendgGradientWidget')


        //변위등급이 켜져잇는경우 STEP 1
        if(displaceLevel){
            //3,4 레벨 범례 off

            //변위등급 범례 on
            G$addWidget('BaseLegendWidget', { 
                params: {
                    title:'L4TD 변위등급', 
                    datas: [{label:'안전', color:'BLUE'}
                        ,{label:'보통', color:'GREEN'}
                        ,{label:'위험', color:'RED'}
                ]} 
            })
        }else{
            //변위등급 범례 on
            //3레벨,4레벨 켜져있는경우 ( 4레벨만 on )
            if(select3Level && select4Level){

                G$addWidget('BaseLegendgGradientWidget', { 
                    params: {title:'L4TD 시계열변위', 
                    min:-1, 
                    max: 1, 
                    datas:['#1E90FF','#87CEFA',  '#FAFAD2', '#FFA500', '#FF0000']}})

                
            }else{
                //3레벨이 켜져있는경우
                if(select3Level){
                    G$addWidget('BaseLegendgGradientWidget', { 
                        params: {title:select3Level.main === 'PSI' ? '고정산란체 - L3TD-A1' : '분란산란체 - L3TD-A2', 
                        min:-0.3, 
                        max: 3, 
                        datas:['#1E90FF','#87CEFA',  '#FAFAD2', '#FFA500', '#FF0000']}})

                }
                
            }

        }

        if(!select3Level && !select4Level && !displaceLevel){
            G$removeWidget('BaseLegendgGradientWidget')
            G$removeWidget('BaseLegendWidget')
        }


    },[select3Level, select4Level, displaceLevel])

    return (
        <>
            {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
            <SafetyOptions />

            {/* 결과결과 영역 */}
            <SafetyResult />

            {/* 4레벨 결과 영역 ( 3레벨이 선택되었을시 4레벨창 open )*/}
            {select3Level && ( <SafetyL4 /> )}
        </>
    )
}

export default React.memo(Safety)