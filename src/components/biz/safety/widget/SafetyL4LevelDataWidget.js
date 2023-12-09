import React, {useEffect, useRef, useState} from "react";
import { Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FLOOD_DAMAGE_LAYER, SAFETY_CLICK_MODE, SAFETY_SELECT_4_LEVEL, SAFETY_SELECT_4_LEVEL_RESET, SAFETY_SELECT_DISPLACE_LEVEL } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { G$addWidget, G$removeWidget } from "@gis/util";

/**
 * 안전 - 변위 등급 - 
 */
const SafetyL4LevelDataWidget = () => {

    const dispatch = useDispatch()
    const {selectFeature} = useSelector(state => state.safety)


    //click mode가 on 되면 비교 widget 띄우기
    useEffect(()=>{
        console.info(selectFeature)
    },[selectFeature])

    return (
        <>
            <div>
                <h4>선택지점 변위 등급</h4>
                 {selectFeature && selectFeature.properties.GRAY_INDEX}
                 {`안전`}
            </div>
        </>
    )
}

export default React.memo(SafetyL4LevelDataWidget);
