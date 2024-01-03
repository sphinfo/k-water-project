import React, { useCallback } from 'react';
import MapManager from '../../../cesium/MapManager';
import { G$addWidget, G$flyToPoint } from '@gis/util';

const ZoomMapWidget = () => {
    
    const zoomIn = useCallback(() => {
        MapManager.zoomIn()
    }, []);

    const zoomOut = useCallback(() => {
        MapManager.zoomOut()
    }, []);
    
    const home = () =>{
        G$flyToPoint([127.61790470489117,36.52505158669595], 850000)
    }


    return (
        <ul className="map-widget-vertical-block map-basic-style">
          <button className="mapRightBt" onClick={home}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="none"><path stroke="rgba(255,255,255,0.8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 4.527V2m0 0h-2.774M15 2l-4 4M3 11.473V14m0 0h2.774M3 14l4-4M12.473 14H15m0 0v-2.774m0 2.773-4-4M5.527 2H3m0 0v2.774M3 2l4 4"/></svg>
          </button>
            <button className="mapRightBt" onClick={zoomIn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8V1.5M8 8V14.5M8 8H14.5M8 8H1.5" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button className="mapRightBt" onClick={zoomOut}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="2" viewBox="0 0 16 2" fill="none">
                    <path d="M1.5 1H14.5" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            {/* <button style={{backgroundColor:"white"}} onClick={()=>{AddrSearchWidget('FloodL4WaterBodyWidget')}}>홍수-수체</button>
            <button style={{backgroundColor:"white"}} onClick={()=>{AddrSearchWidget('FloodL4WaterLevelWidget')}}>홍수-수위</button>
            <button style={{backgroundColor:"white"}} onClick={()=>{AddrSearchWidget('DroughtObsrvWidget')}}>가뭄</button>
            <button style={{backgroundColor:"white"}} onClick={()=>{AddrSearchWidget('SafetyL4CompWidget')}}>안전 속도비교</button>
            <button style={{backgroundColor:"white"}} onClick={()=>{AddrSearchWidget('SafetyL4LevelDataWidget')}}>안전 변위</button> */}
            
            

            
        </ul>
    )
}

export default ZoomMapWidget;
