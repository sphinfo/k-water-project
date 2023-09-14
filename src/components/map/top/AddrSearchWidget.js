import React, { useEffect, useRef } from 'react';
import TextInput from '@common/util/TextInput';

const AddrSearchWidget = () => {

    const addrSearchTextRef = useRef('')

    useEffect(()=>{
    }, [])

    const handleChange = (event) => {
        addrSearchTextRef.current = event.target.value
    }

    return (
        <>
            <ul className="map-search-input">
                <TextInput
                    value={addrSearchTextRef.current}
                    onChange={handleChange}
                    placeholder={"지역/건물/시설물 조회"}
                    placeholderTextColor={"#ADADAD"}
                />
                <button onClick={()=>{}} className="map-search-bt">
                    <svg className="bt-icons magnify" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 22" fill="none">
                        <path d="M18.375 18.875L13.8276 14.3276M13.8276 14.3276C15.0583 13.0968 15.7498 11.4276 15.7498 9.68701C15.7498 7.94647 15.0583 6.27721 13.8276 5.04645C12.5968 3.8157 10.9276 3.12427 9.18701 3.12427C7.44647 3.12427 5.77721 3.8157 4.54645 5.04645C3.3157 6.27721 2.62427 7.94647 2.62427 9.68701C2.62427 11.4276 3.3157 13.0968 4.54645 14.3276C5.77721 15.5583 7.44647 16.2498 9.18701 16.2498C10.9276 16.2498 12.5968 15.5583 13.8276 14.3276Z" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </ul>
        </>
    )
}

export default AddrSearchWidget;
