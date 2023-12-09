import React, { useEffect, useRef, useState } from 'react';
import EventBus from '@common/eventBus/eventBus';
import MapEvents from '@common/eventBus/MapEvents';
import { G$GetPointToDetail } from '@gis/util';

const CoordiateWidget = () => {
    
    const [coord, setCoord] = useState([]);
    const [height, setHeight] = useState(0)

    useEffect(()=>{
        EventBus.addListener(MapEvents.mouseMove, event => {
            console.info(event.detail)
            setCoord(G$GetPointToDetail(event.detail.longitude, event.detail.latitude))
            setHeight(event.detail.z)
        })
    },[])
    

    return (
        <ul className="map-coord-box">
            {/* <div><span className="text-blue">X :</span>{coord.x && coord.x.toFixed(3)}</div>
            <div><span className="text-blue">Y :</span>{coord.y && coord.y.toFixed(3) }</div> */}
            <div><span className="text-blue">lon Dms :</span>{coord.lonDms}</div>
            <div><span className="text-blue">lat Dms :</span>{coord.latDms}</div>
            <div><span className="text-blue">Heihgt :</span>{height}</div>
        </ul>
    )
}

export default CoordiateWidget;
