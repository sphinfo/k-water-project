import React, {useEffect, useRef, useState} from "react";
import { Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ENV_LANDCOVER_DETECTION, FLOOD_DAMAGE_LAYER, SAFETY_SELECT_4_LEVEL, SAFETY_SELECT_4_LEVEL_RESET, SAFETY_SELECT_DISPLACE_LEVEL } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { G$removeWidget } from "@gis/util";
import { getL4Layers } from "@common/axios/common";
/**
 * 안전 - 4LEVEL 활용주제도
 */
const EnvironmentThematic = (props) => {

    const dispatch = useDispatch()
    const [thematicList, setThematicList] = useState([])
    const {mainLayer} = props
    
    useEffect(()=>{

        
        const {id} = mainLayer

        let thematics = []
        if(id){
            getL4Layers({id:id}).then((response)=>{
                if(response?.result?.data?.length > 0){
                    let store = response.result.data[0].dataType
                    let layer = response.result.data[0].name
                    thematics.push({...response.result.data[0], store, layer, checked: false})
                }
                //주제도 등록
                setThematicList(thematics)
            })
            
            
        }

        return()=>{
            G$removeWidget('EnvironmentLandCoverWidget')
            dispatch({type:ENV_LANDCOVER_DETECTION, landCoverDetection: false})
        }
        
    },[mainLayer])


    //L4 선택
    const handleSwitchChange = (item, index) => {
        
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
                <span className="switch-label" key={`label-${i}`}>{"변화 탐지"}</span>
                <Switch
                    checked={item.checked}
                    onClick={(e) => handleSwitchChange(item, i)}
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
                {
                    thematicList.length > 0 && 
                    <div className="widget-body">
                        <div className="switch-list">
                            {thematicList.length > 0 && thematicList.map((obj, i) => renderResult(obj, i))}
                        </div>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default React.memo(EnvironmentThematic);
