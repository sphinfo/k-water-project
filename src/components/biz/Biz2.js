import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import BaseWmsLayer from "@gis/layers/BaseWmsLayer";
import { G$addLayer, G$addWidget, G$flyToExtent, G$removeLayer, G$removeWidget } from "@gis/util";
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Biz2 = () => {

    const bizLayer = useRef()
    const waterFeatureLayer = useRef()
    const selectRef = useRef();
    useImperativeHandle(selectRef, ()=>({
        getFeatures(f){
            G$addWidget('TestChartWidget')
        }
    }));

    useEffect(()=>{

        bizLayer.current = new BaseWmsLayer('WaterBody', '수체_샘플데이터')
        G$addLayer(bizLayer.current)

        GisLayerClickTool.addBiz('biz2', selectRef, ['waterPoint'])
        GisLayerClickTool.enable('biz2')
       
        

        return()=>{
            G$removeWidget('TestChartWidget')
            G$removeLayer('WaterBody:수체_샘플데이터')
            if(waterFeatureLayer.current){
                G$removeLayer(waterFeatureLayer.current.id)
            }
            GisLayerClickTool.destroyBiz('biz2')
        }

    },[])
    const [selected, setselected] = React.useState('waterBody');
    const handleSelcted = (event, newSelected) => {
        setselected(newSelected);
    };

    useEffect(()=>{
        if(selected === 'waterLevel'){
            waterFeatureLayer.current = new BaseEntityCollection({name:'waterPoint'})
            waterFeatureLayer.current._addFeature(127.28631,35.313264)
            waterFeatureLayer.current._addFeature(127.25120,35.317408)
            waterFeatureLayer.current._addFeature(127.30769,35.345615)
            waterFeatureLayer.current._addFeature(127.31778,35.366161)
            waterFeatureLayer.current._addFeature(127.34136,35.378983)
            waterFeatureLayer.current._addFeature(127.21834,35.399125)
            waterFeatureLayer.current._addFeature(127.19292,35.387827)
            waterFeatureLayer.current._addFeature(127.19605,35.375238)
            waterFeatureLayer.current._addFeature(127.16970,35.312817)
            G$addLayer(waterFeatureLayer.current)
            G$flyToExtent([127.02595, 35.25252, 127.46909, 35.44838])
        }else{
            if(waterFeatureLayer.current){
                G$removeLayer(waterFeatureLayer.current.id)
            }
            
        }

    },[selected])

    return (
        <div className="tab-float-box">
            <ToggleButtonGroup className="tab-float-box-button-wrap" value={selected} exclusive onChange={handleSelcted}>
                <ToggleButton className="tab-float-box-btn" value={"waterBody"}>수체 탐지</ToggleButton>
                <ToggleButton className="tab-float-box-btn" value={"waterLevel"}>수위 탐지</ToggleButton>

            </ToggleButtonGroup>
        </div>
    )
}

export default React.memo(Biz2);
