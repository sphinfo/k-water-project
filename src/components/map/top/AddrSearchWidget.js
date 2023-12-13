import React, { useEffect, useRef, useState } from 'react';
import TextInput from '@common/util/TextInput';
import { useDispatch } from 'react-redux';
import { SEARCH_ADDR, SEARCH_RIVER } from '@redux/actions';
import MainGeoserverSearch from '@biz/addr/MainGeoserverSearch';
import VWorldAddressSearch from '@biz/addr/VWorldAddressSearch';
import AddrSearchResult from './addr/AddrSearchResult';
import createAxios from '@common/axios/creatAxios';
import { G$cartesianToLongLat } from '@gis/util';
import MapManager from '@gis/MapManager';
import MapEvents from '@common/eventBus/MapEvents';
import EventBus from '@common/eventBus/eventBus';


const searchList = [{store: 'river_network', layerId: 'W_FRST', column: 'NAME1'}
                    ,{store: 'river_network', layerId: 'W_NATL', column: 'NAME2'}
                    ,{store: 'river_network', layerId: 'W_SCND', column: 'RIV_NAM_1'}]

const AddrSearchWidget = () => {

    const dispatch = useDispatch()

    const searchAddr = useRef(new VWorldAddressSearch())  //vworld 검색 api
    const [addrSearchText, setAddrSearchText] = useState('') //검색 text
    
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

    const [visible, setVisible] = useState(false)

    const addrSearch = async () =>{
        if(addrSearchText !== ''){

            setVisible(true)

            searchAddr.current.searchAddress(addrSearchText).then((result)=>{
                if(result){
                    dispatch({ type: SEARCH_ADDR, result:result })
                }
            }).catch((error)=>{
                console.info(error)
            })
        }
    }

    const handleChange = (event) => {
        setAddrSearchText(event.target.value);
    };

    return (
        <>
            <ul className={`input-basic-search map-search-input map-basic-style ${visible ? 'bed-open' : ''}`} onClick={()=>{setVisible(!visible)}}>
                <TextInput
                    value={addrSearchText}
                    onChange={handleChange}
                    onKeyPress={addrSearch}
                    placeholder={addr}
                />
                <button onClick={()=>{addrSearch()}} className="map-search-bt">
                    <svg className="bt-icons magnify" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 22" fill="none">
                        <path d="M18.375 18.875L13.8276 14.3276M13.8276 14.3276C15.0583 13.0968 15.7498 11.4276 15.7498 9.68701C15.7498 7.94647 15.0583 6.27721 13.8276 5.04645C12.5968 3.8157 10.9276 3.12427 9.18701 3.12427C7.44647 3.12427 5.77721 3.8157 4.54645 5.04645C3.3157 6.27721 2.62427 7.94647 2.62427 9.68701C2.62427 11.4276 3.3157 13.0968 4.54645 14.3276C5.77721 15.5583 7.44647 16.2498 9.18701 16.2498C10.9276 16.2498 12.5968 15.5583 13.8276 14.3276Z" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </ul>
            <ul className={"address-bed-wrap map-basic-style"} style={{display: visible? '' : 'none'}}>
                <AddrSearchResult addrSearchText={addrSearchText} />
            </ul>
        </>
    )
}

export default AddrSearchWidget;
