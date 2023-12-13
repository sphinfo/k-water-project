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

        <div className="content-body">
            <div className="content-row">
                <div className="panel-box">
                    <div className="number-dashboard number-dashboard-min">
                        <div className="nd-item">
                            <h4 className="nd-item-title">전체 녹조 면적</h4>
                            <div className="nd-item-body">87,242 ㎡</div>
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
                                <th>위/경도</th>
                                <th>녹조 면적</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>LON ‘135” 23’42” LAT 23”10’13”</td>
                                <td>17,242 ㎡</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>LON ‘135” 23’42” LAT 23”10’13”</td>
                                <td>17,242 ㎡</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>LON ‘135” 23’42” LAT 23”10’13”</td>
                                <td>17,242 ㎡</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>LON ‘135” 23’42” LAT 23”10’13”</td>
                                <td>17,242 ㎡</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default React.memo(EnvironmentL3AEWidget);
