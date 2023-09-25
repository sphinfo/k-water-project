import React, { useEffect, useRef, useState } from "react";
import { G$addLayer, G$addWidget, G$removeLayerForId, G$removeWidget } from "@gis/util";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";

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

                <button onClick={()=>{changeParam('L3TD_A2_YONGDAM_ASC')}}>1</button>
                <button onClick={()=>{changeParam('L3TD_A2_YONGDAM_DSC')}}>2</button>
                <button onClick={()=>{changeParam('L4TD_YONGDAM_EW')}}>3</button>
                <button onClick={()=>{changeParam('L4TD_YONGDAM_UD')}}>4</button>
            </div>
            
        </>
    )
}

export default React.memo(Biz0);
