import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@mui/material";
import FloodL4WaterLevelArea from "../component/waterLevel/FloodL4WaterLevelArea";
import FloodL4WaterLevelChange from "../component/waterLevel/FloodL4WaterLevelChange";
import { FLOOD_SELECT_WATER_LEVEL } from "@redux/actions";
import pin from "@images/map-icon-st.svg"

const FloodL4WaterLevelWidget = () => {

    const dispatch = useDispatch()
    const {  selectWaterLevel } = useSelector(state => state.flood)

    const [time, setTime] = useState("")

    useEffect(()=>{

        const currentTime = new Date();
        const options = {
            timeZone: 'Asia/Seoul', // 한국 시간대
            year: 'numeric',
            month: 'long', // 월을 긴 형식으로 표시 (예: "1월" 대신 "January")
            day: 'numeric',
            hour12: false, // 24시간 형식 사용
            hour: '2-digit',
            minute: '2-digit',
        }
        setTime(currentTime.toLocaleTimeString('EUC-KR', options))

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
                            <small className="ml-5">({time} 관측데이터)</small>
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
