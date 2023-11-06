import BaseChart from "@common/chart/BaseChart";
import { G$removeWidget } from "@gis/util";
import React, { useEffect, useRef, useState } from "react";

//변위 속도
const name = 'SafetyDisplaceSpeedWidget'
const SafetyDisplaceSpeedWidget = (props) => {

    // props 데이터 
    const [propsData, setPropsData] = useState([])

    // chart Ref
    const chartRef = useRef({})

    const chartInfoRef = useRef({
        labels: ['21-10-01','21-10-02','21-10-03','21-10-04','21-10-05','21-10-06','21-10-07','21-10-08','21-10-09','21-10-10'],
        datasets: [],
    })

    const close = () =>{
        G$removeWidget(name)
    }

    useEffect(()=>{
        
        /** example 옵션 생성 */
        chartRef.current.updateOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                },
            }
        }


    },[])

    useEffect(()=>{

        const newChartData = props
        setPropsData(prevChartData => [...prevChartData, newChartData])

    },[props])

    useEffect(()=>{

        if(propsData.length > 0){

            chartInfoRef.current.datasets = []

            let dataset = [10, 13, 17, 18, 23, 20, 18, 17, 21, 23]


            propsData.map((obj, i)=>{
                //샘플 데이터
                let updatedDataset = dataset.map(value => {
                    let multiplier = Math.random() < 0.5 ? 1 : 5;
                    return value + multiplier;
                });

                chartInfoRef.current.datasets.push({data:updatedDataset, tension: 0.4, label: 'D'+i })
            })
            chartRef.current.provider = chartInfoRef.current
        }

    },[propsData])


    const renderPointInfo = (obj, i) =>{
        return (
            <div style={{color:'black'}}>
                <h2>선택 지점명</h2>
                <div>
                    <button onClick={()=>{propsDataSlice(obj)}}>X</button>
                    lat:{obj.lat} / lon:{obj.lon}
                </div>
            </div>
        )
    }

    const propsDataSlice = (obj) =>{
        if(propsData.length > 0){
            const filteredData = propsData.filter(item => item.lon !== obj.lon);
            setPropsData(filteredData)
        }
        
    }

    return (
        <>
            <div className="map-popup-box">
                <div className="map-popup-box-header">
                    <h1 className="map-popup-box-title">변위 속도</h1>
                <button onClick={close} className="popup-close-btn"></button>
                </div>
                <div className="map-popup-box-body">
                    <div className="img-wrap">
                        <h2>그래프</h2>
                        <BaseChart width={200} height={250} ref={chartRef} chartType={'Line'} title={''}/>
                    </div>
                    <div>
                        <h2>Point</h2>
                        {propsData.map((obj, i)=> renderPointInfo(obj, i) )}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default React.memo(SafetyDisplaceSpeedWidget);
