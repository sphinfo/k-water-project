import React, {useEffect, useState} from "react";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { G$addWidget,G$paramWidget,G$removeWidget } from "@gis/util";
import {DROUGHT_OBSRV_TAB } from "@redux/actions";

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

    useEffect(()=>{

        if(selectObs){
            G$paramWidget('DroughtObsrvWidget',{subTitle: `${selectObs?.properties?.name}`})
        }

    },[selectObs])

    //
    const [obsIndexTab, setObsIndexTab] = useState(false)
    useEffect(()=>{
        obsIndexTab ? dispatch({type: DROUGHT_OBSRV_TAB, obsrvTab: 'index'}) : dispatch({type: DROUGHT_OBSRV_TAB, obsrvTab: 'soilMoisture'})
    },[obsIndexTab])

    


    return (
        <div className="widget widget-toggle">
            <div className="widget-box">
                <div className="widget-header">
                    <h4 className="widget-title">활용 주제도</h4>
                </div>
                <div className="widget-body">
                    <div className="switch-list">
                        <div className="switch-list-item">
                            {obsrvTab}
                            <span className="switch-label">가뭄지수</span>
                            <Switch className="float-box-switch" checked={obsIndexTab} onClick={() => {
                                setObsIndexTab(!obsIndexTab)
                            }}></Switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(DroughtObsrvThematic);
