import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


/**
 * 환경 수변피복 레이어 변화탐지
 */
const EnvironmentLandCover = () => {

    const dispatch = useDispatch()
    //const { selectObs, obsrvTab } = useSelector(state => state.drought)
    
    const [detailLandCover, setDetailLandCover] = useState('on')

    useEffect(()=>{
        return()=>{
        }
    },[])

    return (
        <>
            
            <div className={"panel-header"}>
                <h1 className={"panel-title"}>
                    {"활용주제도"}
                </h1>
            </div>

            <div className={"content-body"}>
                <div className="content-row">
                    <div className="content-row-header">
                        <h2 className="content-row-title">변화탐지</h2>
                        <Switch className="float-box-switch" checked={detailLandCover} onClick={()=>{setDetailLandCover(!detailLandCover)}}></Switch>
                    </div>
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
