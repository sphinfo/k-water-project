import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DROUGHT_SELECT_FEATURE } from "@redux/actions";
import DroughtObsrvTab from "./DroughtObsrvTab";
import DroughtObsrvSoilMoisture from "./DroughtObsrvSoilMoisture";
import DroughtObsrvIndex from "./DroughtObsrvIndex";
import { G$GetPointToDetail } from "@gis/util";


/**
 * 가뭄 활용주제도
 */
const DroughtObsrv = () => {

    const dispatch = useDispatch()
    const { selectObs, obsrvTab } = useSelector(state => state.drought)
    

    useEffect(()=>{
        return()=>{
            //선택레이어 삭제
            dispatch({type:DROUGHT_SELECT_FEATURE, selectObs: false})
        }
    },[])

    const [dms, setDms] = useState()

    useEffect(()=>{
        console.info(selectObs)
        setDms(G$GetPointToDetail(selectObs.properties.Lon, selectObs.properties.Lat))
    },[selectObs])

    return (
        <>
            
            <div className={"panel-header"}>
                <h1 className={"panel-title"}>
                    {"활용주제도"}
                </h1>
            </div>
            <div className="content-block pb-0">
                <DroughtObsrvTab />
            </div>

            <div className={"content-body"}>
                <div className="content-row">
                    <div className="content-row-header">
                        <h2 className="content-row-title">관측 정보</h2>
                    </div>
                    <div className="panel-box">
                        {selectObs.properties.Station}
                        <br></br>
                        {`경도 : ${ dms ? dms.lonDms : ''}`}
                        <br></br>
                        {`위도 : ${ dms ? dms.latDms : ''}`}
                    </div>
                </div>

            <div className={"content-row"} style={{display: obsrvTab === 'soilMoisture' ? '' : 'none'}}>
                <DroughtObsrvSoilMoisture />
            </div>
            <div style={{display: obsrvTab === 'index' ? '' : 'none'}}>
                <DroughtObsrvIndex />
            </div>
            </div>
        </>
    )
}

export default React.memo(DroughtObsrv);
