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


const MapControl = () =>{

    const loading = useSelector(state => state.main.loading);

    return (
        <>
            <div className="title-logo">
                <h1>수자원위성 활용산출물 통합 표출시스템</h1>
                <p>Korea Water Resources  Satellite Visualization System</p>
            </div>
            <Sidebar />  {/* left menu */}

            <div className="loading" style={{display: loading ? '' : 'none'}} >
                <CircularProgress color="primary" size={50} thickness={4} />
            </div>

            <div className="map-control-wrap">
                <div className="map_ctrl_top">
                    <AddrSearchWidget/> {/* 위치 조회 */}
                    <TimeZoneWidget/> {/* 현재 시간 */}
                    {/*<BaseMapWidget />    배경지도*/}
                </div>
                <div className="map_ctrl_right">
                    {loading}
                    <ThematicWidget/> {/* 주제도 */}
                    <MeasureMapWidget/> {/* 측정 */}
                    <ZoomMapWidget/> {/* 줌 */}

                    <div className="map-compass" style={{transform: "rotate(0deg)"}}>
                        <div className="map-compass-pin"></div>
                    </div>
                </div>
                <div className="map_ctrl_btm">
                    {/*<MapPositionWidget/>  현재 위치 주소 */}
                    <CoordiateWidget/> {/* center 좌표 */}
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