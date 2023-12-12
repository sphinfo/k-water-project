import { Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION, FLOOD_SELECT_WATER_LEVEL } from "@redux/actions";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { G$addWidget, G$paramWidget, G$removeWidget } from "@gis/util";
import FloodL4WaterBodyThematic from "./waterBody/FloodL4WaterBodyThematic";
import BaseOragDataInfo from "@components/biz/common/BaseOragDataInfo";

/**
 * 홍수 4레벨
 */
const FloodL4 = () => {

    const dispatch = useDispatch()
    /**
     * floodResultTab : (수체 /  수위) 탭확인값
     * selectFloodLayer : 홍수 4LEVEL 선택 레이어 
     * selectWaterLevel: 홍수 수위 지점 선택
     */
    const { selectFloodLayer, selectWaterLevel } = useSelector(state => state.flood)

    //수위 지점 선택 초기화
    useEffect(()=>{
        return()=>{
            //초기화
            dispatch({type: FLOOD_SELECT_WATER_LEVEL, selectWaterLevel: false})
            G$removeWidget('FloodL4WaterLevelWidget')
        }
    },[])


    {/* 수위 선택시 pooup widget 생성 */}
    useEffect(()=>{

        if(selectWaterLevel){
            G$addWidget('FloodL4WaterLevelWidget')
        }else{
            G$removeWidget('FloodL4WaterLevelWidget')
        }

    },[selectWaterLevel])


    return (
        <>
            {/* 수체 선택시 */}
            {
                selectFloodLayer && selectFloodLayer.group === 'WaterBody' && 
                <>
                    <FloodL4WaterBodyThematic />
                    <BaseOragDataInfo a={true} b={true}/>
                </>
            }

            {/* 수위 선택시 */}
            {
                selectFloodLayer && selectFloodLayer.group === 'WaterLevel' && 
                <>
                    <BaseOragDataInfo a={true}/>
                </>
            }
        </>
    )
}

export default React.memo(FloodL4);
