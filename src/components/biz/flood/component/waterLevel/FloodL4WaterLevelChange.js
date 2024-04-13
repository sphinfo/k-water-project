import React, {useEffect, useMemo, useRef, useState} from "react";
import { useSelector } from "react-redux";
import BaseChart from "@common/chart/BaseChart";
import "chartjs-plugin-annotation";
import BaseGrid from "@common/grid/BaseGrid";
import { G$getDateType, G$sortArrayObject } from "@gis/util";
import { getFloodWaterLevelChart, getObsWls } from "@common/axios/flood";
import dayjs from "dayjs";
import FloodWaterLevelStationDataConfig from "@gis/config/FloodWaterLevelStationDataConfig";

const chartOption = {
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
            grid: {
                display: false
            },
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

const FloodL4WaterLevel = () => {

    const { selectWaterLevel } = useSelector(state => state.flood)

    //차트 ref
    const chartRef = useRef({})

    //차트 dataRef
    const chartInfoRef = useRef({
        labels: [],
        datasets: []
    })


    //테이블 ref
    const gridRef = useRef({})
    //데이터 ref
    const rows = useMemo(()=>{ return [  ] },[])
    const columns = [
        {accessor: 'createdAt', Header: '관측 일자', width: 120, align: 'center', title: 'gridAt'},
        {accessor: 'estimatedElev', Header: '실제 계측 수위', width: 200, align: 'center'},
        {accessor: 'referenceElev', Header: '위성 계측 수위', width: 200, align: 'center'},
    ]

    

    /** 초기설정 **/
    useEffect(()=>{

        /** example 옵션 생성 */
        chartRef.current.updateOptions = chartOption

        return()=>{
            chartInfoRef.current.labels = []
            chartInfoRef.current.datasets = []
            if(gridRef.current){
                gridRef.current.provider = []
            }
            
        }

    }, [])

    const [avg, setAvg] = useState(0)
    const [avg2, setAvg2] = useState(0)

    //수위 레이어 선택이 되었을시
    useEffect(()=>{

        chartInfoRef.current.labels = []
        chartInfoRef.current.datasets = []

        let stationInfos = FloodWaterLevelStationDataConfig

        //*******API*************/
        //수위 지점 select get Feature
        if(selectWaterLevel){
            const {name} = selectWaterLevel
            let params = {name:name}
            getFloodWaterLevelChart(params).then((response)=>{
                if(response?.result?.data?.length > 0){

                    let datas = response.result.data
                    let dates = []  //날짜
                    let estWl = [] //위성기반 계측수위
                    let obsWl = [] //실제계측수위

                    

                    let avg = 0
                    let avg2 = 0
                    
                    let realCnt = 0
                    let zeros = 0

                    let paramDates = []
                    
                    datas.map((obj)=>{

                        obj.gridAt = dayjs(obj.createdAt).format('YYYY-MM-DD HH:MM:ss')
                        obj.createdAt = obj.createdAt.substring(0,8)
                        obj.createdAt = G$getDateType(obj.createdAt)
                        obj.formatDate = dayjs(obj.createdAt).format('YYYYMMDD')                        

                        paramDates.push(obj.formatDate)
                    })

                    let sortDatas = G$sortArrayObject(datas, 'formatDate', false)

                    stationInfos.map((obj)=>{
                        if(name.indexOf(obj.name) > -1){
                            let params = {obscd:obj.obscd, dates: paramDates}

                            getObsWls(params).then((response)=>{
                                if(response?.length > 0){

                                    let wamisDatas = []
                                    response.map((res)=>{
                                        if(res?.data?.list){
                                            if(res?.data?.list.length > 0){
                                                wamisDatas.push(res?.data?.list[0])
                                            }
                                        }
                                    })

                                    if(wamisDatas.length > 0){

                                        wamisDatas.forEach((waimsItem) => {
                                            let matchingBs = sortDatas.filter((sortItem) => sortItem.formatDate === waimsItem.ymd);
                                            matchingBs.forEach((matchingB) => {
                                                matchingB.estimatedElev = waimsItem.wl;
                                            })
                                        })
                                    }


                                    


                                    sortDatas.map((sortObj)=>{
                                        dates.push(G$getDateType(sortObj.createdAt))
                                        estWl.push(sortObj.estimatedElev  === 0 ? NaN : Number(sortObj.estimatedElev).toFixed(2))
                                        obsWl.push(sortObj.referenceElev  === 0 ? NaN : Number(sortObj.referenceElev).toFixed(2))
                
                                        sortObj.estimatedElev = Number(sortObj.estimatedElev).toFixed(2)
                                        sortObj.referenceElev = Number(sortObj.referenceElev).toFixed(2)
                
                                        if(Number(sortObj.estimatedElev) !== 0){
                                            realCnt++
                                            avg += Number(sortObj.estimatedElev)
                                        }
                                        
                
                                        if(Number(sortObj.referenceElev) === 0 || Number(sortObj.estimatedElev) === 0){
                                            zeros++
                                        }else{
                                            avg2 += (Number(sortObj.estimatedElev) - Number(sortObj.referenceElev)) < 0 ? Math.abs(Number(sortObj.estimatedElev) - Number(sortObj.referenceElev)) : +(Number(sortObj.estimatedElev) - Number(sortObj.referenceElev)).toFixed(12)
                                        }
    
                                        if(Number(sortObj.estimatedElev) === 0){ sortObj.estimatedElev = '-' }
                                    })
    
                                    if(gridRef.current?.provider){
                                        gridRef.current.provider = G$sortArrayObject(sortDatas, 'formatDate', true)
                                    }
                                    
    
                                    setAvg(avg / realCnt)
                                    setAvg2(avg2 / (datas.length-zeros))

                                    const dataArray = [...estWl, ...obsWl].map(val => Number(val)).filter(value => !isNaN(value))
                                    const minValue = Math.min(...dataArray)
                                    const maxValue = Math.max(...dataArray)
                                    const percentage = 25
                                    chartOption.scales.y.min = minValue < 0 ? minValue : Math.ceil((minValue - (minValue * (percentage / 100))))
                                    chartOption.scales.y.max = Math.ceil((maxValue + (maxValue * (percentage / 100))))
                                    if(chartRef.current){
                                        chartRef.current.updateOptions = chartOption
                                    }
                                    
    
                                    chartInfoRef.current.datasets = []
                                    chartInfoRef.current.labels = []
                                    chartInfoRef.current.datasets.push({
                                        tension: 0.4,
                                        data:estWl,
                                        label: '실제 계측 수위',
                                        pointRadius: 1,
                                        borderWidth: 1,
                                        borderColor: '#FF9933',
                                        backgroundColor: '#FF9933',
                                    })
    
                                    //차트 data push
                                    chartInfoRef.current.datasets.push({
                                        tension: 0.4,
                                        data: obsWl,
                                        label: '위성 기반 계측 수위',
                                        pointRadius: 1,
                                        borderWidth: 1,
                                        borderColor: '#54A6E7',
                                        backgroundColor: '#54A6E7',
                                    })
    
                                    chartInfoRef.current.labels = dates
    
                                    //chart
                                    if(chartRef.current?.provider){
                                        chartRef.current.provider = chartInfoRef.current
                                    }
                                }
                            })
                        }
                    })

                }
            })
        }


    },[selectWaterLevel])

  

    return (
        <>
            <div className="content-col">
                <div className="content-row">
                    <div className="panel-box">
                        <div className="number-dashboard">
                            <div className="nd-item text-blue">
                                <h4 className="nd-item-title">지점 평균수위(m)</h4>
                                <div className="nd-item-body">{isNaN(avg.toFixed(2)) ? '-' : avg.toFixed(2)}</div>
                            </div>
                            <div className="nd-item">
                                <h4 className="nd-item-title">실측/모의 잔차 평균(m)</h4>
                                <div className="nd-item-body">{isNaN(avg2.toFixed(2)) ? '-' : avg2.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-row height-100">
                    <div className="panel-box height-100">
                        <div className="chart-unit-warp">
                            <span className="chart-unit">수위</span>
                        </div>
                        <BaseChart width={'100%'} height={230} ref={chartRef} data={chartInfoRef} chartType={'Line'}/>
                    </div>
                </div>
            </div>

            <div className="content-col">
                <div className="content-row">
                    <div className="panel-box">
                        <div className="table-wrap" style={{height: 360, overflowY: 'auto'}}>
                            <BaseGrid ref={gridRef} columns={columns} provider={rows} className={'table-basic'}/>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default React.memo(FloodL4WaterLevel);
