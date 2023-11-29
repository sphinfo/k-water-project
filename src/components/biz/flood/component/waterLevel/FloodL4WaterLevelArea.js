import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseChart from "@common/chart/BaseChart";
import "chartjs-plugin-annotation";


const FloodL4WaterLevelArea = () => {

    const { selectWaterLevel } = useSelector(state => state.flood)

    //차트 ref
    const chartRef = useRef({})

    //차트 dataRef
    const chartInfoRef = useRef({
        labels: [],
        datasets: [50,20,10],
        backgroundColor: '#C5DCFF'
    })

    /** 초기설정 **/
    useEffect(()=>{

        chartRef.current.updateOptions = {
            layout: {
                padding: -8
            },
            plugins: {
                tooltip: {
                mode: 'index', // 인덱스별로 툴팁 보이기
                    intersect: false, // 마우스 포인터와 각 선의 교차점에 툴팁 표시
                },
                annotation: {
                    annotations: {
                        minLine: {
                            type: 'line',
                            borderColor: '#DD4747',
                            yMin: 10,
                            yMax: 10,
                            borderWidth: 2,
                            label: {
                                display: true,
                                backgroundColor: '#DD4747',
                                borderRadius: 5,
                                content: '저수위(' +150.0+ ')',
                                rotation: 'auto',
                                position: 'start'
                            },
                        },
                        maxLine: {
                            type: 'line',
                            borderColor: '#47BFD9',
                            borderWidth: 2,
                            yMin: 50,
                            yMax: 50,
                            label: {
                                display: true,
                                backgroundColor: '#47BFD9',
                                borderRadius: 5,
                                content: '만수위(' +193.5+ ')',
                                rotation: 'auto',
                                position: 'start'
                            },
                        },
                        nowLine: {
                            type: 'line',
                            borderColor: '#FF9E2B',
                            yMin: 30,
                            yMax: 30,
                            borderWidth: 2,
                            label: {
                                display: true,
                                backgroundColor: '#FF9E2B',
                                borderRadius: 5,
                                content: '현수위('+189.12+ ')',
                                rotation: 'auto',
                                position: 'start'
                            },
                        }
                    }
                }
            },
            scales: {
                y: {
                    border: {
                        display: false
                    },
                    grid: {
                        display: false
                    },
                    stack: true,
                    ticks: {
                        display: false,
                        padding: 0
                    }
                },
                x: {
                    border: {
                        display: false
                    },
                    grid: {
                        display: false//격자 제거
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 5, //x축 tick 제거
                        padding: 0
                    },
                    barPercentage: 1,
                    categoryPercentage: 1
                }
            },
        }

        return()=>{

        }

    }, [])

  

    return (
        <>
            <div className="content-row-header">
                <h2 className="content-row-title">지역 구성</h2>
            </div>
            <div className="panel-box">
                <div className="panel-box full-width bg-floor-chart">
                    <BaseChart width={280} height={230} ref={chartRef} data={chartInfoRef} chartType={'bar'}/>
                </div>
                <div className="panel-box-header">
                    <h3 className="panel-box-title">수위</h3>
                </div>
                <div className="panel-box-content">
                    <table className="table-basic panel-box-table">
                        <colgroup>
                            <col style={{width: '45%'}}/>
                            <col style={{width: 'auto'}}/>
                        </colgroup>
                        <tbody>
                            <tr className={"tr-highlight"}>
                                <th>위성 수위<span className="unit-th">(EL.m)</span></th>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>현 수위<span className="unit-th">(EL.m)</span></th>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>만 수위<span className="unit-th">(EL.m)</span></th>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>저 수위<span className="unit-th">(EL.m)</span></th>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="panel-box-header">
                    <h3 className="panel-box-title">수위</h3>
                </div>
                <div className="panel-box-content">
                    <table className="table-basic panel-box-table">
                        <colgroup>
                            <col style={{width: '45%'}}/>
                            <col style={{width: 'auto'}}/>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>저수면적<span className="unit-th">(EL.m)</span></th>
                                <td>-</td>
                            </tr>
                        </tbody>
                        <tbody className={"table-depth"}>
                            <tr>
                                <th>총 저수량<span className="unit-th">(EL.m)</span></th>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>유효저수량<span className="unit-th">(EL.m)</span></th>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default React.memo(FloodL4WaterLevelArea);
