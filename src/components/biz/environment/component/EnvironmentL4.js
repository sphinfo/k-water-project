import BaseChart from "@common/chart/BaseChart";
import { Accordion, AccordionDetails, AccordionSummary, SvgIcon, Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION } from "@redux/actions";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import img from "@images/image 51.png"
import BaseOragDataInfo from "@components/biz/common/BaseOragDataInfo";
import { G$addWidget, G$removeLayer, G$removeWidget } from "@gis/util";
import EnvironmentThematic from "./EnvironmentThematic";

/**
 * 환경 4레벨
 */
const EnvironmentL4 = () => {

    const dispatch = useDispatch()
    /**
     * selectEnvironmentLayer: 수변피복 레이어 선택
     */
    const { selectEnvironmentLayer } = useSelector(state => state.environment)


    useEffect(()=>{

        return()=>{
            G$removeWidget('EnvironmentLandCoverWidget')
            G$removeWidget('EnvironmentGarbageWidget')
        }
    },[])


    useEffect(()=>{

        console.info(selectEnvironmentLayer)

        if(selectEnvironmentLayer.group === 'LandCover'){
            G$addWidget('EnvironmentLandCoverWidget')
            G$removeWidget('EnvironmentGarbageWidget')
        }else{
            G$removeWidget('EnvironmentLandCoverWidget')
            G$addWidget('EnvironmentGarbageWidget')

        }

    },[selectEnvironmentLayer])



    return (
        <>
            {
                selectEnvironmentLayer && selectEnvironmentLayer.group === 'LandCover' &&
                <EnvironmentThematic />
            }
            <BaseOragDataInfo a={true} b={true}/>
        </>
    )
}

export default React.memo(EnvironmentL4);
