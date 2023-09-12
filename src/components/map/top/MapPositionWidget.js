import React, { useCallback, useEffect, useState } from 'react';
import MapManager from '../../../cesium/MapManager';
import EventBus from '@common/eventBus/EventBus';
import MapEvents from '@common/eventBus/MapEvents';
import { G$cartesianToLongLat } from '@gis/util';
import createAxios from '@common/axios/creatAxios';

const MapPositionWidget = () => {

    const { request } = createAxios();

    const [addr, setAddr] = useState('');

    useEffect(()=>{
        EventBus.addListener(MapEvents.mapMoveEnd, event => {
            changeAddr(event)
        })
    },[])

    const changeAddr = async(event)=>{
        console.info(event)
        let lonlat = G$cartesianToLongLat(event.detail)
        const responseA = await request(`/vworld/req/address?service=address&request=getAddress&version=2.0&crs=epsg:4326&point=${lonlat.longitude},${lonlat.latitude}&format=json&type=both&zipcode=true&simple=false&key=77143F13-AD7D-3DC3-8B6F-673CD59B01B6`);
        if(responseA.data.response.result){
            setAddr(responseA.data.response.result[0].text)
        }

    }
    
    
    return (
        <ul className="map-widget-vertical-block" style={{color:'black'}}>
            {addr}
        </ul>
    )
}

export default MapPositionWidget;