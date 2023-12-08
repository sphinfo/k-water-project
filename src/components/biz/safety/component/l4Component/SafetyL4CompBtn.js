import React, {useEffect, useRef, useState} from "react";
import { Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FLOOD_DAMAGE_LAYER, SAFETY_CLICK_MODE, SAFETY_SELECT_4_LEVEL, SAFETY_SELECT_4_LEVEL_RESET, SAFETY_SELECT_DISPLACE_LEVEL } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { G$addWidget, G$removeWidget } from "@gis/util";

/**
 * 안전 - 비교 버튼
 */
const SafetyL4CompBtn = () => {

    const dispatch = useDispatch()
    const {compLayerClick, displaceLevel} = useSelector(state => state.safety)

    //종료될때 click모드 off  / widget 닫기
    useEffect(()=>{
        return()=>{
            dispatch({type: SAFETY_CLICK_MODE, compLayerClick: false})
            G$removeWidget('SafetyL4CompWidget')
        }
    },[])

    //click mode가 on 되면 비교 widget 띄우기
    useEffect(()=>{
        if(compLayerClick){
            G$addWidget('SafetyL4CompWidget')
        }else{
            G$removeWidget('SafetyL4CompWidget')
        }
    },[compLayerClick])

    return (
        <>
            <div style={{position: 'fixed', top: 50, left: 400, width: 200, height: 50, backgroundColor: 'white', display: compLayerClick ? 'none' : displaceLevel ? 'none' : ''}}>
                <button onClick={()=>{dispatch({type: SAFETY_CLICK_MODE, compLayerClick: true})}}>지점 비교분석</button>
            </div>
        </>
    )
}

export default React.memo(SafetyL4CompBtn);
