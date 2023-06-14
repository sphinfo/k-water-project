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
        <ul style={{  position: 'relative', left: 0 }}>
            <div>x:{coord.x}</div>
            <div>y:{coord.y}</div>
            <div>longitude:{coord.lonDms}</div>
            <div>latitude:{coord.latDms}</div>
        </ul>
    )
}

export default CoordiateWidget;
