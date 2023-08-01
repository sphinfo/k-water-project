import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import MapManager from '@gis/MapManager'

import GisDrawTool from '@gis/util/draw/GisDrawTool';
//import LayerManager from '../../../openlayers/LayerManager';
import GisLayerClickTool from '@gis/util/GisLayerClickTool';

const layer = 'MEASURE_LAYER'

const MeasureMapWidget = () => {

    const [activeType, setActiveType] = useState('')

    const drawRef = useRef();
    useImperativeHandle(drawRef, ()=>({
        getGeometry(geometry) {
            console.info(geometry)
        },

        drawEnd() {
            setActiveType('')
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
        setActiveType(type)
    }

    const removeDraw = () =>{
        GisDrawTool.clearLayer(layer)
        setActiveType('')
    }

    
    return (
        <ul className="map-widget-vertical-block">
            <button className={`map-right-bt ${activeType === 'LineString' ? 'active' : ''}`} onClick={()=>{drawController('LineString')}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none">
                    <g clipPath="url(#clip0_505_23595)">
                        <path d="M1.55566 1.58331H18.4446" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M5.25011 4.83331H1.55566V12.4166H18.4446V4.83331H14.2223M5.25011 4.83331V7.54165M5.25011 4.83331H9.47233M9.47233 4.83331V8.08331M9.47233 4.83331H14.2223M14.2223 4.83331V7.54165" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_505_23595">
                            <rect width="19" height="13" fill="white" transform="translate(0.5 0.5)"/>
                        </clipPath>
                    </defs>
                </svg>
            </button>
            <button className={`map-right-bt ${activeType === 'Polygon' ? 'active' : ''}`} onClick={()=>{drawController('Polygon')}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <rect x="2.38892" y="2.23334" width="13.2222" height="9.53333" stroke="#3D3D3D" strokeWidth="1.5"/>
                    <rect x="0.5" y="0.5" width="3.77778" height="3.46667" rx="1" fill="#3D3D3D"/>
                    <rect x="0.5" y="10.0333" width="3.77778" height="3.46667" rx="1" fill="#3D3D3D"/>
                    <rect x="13.7222" y="10.0333" width="3.77778" height="3.46667" rx="1" fill="#3D3D3D"/>
                    <rect x="13.7222" y="0.5" width="3.77778" height="3.46667" rx="1" fill="#3D3D3D"/>
                </svg>
            </button>
            {/* <button onClick={()=>{drawController('Circle')}}>반지름</button> */}
            <button className="map-right-bt" onClick={()=>{removeDraw()}}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_570_5449)">
                        <path d="M8 15.5C5.90625 15.5 4.13281 14.7734 2.67969 13.3203C1.22656 11.8672 0.5 10.0938 0.5 8C0.5 5.90625 1.22656 4.13282 2.67969 2.67969C4.13281 1.22657 5.90625 0.500003 8 0.500003C9.07812 0.500003 10.1094 0.722503 11.0938 1.1675C12.0781 1.6125 12.9219 2.24938 13.625 3.07813V1.4375C13.625 1.17188 13.715 0.949066 13.895 0.769066C14.075 0.589066 14.2975 0.499378 14.5625 0.500003C14.8281 0.500003 15.0509 0.590003 15.2309 0.770003C15.4109 0.950003 15.5006 1.1725 15.5 1.4375V6.125C15.5 6.39063 15.41 6.61344 15.23 6.79344C15.05 6.97344 14.8275 7.06313 14.5625 7.0625H9.875C9.60938 7.0625 9.38656 6.9725 9.20656 6.7925C9.02656 6.6125 8.93688 6.39 8.9375 6.125C8.9375 5.85938 9.0275 5.63657 9.2075 5.45657C9.3875 5.27657 9.61 5.18688 9.875 5.1875H12.875C12.375 4.3125 11.6913 3.625 10.8238 3.125C9.95625 2.625 9.015 2.375 8 2.375C6.4375 2.375 5.10937 2.92188 4.01562 4.01563C2.92188 5.10938 2.375 6.4375 2.375 8C2.375 9.5625 2.92188 10.8906 4.01562 11.9844C5.10937 13.0781 6.4375 13.625 8 13.625C9.0625 13.625 10.0353 13.3553 10.9184 12.8159C11.8016 12.2766 12.485 11.5541 12.9687 10.6484C13.0937 10.4297 13.2697 10.2775 13.4966 10.1919C13.7234 10.1063 13.9538 10.1022 14.1875 10.1797C14.4375 10.2578 14.6172 10.4219 14.7266 10.6719C14.8359 10.9219 14.8281 11.1563 14.7031 11.375C14.0625 12.625 13.1484 13.625 11.9609 14.375C10.7734 15.125 9.45312 15.5 8 15.5Z" fill="#3D3D3D"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_570_5449">
                            <rect width="15" height="15" fill="white" transform="translate(0.5 0.5)"/>
                        </clipPath>
                    </defs>
                </svg>
            </button>
            {/* <button onClick={()=>{getFeature()}}>FeatureClick</button> */}
        </ul>
    )
}

export default MeasureMapWidget; 
