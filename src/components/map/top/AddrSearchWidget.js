import React, { useEffect, useRef, useState } from 'react';
import VWorldAddressSearch from '@/vworld/VWorldAddressSearch ';
import TextInput from '@cmp/util/TextInput';
import AddrSearchResult from './AddrSearchResult';

const AddrSearchWidget = () => {

    const addr = useRef(new VWorldAddressSearch())
    

    const [addrList, setAddrList] = useState([])
    const [addrSearchText, setAddrSearchText] = useState('')

    const addrSearch = async () =>{
        console.info(addrSearchText)
        addr.current.searchAddress(addrSearchText).then((result)=>{
            if(result){
                if(result.items.length > 0){
                    setAddrList(result.items)
                }else{
                    setAddrList([])    
                }
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
                />
            </ul>
        </>
    )
}

export default AddrSearchWidget;
