import React from "react";
import ZoomMapWidget from "./right/ZoomMapWidget";
import CoordiateWidget from "./bottom/CoordiateWidget";
import MeasureMapWidget from "./right/MeasureMapWidget";
import SampleEventBox from "./bottom/SampleEventBox";
import MapPositionWidget from "./top/MapPositionWidget";
import AddrSearchWidget from "./top/AddrSearchWidget";
import Sidebar from "./left/Sidebar";
import TimeZoneWidget from "./top/TimeZoneWidget";
import ThematicWidget from "./right/ThematicWidget";


export default function MapControl() {
    return (
        <>
            <div className="map_ctrl_right">
                <ThematicWidget />
                
                <MeasureMapWidget />
                <ZoomMapWidget />
            </div>
            <div className="map_ctrl_btm">
                <CoordiateWidget />
            </div>

            <div className="map_ctrl_left">
              <Sidebar />
              <AddrSearchWidget />
              {/* <SampleEventBox /> */}
            </div>


            <div className="map_ctrl_top">
                <MapPositionWidget />
                <TimeZoneWidget />
            </div>
            
        </>
    )
}