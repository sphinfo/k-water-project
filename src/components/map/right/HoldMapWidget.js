import React, { useCallback, useEffect, useState } from 'react';
import MapManager from '../../../cesium/MapManager';
import { G$addWidget, G$flyToPoint, G$holdMap } from '@gis/util';

const HoldMapWidget = () => {
    
    const [hold, setHold] = useState(false)
    
    useEffect(()=>{
        G$holdMap(hold)
    },[hold])

    return (
        <ul className="map-widget-vertical-block map-basic-style">
          <button className="mapRightBt" onClick={()=>{setHold(!hold)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="none"><path stroke="rgba(255,255,255,0.8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 4.527V2m0 0h-2.774M15 2l-4 4M3 11.473V14m0 0h2.774M3 14l4-4M12.473 14H15m0 0v-2.774m0 2.773-4-4M5.527 2H3m0 0v2.774M3 2l4 4"/></svg>
          </button>
        </ul>
    )
}

export default HoldMapWidget;
