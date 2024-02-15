import { getDroughtExpUntDatas } from "@common/axios/drought";
import BaseChart from "@common/chart/BaseChart";
import BaseGrid from "@common/grid/BaseGrid";
import { Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

/**
 * 가뭄 표출단위선택 팝업
 */

const radioList = [{name:'위성토양수분',value:'l3sm'},{name:'가뭄지수',value:'l4d4'},{name:'가뭄 해갈 강우량',value:'l4dr'}]

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
                /**심각 */
                0: {
                    type: 'line',
                    borderColor: '#FF0000',
                    yMin: -10,
                    yMax: -10,
                    borderWidth: 2,
                    label: {
                        display: true,
                        backgroundColor: '#00ff0000',
                        borderRadius: 5,
                        rotation: 'auto',
                        position: 'end',
                        content: '심각( -10 ~ )',
                        font: {
                            size: 12,
                        }
                    },
                },
                /**경계 */
                1: {
                    type: 'line',
                    borderColor: '#FFAA01',
                    borderWidth: 2,
                    yMin: -5,
                    yMax: -5,
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
                    yMin: -2,
                    yMax: -2,
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
                    yMin: 0,
                    yMax: 0,
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
                text: "SWDI",
                font: {
                  size: 10,
                },
            },
            ticks: {
                stack: true,
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
                            , gpcp: obj.pcp === 0 ? '-' : obj.pcp
                            , gl3sm: obj.l3sm === 0 ? '-' : obj.l3sm
                            , gl4dr: obj.l4dr === 0 ? '-' : obj.l4dr
                            , gl4d4: obj.l4d4 === 0 ? '-' : obj.l4d4
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
        {accessor: 'gpcp', Header: '강수량', width: 200, align: 'center'},
        {accessor: 'gl3sm', Header: '위성토양수분', width: 200, align: 'center'},
        {accessor: 'gl4d4', Header: '가뭄지수', width: 200, align: 'center'},
        {accessor: 'gl4dr', Header: '가뭄 해갈 강우량', width: 200, align: 'center'},
    ]

    //테이블 ref
    const gridRef = useRef({})
    //데이터 ref
    const rows = useMemo(()=>{ return [ ] },[])

    const [radioValue, setRadioValue] = useState('l3sm')

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
            dataset.map((obj)=>{
                labels.push(obj.date)
                datas.push(obj[radioValue] === 0 ? NaN : obj[radioValue])
            })

            
            

            if(radioValue === 'l4d4'){
                chartRef.current.updateOptions = charTL4DrOption
            }else{

                const minValue = Math.min(...datas)
                const maxValue = Math.max(...datas)
                const percentage = 50
                chartDefaultOption.scales.y.min = (minValue - (minValue * (percentage / 100)))
                chartDefaultOption.scales.y.max = (maxValue + (maxValue * (percentage / 100)))
                chartRef.current.updateOptions = chartDefaultOption
            }

            chartInfoRef.current.labels = labels
            chartInfoRef.current.datasets.push({
                label: radioValue === 'l3sm' ? '위성토양수분' : radioValue === 'l4d4' ? '가뭄지수(vol.%)' : radioValue === 'l4dr' ? '가뭄해갈강우량(mm/day)' : radioValue,
                type: 'line',
                pointRadius: 1,
                borderWidth: 1,
                data:datas,
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
                            <h4 className="radio-title">차트 데이터</h4>
                            <div className="radio-list">
                                {radioList.map((item)=>renderRadio(item))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-row">
                    <div className="panel-box">
                        <div className="chart-unit-warp">
                            <span className="chart-unit">{radioValue === 'l3sm' ? '위성토양수분' : radioValue === 'l4d4' ? '가뭄지수(vol.%)' : radioValue === 'l4dr' ? '가뭄해갈강우량(mm/day)' : radioValue}</span>
                        </div>
                        <BaseChart width={'100%'} height={260} ref={chartRef} chartType={'Line'} title={''}/>
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
