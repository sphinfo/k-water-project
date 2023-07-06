import React, { useEffect, useImperativeHandle, useRef } from 'react';
import MapManager from '@gis/MapManager'

import GisDrawTool from '@gis/util/draw/GisDrawTool';
//import LayerManager from '../../../openlayers/LayerManager';
import GisLayerClickTool from '@gis/util/GisLayerClickTool';

const layer = 'MEASURE_LAYER'

const MeasureMapWidget = () => {

    const drawRef = useRef();
    useImperativeHandle(drawRef, ()=>({
        getGeometry(geometry){
            console.info(geometry)
        }
    }));

    const selectRef = useRef();
    useImperativeHandle(selectRef, ()=>({
        getFeatures(f){
            console.info(f)
        }
    }));

    useEffect(()=>{
        GisDrawTool.addBiz(layer, drawRef, true, true)
        GisLayerClickTool.addBiz('TEST', selectRef, ['TL_SCCO_SIG', 'TL_SCCO_EMD'])
        GisLayerClickTool.setMap(MapManager.map)

        return() => {
            GisDrawTool.destroyBiz(layer);
        }

    },[MapManager.map])

    const getFeature = ()=>{

        GisLayerClickTool.enable('TEST')

    }

    const drawController = (type) =>{
        GisDrawTool.activate(layer, type)
    }

    const removeDraw = () =>{
        GisDrawTool.clearLayer(layer)
    }

    
    return (
        <ul style={{ display: 'flex', position: 'relative', left: 0 }}>
            <button onClick={()=>{drawController('LineString')}}>거리</button>
            <button onClick={()=>{drawController('Polygon')}}>면적</button>
            {/* <button onClick={()=>{drawController('Circle')}}>반지름</button> */}
            <button onClick={()=>{removeDraw()}}>초기화</button>
            {/* <button onClick={()=>{getFeature()}}>FeatureClick</button> */}
        </ul>
    )
}

export default MeasureMapWidget; 
