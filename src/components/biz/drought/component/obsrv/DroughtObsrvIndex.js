import BaseChart from "@common/chart/BaseChart";
import BaseGrid from "@common/grid/BaseGrid";
import DroughtObsrvIndexConfig from "@gis/config/DroughtObsrvIndexConfig";
import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";

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
        labels: ['21-10-01','21-10-02','21-10-03','21-10-04','21-10-05','21-10-06','21-10-07','21-10-08','21-10-09','21-10-10'],
        datasets: [],
    })

    const columns = [
        {accessor: 'date', Header: '해갈 시점', width: 120, align: 'center'},
        {accessor: 'SWDI', Header: 'SWDI', width: 200, align: 'center'},
        {accessor: 'precipitation', Header: '강우량', width: 200, align: 'center'},
    ]

    const columns2 = [
        {accessor: 'date', Header: '해갈 시점', width: 120, align: 'center'},
        {accessor: 'SWDI', Header: 'SWDI', width: 200, align: 'center'},
    ]

    //테이블 ref
    const gridRef = useRef({})
    const grid2Ref = useRef({})
    //데이터 ref
    const rows = useMemo(()=>{ return [  ] },[])
    const rows2 = useMemo(()=>{ return [  ] },[])

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
                'y1': {
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
                    }
                    
                },
                'y2': {
                    type: 'linear',
                    position: 'right',
                    grid: {
                        display: false//격자 제거
                    },
                    title: {
                        display: false,
                        text: "강우량(mm)",
                        font: {
                          size: 10,
                        },
                    },
                    ticks: {
                        stack: true,
                    }
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


    //DroughtObsrvIndexConfig
    //지점이 선택되었을시 토양수분 API로 가져온후 차트에 데이터 매핑 ( 현재 API x )
    useEffect(()=>{
        
        if(selectObs){


            //*******API*************/

            chartInfoRef.current.datasets = []
            let dataset = DroughtObsrvIndexConfig

            let label = []  //날짜 x 축
            let swdi = [] // 실측 토양 수분
            let precipitation = [] // 강우량
            

            dataset.map((obj)=>{
                label.push(obj.date)
                swdi.push(obj.SWDI  === '' ? NaN : Number(obj.SWDI))
                precipitation.push(obj.precipitation  === '' ? NaN : Number(obj.precipitation))
            })
            
            chartInfoRef.current.labels = label

            chartInfoRef.current.datasets.push({
                label: 'SWDI',
                type: 'line',
                yAxisID: 'y1',
                pointRadius: 1,
                borderWidth: 1,
                borderColor: '#54A6E7',
                backgroundColor: '#54A6E7',
                data:swdi,
            })

            chartInfoRef.current.datasets.push({
                label: '강우량',
                type: 'bar',
                yAxisID: 'y2', 
                borderColor: '#6A58A1',
                backgroundColor: '#6A58A1',
                data: precipitation,
            })

            chartRef.current.provider = chartInfoRef.current

            grid2Ref.current.provider = dataset
            //gridRef.current.provider = dataset

        }

    },[selectObs])


    return (
        <>
            <div className="content-col">
                <div className="content-row">
                    <div className="panel-box">
                        <div className="number-dashboard">
                            <div className="nd-item">
                                <h4 className="nd-item-title">현재 가뭄 상태</h4>
                                <div className="nd-item-body">정상</div>
                            </div>
                            <div className="nd-item">
                                <h4 className="nd-item-title">관측소 해갈 강우량(mm)</h4>
                                <div className="nd-item-body">80</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-row">
                    <div className="panel-box">
                        <div className="chart-unit-warp">
                            <span className="chart-unit">SWDI</span>
                            <span className="chart-unit">강우량(mm)</span>
                        </div>
                        <BaseChart width={'100%'} height={260} ref={chartRef} chartType={'Line'} title={''}/>
                    </div>
                </div>
            </div>

            <div className="content-col">
                <div className="content-row height-100">
                    <div className="panel-box height-100">
                        <div className="panel-box-header">
                            <h4 className="panel-box-title">가뭄 지수 자료</h4>
                        </div>
                        <div className="table-wrap" style={{height: 360, overflowY: 'auto'}}>
                            <BaseGrid ref={grid2Ref} columns={columns2} provider={rows2} className={'table-basic'}/>
                        </div>


                    </div>
                </div>
            </div>
            <div style={{display: 'flex'}}>


                {/* <div className="content-row">
                    <div className="content-row-header">
                        <h2 className={"content-row-title"}>강우 해갈 데이터
                            <Tooltip placement="right-start" title={
                                <React.Fragment>
                                    <div className="tooltip-content-wrap">
                                        <h5 className="tooltip-title">강우 해갈(drought relief)의 정의</h5>
                                        <p className="tooltip-content">
                                            1. 가뭄 판단 기준 심각 단계 7일 이상 <br/>
                                            2. 가뭄 판단 기준 정상 단계 15일 지속
                                        </p>
                                    </div>
                                </React.Fragment>
                            }>
                                <IconButton className={'tooltip-icon'}></IconButton>
                            </Tooltip>
                        </h2>
                    </div>

                    <div className="panel-box" style={{height: 360, overflowY: 'auto'}}>
                        <BaseGrid ref={gridRef} columns={columns} provider={rows} className={'table-basic'} />
                    </div>
                </div> */}
            </div>
            
        </>
    )
}

export default React.memo(DroughtObsrvIndex);
