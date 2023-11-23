import BaseChart from "@common/chart/BaseChart";
import DroughtObsrvMoistureConfig from "@gis/config/DroughtObsrvMoistureConfig";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useRef } from "react";
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

    useEffect(()=>{

        chartRef.current.updateOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    mode: 'index', // 인덱스별로 툴팁 보이기
                    intersect: false, // 마우스 포인터와 각 선의 교차점에 툴팁 표시
                },
            },
            scales: {
                'y1': {
                    type: 'linear',
                    position: 'left',
                    grid: {
                        display: false //격자 제거
                    }
                    
                },
                'y2': {
                    type: 'linear',
                    position: 'right',
                    grid: {
                        display: false//격자 제거
                    }
                },
                x: {
                    grid: {
                        display: false//격자 제거
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 5 //x축 tick 제거
                    }
                }
            }
        }

    }, [])


    //DroughtObsrvMoistureConfig
    //지점이 선택되었을시 토양수분 API로 가져온후 차트에 데이터 매핑 ( 현재 API x )
    useEffect(()=>{

        
        if(selectObs){

            //chartRef.current.provider = chartInfoRef.current
            let dataset = DroughtObsrvMoistureConfig

            let label = []  //날짜 x 축
            let precipitation = [] // 강우량
            let obs = [] // 실측 토양 수분
            let sim = [] //모의 토양 수분

            dataset.map((obj)=>{
                label.push(obj.date)
                precipitation.push(obj.precipitation  === '' ? NaN : Number(obj.precipitation))
                obs.push(obj.obs  === '' ? NaN : Number(obj.obs))
                sim.push(obj.sim  === '' ? NaN : Number(obj.sim))
            })
            
            chartInfoRef.current.labels = label

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
                label: '강수량',
                type: 'bar',
                yAxisID: 'y2', 
                borderColor: '#FF9933',
                backgroundColor: '#FF9933',
                data: precipitation,
            })

            console.info(chartInfoRef.current.datasets)

            chartRef.current.provider = chartInfoRef.current

        }

    },[selectObs])

    return (
        <>
            <div className="content-row-header">
                <h2 className="content-row-title">시계열 토양수분 및 강수량</h2>
            </div>
            <div className="panel-box">
            <BaseChart width={260} height={320} ref={chartRef} chartType={'Line'} title={''}/>
            </div>
        </>
    )
}

export default React.memo(DroughtObsrv);
