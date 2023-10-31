import MapManager from '@gis/MapManager';
import { G$changeMapLayer } from '@gis/util';
import { WebMapTileServiceImageryProvider } from 'cesium';
import React, { useEffect, useState } from 'react';

const BaseMapWidget = () => {

    const [mapType, setMapType] = useState('Satellite')


    useEffect(()=>{

        G$changeMapLayer(mapType)

    },[mapType])
    
    return (
        <>
            <div className="map-address">
                <button style={{color: mapType === 'Base' ? 'red' :'white'}} onClick={()=>{setMapType('Base')}}>일반</button>
                <button style={{color: mapType === 'Satellite' ? 'red' :'white'}} onClick={()=>{setMapType('Satellite')}}>위성</button>
            </div>
        </>
    )
}

export default BaseMapWidget;
