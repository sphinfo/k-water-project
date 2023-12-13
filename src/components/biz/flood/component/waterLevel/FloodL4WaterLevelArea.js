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
        datasets: [50],
        backgroundColor: '#C5DCFF'
    })

    /** 초기설정 **/
    useEffect(()=>{

        //*******API*************/

        chartRef.current.updateOptions = {
            layout: {
                padding: -8
            },
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 18,
                    boxHeight: 3,
                    useBorderRadius: true,
                    borderRadius: 1.5
                }
            },
            plugins: {
                tooltip: {
                mode: 'index', // 인덱스별로 툴팁 보이기
                    intersect: false, // 마우스 포인터와 각 선의 교차점에 툴팁 표시
                },
                annotation: {
                    annotations: {
                        fullRangeAnnotation: {
                            type: 'box',
                            borderColor: 'rgba(255, 0, 0, 0)',
                            backgroundColor: 'rgba(255, 0, 0, 0)',
                            yMin: 0,
                            yMax: 8,
                            borderWidth: 1,
                        },                
                        /**현수위 */
                        nowLine: {
                            type: 'box',
                            backgroundColor: '#32CD32',
                            yMin: 0,
                            yMax: 3,
                        },
                        /**저수위 */
                        minLine: {
                            type: 'line',
                            borderColor: '#FFFA8A',
                            yMin: 1,
                            yMax: 1,
                            borderWidth: 2,
                            label: {
                                display: true,
                                backgroundColor: '#FFFA8A',
                                borderRadius: 5,
                                rotation: 'auto',
                                position: 'start',
                                font: {
                                    size: 12,
                                }
                            },
                        },
                        /**만수위 */
                        maxLine: {
                            type: 'line',
                            borderColor: '#E83233',
                            borderWidth: 2,
                            yMin: 5,
                            yMax: 5,
                            label: {
                                display: true,
                                backgroundColor: '#E83233',
                                borderRadius: 5,
                                rotation: 'auto',
                                position: 'start',
                                font: {
                                    size: 12,
                                }
                            },
                        },
                        /**위성수위 */
                        sateLine: {
                            type: 'line',
                            borderColor: '#A3D0F3',
                            yMin: 2,
                            yMax: 2,
                            borderWidth: 2,
                            label: {
                                display: true,
                                backgroundColor: '#A3D0F3',
                                borderRadius: 5,
                                rotation: 'auto',
                                position: 'start',
                                font: {
                                    size: 12,
                                }
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
                    stack: true,
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
            <div className="content-col">
                <div className="content-row">
                    <div className="panel-box">
                        <div className="number-dashboard">
                            <div className="nd-item text-blue">
                                <h4 className="nd-item-title">위성 수위(EL.m)</h4>
                                <div className="nd-item-body">252.60</div>
                            </div>
                            <div className="nd-item">
                                <h4 className="nd-item-title">현 수위(EL.m)</h4>
                                <div className="nd-item-body">257.90</div>
                            </div>
                            <div className="nd-item">
                                <h4 className="nd-item-title">계측 차이(EL.m)</h4>
                                <div className="nd-item-body">3.70</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-row">
                    <div className="panel-box">
                        <BaseChart width={'100%'} height={300} ref={chartRef} data={chartInfoRef} chartType={'bar'}/>
                    </div>
                </div>
            </div>

            <div className="content-col">
                <div className="content-row">
                    <div className="panel-box">
                        <div className="table-group">
                            <table className="table-basic panel-box-table">
                                <caption>제원</caption>
                                <colgroup>
                                    <col style={{width: '50%'}}/>
                                    <col style={{width: 'auto'}}/>
                                </colgroup>
                                <tbody>
                                <tr>
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

                            <table className="table-basic panel-box-table">
                                <caption>유역</caption>
                                <colgroup>
                                    <col style={{width: '50%'}}/>
                                    <col style={{width: 'auto'}}/>
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th>유역면적<span className="unit-th">(EL.m)</span></th>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <th>연간용수공급용량<span className="unit-th">(EL.m)</span></th>
                                    <td>{selectWaterLevel && selectWaterLevel.properties.ttlst}</td>
                                </tr>
                                </tbody>
                            </table>

                            <table className="table-basic panel-box-table">
                                <caption>저수지</caption>
                                <colgroup>
                                    <col style={{width: '50%'}}/>
                                    <col style={{width: 'auto'}}/>
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th>저수면적<span className="unit-th">(EL.m)</span></th>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <th>총 저수량<span className="unit-th">(EL.m)</span></th>
                                    <td>{selectWaterLevel && selectWaterLevel.properties.ttlst}</td>
                                </tr>
                                <tr>
                                    <th>유효저수량<span className="unit-th">(EL.m)</span></th>
                                    <td>{selectWaterLevel && selectWaterLevel.properties.efstr}</td>
                                </tr>
                                <tr>
                                    <th>저수면적<span className="unit-th">(EL.m)</span></th>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <th>총 저수량<span className="unit-th">(EL.m)</span></th>
                                    <td>{selectWaterLevel && selectWaterLevel.properties.ttlst}</td>
                                </tr>
                                <tr>
                                    <th>유효저수량<span className="unit-th">(EL.m)</span></th>
                                    <td>{selectWaterLevel && selectWaterLevel.properties.efstr}</td>
                                </tr>
                                <tr>
                                    <th>저수면적<span className="unit-th">(EL.m)</span></th>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <th>총 저수량<span className="unit-th">(EL.m)</span></th>
                                    <td>{selectWaterLevel && selectWaterLevel.properties.ttlst}</td>
                                </tr>
                                <tr>
                                    <th>유효저수량<span className="unit-th">(EL.m)</span></th>
                                    <td>{selectWaterLevel && selectWaterLevel.properties.efstr}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default React.memo(FloodL4WaterLevelArea);
