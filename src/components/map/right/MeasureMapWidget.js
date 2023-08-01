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
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.55566 0.833313C1.14145 0.833313 0.805664 1.1691 0.805664 1.58331C0.805664 1.99753 1.14145 2.33331 1.55566 2.33331H18.4446C18.8588 2.33331 19.1946 1.99753 19.1946 1.58331C19.1946 1.1691 18.8588 0.833313 18.4446 0.833313H1.55566ZM1.55566 4.08331C1.14145 4.08331 0.805664 4.4191 0.805664 4.83331V12.4166C0.805664 12.8309 1.14145 13.1666 1.55566 13.1666H18.4446C18.8588 13.1666 19.1946 12.8309 19.1946 12.4166V4.83331C19.1946 4.4191 18.8588 4.08331 18.4446 4.08331H14.2223H9.47233H5.25011H1.55566ZM2.30566 11.6666V5.58331H4.50011V7.54165C4.50011 7.95586 4.8359 8.29165 5.25011 8.29165C5.66432 8.29165 6.00011 7.95586 6.00011 7.54165V5.58331H8.72233V8.08331C8.72233 8.49753 9.05812 8.83331 9.47233 8.83331C9.88654 8.83331 10.2223 8.49753 10.2223 8.08331V5.58331H13.4723V7.54165C13.4723 7.95586 13.8081 8.29165 14.2223 8.29165C14.6365 8.29165 14.9723 7.95586 14.9723 7.54165V5.58331H17.6946V11.6666H2.30566Z" fill="#3D3D3D"/>
                </svg>
            </button>
            <button className={`map-right-bt ${activeType === 'Polygon' ? 'active' : ''}`} onClick={()=>{drawController('Polygon')}}>
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 1.5C0.5 0.947715 0.947715 0.5 1.5 0.5H3.27778C3.8245 0.5 4.26874 0.938736 4.27764 1.48333H13.7224C13.7313 0.938736 14.1755 0.5 14.7222 0.5H16.5C17.0523 0.5 17.5 0.947715 17.5 1.5V2.96667C17.5 3.51895 17.0523 3.96667 16.5 3.96667H16.3611V10.0333H16.5C17.0523 10.0333 17.5 10.481 17.5 11.0333V12.5C17.5 13.0523 17.0523 13.5 16.5 13.5H14.7222C14.1755 13.5 13.7313 13.0613 13.7224 12.5167H4.27764C4.26874 13.0613 3.8245 13.5 3.27778 13.5H1.5C0.947715 13.5 0.5 13.0523 0.5 12.5V11.0333C0.5 10.481 0.947715 10.0333 1.5 10.0333H1.63889V3.96667H1.5C0.947715 3.96667 0.5 3.51895 0.5 2.96667V1.5ZM13.7224 2.98333C13.7313 3.52793 14.1755 3.96667 14.7222 3.96667H14.8611V10.0333H14.7222C14.1755 10.0333 13.7313 10.4721 13.7224 11.0167H4.27764C4.26874 10.4721 3.8245 10.0333 3.27778 10.0333H3.13889V3.96667H3.27778C3.8245 3.96667 4.26874 3.52793 4.27764 2.98333H13.7224Z" fill="#3D3D3D"/>
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
