import React, {useEffect, useRef, useState} from "react";
import { Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FLOOD_DAMAGE_LAYER, SAFETY_SELECT_4_LEVEL, SAFETY_SELECT_4_LEVEL_RESET, SAFETY_SELECT_DISPLACE_LEVEL } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import img from "@images/Safety-20231114_L4TD_YONGDAM_UD.jpg"
import BaseChart from "@common/chart/BaseChart";
import "chartjs-plugin-annotation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { G$addWidget, G$getDateType, G$removeWidget, G$setNumberFixedKomma } from "@gis/util";
import FloodWaterLevelChartDatas from "@gis/config/flood/FloodWaterLevelChartDatas";

const sample = {store:'WaterBody', layer: '20230718T21water_GS_RGB000102'}

const FloodL4WaterBodyThematic = () => {

    const dispatch = useDispatch()

    /**
     * selectWaterLevel: 수위 지점 정보
     */
    const { selectFloodDamageLayer } = useSelector(state => state.flood)


    //닫힐때 침수피해 레이어 초기화
    useEffect(()=>{

        //*******API*************/
        
        return()=>{
            dispatch({type:FLOOD_DAMAGE_LAYER, selectFloodDamageLayer: false})
            G$removeWidget('FloodL4WaterBodyWidget')
        }
    },[])

  
    useEffect(()=>{

        if(selectFloodDamageLayer){
            G$addWidget('FloodL4WaterBodyWidget')
        }else{
            G$removeWidget('FloodL4WaterBodyWidget')
        }

    },[selectFloodDamageLayer])

    return (
        <>
            <div className="widget widget-toggle">
                <div className="widget-box">
                    <div className="widget-header">
                        <h4 className="widget-title">활용 주제도</h4>
                    </div>
                    <div className="widget-body">
                        <div className="switch-list">
                            <div className="switch-list-item">
                                <span className="switch-label">침수 피해</span>
                                <Switch className="float-box-switch" checked={selectFloodDamageLayer ? true : false} onClick={()=>{
                                    dispatch({type:FLOOD_DAMAGE_LAYER, selectFloodDamageLayer: !selectFloodDamageLayer ? sample : false})
                                }}></Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(FloodL4WaterBodyThematic);
