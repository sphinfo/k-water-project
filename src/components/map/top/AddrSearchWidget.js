import React, { useEffect, useRef, useState } from 'react';
import VWorldAddressSearch from '@/vworld/VWorldAddressSearch';
import TextInput from '@cmp/util/TextInput';
import AddrSearchResult from './AddrSearchResult';

const AddrSearchWidget = () => {

    const searchAddr = useRef(new VWorldAddressSearch())

    const [addrList, setAddrList] = useState([])
    const [addrSearchText, setAddrSearchText] = useState('')

    const addrSearch = async () =>{
        
        searchAddr.current.searchAddress(addrSearchText).then((result)=>{
            console.info(result)
            if(result){
                setAddrList(result)
            }else{
                setAddrList([])
            }
        }).catch((error)=>{
            console.info(error)
        })
    }

    const handleChange = (event) => {
        setAddrSearchText(event.target.value);
    };

    return (
        <>
            <ul style={{  position: 'relative', left: 0 }}>
                <TextInput
                    value={addrSearchText} 
                    onChange={handleChange} 
                />
                <button onClick={()=>{addrSearch()}}>검색</button>
            </ul>
            <ul style={{  position: 'relative', left: 0 }}>
                <AddrSearchResult
                    result={addrList}
                    addrSearchText={addrSearchText}
                />
            </ul>
        </>
    )
}

export default AddrSearchWidget;
