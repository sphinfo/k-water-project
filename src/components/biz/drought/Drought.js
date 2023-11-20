import React, { useEffect, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import DroughtResult from "./DroughtResult";
import DroughtOptions from "./DroughtOptions";
import pin from "@images/point-icon.png"
import { G$randomCoordinates, G$removeLayer } from "@gis/util";
import { DROUGHT_SELETE_FEATURE } from "@redux/actions";
import DroughtObsrv from "./component/DroughtObsrv";

const Drought = () => {

    /**
     * bizName : 메뉴 명 ( 공통으로 reducer에 사용될 예정 )
     */
    const { bizName, selectFeature } = useSelector(state => state.drought)
    
    const dispatch = useDispatch()

    //관측소 레이어
    const droughtObsrvLayer = useRef()

    /* 레이어 선택 callback Ref */
    const layerSelectRef = useRef();
    useImperativeHandle(layerSelectRef, ()=>({
        getFeatures(features){
            dispatch({type:DROUGHT_SELETE_FEATURE, selectFeature: features[0]})
        }
    }));

    useEffect(()=>{

        //가뭄 관측소 레이어 생성
        droughtObsrvLayer.current = new BaseEntityCollection({name:'droughtObsrvLayer', image: pin, overlay: true})

        let samplePoint = G$randomCoordinates(100)
        samplePoint.map((properties)=>{
            droughtObsrvLayer.current._addFeature({lng:properties.lon, lat:properties.lat, properties, hover: true})
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

        }

    },[])

    return (
        <>
        {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
        <DroughtOptions />

        {/* 결과결과 영역 */}
        <DroughtResult />

        {/* 관측소 선택결과 ( 관측소가 선택되었을시 활용주제도 open )*/}
        {selectFeature && ( <DroughtObsrv /> )}
        </>
    )
}

export default React.memo(Drought);
