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
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from "react-redux";


const MapControl = () =>{

    const loading = useSelector(state => state.main.loading);

    return (
        <>
            <div className="loading" style={{display: loading ? '' : 'none'}} >
                <CircularProgress color="primary" size={50} thickness={4} />
            </div>
            <div className="map_ctrl_right">
                {loading}
                <ThematicWidget /> {/* 주제도 */}
                <MeasureMapWidget /> {/* 측정 */}
                <ZoomMapWidget />  {/* 줌 */} 
            </div>
            <div className="map_ctrl_btm">
                <CoordiateWidget />  {/* center 좌표 */}
            </div>

            <div className="map_ctrl_left">
              <Sidebar />  {/* left menu */}
              <AddrSearchWidget />  {/* 위치 조회 */}
              {/* <SampleEventBox /> */}
            </div>

            <div className="map_ctrl_top">
                <MapPositionWidget />  {/* 현재 위치 주소 */}
                <TimeZoneWidget />   {/* 현재 시간 */}
            </div>
            
        </>
    )
}


export default MapControl; 