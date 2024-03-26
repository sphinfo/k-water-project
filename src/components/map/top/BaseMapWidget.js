import MapManager from '@gis/MapManager';
import { G$changeMapLabelLayer, G$changeMapLayer } from '@gis/util';
import React, { useEffect, useState } from 'react';
import mapBasic from '../../../resources/images/map-basic-bg.png';
import mapSatellite from '../../../resources/images/map-satellite-bg.png';
import {Checkbox, FormControlLabel} from "@mui/material";

const BaseMapWidget = () => {

    const [mapType, setMapType] = useState('SatelliteArc')
    const [sateMapType, setSateMapType] = useState('SatelliteArc')
    const [mapLabel, setMapLabel] = useState(false)


    useEffect(()=>{

        G$changeMapLayer(mapType)

    },[mapType])

    useEffect(()=>{

        G$changeMapLabelLayer(mapLabel)

    },[mapLabel])
    
    return (
        <div className="map-view-tab-wrap">
             <div className="map-view-tab-header">
                 <h4 className="map-view-tab-title">배경지도</h4>

                 <FormControlLabel
                     label="라벨"
                     control={
                         <Checkbox
                             checked={mapLabel}
                             onClick={()=>{setMapLabel(!mapLabel)}}
                             tabIndex={-1}
                             disableRipple
                             className={'check-box'}
                         />
                     }
                 />
             </div>
            <div className="map-view-tab">
                <button className={mapType === 'Base' ? "view-tab-item on map-basic-style" : "view-tab-item map-basic-style"} onClick={()=>{setMapType('Base')}}>
                    <span>일반</span>
                    <img src={mapBasic} alt="일반지도"/>
                </button>
                <button className={mapType === 'Satellite' || mapType === 'SatelliteArc' ? "view-tab-item on map-basic-style" : "view-tab-item map-basic-style"} onClick={()=>{setMapType(sateMapType)}}>
                    <span>위성</span>
                    <img src={mapSatellite} alt="위성지도"/>
                </button>
            </div>
            <div className="map-view-tab" style={{display: mapType === 'Satellite' || mapType === 'SatelliteArc' ? '' : 'none', marginTop: 5}}>
                <button className={`btn ${ mapType === 'Satellite' ?  "view-tab-item on map-basic-style" : ''}`}  onClick={()=>{setSateMapType('Satellite'); setMapType('Satellite')}}>
                    <span>VWROLD</span>
                </button>
                <button className={`btn ${ mapType === 'SatelliteArc' ?  "view-tab-item on map-basic-style" : ''}`} onClick={()=>{setSateMapType('SatelliteArc'); setMapType('SatelliteArc')}}>
                    <span>ARC</span>
                </button>
            </div>
        </div>
    )
}

export default BaseMapWidget;
