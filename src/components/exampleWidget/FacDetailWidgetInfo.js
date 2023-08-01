import BaseChart from "@com/manager/chart/BaseChart";
import { G$removeWidget } from "@gis/util";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
const name = 'FacDetailWidget'

/** 시설 상세 정보 */
const FacDetailWidgetInfo = (props) => {

    useEffect(()=>{
        return()=>{
            console.info('bye')
        }
    },[])

    useEffect(()=>{

    },[props.param])
    

    return (
        <>
            <div>
                
            </div>
            
        </>
    )
}

export default React.memo(FacDetailWidgetInfo);
