import { getDroughtExpUntDatas } from "@common/axios/drought";
import BaseChart from "@common/chart/BaseChart";
import BaseGrid from "@common/grid/BaseGrid";
import { Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";

/**
 * 가뭄 표출단위선택 팝업
 */

const radioList = [{name:'위성 토양수분',value:'gl3sm'},{name:'가뭄지수',value:'gl4dr'},{name:'가뭄 해갈 강수량',value:'gl4d4'}]

const chartAnotation = {annotations: {
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
}}

const charTL4DrOption = {
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
        y: {
            type: 'linear',
            position: 'left',
            grid: {
                display: false //격자 제거
            },
            min: -15,
            max: 5,
            ticks: {
                stack: true,
            },
        },
        'y2': {
            type: 'linear',
            position: 'right',
            reverse: true ,
            grid: {
                display: false//격자 제거
            },
            min: 0,
            max: 600,
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
                stack: true,
                maxTicksLimit: 4 //x축 tick 제거
            }
        }
    }
}

const chartDefaultOption = {
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
            type: 'linear',
            position: 'left',
            grid: {
                display: false //격자 제거
            },
            title: {
                display: false,
                font: {
                  size: 10,
                },
            },
            ticks: {
                stack: true,
            },
        },
        'y2': {
            type: 'linear',
            position: 'right',
            reverse: true ,
            grid: {
                display: false//격자 제거
            },
            min: 0,
            max: 600,
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
                stack: true,
                maxTicksLimit: 4 //x축 tick 제거
            }
        }
    }
}

