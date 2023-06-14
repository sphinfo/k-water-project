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
        <ul style={{ display: 'flex', position: 'relative', left: 0 }}>
            <button onClick={zoomIn}>+</button>
            <button onClick={zoomOut}>-</button>
        </ul>
    )
}

export default ZoomMapWidget;
