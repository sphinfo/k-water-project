import MapEvents from '@common/eventBus/MapEvents';
import EventBus from '@common/eventBus/eventBus';
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
            <div className="map-compass" style={{transform: `rotate(${heading}deg)`}}>
                <div className="map-compass-pin"></div>
            </div>
        </>
    )
}

export default CompassWidget;
