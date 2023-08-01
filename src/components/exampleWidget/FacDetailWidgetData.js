import BaseGrid from "@com/grid/BaseGrid";
import BaseChart from "@com/manager/chart/BaseChart";
import React, { useEffect, useRef } from "react";

/** 시설 상세 정보 */
const FacDetailWidgetData = ({dispatch, actions, state}) => {

    const chartRef = useRef({})
    const gridRef = useRef({})
    const columns = [
        {accessor: 'aa', Header: '일시', width: 120, align: 'center'},
        {accessor: 'bb', Header: '저수량', width: 80, align: 'center'},
        {accessor: 'cc', Header: '저수율', width: 80, align: 'center'},
        {accessor: 'dd', Header: '강우량', width: 80, align: 'center'},
        {accessor: 'ee', Header: '유입량', width: 80, align: 'center'},
        {accessor: 'ff', Header: '총방류량', width: 80, align: 'center'},
    ]

    useEffect(()=>{
        if(state.data.length > 0){
            //Grid set data
            gridRef.current.provider = state.data
            //Chart set data
            setChartData(state.data)            
        }
    },[state.data])

    const setChartData = (datas, xCol='aa', yCol='bb') =>{

        let labels = []
        let setData = []

        datas.map((obj)=>{
            labels.push(obj[xCol])
            setData.push(obj[yCol])
        })

        const data = {
            labels: labels,
            datasets: [{
                label: yCol,
                data: setData, 
                borderColor: 'blue',
                yAxisID: 'y',
                radius: 0,
            }],
        };
    
        chartRef.current.provider = data

    }

    
    const onCellClick = (value, origin, ref) =>{
        if(origin.column.id !== 'aa'){
            setChartData(gridRef.current.provider, 'aa', origin.column.id)
        }

    }

    return (
        <>
            <div>
                CHART
                <div className="exChart">

                </div>
                    <BaseChart ref={chartRef} type={'Line'} width={'300'} heigh={'200'}/>
                <div className="exTimebar">
                    
                </div>
                <div className="exGrid">
                    <BaseGrid ref={gridRef} columns={columns} className={'testGrid'} onCellClick={onCellClick}/>
                </div>
            </div>
            
        </>
    )
}

export default React.memo(FacDetailWidgetData);
