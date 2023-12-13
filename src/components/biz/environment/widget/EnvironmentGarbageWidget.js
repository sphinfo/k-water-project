import BaseChart from "@common/chart/BaseChart";
import { Accordion, AccordionDetails, AccordionSummary, SvgIcon, Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION } from "@redux/actions";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import img from "@images/image 51.png"
import { G$normalizeWithColors } from "@gis/util";

/**
 * 환경 수변피복 레이어 변화탐지
 */

const colorType = [
    { index: 0, rgb: [255, 255, 255] },
    { index: 1, rgb: [128, 0, 128] },
]
const EnvironmentLandCover = () => {

    const dispatch = useDispatch()
    /**
     * selectEnvironmentLayer: 수변피복 레이어 선택
     */
    const { selectEnvironmentLayer, landCoverDetection } = useSelector(state => state.environment)
    
    useEffect(()=>{
        console.info(G$normalizeWithColors({value:1079300, min:0, max:4669400, type:colorType}))
    },[])

    //레이어 변경시 reset
    useEffect(()=>{

        if(selectEnvironmentLayer){

        }

    },[selectEnvironmentLayer])


    return (
        <>

            <div className={"content-body"}>
                <div className="content-row">
                    <div className="content-row-header">
                        <h2 className="content-row-title">전체 부유물 면적</h2>
                    </div>
                    <div className="panel-box">
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(EnvironmentLandCover);
