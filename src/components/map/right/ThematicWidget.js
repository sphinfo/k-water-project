import React, { useEffect, useRef, useState } from 'react';
import ThematicLayerComponent from './thematic/ThematicLayerComponent';
import { THEMATIC_MODE } from '@redux/actions';
import { useDispatch } from 'react-redux';

const ThematicWidget = () => {

    const [theMaticVisible, setTheMaticVisible] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({type: THEMATIC_MODE, thematic: theMaticVisible})
    },[theMaticVisible])
    
    return (
        <>
            <div className="map-widget-vertical-block">
                <button className="mapRightBt" onClick={()=>{setTheMaticVisible(!theMaticVisible)}}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18C8.78333 18 8.571 17.9627 8.363 17.888C8.15433 17.8127 7.95833 17.7083 7.775 17.575L1.025 12.325C0.758333 12.125 0.629333 11.8623 0.638 11.537C0.646 11.2123 0.783334 10.95 1.05 10.75C1.23333 10.6167 1.43333 10.55 1.65 10.55C1.86667 10.55 2.06667 10.6167 2.25 10.75L9 15.975L15.75 10.75C15.9333 10.6167 16.1333 10.55 16.35 10.55C16.5667 10.55 16.7667 10.6167 16.95 10.75C17.2167 10.95 17.3543 11.2123 17.363 11.537C17.371 11.8623 17.2417 12.125 16.975 12.325L10.225 17.575C10.0417 17.7083 9.846 17.8127 9.638 17.888C9.42933 17.9627 9.21667 18 9 18ZM9 12.95C8.78333 12.95 8.571 12.9127 8.363 12.838C8.15433 12.7627 7.95833 12.6583 7.775 12.525L1.025 7.275C0.891667 7.175 0.791667 7.05433 0.725 6.913C0.658333 6.771 0.625 6.625 0.625 6.475C0.625 6.325 0.658333 6.179 0.725 6.037C0.791667 5.89567 0.891667 5.775 1.025 5.675L7.775 0.425C7.95833 0.291667 8.15433 0.187333 8.363 0.112C8.571 0.0373333 8.78333 0 9 0C9.21667 0 9.42933 0.0373333 9.638 0.112C9.846 0.187333 10.0417 0.291667 10.225 0.425L16.975 5.675C17.1083 5.775 17.2083 5.89567 17.275 6.037C17.3417 6.179 17.375 6.325 17.375 6.475C17.375 6.625 17.3417 6.771 17.275 6.913C17.2083 7.05433 17.1083 7.175 16.975 7.275L10.225 12.525C10.0417 12.6583 9.846 12.7627 9.638 12.838C9.42933 12.9127 9.21667 12.95 9 12.95Z" fill="#3D3D3D"/>
                    </svg>
                </button>
            </div>
        </>
    )
}

export default ThematicWidget; 
