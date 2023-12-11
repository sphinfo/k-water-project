import BaseChart from "@common/chart/BaseChart";
import { Accordion, AccordionDetails, AccordionSummary, SvgIcon, Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION } from "@redux/actions";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import img from "@images/image 51.png"

/**
 * 환경 수변피복 레이어 변화탐지
 */
const EnvironmentLandCover = () => {

    const dispatch = useDispatch()
    /**
     * selectEnvironmentLayer: 수변피복 레이어 선택
     */
    const { selectEnvironmentLayer, landCoverDetection } = useSelector(state => state.environment)
    

    //차트 정보
    const chartRef = useRef()
    const chartInfoRef = useRef({
        labels: ['목지','수체','건물','초지','나지'],
        datasets: [50,150,100,130,60],
    })

    //레이어 변경시 reset
    useEffect(()=>{

        if(selectEnvironmentLayer){


            //*******API*************/

            chartRef.current.updateOptions = {
                plugins: {
                    legend: {
                        display: false
                    },
                },
                scales: {
                    'x': {

                    },
                    'y': {
                        title: {
                            display: false,
                            text: "Area(m2)",
                            font: {
                              size: 10,
                            },
                        },
                    }
                },
            }

            chartInfoRef.current.datasets = []

            //let label = []  //날짜 x 축
            let datas = [50,150,100,130,60]

            //chartInfoRef.current.labels = label

            chartInfoRef.current.datasets.push({
                type: 'bar',
                borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                data: datas,
            })

            chartRef.current.provider = chartInfoRef.current
        }

    },[selectEnvironmentLayer])


    return (
        <>

            <div className={"content-body"}>
                <div className="content-row">
                    <div className="content-row-header">
                        <h2 className="content-row-title">지역 구성</h2>
                    </div>
                    <div className="panel-box">
                        <div className="chart-unit-warp">
                            <span className="chart-unit">Area(m2)</span>
                        </div>
                        <BaseChart width={260} height={220} ref={chartRef} chartType={'Bar'} title={''}/>
                    </div>
                </div>


                <div className="content-row" style={{display: landCoverDetection? '' : 'none'}}>
                    <div className="content-row-header">
                        <h2 className="content-row-title">변화 수치</h2>
                    </div>
                    <div className="panel-box">
                        <img src={img} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(EnvironmentLandCover);
