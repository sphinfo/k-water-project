import React, { useEffect, useRef, useState } from 'react';
import EventBus from '@common/eventBus/EventBus';
import MapEvents from '@common/eventBus/MapEvents';
import { G$GetPointToDetail } from '@gis/util';

const CoordiateWidget = () => {
    
    const [coord, setCoord] = useState([]);

    useEffect(()=>{
        EventBus.addListener(MapEvents.mouseMove, event => {
            setCoord(G$GetPointToDetail(event.detail.longitude, event.detail.latitude))
        })
    },[])
    

    return (
        <ul className="map-coord-box">
            <div><span className="text-blue">X :</span>{coord.x && coord.x.toFixed(3)}</div>
            <div><span className="text-blue">Y :</span>{coord.y && coord.y.toFixed(3) }</div>
            <div><span className="text-blue">lon Dms :</span>{coord.lonDms}</div>
            <div><span className="text-blue">lat Dms :</span>{coord.latDms}</div>
        </ul>
    )
}

export default CoordiateWidget;
