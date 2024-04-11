import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseChart from "@common/chart/BaseChart";
import "chartjs-plugin-annotation";
import FloodWaterLevelStationDataConfig from "@gis/config/FloodWaterLevelStationDataConfig";
import dayjs from "dayjs";
import { getObsWl } from "@common/axios/flood";


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

    const [realWl ,setRealWl] = useState(0)

    //** 샘플 데이터 에서 수위 정보 추출 */
    useEffect(()=>{

        let stationInfos = FloodWaterLevelStationDataConfig
        
        if(selectWaterLevel){
            const {name, date} = selectWaterLevel
            stationInfos.map((obj)=>{
                if(name.indexOf(obj.name) > -1){
                    setStationInfo(obj)
                    let paramDate = dayjs(date).format('YYYYMMDD')
                    let params = {obscd:obj.obscd, startdt: paramDate, enddt: paramDate, output: 'json'}
                    getObsWl(params).then((response)=>{
                        let value = 0
                        if(response?.result?.list?.length > 0){
                            value = Number(response?.result?.list[0].wl)?.toFixed(2)
                        }
                        setRealWl(value)
                    }).catch((e)=>{
                        setRealWl(0)
                    })
                }
            })
        }

    },[selectWaterLevel])

    /** 초기설정 **/
    useEffect(()=>{

        let wl = 0 
        if(selectWaterLevel){
            wl = selectWaterLevel.value.toFixed(2)
        }

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
                            borderColor: 'transparent',
                            backgroundColor: 'rgba(8, 132, 229, 0.1)',

                            borderWidth: 1,
                        },

                        nowBox: {
                            type: 'box',
                            backgroundColor: 'rgba(8, 132, 229, 0.4)',
                            borderColor: 'rgba(8, 132, 229, 0.4)',
                            yMin: 0,
                            yMax: realWl,
                            label: {
                                display: true,
                                color: 'rgba(255,255,255,0.9)',
                                backgroundColor: '#FF9E2B',
                                borderRadius: 5,
                                rotation: 'auto',
                                position: 'center',
                                content: '현수위 ( ' +realWl+ ' EL.m )',
                                font: {
                                    size: 12,
                                }
                            },
                        },

                        /**저수위 */
                        minLine: {
                            type: 'line',
                            borderColor: '#FF9E2B',
                            yMin: satationInfo?.c5 ? satationInfo?.c5 : 0,
                            yMax: satationInfo?.c5 ? satationInfo?.c5 : 0,
                            borderWidth: 2,
                            label: {
                                display: true,
                                backgroundColor: '#FF9E2B',
                                borderRadius: 5,
                                rotation: 'auto',
                                position: 'start',
                                content: '저수위',
                                font: {
                                    size: 12,
                                }
                            },
                        },
                        /**만수위 */
                        maxLine: {
                            type: 'line',
                            borderColor: '#DD4747',
                            borderWidth: 2,
                            yMin: satationInfo?.c2 ? satationInfo?.c2 : 0,
                            yMax: satationInfo?.c2 ? satationInfo?.c2 : 0,
                            label: {
                                display: true,
                                backgroundColor: '#DD4747',
                                borderRadius: 5,
                                rotation: 'auto',
                                position: 'start',
                                content: '만수위',
                                font: {
                                    size: 12,
                                }
                            },
                        },
                        /**위성수위 */
                        sateLine: {
                            type: 'line',
                            borderColor: '#47BFD9',
                            yMin: wl,
                            yMax: wl,
                            borderWidth: 2,
                            label: {
                                display: true,
                                backgroundColor: '#47BFD9',
                                borderRadius: 5,
                                rotation: 'auto',
                                position: 'start',
                                content: '위성수위 ( ' +wl+ ' EL.m )',
                                font: {
                                    size: 12,
                                }
                            },
                        },
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

    }, [realWl, selectWaterLevel])

  

    return (
        <>
            <div className="content-col">
                <div className="content-row">
                    <div className="panel-box">
                        <div className="number-dashboard">
                            <div className="nd-item text-blue">
                                <h4 className="nd-item-title">위성 수위(EL.m)</h4>
                                <div className="nd-item-body">{selectWaterLevel && selectWaterLevel.value.toFixed(2)}</div>
                            </div>
                            <div className="nd-item">
                                <h4 className="nd-item-title">현 수위(EL.m)</h4>
                                <div className="nd-item-body">{realWl !== 0 ? realWl : '-'}</div>
                            </div>
                            <div className="nd-item">
                                <h4 className="nd-item-title">계측 차이(EL.m)</h4>
                                <div className="nd-item-body">{
                                    selectWaterLevel && satationInfo && realWl !== 0 && ( Number(realWl) - Number(selectWaterLevel.value)).toFixed(2)
                                }</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-row height-100">
                    <div className="panel-box height-100">
                        <BaseChart width={'100%'} height={'100%'} ref={chartRef} data={chartInfoRef} chartType={'bar'}/>
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
                                    <th>높이<span className="unit-th">(m)</span></th>
                                    <td>{satationInfo && satationInfo.a0}</td>
                                </tr>
                                <tr>
                                    <th>길이<span className="unit-th">(m)</span></th>
                                    <td>{satationInfo && satationInfo.a1}</td>
                                </tr>
                                <tr>
                                    <th>정상표고<span className="unit-th">(EL.m)</span></th>
                                    <td>{satationInfo && satationInfo.a2}</td>
                                </tr>
                                <tr>
                                    <th>제적<span className="unit-th">(천㎥)</span></th>
                                    <td>{satationInfo && satationInfo.a3}</td>
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
                                    <th>유역면적<span className="unit-th">(㎢)</span></th>
                                    <td>{satationInfo && satationInfo.b0}</td>
                                </tr>
                                <tr>
                                    <th>연간용수공급용량<span className="unit-th">(백만㎥)</span></th>
                                    <td>{satationInfo && satationInfo.b1}</td>
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
                                    <th>저수면적<span className="unit-th">(㎢)</span></th>
                                    <td>{satationInfo && satationInfo.c0}</td>
                                </tr>
                                <tr>
                                    <th>계획홍수위<span className="unit-th">(EL.m)</span></th>
                                    <td>{satationInfo && satationInfo.c1}</td>
                                </tr>
                                <tr>
                                    <th>상시만수위<span className="unit-th">(EL.m)</span></th>
                                    <td>{satationInfo && satationInfo.c2}</td>
                                </tr>
                                <tr>
                                    <th>홍수기제한수위<span className="unit-th">(EL.m)</span></th>
                                    <td>{satationInfo && satationInfo.c3}</td>
                                </tr>
                                <tr>
                                    <th>월류정표고<span className="unit-th">(EL.m)</span></th>
                                    <td>{satationInfo && satationInfo.c4}</td>
                                </tr>
                                <tr>
                                    <th>저수위<span className="unit-th">(EL.m)</span></th>
                                    <td>{satationInfo && satationInfo.c5}</td>
                                </tr>
                                <tr>
                                    <th>총저수용량<span className="unit-th">(백만㎥)</span></th>
                                    <td>{satationInfo && satationInfo.c6}</td>
                                </tr>
                                <tr>
                                    <th>유효저수량<span className="unit-th">(백만㎥)</span></th>
                                    <td>{satationInfo && satationInfo.c7}</td>
                                </tr>
                                <tr>
                                    <th>홍수조절용량<span className="unit-th">(백만㎥)</span></th>
                                    <td>{satationInfo && satationInfo.c8}</td>
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
