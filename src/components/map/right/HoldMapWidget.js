import React, { useCallback, useEffect, useState } from 'react';
import MapManager from '../../../cesium/MapManager';
import { G$addWidget, G$flyToPoint, G$holdMap } from '@gis/util';

const HoldMapWidget = () => {
    
    const [hold, setHold] = useState(false)
    
    useEffect(()=>{
        G$holdMap(hold)
    },[hold])

    return (
        <button className={`mapRightBt ${hold ? 'active' : ''}`} data-tooltip="지도 고정" onClick={()=>{setHold(!hold)}}>
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.33333 8.5V1.7V1.7C8.79357 1.7 9.16667 1.31865 9.16667 0.858416V0.858416C9.16667 0.388974 8.78611 0 8.31667 0H1.68333C1.21389 0 0.833333 0.388974 0.833333 0.858416V0.858416C0.833333 1.31865 1.20643 1.7 1.66667 1.7V1.7V8.5L0.345121 9.84798C0.12391 10.0736 0 10.377 0 10.693V10.693C0 11.3596 0.540402 11.9 1.20702 11.9H4.33333V16.3333C4.33333 16.7015 4.63181 17 5 17V17C5.36819 17 5.66667 16.7015 5.66667 16.3333V11.9H8.79298C9.4596 11.9 10 11.3596 10 10.693V10.693C10 10.377 9.87609 10.0736 9.65488 9.84798L8.33333 8.5ZM2.33333 10.2L2.76148 9.76329C3.12802 9.38942 3.33333 8.88672 3.33333 8.36315V1.7H6.66667V8.36315C6.66667 8.88672 6.87198 9.38942 7.23852 9.76329L7.66667 10.2H2.33333Z"
              fill="white"/>
          </svg>
        </button>
    )
}

export default HoldMapWidget;
