import BaseChart from "@common/chart/BaseChart";
import BaseGrid from "@common/grid/BaseGrid";
import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { getDroughtObsIndex, getDroughtSoilStatistics } from "@common/axios/drought";
import { G$getDateType, G$paramWidget } from "@gis/util";

/**
 * 가뭄 활용주제도 - 가뭄지수
 */
const DroughtObsrvIndex = () => {

    /**
     * selectObs : 선택된 관측소
     */
    const { selectObs } = useSelector(state => state.drought)

    //차트 ref
    const chartRef = useRef({})

    //차트 dataRef
    const chartInfoRef = useRef({
        labels: [],
        datasets: [],
    })


    const columns2 = [
        {accessor: 'date', Header: '관측 일자', width: 120, align: 'center'},
        {accessor: 'pcp', Header: '강수량', width: 120, align: 'center'},
        {accessor: 'l4drA1', Header: '가뭄지수', width: 200, align: 'center'},
    ]

    //테이블 ref
    const grid2Ref = useRef({})
    //데이터 ref
    const rows2 = useMemo(()=>{ return [  ] },[])

    useEffect(()=>{

        G$paramWidget('DroughtObsrvWidget',{title: '가뭄지수'})

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
                    callbacks:{
                        label: function(context) {
                            return context.datasetIndex === 0 && context.formattedValue === '5' ? '5 초과' : context.formattedValue
                        }
                    }
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
                annotation: {
                    annotations: {
                        1: {
                            type: 'line',
                            borderColor: '#FFAA01',
                            borderWidth: 2,
                            yMin: -10,
                            yMax: -10,
                            label: {
                                display: true,
                                backgroundColor: '#00ff0000',
                                borderRadius: 5,
                                rotation: 'auto',
                                position: 'end',
                                content: '경계( -5 ~ -10 )',
                                font: {
                                    size: 12,
                                }
                            },
                        },
                        /**주의 */
                        2: {
                            type: 'line',
                            borderColor: '#FFFF00',
                            yMin: -5,
                            yMax: -5,
                            borderWidth: 2,
                            label: {
                                display: true,
                                backgroundColor: '#00ff0000',
                                borderRadius: 5,
                                rotation: 'auto',
                                position: 'end',
                                content: '주의 ( -2 ~ -5 )',
                                font: {
                                    size: 12,
                                }
                            },
                        },
                        /**관심 */
                        3: {
                            type: 'line',
                            borderColor: '#3A60FB',
                            yMin: -2,
                            yMax: -2,
                            borderWidth: 2,
                            label: {
                                display: true,
                                backgroundColor: '#00ff0000',
                                borderRadius: 5,
                                rotation: 'auto',
                                position: 'end',
                                content: '관심 ( 0 ~ -2 )',
                                font: {
                                    size: 12,
                                }
                            },
                        },
                    }
                }
            },
            
            scales: {
                'y1': {
                    type: 'linear',
                    position: 'left',
                    grid: {
                        display: false //격자 제거
                    },
                    suggestedMax: 5,
                    title: {
                        display: false,
                        text: "가뭄지수",
                        font: {
                          size: 10,
                        },
                    },
                    min:-15,
                    max: 5,
                    ticks: {
                        stack: true,
                    }
                    
                },
                'y2': {
                    type: 'linear',
                    position: 'right',
                    reverse: true ,
                    grid: {
                        display: false//격자 제거
                    },
                    min:0,
                    max:600,
                    title: {
                        display: false,
                        text: "강우량(mm)",
                        font: {
                          size: 10,
                        },
                    },
                },
                x: {
                    grid: {
                        display: false//격자 제거
                    },
                    ticks: {
                        autoSkip: true,
                        crossAlign: 'near',
                        maxTicksLimit: 5, //x축 tick 제거
                        maxRotation: 0,
                        minRotation: 0
                    }
                }
            }
        }

    }, [])


    useEffect(()=>{
        
        if(selectObs){

            //getDroughtSoilStatistics
            getDroughtSoilStatistics({code:selectObs.properties.code}).then((response)=>{

                if(response?.result?.data?.length > 0){

                    chartInfoRef.current.datasets = []

                    let label = []  //날짜 x 축
                    let l4drA1 = [] // 가뭄지수
                    let pcp = [] // 강우량

                    response.result.data.map((obj, i)=>{
                        
                        obj.date = G$getDateType(obj.createdAt.substring(0,10)) 
                        if(obj.l4drA1 !== 0){
                            if(obj.createdAt){
                                label.push(obj.date)
                            }
                            
                            l4drA1.push(obj.l4drA1 === 0 ? NaN : Number(obj.l4drA1) > 5 ? 5 : Number(obj.l4drA1).toFixed(1))
                            pcp.push(obj.pcp  === 0 ? NaN : Number(obj.pcp).toFixed(1))
                            
                        }
                        obj.l4drA1 = obj.l4drA1 === 0 ? '-' : Number(obj.l4drA1).toFixed(1)
                        obj.pcp = obj.pcp === 0 ? '-' : Number(obj.pcp).toFixed(1)    
                        
                    })

                    chartInfoRef.current.labels = label
    
                    chartInfoRef.current.datasets.push({
                        label: '가뭄지수',
                        type: 'line',
                        yAxisID: 'y1',
                        pointRadius: 1,
                        borderWidth: 1,
                        borderColor: '#54A6E7',
                        backgroundColor: '#54A6E7',
                        data:l4drA1,
                    })

                    chartInfoRef.current.datasets.push({
                        label: '강수량',
                        type: 'bar',
                        yAxisID: 'y2', 
                        borderColor: 'white',
                        backgroundColor: 'white',
                        data: pcp,
                    })

                    chartRef.current.provider = chartInfoRef.current

                    let gridDatas = response.result.data.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
                    grid2Ref.current.provider = gridDatas
                    
                }

            })

        }

    },[selectObs])


    return (
        <>
            <div className="content-col">
                <div className="content-row">
                    <div className="panel-box">
                        <div className="chart-unit-warp">
                            <span className="chart-unit">가뭄지수</span>
                            <span className="chart-unit">강수량(mm)</span>
                        </div>
                        <BaseChart width={420} height={370} ref={chartRef} chartType={'Line'} title={''}/>
                    </div>
                </div>
            </div>

            <div className="content-col">
                <div className="content-row height-100">
                    <div className="panel-box height-100">
                        <div className="panel-box-header">
                            <h4 className="panel-box-title">가뭄지수 자료</h4>
                        </div>
                        <div className="table-wrap" style={{height: 360, overflowY: 'auto'}}>
                            <BaseGrid ref={grid2Ref} columns={columns2} provider={rows2} className={'table-basic'}/>
                        </div>


                    </div>
                </div>
            </div>
            
        </>
    )
}

export default React.memo(DroughtObsrvIndex);
