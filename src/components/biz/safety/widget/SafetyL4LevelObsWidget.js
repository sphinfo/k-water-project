import BaseChart from "@common/chart/BaseChart";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pin1 from "@images/point-icon-1.svg"
import pin2 from "@images/point-icon-2.svg"
import { G$RandomId, G$getDateType, G$removeLayer } from "@gis/util";
import { SAFETY_CLICK_MODE, SAFETY_SELETE_FEATURE } from "@redux/actions";
import BaseGrid from "@common/grid/BaseGrid";
import { getSafetyCompResult } from "@common/axios/safety";
import { CircularProgress } from "@mui/material";

const SafetyL4LevelObsWidget = () => {

    /**
     * selectFeature : feature 선택정보
     * select4Level : 4레벨
     */
    const { selectFeature, select4Level } = useSelector(state => state.safety)
    const dispatch = useDispatch()

    //Chart Ref
    const chartRef = useRef({})
    const chartRef2 = useRef({})
    //차트 데이터 Ref
    const chartInfoRef = useRef({labels: [],datasets: []})
    const chartInfoRef2 = useRef({labels: [],datasets: []})

    //테이블 ref
    const gridRef = useRef({})
    //데이터 ref
    const rows = useMemo(()=>{ return [  ] },[])
    const columns = [
        {accessor: 'createdAt', Header: '관측 일자', width: 120, align: 'center'},
        {accessor: 'value', Header: '변위 (cm)', width: 200, align: 'center'},
    ]

    //테이블 ref
    const gridRef2 = useRef({})

    //초기 옵션 추가
    useEffect(()=>{
        /** 차트 옵션 생성 */
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
                    },
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
        chartRef2.current.updateOptions = {
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
                    },
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
        //창이 닫히면 pinlayer 제거
        return()=>{
            dispatch({type:SAFETY_SELETE_FEATURE, selectFeature: false})
        }
    },[])

    //grid 레이어가 선택이 되면 pinlayer 추가
    useEffect(()=>{
        chartRef.current.provider = chartInfoRef.current.datasets = []
        gridRef.current.provider = []
        chartRef2.current.provider = chartInfoRef2.current.datasets = []
        gridRef2.current.provider = []
        if(selectFeature){

            /* 관측소 변위 */
            if(selectFeature?.properties?.data?.length > 0){
                let labels = []
                let datas = []
                let obsGridDatas = []
                selectFeature?.properties?.data.map((obsObj)=>{
                    let value = obsObj.value.toFixed(3) 
                    let createdAt = obsObj.createdAt
                    labels.push(createdAt)
                    datas.push(value)
                    obsGridDatas.push({value, createdAt})
                })

                chartInfoRef.current.labels = labels
                chartInfoRef.current.datasets.push({
                    tension: 0.4,
                    data: datas,
                    pointRadius: 1,
                    borderWidth: 1,
                    label: '관측소 변위',
                    borderColor: '#FF0000',
                    backgroundColor: '#FF0000',
                })
                chartRef.current.provider = chartInfoRef.current
                //grid
                gridRef.current.provider = obsGridDatas.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
            }

            /* 지점변위 */
            getSafetyCompResult({y:parseFloat(selectFeature.properties.latitude), x:parseFloat(selectFeature.properties.longitude), id: Number(select4Level.id)}).then((response)=>{
                let pointLables = [] //chart
                let datas = [] //chart
                let gridDatas = [] //table
                if(response?.result?.data?.data?.length > 0){
                    response.result.data.data.map((obj)=>{
                        let value = obj.value.toFixed(3)
                        let createdAt = G$getDateType(obj.createdAt.substring(0,8))
                        datas.push(value)
                        pointLables.push(createdAt)
                        gridDatas.push({value, createdAt})
                    })
                }
                chartInfoRef2.current.labels = pointLables
                chartInfoRef2.current.datasets.push({
                    tension: 0.4,
                    data: datas,
                    pointRadius: 1,
                    borderWidth: 1,
                    label: '지점 변위',
                    borderColor: '#00B2FF',
                    backgroundColor: '#00B2FF',
                })
                chartRef2.current.provider = chartInfoRef2.current
                //grid
                gridRef2.current.provider = gridDatas.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)

            })
        }
    },[selectFeature])

    return (
        <div className="content-body">
            <div className="content-col-group">
                <div className="content-col">
                    <div className="content-row height-100">
                        <div className="panel-box height-100">
                            <div className="panel-box-header">
                                <h4 className="panel-box-title">관측소 변위 {selectFeature?.properties?.displacement ? `( ${selectFeature?.properties?.displacement} )` : ''}</h4>
                            </div>
                            <div className="chart-unit-warp">
                                <span className="chart-unit">변위(cm)</span>
                            </div>
                            <BaseChart width={'100%'} height={250} ref={chartRef} chartType={'Line'} title={''} noDataText={''}/>
                        </div>
                    </div>
                </div>

                <div className="content-col">
                    <div className="content-row height-100">
                        <div className="panel-box height-100">
                            <div className="panel-box-header">
                                <h4 className="panel-box-title">변위</h4>
                            </div>
                            <div className="table-wrap" style={{ height: '250px', overflowY: 'auto'}}>
                                <BaseGrid ref={gridRef} columns={columns} provider={rows} className={'table-basic'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-col-group">
                <div className="content-col">
                    <div className="content-row height-100">
                        <div className="panel-box height-100">
                            <div className="panel-box-header">
                                <h4 className="panel-box-title">지점변위</h4>
                            </div>
                            <div className="chart-unit-warp">
                                <span className="chart-unit">변위(cm)</span>
                            </div>
                            <BaseChart width={'100%'} height={250} ref={chartRef2} chartType={'Line'} title={''} noDataText={''}/>
                        </div>
                    </div>
                </div>

                <div className="content-col">
                    <div className="content-row height-100">
                        <div className="panel-box height-100">
                            <div className="panel-box-header">
                                <h4 className="panel-box-title">변위</h4>
                            </div>
                            <div className="table-wrap" style={{ height: '250px', overflowY: 'auto'}}>
                                <BaseGrid ref={gridRef2} columns={columns} provider={rows} className={'table-basic'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(SafetyL4LevelObsWidget);

