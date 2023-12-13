import BaseChart from "@common/chart/BaseChart";
import { Accordion, AccordionDetails, AccordionSummary, SvgIcon, Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION } from "@redux/actions";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { G$normalizeWithColors } from "@gis/util";

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

                <div className="content-col-group">
                    <div className="content-col">
                        <div className="content-row">
                            <div className="panel-box">
                                <div className="number-dashboard">
                                    <div className="nd-item">
                                        <h4 className="nd-item-title">전체면적(㎡)</h4>
                                        <div className="nd-item-body">1,000k</div>
                                    </div>
                                    <div className="nd-item">
                                        <h4 className="nd-item-title">최대 피해 면적(㎡)</h4>
                                        <div className="nd-item-body">
                                            <span className="text-naji">나지</span> 380k
                                        </div>
                                    </div>
                                    <div className="nd-item">
                                        <h4 className="nd-item-title">최소 피해 면적(㎡)</h4>
                                        <div className="nd-item-body">
                                            <span className="text-mokji">목지</span> 30k
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content-row">
                            <div className="panel-box">
                                <div className="chart-unit-warp">
                                    <span className="chart-unit">Area(m2)</span>
                                </div>
                                <BaseChart width={'100%'} height={300} ref={chartRef} chartType={'Bar'} title={''}/>
                            </div>
                        </div>
                    </div>

                    <div className="content-col" style={{display: landCoverDetection ? '' : 'none'}}>
                        <div className="content-row">
                            <div className="panel-box">
                                <div className="heatmap-chart-wrap">
                                    <div className="heatmap-chart">
                                        <div className="chart-axis-wrap">
                                            <div className="chart-axis chart-axis-y">
                                                <div className="axis-title">변경 전 피복</div>
                                                <div className="axis-label-wrap">
                                                    <div className="axis-label">목지</div>
                                                    <div className="axis-label">수체</div>
                                                    <div className="axis-label">건물</div>
                                                    <div className="axis-label">초지</div>
                                                    <div className="axis-label">나지</div>
                                                </div>

                                            </div>
                                            <div className="chart-axis chart-axis-x">
                                                <div className="axis-label-wrap">
                                                    <div className="axis-label">목지</div>
                                                    <div className="axis-label">수체</div>
                                                    <div className="axis-label">건물</div>
                                                    <div className="axis-label">초지</div>
                                                    <div className="axis-label">나지</div>
                                                </div>
                                                <div className="axis-title">변경 후 피복</div>
                                            </div>
                                        </div>

                                        <div className="chart-item-group">
                                            <div className="chart-item no-item">136.30</div>
                                            <div className="chart-item" ></div>
                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item">136.30</div>


                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item no-item"></div>
                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item">136.30</div>


                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item no-item"></div>
                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item">136.30</div>


                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item no-item"></div>
                                            <div className="chart-item">136.30</div>


                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item">136.30</div>
                                            <div className="chart-item no-item"></div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default React.memo(EnvironmentLandCover);
