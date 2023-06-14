import React, { useCallback, useState } from 'react';
import MapEvents from '../../../common/eventbus/MapEvents';
import EventBus from '../../../common/eventbus/EventBus';

const BaseMapWidget = () => {

    const [view, setView] = useState('Base');

    //지도 변경 처리
    const handleChange = useCallback((event) => {

        let nextView = event.currentTarget.name
        if(view !== nextView){

            EventBus.dispatch(new CustomEvent(MapEvents.changeBaseMap, {
                detail: { type: nextView }
            }));

            setView(nextView)
        }
        
    }, [view]);

    return (
        <ul style={{ display: 'flex', position: 'relative', left: 0 }}>
            <button onClick={handleChange} name="Satellite">위성</button>
            <button onClick={handleChange} name="Base">일반</button>
        </ul>
    )
}

export default BaseMapWidget;
