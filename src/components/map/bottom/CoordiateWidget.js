import React, { useEffect, useRef, useState } from 'react';
import MapManager from '../../../openlayers/MapManager';
import EventBus from '../../../common/eventbus/EventBus';
import MapEvents from '../../../common/eventbus/MapEvents';
import { G$GetPointToDetail, G$Transfrom } from '../../../openlayers/util';

const CoordiateWidget = () => {
    
    const [coord, setCoord] = useState([]);

    useEffect(()=>{
        EventBus.addListener(MapEvents.mouseMove, event => {
            setCoord(G$GetPointToDetail(event.detail.coordinate[0], event.detail.coordinate[1]))
        })
    },[MapManager.map])
    

    return (
        <ul className="map-coord-box">
            <div><span className="text-blue">X :</span>{coord.x}</div>
            <div><span className="text-blue">Y :</span>{coord.y}</div>
            <div><span className="text-blue">longitude :</span>{coord.lonDms}</div>
            <div><span className="text-blue">latitude :</span>{coord.latDms}</div>
        </ul>
    )
}

export default CoordiateWidget;
