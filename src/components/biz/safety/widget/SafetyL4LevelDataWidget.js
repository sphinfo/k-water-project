import React, {useEffect, useRef, useState} from "react";
import { Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FLOOD_DAMAGE_LAYER, SAFETY_CLICK_MODE, SAFETY_SELECT_4_LEVEL, SAFETY_SELECT_4_LEVEL_RESET, SAFETY_SELECT_DISPLACE_LEVEL, SAFETY_SELETE_FEATURE } from "@redux/actions";
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

        if(selectFeature){
        }

        return()=>{
            dispatch({type:SAFETY_SELETE_FEATURE, selectFeature: false})    
        }
    },[])

    return (
        <div className="content-body">
            <div className="content-row">
                <div className="panel-box">
                    <div className="number-dashboard number-dashboard-min">
                        <div className="nd-item">
                            <h4 className="nd-item-title">선택지점 변위 등급</h4>
                            <div className="nd-item-body" style={{display: selectFeature && selectFeature.properties.GRAY_INDEX ? '' : 'none'}}>{selectFeature && selectFeature.properties.GRAY_INDEX}</div>
                        </div>
                        <div className="nd-item">
                            <h4 className="nd-item-title"></h4>
                            <div className="nd-item-body">{selectFeature && selectFeature.properties.GRAY_INDEX === 1 ? '안전' : selectFeature && selectFeature.properties.GRAY_INDEX === 2 ? '보통' : selectFeature && selectFeature.properties.GRAY_INDEX === 3 ? '위험' : '지도에서 지점을 선택하세요'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(SafetyL4LevelDataWidget);
