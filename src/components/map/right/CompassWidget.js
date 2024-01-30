import MapEvents from '@common/eventBus/MapEvents';
import EventBus from '@common/eventBus/eventBus';
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect, useState } from 'react';

const CompassWidget = () => {
    
    const [heading, setHeading] = useState(0)

    useEffect(()=>{
        EventBus.addListener(MapEvents.headingChange, event => {
            setHeading(Math.abs(event.detail.heading-360))
        })
    },[])

    return (
        <>
          <Tooltip placement="left"
                   TransitionProps={{ timeout: 200 }}
                   arrow
                   title={
                    <React.Fragment>
                        <div className="tooltip-info-map">
                            <h6>나침반/방위</h6>
                            <p>Ctrl + 지도 드래그</p>
                        </div>
                    </React.Fragment>
                  }>
            <div className="map-compass" style={{transform: `rotate(${heading}deg)`}}>
              <div className="map-compass-pin"></div>
            </div>
          </Tooltip>
        </>
    )
}

export default CompassWidget;
