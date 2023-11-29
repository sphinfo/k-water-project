import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseChart from "@common/chart/BaseChart";
import "chartjs-plugin-annotation";
import SafetyChartConfig from "@gis/config/SafetyChartConfig";
import FloodChangeDataConfig from "@gis/config/FloodChangeDataConfig";


const FloodL4WaterLevel = () => {

    const { selectWaterLevel } = useSelector(state => state.flood)

    //차트 ref
    const chartRef = useRef({})

    //차트 dataRef
    const chartInfoRef = useRef({
        labels: [],
        datasets: []
    })

    /** 초기설정 **/
    useEffect(()=>{

        /** example 옵션 생성 */
        chartRef.current.updateOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
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
                    }
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

        return()=>{

        }

    }, [])

    //수위 레이어 선택이 되었을시
    useEffect(()=>{

        chartInfoRef.current.labels = []
        chartInfoRef.current.datasets = []

        //수위 지점 select get Feature
        if(selectWaterLevel){
            let sampleDatas = FloodChangeDataConfig
            //const random = Math.floor(Math.random() * sampleDatas.length)

            let date = []  //날짜
            let estWl = [] //위성기반 계측수위
            let obsWl = [] //실제계측수위

            sampleDatas.map((obj)=>{
                date.push(obj.date)
                estWl.push(obj.estWl  === '' ? NaN : Number(obj.estWl))
                obsWl.push(obj.obsWl  === '' ? NaN : Number(obj.obsWl))
            })

            chartInfoRef.current.datasets.push({
                tension: 0.4,
                data:estWl,
                label: '위성 기반 계측 수위',
                pointRadius: 1,
                borderWidth: 1,
                borderColor: '#FF9933',
                backgroundColor: '#FF9933',
            })

            //차트 data push
            chartInfoRef.current.datasets.push({
                tension: 0.4,
                data: obsWl,
                label: '실제 계측 수위',
                pointRadius: 1,
                borderWidth: 1,
                borderColor: '#54A6E7',
                backgroundColor: '#54A6E7',
            })

            chartInfoRef.current.labels = date
            
            chartRef.current.provider = chartInfoRef.current
        }


    },[selectWaterLevel])

  

    return (
        <>
            <div className="content-row-header">
                <h2 className="content-row-title">수위 변화 그래프</h2>
            </div>
            <div className="panel-box">
                    <BaseChart width={260} height={230} ref={chartRef} data={chartInfoRef} chartType={'Line'}/>
            </div>
        </>
    )
}

export default React.memo(FloodL4WaterLevel);
