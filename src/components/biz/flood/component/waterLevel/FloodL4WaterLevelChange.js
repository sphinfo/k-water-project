import React, {useEffect, useMemo, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseChart from "@common/chart/BaseChart";
import "chartjs-plugin-annotation";
import SafetyChartConfig from "@gis/config/SafetyChartConfig";
import FloodChangeDataConfig from "@gis/config/FloodChangeDataConfig";
import FloodADD from "@gis/config/flood/FloodWaterLevelChartDatas";
import FloodWaterLevelChartDatas from "@gis/config/flood/FloodWaterLevelChartDatas";
import BaseGrid from "@common/grid/BaseGrid";
import { G$getDateType, G$sortArrayObject } from "@gis/util";
import { getFloodWaterLevelChart } from "@common/axios/flood";


const FloodL4WaterLevel = () => {

    const { text, selectWaterLevel } = useSelector(state => state.flood)

    //차트 ref
    const chartRef = useRef({})

    //차트 dataRef
    const chartInfoRef = useRef({
        labels: [],
        datasets: []
    })


    //테이블 ref
    const gridRef = useRef({})
    //데이터 ref
    const rows = useMemo(()=>{ return [  ] },[])
    const columns = [
        {accessor: 'createdAt', Header: '관측 일자', width: 120, align: 'center'},
        {accessor: 'estimatedElev', Header: '실제 계측 수위', width: 200, align: 'center'},
        {accessor: 'referenceElev', Header: '위성 계측 수위', width: 200, align: 'center'},
    ]

    /** 초기설정 **/
    useEffect(()=>{

        /** example 옵션 생성 */
        chartRef.current.updateOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 18,
                        boxHeight: 3,
                        useBorderRadius: true,
                        borderRadius: 1.5
                    }
                },
                tooltip: {
                    mode: 'index', // 인덱스별로 툴팁 보이기
                    intersect: false, // 마우스 포인터와 각 선의 교차점에 툴팁 표시
                },
                zoom: {
                    pan: {
                        enabled: true, // 이동 가능하도록 설정
                        mode: 'x', // x축으로만 이동할 수 있도록 설정
                    },
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      mode: 'x', // x축만 확대/축소 가능하도록 설정
                    },
                },
            },
            scales: {
                y: {
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 4
                    }
                }
            }
        }

        return()=>{

        }

    }, [])

    const [avg, setAvg] = useState(0)
    const [avg2, setAvg2] = useState(0)

    //수위 레이어 선택이 되었을시
    useEffect(()=>{

        chartInfoRef.current.labels = []
        chartInfoRef.current.datasets = []


        //*******API*************/
        //수위 지점 select get Feature
        if(selectWaterLevel){
            let params = {name:selectWaterLevel.name}
            getFloodWaterLevelChart(params).then((response)=>{
                if(response?.result?.data?.length > 0){

                    let datas = response.result.data
                    let date = []  //날짜
                    let estWl = [] //위성기반 계측수위
                    let obsWl = [] //실제계측수위


                    let avg = 0
                    let avg2 = 0
                    

                    datas.map((obj)=>{
                        obj.createdAt = obj.createdAt.substring(0,8)
                        date.push(G$getDateType(obj.createdAt))
                        estWl.push(obj.estimatedElev  === '' ? NaN : Number(obj.estimatedElev).toFixed(2))
                        obsWl.push(obj.referenceElev  === '' ? NaN : Number(obj.referenceElev).toFixed(2))

                        obj.estimatedElev = Number(obj.estimatedElev).toFixed(2)
                        obj.referenceElev = Number(obj.referenceElev).toFixed(2)

                        avg += Number(obj.estimatedElev)
                        avg2 += (Number(obj.estimatedElev) - Number(obj.referenceElev)) < 0 ? -(Number(obj.estimatedElev) - Number(obj.referenceElev)) : (Number(obj.estimatedElev) - Number(obj.referenceElev))

                        obj.createdAt = G$getDateType(obj.createdAt)
                    })

                    setAvg(avg / datas.length)
                    setAvg2(avg2 / datas.length)

                    

                    chartInfoRef.current.datasets.push({
                        tension: 0.4,
                        data:estWl,
                        label: '위성 기반 계측 수위',
                        pointRadius: 1,
                        borderWidth: 1,
                        borderColor: '#FF9933',
                        backgroundColor: '#FF9933',
                    })

                    //차트 data push
                    chartInfoRef.current.datasets.push({
                        tension: 0.4,
                        data: obsWl,
                        label: '실제 계측 수위',
                        pointRadius: 1,
                        borderWidth: 1,
                        borderColor: '#54A6E7',
                        backgroundColor: '#54A6E7',
                    })

                    chartInfoRef.current.labels = date

                    //Table
                    gridRef.current.provider =  G$sortArrayObject(datas, 'id', true)

                    //chart
                    chartRef.current.provider = chartInfoRef.current


                }
            })

            
        }


    },[selectWaterLevel])

  

    return (
        <>
            <div className="content-col">
                <div className="content-row">
                    <div className="panel-box">
                        <div className="number-dashboard">
                            <div className="nd-item text-blue">
                                <h4 className="nd-item-title">지점 평균수위(m)</h4>
                                <div className="nd-item-body">{avg.toFixed(2)}</div>
                            </div>
                            <div className="nd-item">
                                <h4 className="nd-item-title">실측/모의 잔차 평균(m)</h4>
                                <div className="nd-item-body">{avg2.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-row height-100">
                    <div className="panel-box height-100">
                        <div className="chart-unit-warp">
                            <span className="chart-unit">수위</span>
                        </div>
                        <BaseChart width={'100%'} height={230} ref={chartRef} data={chartInfoRef} chartType={'Line'}/>
                    </div>
                </div>
            </div>

            <div className="content-col">
                <div className="content-row">
                    <div className="panel-box">
                        <div className="table-wrap" style={{width: 350, height: 360, overflowY: 'auto'}}>
                            <BaseGrid ref={gridRef} columns={columns} provider={rows} className={'table-basic'}/>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default React.memo(FloodL4WaterLevel);
