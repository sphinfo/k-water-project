import React, { useCallback, useState } from 'react';
import MapManager from '../../../openlayers/MapManager';

const ZoomMapWidget = () => {

    const [zoom, setZoom] = useState()

    const zoomIn = useCallback(() => {
        const plus = MapManager.getZoom() + 1;
        if (plus < 14) {
            setZoom(plus);
            MapManager.setZoom(plus);
        }

    }, []);

    const zoomOut = useCallback(() => {
        const minus = MapManager.getZoom() - 1;
        if (minus > -1) {
            setZoom(minus);
            MapManager.setZoom(minus);
        }
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
