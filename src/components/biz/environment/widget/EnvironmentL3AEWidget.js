import BaseChart from "@common/chart/BaseChart";
import { Accordion, AccordionDetails, AccordionSummary, SvgIcon, Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION } from "@redux/actions";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import img from "@images/image 51.png"

/**
 * 환경 녹조 위젯
 */
const EnvironmentL3AEWidget = () => {

    const dispatch = useDispatch()
    /**
     * selectEnvironmentLayer: 수변피복 레이어 선택
     */
    const { selectEnvironmentLayer, landCoverDetection } = useSelector(state => state.environment)


    //레이어 변경시 reset
    useEffect(()=>{

        if(selectEnvironmentLayer){
        }

    },[selectEnvironmentLayer])


    return (
        <>

            <div className={"content-body"}>
                <div className="content-row">
                    
                </div>
            </div>
        </>
    )
}

export default React.memo(EnvironmentL3AEWidget);
