import MapManager from '@gis/MapManager';
import { G$changeMapLayer } from '@gis/util';
import { WebMapTileServiceImageryProvider } from 'cesium';
import React, { useEffect, useState } from 'react';
import mapBasic from '../../../resources/images/map-basic-bg.png';
import mapSatellite from '../../../resources/images/map-satellite-bg.png';

const BaseMapWidget = () => {

    const [mapType, setMapType] = useState('Satellite')


    useEffect(()=>{

        G$changeMapLayer(mapType)

    },[mapType])
    
    return (
        <>
            <div className="map-view-tab">
                <button className={mapType === 'Base' ? "view-tab-item on map-basic-style" : "view-tab-item map-basic-style"} onClick={()=>{setMapType('Base')}}>
                    <span>일반</span>
                    <img src={mapBasic} alt="일반지도"/>
                </button>
                <button className={mapType === 'Satellite' ? "view-tab-item on map-basic-style" : "view-tab-item map-basic-style"} onClick={()=>{setMapType('Satellite')}}>
                    <span>위성</span>
                    <img src={mapSatellite} alt="위성지도"/>
                    </button>
            </div>
        </>
    )
}

export default BaseMapWidget;
