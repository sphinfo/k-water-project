import BaseChart from "@common/chart/BaseChart";
import BaseGrid from "@common/grid/BaseGrid";
import DroughtObsrvIndexConfig from "@gis/config/DroughtObsrvIndexConfig";
import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

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
        {accessor: 'name', Header: '해갈 시점', width: 120, align: 'center'},
        {accessor: 'row1', Header: '강우량(mm)', width: 200, align: 'center'},
    ]

    //테이블 ref
    const gridRef = useRef({})
    //데이터 ref
    const rows = useMemo(()=>{ return [  ] },[])

    

    useEffect(()=>{
        gridRef.current.provider = [
            {name:'2022.06.24',row1: '52'},
            {name:'2020.11.19',row1: '70.5'},
            {name:'2018.08.26',row1: '176'},
            {name:'2017.07.15',row1: '62'},
            {name:'2016.09.17',row1: '122'},
            {name:'2015.09.07',row1: '122'},
        ]

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
                    },
                    title: {
                        display: true,
                        text: "SWDI",
                        font: {
                          size: 10,
                        },
                    },
                    
                },
                'y2': {
                    type: 'linear',
                    position: 'right',
                    grid: {
                        display: false//격자 제거
                    },
                    title: {
                        display: true,
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

        }

    },[selectObs])

    return (
        <>
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className={"content-row-title"}>시계열 가뭄지수 및 강수량</h2>
                </div>
                <div className="panel-box">
                <BaseChart width={260} height={320} ref={chartRef} chartType={'Line'} title={''}/>
                </div>
            </div>

            <div className="content-row">
                <div className="content-row-header">
                    <h2 className={"content-row-title"}>강우 해갈 데이터
                    </h2>
                </div>
                <div className="panel-box">
                    <BaseGrid ref={gridRef} columns={columns} provider={rows} className={'table-basic'} />
                </div>
            </div>
        </>
    )
}

export default React.memo(DroughtObsrvIndex);
