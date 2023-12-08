import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DROUGHT_SELECT_FEATURE } from "@redux/actions";
import DroughtObsrvSoilMoisture from "../component/obsrv/DroughtObsrvSoilMoisture";
import DroughtObsrvIndex from "../component/obsrv/DroughtObsrvIndex";
import pin from "@images/map-icon-dr.svg"


/**
 * 가뭄 활용주제도
 */
const DroughtObsrvWidget = () => {

    const dispatch = useDispatch()
    const { obsrvTab, selectObs } = useSelector(state => state.drought)
    

    useEffect(()=>{
        return()=>{
            //선택레이어 삭제
            selectObs.entity.billboard.image = pin
            dispatch({type:DROUGHT_SELECT_FEATURE, selectObs: false})
        }
    },[])


    return (
        <>
            <div className={"content-body"}>
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

export default React.memo(DroughtObsrvWidget);
