import React from "react";
import ZoomMapWidget from "./right/ZoomMapWidget";
import MeasureMapWidget from "./right/MeasureMapWidget";
import ThematicWidget from "./right/ThematicWidget";
import BaseMapWidget from "./right/BaseMapWidget";
import CoordiateWidget from "./bottom/CoordiateWidget";
import AddrSearchWidget from "./top/AddrSearchWidget";
import TestEventWidget from "./right/TestEventWidget";


export default function MapControl() {
    return (
        <>
            <ul className="map_ctrl_right">
              <ThematicWidget />
              <TestEventWidget />
              <MeasureMapWidget />
              <ZoomMapWidget />
            </ul>
            <ul className="map_ctrl_btm">
                <CoordiateWidget />
            </ul>
            <ul className="map_ctrl_top">
                <AddrSearchWidget />
                <BaseMapWidget />
                <button className="map-right-bt top-info-bt">
                    <svg width="6" height="16" viewBox="0 0 6 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_505_23666)">
                        <path d="M0.625 13.2572H1.25V8.74284H0.625C0.279813 8.74284 0 8.46303 0 8.11784V6.625C0 6.27981 0.279813 6 0.625 6H4.125C4.47019 6 4.75 6.27981 4.75 6.625V13.2572H5.375C5.72019 13.2572 6 13.537 6 13.8822V15.375C6 15.7202 5.72019 16 5.375 16H0.625C0.279813 16 0 15.7202 0 15.375V13.8822C0 13.537 0.279813 13.2572 0.625 13.2572ZM3 0C1.75734 0 0.75 1.00734 0.75 2.25C0.75 3.49266 1.75734 4.5 3 4.5C4.24266 4.5 5.25 3.49266 5.25 2.25C5.25 1.00734 4.24263 0 3 0Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_505_23666">
                        <rect width="6" height="16" fill="white"/>
                        </clipPath>
                    </defs>
                    </svg>

                </button>
            </ul>
            
        </>
    )
}