import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import { G$addLayer, G$addWidget, G$flyToExtent, G$removeLayer, G$removeLayerForId, G$removeWidget } from "@gis/util";
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";

const Biz2 = () => {

    const waterBodyLayer = useRef()
    const waterWfsLayer = useRef()
    const landuseLayer = useRef()
    const selectRef = useRef();
    useImperativeHandle(selectRef, ()=>({
        getFeatures(features){
            if(features.length > 0){
                features.map((featureObj)=>{
                    if(featureObj.id.indexOf('waterPoint') > -1){
                        G$addWidget('TestChartWidget')
                    }
                })
            }
            
        }
    }));

    useEffect(()=>{

        waterBodyLayer.current = new BaseWmsImageLayer('WaterBody', '20230723T21water_JL_RGB000102')
        landuseLayer.current = new BaseWmsImageLayer('WaterBody', '20230723T21water_JL_landuse_RGB000102')
        waterWfsLayer.current = new BaseEntityCollection({name:'waterPoint'})
        G$addLayer(waterWfsLayer.current)
        
        GisLayerClickTool.addBiz('biz2', selectRef, [waterBodyLayer.current.layer.id, 'waterPoint'])
        GisLayerClickTool.enable('biz2')
        

        return()=>{
            G$removeWidget('TestChartWidget')
            G$removeLayer(waterBodyLayer.current.layer)
            G$removeLayer(landuseLayer.current.layer)
            G$removeLayer(waterWfsLayer.current)
            GisLayerClickTool.destroyBiz('biz2')
        }

    },[])

    const [selected, setselected] = React.useState('waterBody');
    const handleSelcted = (event, newSelected) => {
        setselected(newSelected);
    };

    useEffect(()=>{
        waterWfsLayer.current.entities.removeAll()
        waterBodyLayer.current.setVisible(false)
        landuseLayer.current.setVisible(false)

        if(selected === 'waterLevel'){
            waterWfsLayer.current._addFeature(127.28631,35.313264, {a:'a'})
            waterWfsLayer.current._addFeature(127.25120,35.317408, {b:'b'})
            waterWfsLayer.current._addFeature(127.30769,35.345615, {c:'c'})
            waterWfsLayer.current._addFeature(127.31778,35.366161, {a:'a3'})
            waterWfsLayer.current._addFeature(127.34136,35.378983, {a:'a1'})
            waterWfsLayer.current._addFeature(127.21834,35.399125, {a:'a2'})
            waterWfsLayer.current._addFeature(127.19292,35.387827, {a:'a5'})
            waterWfsLayer.current._addFeature(127.19605,35.375238, {a:'a6'})
            waterWfsLayer.current._addFeature(127.16970,35.312817, {a:'a4'})
            G$flyToExtent([126.93882919415756, 34.865073600401786, 127.58990862818611, 35.14108393416024], -60)
        }else if(selected === 'landuse'){
            landuseLayer.current.setVisible(true)
        }else if(selected === 'waterBody'){
            waterBodyLayer.current.setVisible(true)
        }

    },[selected])

    return (
        <div className="tab-float-box">
            <ToggleButtonGroup className="tab-float-box-button-wrap" value={selected} exclusive onChange={handleSelcted}>
                <ToggleButton className="tab-float-box-btn" value={"waterBody"}>수체 탐지</ToggleButton>
                <ToggleButton className="tab-float-box-btn" value={"waterLevel"}>지점 수위</ToggleButton>
                <ToggleButton className="tab-float-box-btn" value={"landuse"}>침수 지도</ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}

export default React.memo(Biz2);
