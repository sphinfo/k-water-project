import React, {useEffect, useRef, useState} from "react";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { G$addWidget,G$removeWidget } from "@gis/util";
import { DROUGHT_OBSRV_TAB } from "@redux/actions";

const sample = {store:'WaterBody', layer: '20230718T21water_GS_RGB000102'}

const DroughtObsrvThematic = () => {

    const dispatch = useDispatch()

    /**
     * selectObs : 가뭄 선택 지점
     */
    const { selectObs, obsrvTab } = useSelector(state => state.drought)

    //닫힐때 침수피해 레이어 초기화
    useEffect(()=>{
        G$addWidget('DroughtObsrvWidget')
        return()=>{
            G$removeWidget('DroughtObsrvWidget')
        }
    },[])

    //
    const [obsIndexTab, setObsIndexTab] = useState(false)
    useEffect(()=>{
        obsIndexTab ? dispatch({type: DROUGHT_OBSRV_TAB, obsrvTab: 'index'}) : dispatch({type: DROUGHT_OBSRV_TAB, obsrvTab: 'soilMoisture'})
    },[obsIndexTab])

    


    return (
        <>
            <div style={{position: 'fixed', bottom: 70, left: 400, width: 200, height: 50}}>
                <h1>활용 주제도</h1>
                <div>
                    {'img'}
                    {'가뭄지수'}
                    <Switch className="float-box-switch" checked={obsIndexTab} onClick={()=>{setObsIndexTab(!obsIndexTab)}}></Switch>
                </div>
            </div>
        </>
    )
}

export default React.memo(DroughtObsrvThematic);