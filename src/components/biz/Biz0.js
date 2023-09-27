import React, { useEffect, useRef, useState } from "react";
import { G$addLayer, G$addWidget, G$removeLayerForId, G$removeWidget } from "@gis/util";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import Switch from "@mui/material/Switch";

const Biz0 = () => {

    const [safetyTab, setSafetyTab] = useState('ingre')
    const [paramTab, setParamTab] = useState('L3TD_A2_YONGDAM_ASC')


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


    const changeParam = (event, value) =>{
        if(bizLayer1.current){
            bizLayer1.current.changeParameters({layerId:value})
        }
        setParamTab(value);
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
                    <ToggleButtonGroup className="tab-float-box-button-wrap list-main" exclusive value={paramTab} onChange={changeParam}>
                        <ToggleButton className="tab-float-box-btn list-item" value={"L3TD_A2_YONGDAM_ASC"}>North-South</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" value={"L3TD_A2_YONGDAM_DSC"}>North-South</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" value={"L4TD_YONGDAM_EW"}>East-West</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" value={"L4TD_YONGDAM_UD"}>Up-Down</ToggleButton>
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
            <div className="widget-legend safety">
                <dl className="widget-legend-wrap">
                    <dt>
                        <h4>변위 성분</h4>
                    </dt>
                    <dd>
                        <div className="widget-legend-chip e-w-velocity"></div>
                        <ul className="widget-legend-unit">
                                <li>0.6</li>
                                <li>0.4</li>
                                <li>0.2</li>
                                <li>0</li>
                                <li>-0.2</li>
                                <li>-0.4</li>
                                <li>-0.6</li>
                        </ul>
                    </dd>
                </dl>
            </div>
        </>
    )
}

export default React.memo(Biz0);
