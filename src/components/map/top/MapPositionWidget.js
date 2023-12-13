import React, { useEffect, useState } from 'react';
import EventBus from '@common/eventBus/eventBus';
import MapEvents from '@common/eventBus/MapEvents';
import { G$cartesianToLongLat } from '@gis/util';
import createAxios from '@common/axios/creatAxios';
import MapManager from '@gis/MapManager';

const MapPositionWidget = () => {

    const { request } = createAxios();

    const [addr, setAddr] = useState('');

    useEffect(()=>{
        EventBus.addListener(MapEvents.mapMoveEnd2, event => {
            changeAddr(event)
        })
    },[])

    const changeAddr = async(event)=>{
        let lonlat = G$cartesianToLongLat(event.detail)
        const responseA = await request(`http://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&crs=epsg:4326&point=${lonlat.longitude},${lonlat.latitude}&format=json&type=both&zipcode=true&simple=false&key=${MapManager._vworld_key}`);
        if(responseA.data.response.result){
            setAddr(responseA.data.response.result[0].text)
        }
    }
    
    
    return (
        <div className="map-address">
            {addr}<span className="text-grey ml-3"></span>
        </div>
    )
}

export default MapPositionWidget;
