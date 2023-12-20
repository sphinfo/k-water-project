import React, {useEffect, useRef, useState} from "react";
import { Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ENV_LANDCOVER_DETECTION, FLOOD_DAMAGE_LAYER, SAFETY_SELECT_4_LEVEL, SAFETY_SELECT_4_LEVEL_RESET, SAFETY_SELECT_DISPLACE_LEVEL } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
/**
 * 안전 - 4LEVEL 활용주제도
 */


const example = [{
    name: '변화탐지',
    store:'environment', 
    layerId:'20231212113940_environment_L4LC_Q8eh_DAEJEON-DAECHEONG-YONGDAM-SEJONG-ANDONG-SAYEON-UNMUN-MIHO-CHANGNYEONG-SOYANG',
    checked: false
}]

const EnvironmentThematic = () => {

    const dispatch = useDispatch()
    const [thematicList, setThematicList] = useState([])
    useEffect(()=>{

        //주제도 등록
        setThematicList(example)
        
        return()=>{
    
        }
        
    },[])


    //L4 선택
    const handleSwitchChange = (index) => {
        
        let select4Level = false
        const newList = thematicList.map((item, i) => {
            if (index === i) {
                if(!item.checked){
                  select4Level = item
                }
                return { ...item, checked: !item.checked };
            }
            return { ...item, checked: false };
        })
        select4Level ? dispatch({type:ENV_LANDCOVER_DETECTION, landCoverDetection: select4Level}) : dispatch({type:ENV_LANDCOVER_DETECTION, landCoverDetection: false})
        setThematicList(newList);
    }



    //4레벨 Switch 버튼 render
    const renderResult = (item, i) =>{
        return (
            <div className="switch-list-item" key={`item-${i}`}>
                <span className="switch-label" key={`label-${i}`}>{item.name}</span>
                <Switch
                    checked={item.checked}
                    onClick={(e) => handleSwitchChange(i)}
                    name={item.name}
                />
            </div>
        )


    }


    return (
        <div className="widget widget-toggle">
            <div className="widget-box">
                <div className="widget-header">
                    <h4 className="widget-title">활용 주제도</h4>
                </div>
                <div className="widget-body">
                    <div className="switch-list">
                        {thematicList.length > 0 && thematicList.map((obj, i) => renderResult(obj, i))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(EnvironmentThematic);