const DroughtExpUntDatas = (props) => {

    const {selectType, params} = props
    useEffect(()=>{

        if(selectType && params){
            let param = {type:selectType.id, code: params?.properties[selectType?.valCol]}
            getDroughtExpUntDatas(param).then((response)=>{
                if(response?.result?.data?.length > 0){
                    let datas = response?.result?.data.map((obj)=>{
                        return {...obj
                            , date:obj.createdAt.substring(0,10)
                            , gpcp: obj.pcp === 0 ? '-' : obj.pcp.toFixed(2)
                            , gl3sm: obj.l3sm === 0 ? '-' : obj.l3sm.toFixed(2)
                            , gl4dr: obj.l4dr === 0 ? '-' : obj.l4dr.toFixed(2)
                            , gl4d4: obj.l4d4 === 0 ? '-' : obj.l4d4.toFixed(2)
                        }
                    })
                    gridRef.current.provider = datas
                    setChartData(datas)
                }
            })
        }
    },[selectType, params])

    //차트 ref
    const chartRef = useRef({})

    //차트 dataRef
    const chartInfoRef = useRef({
        labels: [],
        datasets: [],
    })


    const columns = [
        {accessor: 'date', Header: '관측일자', width: 120, align: 'center'},
        {accessor: 'gpcp', Header: '강우량', width: 200, align: 'center'},
        {accessor: 'gl3sm', Header: '위성 토양수분', width: 200, align: 'center'},
        {accessor: 'gl4dr', Header: '가뭄지수', width: 200, align: 'center'},
        {accessor: 'gl4d4', Header: '가뭄 해갈 강수량', width: 200, align: 'center'},
    ]

    //테이블 ref
    const gridRef = useRef({})
    //데이터 ref
    const rows = useMemo(()=>{ return [ ] },[])

    const [radioValue, setRadioValue] = useState('gl3sm')

    useEffect(()=>{

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
                    type: 'linear',
                    position: 'left',
                    grid: {
                        display: false //격자 제거
                    },
                    title: {
                        display: false,
                        text: "SWDI",
                        font: {
                          size: 10,
                        },
                    },
                    ticks: {
                        stack: true,
                    },
                },
                'y2': {
                    type: 'linear',
                    position: 'right',
                    reverse: true ,
                    grid: {
                        display: false//격자 제거
                    },
                    min: 0,
                    max: 600,
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
                        stack: true,
                        maxTicksLimit: 4 //x축 tick 제거
                    }
                }
            }
        }

    }, [])


    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    }

    const renderRadio = (item) =>{
        return (
            <label>
                <input
                    type="radio"
                    value={item.value}
                    checked={radioValue === item.value}
                    onChange={handleRadioChange}
                />
                <span>{item.name}</span>
            </label>
        )
    }

    useEffect(()=>{
        gridRef.current.highlight = radioValue
        setChartData(gridRef.current.provider)
    },[radioValue])

    const setChartData = (dataset=[]) =>{

        chartInfoRef.current.labels = []
        chartInfoRef.current.datasets = []
        if(dataset.length > 0){
            let labels = []
            let datas = []
            let pcp = []
            dataset.map((obj)=>{
                labels.push(obj.date)
                datas.push(obj[radioValue] === 0 ? NaN : obj[radioValue])
                pcp.push(obj.pcp)
            })

            let min, max = 0
            
            
            if(radioValue === 'gl4d4'){ //가뭄 해갈 강수량
                chartDefaultOption.scales.y.min = 0
                chartDefaultOption.scales.y.max = 50
                chartRef.current.updateOptions = chartDefaultOption
            }else if(radioValue === 'gl4dr'){ //가뭄 지수
                charTL4DrOption.scales.y.min = -15
                charTL4DrOption.scales.y.max = 5
                chartRef.current.updateOptions = charTL4DrOption
            }else{
                chartDefaultOption.scales.y.min = 0
                chartDefaultOption.scales.y.max = 60
                chartRef.current.updateOptions = chartDefaultOption
            }

            

            chartInfoRef.current.labels = labels
            chartInfoRef.current.datasets.push({
                label: radioValue === 'gl3sm' ? '위성 토양수분' : radioValue === 'gl4dr' ? '가뭄지수' : radioValue === 'gl4d4' ? '가뭄 해갈 강수량(mm/day)' : radioValue,
                type: 'line',
                pointRadius: 2,
                borderWidth: 0,
                borderColor: 'RED',
                backgroundColor: 'RED',
                data:datas,
            })

            chartInfoRef.current.datasets.push({
                label: '강우량',
                type: 'bar',    
                barThickness: 6,  // number (pixels) or 'flex'
                maxBarThickness: 8, // number (pixels)
                yAxisID: 'y2', 
                borderColor: 'white',
                backgroundColor: 'white',
                data: pcp,
            })

            chartRef.current.provider = chartInfoRef.current
        }
    }

    return (
        <>
            <div className="content-col">
                <div className="content-row">
                    <div className="panel-box">
                        <div className="radio-list-wrap">
                            <h4 className="radio-title">차트 데이터
                                <Tooltip placement="bottom-start" title={
                                    <React.Fragment>
                                        <div className="tooltip-content-wrap">
                                            <p className="tooltip-content">
                                                위성 토양수분, 가뭄지수,  가뭄 해갈, 강수량은  <br/>
                                                "L3SMA3" 토양수분 산출물을 기준으로 산정됨
                                            </p>
                                        </div>
                                    </React.Fragment>
                                }>
                                    <span className="tooltip-icon"></span>
                                </Tooltip>
                            </h4>
                            <div className="radio-list">
                                {radioList.map((item)=>renderRadio(item))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-row">
                    <div className="panel-box">
                        <div className="chart-unit-warp">
                            <span className="chart-unit" onClick={()=>{
                                // charTL4DrOption.plugins.annotation = chartAnotation
                                // chartRef.current.updateOptions = charTL4DrOption
                            }}>{radioValue === 'gl3sm' ? '토양수분(vol.%)' : radioValue === 'gl4dr' ? '가뭄지수' : radioValue === 'gl4d4' ? '가뭄 해갈 강수량(mm/day)' : radioValue}</span>
                            <span className="chart-unit" onClick={()=>{
                                // charTL4DrOption.plugins.annotation = null
                                // chartRef.current.updateOptions = charTL4DrOption
                            }}>강우량(mm)</span>
                        </div>
                        <BaseChart width={'100%'} height={300} ref={chartRef} chartType={'Line'} title={''}/>
                    </div>
                </div>
            </div>
            <div className="content-col">
                <div className="content-row height-100">
                    <div className="panel-box height-100">
                        <div className="table-wrap" style={{height: 360, overflowY: 'auto'}}>
                            <BaseGrid ref={gridRef} columns={columns} provider={rows} className={'table-basic'}/>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default React.memo(DroughtExpUntDatas);
