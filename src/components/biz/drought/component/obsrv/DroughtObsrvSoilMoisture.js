import BaseChart from "@common/chart/BaseChart";
import DroughtObsrvMoistureConfig from "@gis/config/DroughtObsrvMoistureConfig";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useRef } from "react";
import BaseGrid from "@common/grid/BaseGrid";
import { getDroughtObsMoisture } from "@common/axios/drought";
import { G$getDateType } from "@gis/util";
/**
 * 가뭄 활용주제도 - 토양수분
 */
const DroughtObsrv = () => {

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


    //테이블 ref
    const gridRef = useRef({})
    //데이터 ref
    const rows = useMemo(()=>{ return [  ] },[])
    const columns = [
        {accessor: 'date', Header: '관측일자', width: 120, align: 'center'},
        {accessor: 'precipitation', Header: '모의 계측 수위', width: 200, align: 'center'},
        {accessor: 'obs', Header: '실측 계측 수위', width: 200, align: 'center'},
    ]

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
                        text: "토양 수분",
                        rotation: 90,
                        font: {
                          size: 10,
                        },
                    },
                    
                },
                'y2': {
                    type: 'linear',
                    position: 'right',
                    reverse: true ,
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
                },
                x: {
                    grid: {
                        display: false//격자 제거
                    },
                    ticks: {
                        autoSkip: true,
                        crossAlign: 'near',
                        maxTicksLimit: 5, //x축 tick 제거
                        maxRotation: 120,
                        minRotation: -180
                    }
                }
            }
        }

    }, [])


    //DroughtObsrvMoistureConfig
    //지점이 선택되었을시 토양수분 API로 가져온후 차트에 데이터 매핑 ( 현재 API x )
    useEffect(()=>{
        
        if(selectObs){

            chartInfoRef.current.datasets = []

            getDroughtObsMoisture({code:selectObs.properties.code}).then((response)=>{
                if(response.result.data.length > 0){

                    let label = []  //날짜 x 축
                    let precipitation = [] // 강우량
                    let obs = [] // 실측 토양 수분
                    let sim = [] //모의 토양 수분

                    response.result.data.map((obj)=>{
                        
                        obj.date = G$getDateType(obj.createdAt.substring(0,8)) 

                        label.push(obj.date)
                        precipitation.push(obj.precipitation  === '' ? NaN : Number(obj.precipitation))
                        obs.push(obj.obs  === '' ? NaN : Number(obj.obs))
                        sim.push(obj.sim  === '' ? NaN : Number(obj.sim))
                    })

                    //강우(bar)        /실측토양수분/모의토양수분
                    //precipitation   /obs        /sim
                    
                    chartInfoRef.current.labels = label

                    chartInfoRef.current.datasets.push({
                        label: '강우량',
                        type: 'bar',
                        yAxisID: 'y2', 
                        borderColor: '#004478',
                        backgroundColor: '#004478',
                        data: precipitation,
                    })
                    
                    chartInfoRef.current.datasets.push({
                        label: '실측 토양 수분',
                        type: 'line',
                        yAxisID: 'y1',
                        pointRadius: 1,
                        borderWidth: 1,
                        borderColor: '#54A6E7',
                        backgroundColor: '#54A6E7',
                        data:obs,
                    })

                    chartInfoRef.current.datasets.push({
                        label: '모의 토양 수분',
                        type: 'line',
                        yAxisID: 'y1',
                        pointRadius: 1,
                        borderWidth: 1,
                        borderColor: '#FF9933',
                        backgroundColor: '#FF9933',
                        data:sim,
                    })

                    

                    gridRef.current.provider = response.result.data

                    chartRef.current.provider = chartInfoRef.current

                }else{
                    gridRef.current.provider = []

                    chartRef.current.provider = chartInfoRef.current
                }
            })
        }

    },[selectObs])

    return (
        <>
            <div className="content-row-header">
                <h2 className="content-row-title">시계열 토양수분 및 강수량</h2>
            </div>
            <div className="panel-box">
                <div className="chart-unit-warp">
                    <span className="chart-unit">토양 수분</span>
                    <span className="chart-unit">강우량(mm)</span>
                </div>
                <BaseChart width={460} height={260} ref={chartRef} chartType={'Line'} title={''}/>
            </div>
            <div className="panel-box" style={{height: 360, overflowY: 'auto'}}>
                <span className="chart-unit">토양 수분 자료</span>
                <BaseGrid ref={gridRef} columns={columns} provider={rows} className={'table-basic'} />
            </div>
        </>
    )
}

export default React.memo(DroughtObsrv);
