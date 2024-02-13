import BaseChart from "@common/chart/BaseChart";
import { Accordion, AccordionDetails, AccordionSummary, SvgIcon, Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION } from "@redux/actions";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import img from "@images/image 51.png"
import { getAreaInfo } from "@common/axios/envi";
import { G$setNumberFixedKomma } from "@gis/util";

/**
 * 환경 녹조 위젯
 */
const EnvironmentAraeWidget = (props) => {

    const dispatch = useDispatch()
    const {params, ...other} = props

    const [allArea, setAllArea] = useState('-')
    const [gridData, setGridData] = useState([])

    useEffect(()=>{
        if(params?.id){
            getAreaInfo({id:params.id}).then((response) => {
                let result = []
                let area = 0
                if(response?.result?.data?.length > 0){
                    result = response?.result?.data
                    response?.result?.data.map((obj)=>{
                        area += obj.area
                    })
                }
                setGridData(result)
                setAllArea(area)
            })
        }
        
    },[params])


    return (

        <div className="content-body">
            <div className="content-row">
                <div className="panel-box">
                    <div className="number-dashboard number-dashboard-min">
                        <div className="nd-item">
                            <h4 className="nd-item-title">전체 부유물 면적</h4>
                            <div className="nd-item-body">{G$setNumberFixedKomma(allArea,0)} ㎡</div>
                        </div>
                    </div>
                </div>
            </div>
            {/**
             
             <div className="content-row">
                <div className="panel-box">
                    <div className="table-wrap" style={{maxHeight: 360, overflowY: 'auto'}}>
                        <table className="table-basic env-table">
                            <thead>
                            <tr>
                                <th>No.</th>
                                <th>위/경도</th>
                                <th>부유물 면적</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    gridData.length > 0 && 
                                    gridData.map((obj, i)=>{
                                        return(
                                            <>
                                                <tr>
                                                    <td>{i+1}</td>
                                                    <td>{obj.latitudeMax}/{obj.longitudeMax}/{obj.latitudeMin}/{obj.longitudeMin}</td>
                                                    <td>{G$setNumberFixedKomma(obj.area,0)} ㎡</td>
                                                </tr>
                                            </>
                                        )
                                        
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

             */
            }
            
        </div>

    )
}

export default React.memo(EnvironmentAraeWidget);
