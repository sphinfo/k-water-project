import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DROUGHT_SELECT_FEATURE } from "@redux/actions";
import { G$GetPointToDetail } from "@gis/util";
import DroughtObsrvThematic from "./obsrv/DroughtObsrvThematic";
import BaseOragDataInfo from "@components/biz/common/BaseOragDataInfo";


/**
 * 가뭄 활용주제도
 */
const DroughtL4 = (props) => {

    const {mainLayer} = props;

    const dispatch = useDispatch()
    useEffect(()=>{
        return()=>{
            //선택레이어 삭제
            dispatch({type:DROUGHT_SELECT_FEATURE, selectObs: false})
        }
    },[])
    return (
        <>
            <DroughtObsrvThematic mainLayer={mainLayer}/>
        </>
    )
}

export default React.memo(DroughtL4);
