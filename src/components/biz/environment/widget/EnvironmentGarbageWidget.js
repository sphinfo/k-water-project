import BaseChart from "@common/chart/BaseChart";
import { Accordion, AccordionDetails, AccordionSummary, SvgIcon, Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION } from "@redux/actions";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import img from "@images/image 51.png"
import { G$normalizeWithColors } from "@gis/util";
import BaseGrid from "@common/grid/BaseGrid";

/**
 * 환경 수변피복 레이어 변화탐지
 */

const colorType = [
    { index: 0, rgb: [255, 255, 255] },
    { index: 1, rgb: [56, 5, 120] },
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
        <div className="content-body">
            <div className="content-row">
                <div className="panel-box">
                    <div className="number-dashboard number-dashboard-min">
                        <div className="nd-item">
                            <h4 className="nd-item-title">전체 부유물 면적</h4>
                            <div className="nd-item-body">145,963 ㎡</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-row">
                <div className="panel-box">
                    <div className="table-wrap" style={{maxHeight: 360, overflowY: 'auto'}}>
                        <table className="table-basic env-table">
                            <thead>
                            <tr>
                                <th>No.</th>
                                <th>BBOX (minX, minY, maxX, maxY )</th>
                                <th>부유물 면적</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>127.5055, 36.414621, 127.50965, 36.410489 </td>
                                <td>145,963 ㎡</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(EnvironmentLandCover);
