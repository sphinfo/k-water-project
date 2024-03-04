import BaseChart from "@common/chart/BaseChart";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { G$arrayGetMinMax, G$normalizeWithColors, G$setMtoKm } from "@gis/util";
import { getEnvLandCoverDatas } from "@common/axios/envi";

/**
 * 환경 수변피복 레이어 변화탐지
 */

const colorType = [
    { index: 0, rgb: [255, 255, 255] },
    { index: 1, rgb: [56, 5, 120] },
]

const EnvironmentLandCover = (props) => {

    const dispatch = useDispatch()
    /**
     * selectEnvironmentLayer: 수변피복 레이어 선택
     */
    const { landCoverDetection } = useSelector(state => state.environment)

    //차트 정보
    const chartRef = useRef()
    const chartInfoRef = useRef({
        labels: ['수체', '나지', '초지','목지', '건물','변화면적'],
        datasets: [],
    })

    const [max, setMax] = useState('')
    const [min, setMin] = useState('')
    const [maxArea, setMaxArea] = useState(0)

    const [colorGrids, setColorGrid] = useState([])

    const [id, setId] = useState(false)

    useEffect(()=>{

        if(props?.params?.id){
            const {id} = props?.params
        }

    },[props])

    const [start, setStart] = useState('-')
    const [end, setEnd] = useState('-')
    //레이어 변경시 reset
    useEffect(()=>{

        if(landCoverDetection){

            const {id, filename} = landCoverDetection

            let start = filename.split("_")[1]
            let end = filename.split("_")[2]
            setStart(`${start.substring(2,4)}년도 ${start.substring(4,6)}월`)
            setEnd(`${end.substring(2,4)}년도 ${end.substring(4,6)}월`)

            if(id){
                let params = {id:id}

                getEnvLandCoverDatas(params).then((response)=>{
                    if(response?.length > 0){
                        let heatDatas = false
                        let barDatas = false
                        response.map((resObj)=>{
                            if(resObj.config?.url === '/api/environment/getHeatmapData'){
                                if(resObj?.data?.data?.length > 0){
                                    heatDatas = resObj?.data?.data
                                }
                            }else{
                                if(resObj?.data?.data?.length > 0){
                                    barDatas = resObj?.data?.data[0]
                                }
                            }
                        })
                        setHeatData(heatDatas, barDatas)
                    }
                })
            }

        }

    },[landCoverDetection])

    const setBarData = (datas, change=0) =>{

        let data = [G$setMtoKm(datas.class1),
            G$setMtoKm(datas.class2).toFixed(2),
            G$setMtoKm(datas.class3).toFixed(2),
            G$setMtoKm(datas.class4).toFixed(2),
            G$setMtoKm(datas.class5).toFixed(2),
            G$setMtoKm(change).toFixed(2)]

        let area = 0
        data.map((obj)=>{
            area += Number(obj)
        })

        setMaxArea(area.toFixed(2))
        setMin(`${chartInfoRef.current.labels[G$arrayGetMinMax(data).min]}  ${data[G$arrayGetMinMax(data).min]}`)
        setMax(`${chartInfoRef.current.labels[G$arrayGetMinMax(data).max]}  ${data[G$arrayGetMinMax(data).max]}`)

        chartRef.current.updateOptions = {
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                'x': {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                    },
                    ticks:{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: 12,
                    }
                },
                'y': {
                    title: {
                        display: false,
                        text: "Area(m2)",
                        font: {
                            size: 10,
                        },
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                    },
                    ticks:{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: 12,
                    }
                },
            },
        }

        chartInfoRef.current.datasets = []

        chartInfoRef.current.datasets.push({
            type: 'bar',
            borderColor: ['#557BDF','#FF9E01', '#FFFB07','#35783B', '#FF0000','#DE3CFF'],
            backgroundColor: ['#557BDF','#FF9E01', '#FFFB07','#35783B', '#FF0000','#DE3CFF'],
            data: data,
        })

        chartRef.current.provider = chartInfoRef.current

    }

    const setHeatData = (datas, barDatas) =>{

        //#6A58A1
        let heatArray = []
        datas.map((data)=>{
            heatArray.push(data.class1)
            heatArray.push(data.class2)
            heatArray.push(data.class3)
            heatArray.push(data.class4)
            heatArray.push(data.class5)
        })

        setColorGrid(heatArray)
        let total = heatArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        setBarData(barDatas, total)
    }


    const renderColorGrid = (value=0, i) =>{

        const min = Math.min(...colorGrids)
        const max = Math.max(...colorGrids)

        return(
            <>
                {
                    value === 0 &&
                    <div className={`chart-item no-item`}> {""}</div>
                }
                {
                    value !== 0 &&
                    <div className={`chart-item`} key={`item-${i}`} style={{backgroundColor: `#${G$normalizeWithColors({value, min:min, max:max, type:colorType}).hex}`}}>
                        <span>{G$setMtoKm(value).toFixed(2)}</span>
                    </div>
                }
            </>
        )
    }


    return (
        <>
            <div className={"content-body"}>
                <div className="content-col-group">
                    <div className="content-col">
                        <div className="content-row">
                            <div className="info-comment-box">
                                <i className="fe-info"></i>
                                <p className="info-comment">
                                    <span className="">{start}</span>과 <span className="">{end}</span>의 비교 변화 데이터입니다.
                                </p>
                            </div>
                        </div>

                        <div className="content-row">
                            <div className="panel-box">
                                <div className="number-dashboard">
                                    <div className="nd-item">
                                        <h4 className="nd-item-title">전체 면적(K㎡)</h4>
                                        <div className="nd-item-body">{maxArea}</div>
                                    </div>
                                    <div className="nd-item">
                                        <h4 className="nd-item-title">최대 면적(K㎡)</h4>
                                        <div className="nd-item-body">
                                            <span className="text">{max}</span>
                                        </div>
                                    </div>
                                    <div className="nd-item">
                                        <h4 className="nd-item-title">최소 면적(K㎡)</h4>
                                        <div className="nd-item-body">
                                            <span className="text">{min}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content-row height-100">
                            <div className="panel-box height-100">
                                <div className="chart-unit-warp">
                                    <span className="chart-unit">Area(K㎡)</span>
                                </div>
                                <BaseChart width={'100%'} height={300} ref={chartRef} chartType={'Bar'} title={''}/>
                            </div>
                        </div>
                    </div>



                    <div className="content-col" style={{display: landCoverDetection ? '' : 'none'}}>
                        <div className="content-row height-100">
                            <div className="panel-box height-100">
                                <div className="heatmap-chart-wrap">
                                    <div className="heatmap-chart">
                                        <div className="chart-axis-wrap">
                                            <div className="chart-axis chart-axis-y">
                                                <div className="axis-title">변경 전 피복</div>
                                                <div className="axis-label-wrap">
                                                    <div className="axis-label">건물</div>
                                                    <div className="axis-label">목지</div>
                                                    <div className="axis-label">초지</div>
                                                    <div className="axis-label">나지</div>
                                                    <div className="axis-label">수체</div>
                                                </div>

                                            </div>
                                            <div className="chart-axis chart-axis-x">
                                                <div className="axis-label-wrap">
                                                    <div className="axis-label">수체</div>
                                                    <div className="axis-label">나지</div>
                                                    <div className="axis-label">초지</div>
                                                    <div className="axis-label">목지</div>
                                                    <div className="axis-label">건물</div>

                                                </div>
                                                <div className="axis-title">변경 후 피복</div>
                                            </div>
                                        </div>

                                        <div className="chart-item-group">
                                            {colorGrids && colorGrids.length > 0 &&
                                                colorGrids.map((value, i) => renderColorGrid(value, i))
                                            }
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
