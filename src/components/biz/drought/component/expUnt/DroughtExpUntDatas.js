import BaseChart from "@common/chart/BaseChart";
import BaseGrid from "@common/grid/BaseGrid";
import { Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

/**
 * 가뭄 표출단위선택 팝업
 */

const radioList = [{name:'위성토양수분',value:'swdi2'},{name:'가뭄지수',value:'swdi3'},{name:'가뭄 해갈 강우량',value:'swdi4'}]

const DroughtExpUntDatas = () => {

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


    const columns = [
        {accessor: 'date', Header: '관측일자', width: 120, align: 'center'},
        {accessor: 'swdi', Header: '강수량', width: 200, align: 'center'},
        {accessor: 'swdi2', Header: '위성토양수분', width: 200, align: 'center'},
        {accessor: 'swdi3', Header: '가뭄지수', width: 200, align: 'center'},
        {accessor: 'swdi4', Header: '가뭄 해갈 강우량', width: 200, align: 'center'},
    ]

    //테이블 ref
    const gridRef = useRef({})
    //데이터 ref
    const rows = useMemo(()=>{ return [ ] },[])

    const [radioValue, setRadioValue] = useState('swdi2')

    useEffect(()=>{

        gridRef.current.provider = [
            {date:'1',swdi:'1',swdi2:'1',swdi3:'1',swdi4:'1'},
            {date:'2',swdi:'2',swdi2:'2',swdi3:'2',swdi4:'2'},
            {date:'3',swdi:'3',swdi2:'3',swdi3:'3',swdi4:'3'},
            {date:'4',swdi:'4',swdi2:'4',swdi3:'4',swdi4:'4'},
            {date:'5',swdi:'5',swdi2:'5',swdi3:'5',swdi4:'5'},
        ]

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
        console.info(radioValue)
        gridRef.current.highlight = radioValue
    },[radioValue])

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
                            <span className="chart-unit">토양수분(~)</span>
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
