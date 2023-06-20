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
            <ul className="map_ctrl_right" style={{position: 'absolute', right: '20px', top: '64px', zIndex: 0}}>
                <BaseMapWidget />
                <ZoomMapWidget />
                <MeasureMapWidget />
                <ThematicWidget />
                <TestEventWidget />
            </ul>
            <ul className="map_ctrl_btm" style={{position: 'absolute', right: '50%', top: '80%', zIndex: 0}}>
                <CoordiateWidget />
            </ul>
            <ul className="map_ctrl_top" style={{position: 'absolute', right: '50%', top: '0%', zIndex: 0}}>
                <AddrSearchWidget />
            </ul>
            
        </>
    )
}