import BaseChart from "@common/chart/BaseChart";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import img from "@images/Safety-20231114_L4TD_YONGDAM_UD.jpg"
import { G$arrayGetMinMax, G$normalizeWithColors, G$setNumberFixedKomma } from "@gis/util";

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
    const { selectEnvironmentLayer, landCoverDetection, text } = useSelector(state => state.environment)

    //차트 정보
    const chartRef = useRef()
    const chartInfoRef = useRef({
        labels: ['수체', '나지', '초지','목지', '건물'],
        datasets: [],
    })

    const [max, setMax] = useState('')
    const [min, setMin] = useState('')
    const [maxArea, setMaxArea] = useState(0)

    //레이어 변경시 reset
    useEffect(()=>{

        if(selectEnvironmentLayer){

            //*******API*************/
            const {data} = text

            if(data && data.length > 0){

                let area = 0
                data.map((obj)=>{
                    area += obj
                })

                setMaxArea(area)

                setMin(`${chartInfoRef.current.labels[G$arrayGetMinMax(data).min]} - ${G$setNumberFixedKomma(data[G$arrayGetMinMax(data).min], 0)}`)
                setMax(`${chartInfoRef.current.labels[G$arrayGetMinMax(data).max]} - ${G$setNumberFixedKomma(data[G$arrayGetMinMax(data).max], 0)}`)

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
    
    
                //chartInfoRef.current.labels = label
    
                chartInfoRef.current.datasets.push({
                    type: 'bar',
                    borderColor: ['#557BDF','#F3AC50', '#A1F8A5','#35783B', '#DD59B2'],
                    backgroundColor: ['#557BDF','#F3AC50', '#A1F8A5','#35783B', '#DD59B2'],
                    data: data,
                })
    
                chartRef.current.provider = chartInfoRef.current

            }

            
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
                                        <div className="nd-item-body">{G$setNumberFixedKomma(maxArea,0)}</div>
                                    </div>
                                    <div className="nd-item">
                                        <h4 className="nd-item-title">최대 면적(㎡)</h4>
                                        <div className="nd-item-body">
                                            <span className="text">{max}</span>
                                        </div>
                                    </div>
                                    <div className="nd-item">
                                        <h4 className="nd-item-title">최소 면적(㎡)</h4>
                                        <div className="nd-item-body">
                                            <span className="text">{min}</span>
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
                        <img style={{width:500, height:440}} src={text.img} />
                            {/** 
                             * <div className="panel-box">
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
                            */}
                            
                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default React.memo(EnvironmentLandCover);
