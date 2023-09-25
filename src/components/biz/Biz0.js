import React, { useEffect, useRef, useState } from "react";
import { G$addLayer, G$addWidget, G$removeLayerForId, G$removeWidget } from "@gis/util";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import Switch from "@mui/material/Switch";

const Biz0 = () => {

    const [safetyTab, setSafetyTab] = useState('rating')

    const bizLayer1 = useRef()

    useEffect(()=>{

        bizLayer1.current = new BaseWmsImageLayer('Safety','L3TD_A2_YONGDAM_ASC')
        G$addLayer(bizLayer1.current.layer)

        G$addWidget('LegendWidget', { params: {title:'토양 수분량(%)'} })

        return()=>{
            G$removeLayerForId(bizLayer1.current.layer.id)
            G$removeWidget('LegendWidget')
        }

    },[])

    const safetyTabChange = (event, value) => {
        setSafetyTab(value)
    }


    const changeParam = (value) =>{
        if(bizLayer1.current){
            bizLayer1.current.changeParameters({layerId:value})
        }
    }

    return (
        <>
            <div className="tab-float-box">
                <ToggleButtonGroup className="tab-float-box-button-wrap list-main" value={safetyTab} exclusive onChange={safetyTabChange}>
                    <ToggleButton className="tab-float-box-btn list-item" value={"rating"}>변위 등급</ToggleButton>
                    <ToggleButton className="tab-float-box-btn list-item" value={"ingre"}>변위 성분</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="tab-float-box top-left-list">
                <div className="tab-float-box-list-wrap">
                    <h2 className="tab-float-box-list-head">위성방향</h2>
                    <ToggleButtonGroup className="tab-float-box-button-wrap list-main">
                        <ToggleButton className="tab-float-box-btn list-item" onClick={()=>{changeParam('L3TD_A2_YONGDAM_ASC')}}>North-South</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" onClick={()=>{changeParam('L3TD_A2_YONGDAM_DSC')}}>North-South</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" onClick={()=>{changeParam('L4TD_YONGDAM_EW')}}>East-West</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" onClick={()=>{changeParam('L4TD_YONGDAM_UD')}}>Up-Down</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
            <div className="tab-float-box bottom-left">
                <div className="tab-float-box-button-wrap">
                    <button className="tab-float-box-btn btn-round">
                        안전등급
                        <Switch className="float-box-switch" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default React.memo(Biz0);
