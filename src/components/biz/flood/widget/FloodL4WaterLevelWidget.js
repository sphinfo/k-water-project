import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "chartjs-plugin-annotation";
import Tabs from "@mui/material/Tabs";
import { Switch } from "@mui/material";
import FloodL4WaterLevelArea from "../component/waterLevel/FloodL4WaterLevelArea";
import FloodL4WaterLevelChange from "../component/waterLevel/FloodL4WaterLevelChange";
import { FLOOD_SELECT_WATER_LEVEL } from "@redux/actions";
import pin from "@images/map-icon-st.svg"

const FloodL4WaterLevelWidget = () => {

    const dispatch = useDispatch()
    const {  selectWaterLevel } = useSelector(state => state.flood)

    useEffect(()=>{
        return () =>{
            selectWaterLevel.entity.billboard.image = pin
            dispatch({type: FLOOD_SELECT_WATER_LEVEL, selectWaterLevel: false})
        }
    },[])

    //수위변화 on off
    const [levelChange, setLevelChange] = useState(false)

    return (
        <>  
            <div className="content-body">

                <div className="content-row">
                    <div className="content-top">
                        <div className="info-message">
                            위성 계측 상 <span className="text-green font-500">정상 수위 상태</span>입니다.
                            <small className="ml-5">(23.12.15 18:00 관측데이터)</small>
                        </div>
                        <div className="switch-wrap">
                            <span>수위분석</span>
                            <Switch className="float-box-switch" checked={levelChange} onClick={() => {
                                setLevelChange(!levelChange)
                            }}></Switch>
                            <span>수위변화</span>
                        </div>
                    </div>
                </div>

                {/* 수위변화 OFF : 수위분석 */}
                <div className="content-col-group" style={{display: levelChange ? 'none' : ''}}>
                    <FloodL4WaterLevelArea/>
                </div>

                {/* 수위변화 ON : 수위변화 그래프 */}
                <div className="content-col-group" style={{display: !levelChange ? 'none' : ''}}>
                    <FloodL4WaterLevelChange/>
                </div>

            </div>
        </>
    )
}

export default React.memo(FloodL4WaterLevelWidget);
