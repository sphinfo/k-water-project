import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "chartjs-plugin-annotation";
import Tabs from "@mui/material/Tabs";
import { Switch } from "@mui/material";
import FloodL4WaterLevelArea from "../component/waterLevel/FloodL4WaterLevelArea";
import FloodL4WaterLevelChange from "../component/waterLevel/FloodL4WaterLevelChange";

const FloodL4WaterLevelWidget = () => {

    //수위변화 on off
    const [levelChange, setLevelChange] = useState(false)

    return (
        <>  
            <div className="content-body">

                <div>
                    수위분석
                    <Switch className="float-box-switch" checked={levelChange} onClick={()=>{setLevelChange(!levelChange)}}></Switch>
                    수위변화
                </div>
                
                

              {/* 수위변화 OFF : 지역구성 */}
              <div className="content-row" style={{display: levelChange ? 'none' : ''}}>
                <FloodL4WaterLevelArea />
              </div>
                
              {/* 수위변화 ON : 수위변화 그래프 */}
              <div className="content-row" style={{display: !levelChange ? 'none' : ''}}>
                <FloodL4WaterLevelChange />
              </div>
            </div>
        </>
    )
}

export default React.memo(FloodL4WaterLevelWidget);
