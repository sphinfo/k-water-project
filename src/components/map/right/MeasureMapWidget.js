import MapManager from '@gis/MapManager';
import GisDrawTool from '@gis/util/draw/GisDrawTool';
import React, { useEffect, useRef, useState } from 'react';

const MeasureMapWidget = () => {

    const [activeType, setActiveType] = useState('')

    const drawRef = useRef(null)

    useEffect(()=>{
        
        drawRef.current = new GisDrawTool(MapManager.map)
        
        return() => {
            
        }
    },[])

    const drawController = (type) =>{
        drawRef.current.activate(type)
        // 다시 클릭되었을시 draw event 삭제
        if(activeType === type){
            setActiveType('')
        }else{
            setActiveType(type)
        }
    }

    const removeDraw = () =>{
        drawRef.current.remove()
        setActiveType('')
    }

    
    
    return (
        <div className="map-widget-vertical-block">
            <button className={`mapRightBt ${activeType === 'LineString' ? 'active' : ''}`} onClick={()=>{drawController('line')}}>
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.55566 0.833313C1.14145 0.833313 0.805664 1.1691 0.805664 1.58331C0.805664 1.99753 1.14145 2.33331 1.55566 2.33331H18.4446C18.8588 2.33331 19.1946 1.99753 19.1946 1.58331C19.1946 1.1691 18.8588 0.833313 18.4446 0.833313H1.55566ZM1.55566 4.08331C1.14145 4.08331 0.805664 4.4191 0.805664 4.83331V12.4166C0.805664 12.8309 1.14145 13.1666 1.55566 13.1666H18.4446C18.8588 13.1666 19.1946 12.8309 19.1946 12.4166V4.83331C19.1946 4.4191 18.8588 4.08331 18.4446 4.08331H14.2223H9.47233H5.25011H1.55566ZM2.30566 11.6666V5.58331H4.50011V7.54165C4.50011 7.95586 4.8359 8.29165 5.25011 8.29165C5.66432 8.29165 6.00011 7.95586 6.00011 7.54165V5.58331H8.72233V8.08331C8.72233 8.49753 9.05812 8.83331 9.47233 8.83331C9.88654 8.83331 10.2223 8.49753 10.2223 8.08331V5.58331H13.4723V7.54165C13.4723 7.95586 13.8081 8.29165 14.2223 8.29165C14.6365 8.29165 14.9723 7.95586 14.9723 7.54165V5.58331H17.6946V11.6666H2.30566Z" fill="#3D3D3D"/>
                </svg>
            </button>
            <button className={`mapRightBt ${activeType === 'Polygon' ? 'active' : ''}`} onClick={()=>{drawController('polygon')}}>
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.5 1.5C0.5 0.947715 0.947715 0.5 1.5 0.5H3.27778C3.8245 0.5 4.26874 0.938736 4.27764 1.48333H13.7224C13.7313 0.938736 14.1755 0.5 14.7222 0.5H16.5C17.0523 0.5 17.5 0.947715 17.5 1.5V2.96667C17.5 3.51895 17.0523 3.96667 16.5 3.96667H16.3611V10.0333H16.5C17.0523 10.0333 17.5 10.481 17.5 11.0333V12.5C17.5 13.0523 17.0523 13.5 16.5 13.5H14.7222C14.1755 13.5 13.7313 13.0613 13.7224 12.5167H4.27764C4.26874 13.0613 3.8245 13.5 3.27778 13.5H1.5C0.947715 13.5 0.5 13.0523 0.5 12.5V11.0333C0.5 10.481 0.947715 10.0333 1.5 10.0333H1.63889V3.96667H1.5C0.947715 3.96667 0.5 3.51895 0.5 2.96667V1.5ZM13.7224 2.98333C13.7313 3.52793 14.1755 3.96667 14.7222 3.96667H14.8611V10.0333H14.7222C14.1755 10.0333 13.7313 10.4721 13.7224 11.0167H4.27764C4.26874 10.4721 3.8245 10.0333 3.27778 10.0333H3.13889V3.96667H3.27778C3.8245 3.96667 4.26874 3.52793 4.27764 2.98333H13.7224Z" fill="#3D3D3D"/>
                </svg>
            </button>
            {/* <button onClick={()=>{drawController('Circle')}}>반지름</button> */}
            <button className="mapRightBt" onClick={()=>{removeDraw()}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="none"><path stroke="#3D3D3D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 4.527V2m0 0h-2.774M15 2l-4 4M3 11.473V14m0 0h2.774M3 14l4-4M12.473 14H15m0 0v-2.774m0 2.773-4-4M5.527 2H3m0 0v2.774M3 2l4 4"/></svg>
            </button>
            {/* <button onClick={()=>{getFeature()}}>FeatureClick</button> */}
        </div>
    )
}

export default MeasureMapWidget; 
