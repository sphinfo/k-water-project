import BaseChart from "@common/chart/BaseChart";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import pin from "@images/point-icon.png"
import { G$removeLayer } from "@gis/util";
import IconButton from '@mui/material/IconButton';

const SafetyL4Comp = () => {

    /**
     * detailSearchTabType : 탭 정보
     * selectFeature : feature 선택정보
     * select4Level : 4레벨 선택정보
     */
    const { detailSearchTabType, selectFeature, select4Level } = useSelector(state => state.safety)

    //Chart Ref
    const chartRef = useRef({})

    //차트 데이터 Ref 
    const chartInfoRef = useRef({
        //X축 
        labels: ['21-10-01','21-10-02','21-10-03','21-10-04','21-10-05','21-10-06','21-10-07','21-10-08','21-10-09','21-10-10'],
        //Y축
        datasets: [],
    })

    //비교 포인트 info list
    const [compList, setCompList] = useState([])

    //지점 pin 레이어
    const safetyPinLayer = useRef()

    //초기 옵션 추가
    useEffect(()=>{
        safetyPinLayer.current = new BaseEntityCollection({name:'safetyPinLayer', image: pin})
        /** example 옵션 생성 */
        chartRef.current.updateOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                }
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
        
        //창이 닫히면 pinlayer 제거
        return()=>{
            G$removeLayer(safetyPinLayer.current.layer)
        }
    },[])

    //grid 레이어가 선택이 되면 pinlayer 추가
    useEffect(()=>{
        if(selectFeature){

            //properties 의 값으로 CSV값을 가져와야 하는데 매핑되는 지점이 없음
            //feature 에서 id가 존재하는지 모르겠음
            // const findData = chartInfoRef.current.datasets.some(item => item.label === selectFeature.featureId)
            // if(!findData){
            //     //데이터 추가
            //     addData()
            // }

            addData()
        }
    },[selectFeature])


    //4레벨 레이어 선택이 해제되면 pinLayer remove
    useEffect(()=>{
        if(!select4Level){
            safetyPinLayer.current.entities.removeAll()
        }
    },[select4Level])

    const addData = () =>{
        //safetyPinLayer.current._addFeature(selectFeature.lon, selectFeature.lat, {id: selectFeature.featureId})
        const {clickPosition, properties} = selectFeature
        //safetyPinLayer.current._addFeature(clickPosition.longitude, selectFeature.latitude, {id: selectFeature.featureId})

        safetyPinLayer.current._addFeature(clickPosition.longitude, clickPosition.latitude, properties)
        console.info(clickPosition)

        /* 샘플 데이터 */
        let dataset = [10, 13, 17, 18, 23, 20, 18, 17, 21, 23]
        let updatedDataset = dataset.map(value => {
            let multiplier = Math.random() < 0.5 ? 1 : 5;
            return value + multiplier;
        });
        chartInfoRef.current.datasets.push({
            tension: 0.4, 
            data:updatedDataset, 
            //label: selectFeature.featureId,
            label: properties.GRAY_INDEX,
            pointRadius: 0
        })
        chartRef.current.provider = chartInfoRef.current

        //setCompList(prevList => [...prevList, selectFeature])
        setCompList(prevList => [...prevList, {clickPosition, properties}])
    }

    const removeData = (removeObj) =>{
        //하나 이상일때 제거
        if(chartInfoRef.current.datasets.length > 1){
            /* 차트 데이터 제거 */
            chartInfoRef.current.datasets = chartInfoRef.current.datasets.filter(obj => obj.label !== removeObj.featureId)
            chartRef.current.provider = chartInfoRef.current

            /* point 데이터 제거 */
            setCompList(prevList => prevList.filter(item => item.featureId !== removeObj.featureId))

            /* point Feature 제거 */
            safetyPinLayer.current.removeEntityById(removeObj.featureId)
        }
    }

    const renderPointInfo = (obj, i) =>{
        return (
            <div className={"panel-box point-box point-1"}/* point-1 ~ point-5 개별 색상 클래스*/ style={{color:'black'}} key={i}>
                <div className="panel-box-header">
                    <div className="point-icon"></div>
                    <h2 className={"panel-box-title"}>선택 지점명</h2>
                    <IconButton onClick={()=>{removeData(obj)}} className={"popup-close-btn"}></IconButton>
                </div>
                <div className={"panel-body"}>
                    lat:{obj.clickPosition.latitude} / lon:{obj.clickPosition.longitude}
                </div>
            </div>
        )
    }

    return (
        <>
            <div style={{display: detailSearchTabType === 'comp' ? '' : 'none'}}>
                <div className="content-row">
                <div className="content-row-header">
                    <h2 className={"content-row-title"}>그래프</h2>
                </div>
                <div className="panel-box mb-0">
                    <BaseChart width={260} height={270} ref={chartRef} chartType={'Line'} title={''}/>
                </div>
                </div>
                <div className={"content-row"}>
                    <div className="content-row-header">
                        <h2 className={"content-row-title"}>Point</h2>
                    </div>
                    <div className="content-row-body">
                    {compList.map((obj, i)=> renderPointInfo(obj, i) )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(SafetyL4Comp);
