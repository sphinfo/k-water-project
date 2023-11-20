import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import { G$addLayer, G$addWidget, G$cartesianToLongLat, G$flyToExtent, G$flyToPoint, G$removeLayer, G$removeLayerForId, G$removeWidget } from "@gis/util";
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";

const Flood = () => {

    const waterBodyLayer = useRef()
    const waterWfsLayer = useRef()
    const landuseLayer = useRef()
    const selectRef = useRef();
    useImperativeHandle(selectRef, ()=>({
        getFeatures(features){
            if(features.length > 0){
                features.map((featureObj)=>{
                    if(featureObj.id.indexOf('waterPoint') > -1){
                        G$addWidget('TestChartWidget', {x:featureObj.clickPosition.x-340, y:featureObj.clickPosition.y-50})
                    }
                })
            }
            
        }
    }));

    useEffect(()=>{

        waterBodyLayer.current = new BaseWmsImageLayer('WaterBody', '20230723T21water_JL_RGB000102', null, false)
        waterBodyLayer.current.setOpacity(0.5)
        landuseLayer.current = new BaseWmsImageLayer('WaterBody', '20230723T21water_JL_landuse_RGB000102', null, false)
        landuseLayer.current.setOpacity(0.5)
        waterWfsLayer.current = new BaseEntityCollection({name:'waterPoint'})
        G$addLayer(waterWfsLayer.current)
        
        GisLayerClickTool.addBiz('biz2', selectRef, [waterBodyLayer.current.layer.id, 'waterPoint'])
        GisLayerClickTool.enable('biz2')
        

        return()=>{
            G$removeWidget('TestChartWidget')
            G$removeWidget('BaseLegendWidget')
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

        //범례닫기
        G$removeWidget('BaseLegendWidget')

        console.info(G$cartesianToLongLat({x: -3315459.674748404, y: 4414704.731029669, z: 3874381.406170914}))

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
            G$flyToPoint([127.26936353524, 35.09237629035124], 46000, -60)
        }else if(selected === 'landuse'){
            landuseLayer.current.setVisible(true)
            G$flyToPoint([126.9066856176106, 35.23029710708011], 356000)
            G$addWidget('BaseLegendWidget', { params: {title:'피해분석', datas: [{label:'Building', color:'#FF33FF'},{label:'Barren', color:'#FFCC00'},{label:'Forest', color:'#009900'},{label:'Water', color:'#0000FF'},{label:'grass', color:'#33FF99'}]} })
        }else if(selected === 'waterBody'){
            waterBodyLayer.current.setVisible(true)
            G$flyToPoint([126.9066856176106, 35.23029710708011], 356000)

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

export default React.memo(Flood);
