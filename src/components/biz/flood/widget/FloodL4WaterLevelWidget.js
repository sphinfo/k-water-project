import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@mui/material";
import FloodL4WaterLevelArea from "../component/waterLevel/FloodL4WaterLevelArea";
import FloodL4WaterLevelChange from "../component/waterLevel/FloodL4WaterLevelChange";
import { FLOOD_SELECT_WATER_LEVEL } from "@redux/actions";
import pin from "@images/map-icon-st.svg"
import dayjs from "dayjs";
import FloodWaterLevelStationDataConfig from "@gis/config/FloodWaterLevelStationDataConfig";

const FloodL4WaterLevelWidget = () => {

    const dispatch = useDispatch()
    const {  selectWaterLevel } = useSelector(state => state.flood)

    const [time, setTime] = useState("")
    const [levelType, setLevelType] = useState('')

    useEffect(()=>{

        return () =>{
            selectWaterLevel.entity.billboard.image = pin
            dispatch({type: FLOOD_SELECT_WATER_LEVEL, selectWaterLevel: false})
        }

    },[])

    useEffect(()=>{

        if(selectWaterLevel){
            const {properties} = selectWaterLevel
            setTime(dayjs(properties.date).format('YYYY년 MM월 DD일'))

            let stationInfos = FloodWaterLevelStationDataConfig
            stationInfos.map((obj)=>{
                if(properties.name.indexOf(obj.name) > -1){
                    //저수위
                    if(Number(obj.c5) > properties.value){
                        setLevelType('저')
                    }else if(Number(obj.c2) > properties.value && Number(obj.c5) < properties.value){
                        setLevelType('정상')
                    }else{
                        setLevelType('만')
                    }
                }
            })
            //properties.value
        }

    },[selectWaterLevel])

    //수위변화 on off
    const [levelChange, setLevelChange] = useState(false)

    return (
        <>  
            <div className="content-body">

                <div className="content-row">
                    <div className="content-top">
                        <div className="info-message">
                            위성 계측 상 <span className="text font-500">{levelType}수위 상태</span>입니다.
                            <small className="ml-5">({time} 관측데이터)</small>
                        </div>
                        <div className="switch-wrap">
                            <span>수위분석</span>
                            <Switch className="float-box-switch" checked={levelChange} onClick={() => {setLevelChange(!levelChange)}}></Switch>
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
