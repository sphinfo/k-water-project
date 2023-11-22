import BaseChart from "@common/chart/BaseChart";
import BaseGrid from "@common/grid/BaseGrid";
import React, { useEffect, useMemo, useRef } from "react";

/**
 * 가뭄 활용주제도 - 가뭄지수
 */
const DroughtObsrvIndex = () => {

    //차트 ref
    const chartRef = useRef({})

    //차트 dataRef
    const chartInfoRef = useRef({
        labels: ['21-10-01','21-10-02','21-10-03','21-10-04','21-10-05','21-10-06','21-10-07','21-10-08','21-10-09','21-10-10'],
        datasets: [],
    })

    const columns = [
        {accessor: 'name', Header: '관측소명', width: 120, align: 'center'},
        {accessor: 'row1', Header: '수위', width: 200, align: 'center'},
        {accessor: 'row2', Header: '수위', width: 200, align: 'center'},
        {accessor: 'row3', Header: '저슈량', width: 200, align: 'center'},
        {accessor: 'row4', Header: '저수율', width: 200, align: 'center'},
    ]

    //테이블 ref
    const gridRef = useRef({})
    //데이터 ref
    const rows = useMemo(()=>{ return [  ] },[])

    

    useEffect(()=>{
        gridRef.current.provider = [
            {name:'제 1 관측소',row1: '203.0', row2: '203.0', row3:'##', row4:'203.0'},
            {name:'제 1 관측소',row1: '203.0', row2: '203.0', row3:'##', row4:'203.0'},
            {name:'제 1 관측소',row1: '203.0', row2: '203.0', row3:'##', row4:'203.0'}]

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
                        maxTicksLimit: 4 //x축 tick 제거
                    }
                }
            }
        }

        let dataset = [10, 13, 17, 18, 23, 20, 18, 17, 21, 23]
        let updatedDataset = dataset.map(value => {
            let multiplier = Math.random() < 0.5 ? 1 : 5;
            return value + multiplier;
        });

        chartInfoRef.current.datasets.push({
            label: '토양수분량',
            type: 'line',
            yAxisID: 'y1', 
            tension: 0.4, 
            pointRadius: 1,
            data:updatedDataset,
        })
        chartInfoRef.current.datasets.push({
            label: '강수량',
            type: 'bar',
            yAxisID: 'y2', 
            data:updatedDataset,
        })

        chartRef.current.provider = chartInfoRef.current

    }, [])

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
                    <BaseGrid ref={gridRef} columns={columns} provider={rows} className={'testGrid'} />
                </div>
            </div>
        </>
    )
}

export default React.memo(DroughtObsrvIndex);
