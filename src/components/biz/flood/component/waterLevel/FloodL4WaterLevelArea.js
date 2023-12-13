import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseChart from "@common/chart/BaseChart";
import "chartjs-plugin-annotation";
import FloodWaterLevelStationDataConfig from "@gis/config/FloodWaterLevelStationDataConfig";


const FloodL4WaterLevelArea = () => {

    const { selectWaterLevel } = useSelector(state => state.flood)

    //차트 ref
    const chartRef = useRef({})

    const [satationInfo, setStationInfo] = useState(false)

    //차트 dataRef
    const chartInfoRef = useRef({
        datasets: [50],
        backgroundColor: '#C5DCFF'
    })

    //** 샘플 데이터 에서 수위 정보 추출 */
    useEffect(()=>{

        let stationInfos = FloodWaterLevelStationDataConfig
        
        if(selectWaterLevel){
            const {properties} = selectWaterLevel
            stationInfos.map((obj)=>{
                if(properties.name.indexOf(obj.name) > -1){
                    setStationInfo(obj)
                }
            })
        }

    },[selectWaterLevel])

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
                                <td>{selectWaterLevel && selectWaterLevel.properties.value}</td>
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
                    <h3 className="panel-box-title">저수지</h3>
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
                            <td>{satationInfo && satationInfo.waterStor}</td>
                        </tr>
                        <tr>
                            <th>총 저수량<span className="unit-th">(EL.m)</span></th>
                            <td>{satationInfo && satationInfo.ttlst}</td>
                        </tr>
                        <tr>
                            <th>유효저수량<span className="unit-th">(EL.m)</span></th>
                            <td>{satationInfo && satationInfo.efstr}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default React.memo(FloodL4WaterLevelArea);
