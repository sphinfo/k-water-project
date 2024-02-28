import React, { useEffect, useRef, useState } from 'react';
import EventBus from '@common/eventBus/eventBus';
import MapEvents from '@common/eventBus/MapEvents';
import { G$GetPointToDetail, G$covertKm } from '@gis/util';
import MapManager from '@gis/MapManager';

const CoordiateWidget = () => {

    const [coord, setCoord] = useState([]);
    const [height, setHeight] = useState(0)

    useEffect(()=>{
        EventBus.addListener(MapEvents.mouseMove, event => {
            setCoord(G$GetPointToDetail(event.detail.longitude, event.detail.latitude))
        })

        EventBus.addListener(MapEvents.mapMoveEnd, event =>{
            var cameraHeight = MapManager.map.camera.positionCartographic.height
            setHeight(G$covertKm(cameraHeight.toFixed(0)))
        })

    },[])


    return (
        <>
            <ul className="map-coord-box" style={{width: 250}}>
                <div><span className="text-blue">LON</span>{coord.lonDms}</div>
                <div><span className="text-blue">LAT</span>{coord.latDms}</div>
            </ul>
            <ul className="map-coord-box" style={{width: 110}}>
                <div><span className="text-blue">ALT</span>{height}</div>
            </ul>
        </>
    )
}

export default CoordiateWidget;
