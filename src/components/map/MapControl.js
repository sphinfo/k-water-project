import React from "react";
import ZoomMapWidget from "./right/ZoomMapWidget";
import CoordiateWidget from "./bottom/CoordiateWidget";
import MeasureMapWidget from "./right/MeasureMapWidget";
import MapPositionWidget from "./top/MapPositionWidget";
import AddrSearchWidget from "./top/AddrSearchWidget";
import Sidebar from "./left/Sidebar";
import TimeZoneWidget from "./top/TimeZoneWidget";
import ThematicWidget from "./right/ThematicWidget";
import CircularProgress from '@mui/material/CircularProgress';
import logo01 from "@images/logo01.png"
import logo02 from "@images/logo02.png"
import { useSelector } from "react-redux";
import CompassWidget from "./right/CompassWidget";
import HoldMapWidget from "./right/HoldMapWidget";


const MapControl = () =>{

    const loading = useSelector(state => state.main.loading);

    return (
        <>
            
            <Sidebar />  {/* left menu */}

            <div className="loading" style={{display: loading ? '' : 'none'}} >
                <CircularProgress color="primary" size={50} thickness={4} />
            </div>

            <div className="map-control-wrap">
                <div className="map_ctrl_top">
                    <AddrSearchWidget/> {/* 위치 조회 */}
                    <CoordiateWidget/> {/* center 좌표 */}
                    <TimeZoneWidget/> {/* 현재 시간 */}
                    {/*<BaseMapWidget />    배경지도*/}
                </div>
                <div className="map_ctrl_right">
                    <ThematicWidget/> {/* 주제도 */}
                    <HoldMapWidget/> {/* 지도 Hold */}
                    <MeasureMapWidget/> {/* 측정 */}
                    <ZoomMapWidget/> {/* 줌 */}
                    <CompassWidget /> {/*나침반*/}
                </div>
                <div className="map_ctrl_btm">
                    {/*<MapPositionWidget/>  현재 위치 주소 */}
                    {/*<CoordiateWidget/>  center 좌표 */}
                </div>
            </div>

            <div className="logo-box">
                <div className="logo logo01">
                    <img src={logo01} alt="환경부 로고"/>
                </div>
                <div className="logo logo02">
                    <img src={logo02} alt="수자원공사 로고"/>
                </div>
            </div>
        </>
    )
}
export default MapControl; 