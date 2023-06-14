import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import MapManager from '../../../openlayers/MapManager';
import LayerManager from '../../../openlayers/LayerManager';
import { G$addLayer } from '../../../openlayers/util';


const ThematicWidget = () => {

    useEffect(()=>{


    },[MapManager.map])

    
    
    return (
        <ul style={{ display: 'flex', position: 'relative', left: 0 }}>
        </ul>
    )
}

export default ThematicWidget; 
