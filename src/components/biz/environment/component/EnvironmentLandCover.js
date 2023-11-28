import { Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION } from "@redux/actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


/**
 * 환경 수변피복 레이어 변화탐지
 */
const EnvironmentLandCover = () => {

    const dispatch = useDispatch()
    const { selectEnvironmentLayer } = useSelector(state => state.environment)
    
    const [detailLandCover, setDetailLandCover] = useState(false)

    useEffect(()=>{
        dispatch({type:ENV_LANDCOVER_DETECTION, landCoverDetection: detailLandCover})
    },[detailLandCover])

    //레이어 변경시 reset
    useEffect(()=>{
        setDetailLandCover(false)
    },[selectEnvironmentLayer])

    return (
        <>
            
            <div className={"panel-header"}>
                <h1 className={"panel-title"}>
                    {"활용주제도"}
                </h1>
            </div>

            <div className={"content-body"}>
                <div className="control-block">
                        <h2 className="switch-label">변화탐지</h2>
                        <Switch className="float-box-switch" checked={detailLandCover} onClick={()=>{setDetailLandCover(!detailLandCover)}}></Switch>
                </div>
                <div className="content-row">
                    <div className="content-row-header">
                        <h2 className="content-row-title">지역 구성</h2>
                    </div>
                    <div className="panel-box">
                        {'CHART'}
                    </div>
                </div>
                <div className="content-row">
                    <div className="content-row-header">
                        <h2 className="content-row-title">변화 수치</h2>
                    </div>
                    <div className="panel-box">
                        {'IMAGE'}
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(EnvironmentLandCover);
