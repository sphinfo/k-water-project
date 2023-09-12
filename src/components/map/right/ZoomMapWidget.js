import React, { useCallback, useState } from 'react';
import MapManager from '../../../cesium/MapManager';

const ZoomMapWidget = () => {
    
    const zoomIn = useCallback(() => {
        MapManager.zoomIn()
    }, []);

    const zoomOut = useCallback(() => {
        MapManager.zoomOut()
    }, []);
    
    return (
        <ul className="map-widget-vertical-block">
            <button className="map-right-bt" onClick={zoomIn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8V1.5M8 8V14.5M8 8H14.5M8 8H1.5" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button className="map-right-bt" onClick={zoomOut}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="2" viewBox="0 0 16 2" fill="none">
                    <path d="M1.5 1H14.5" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </ul>
    )
}

export default ZoomMapWidget;
