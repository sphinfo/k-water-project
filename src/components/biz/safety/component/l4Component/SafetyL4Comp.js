import BaseChart from "@common/chart/BaseChart";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import pin from "@images/point-icon.png"
import IconButton from '@mui/material/IconButton';
import pin1 from "@images/point-icon-1.svg"
import pin2 from "@images/point-icon-2.svg"
import { G$RandomId, G$removeLayer } from "@gis/util";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

const SafetyL4Comp = () => {

    /**
     * detailSearchTabType : 탭 정보
     * selectFeature : feature 선택정보
     * select3Level : 3레벨 선택정보
     * select4Level : 4레벨 선택정보
     * displaceLevel : 변위성분 
     */
    const { detailSearchTabType, selectFeature, select3Level, select4Level, displaceLevel } = useSelector(state => state.safety)

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
        safetyPinLayer.current = new BaseEntityCollection({name:'safetyPinLayer', image: pin1})
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

    // useEffect(()=>{

    //     if(displaceLevel){
    //         resetLayer()
    //         chartRef.current.provider = chartInfoRef.current.datasets = []
    //         setCompList([])
    //     }

    // },[displaceLevel])


    //다른 레이어가 선택이 되면 비교값 초기화  ( pin layer / point text / chart dadta)
    useEffect(()=>{
        safetyPinLayer.current.entities.removeAll()
        chartRef.current.provider = chartInfoRef.current.datasets = []
        setCompList([])
    },[select4Level, select3Level, displaceLevel])

    const addData = () =>{
        //safetyPinLayer.current._addFeature(selectFeature.lon, selectFeature.lat, {id: selectFeature.featureId})
        let {clickPosition, properties} = selectFeature

        //차트에 데이터 Max 2개
        if(chartInfoRef.current.datasets.length < 2){

            //P1 / P2
            //let pointNm = `P${chartInfoRef.current.datasets.length+1}`
            let pointNm = ''
            //누적데이터가 없을시 P1
            if(chartInfoRef.current.datasets.length === 0){
                pointNm = `P1`
            }else{
                //두개만 들어가야 해서 하나만 있음
                pointNm = chartInfoRef.current.datasets[0].label === 'P1' ? 'P2' : 'P1'
            }


            //geoserver 에서 가지고온 데이터 random id 생성
            properties = {...properties, ...{id:G$RandomId(), pointNm: pointNm}}

            //비교 point layer 등록
            safetyPinLayer.current._addFeature({
                lng:clickPosition.longitude,
                lat:clickPosition.latitude,
                properties,
                img:pointNm === `P1` ? pin1 : pin2
            })

            /* 샘플 데이터 */
            let dataset = [10, 13, 17, 18, 23, 20, 18, 17, 21, 23]
            let updatedDataset = dataset.map(value => {
                let multiplier = Math.random() < 0.5 ? 1 : 5;
                return value + multiplier;
            });

            //차트 data push
            chartInfoRef.current.datasets.push({
                tension: 0.4,
                data:updatedDataset,
                label: pointNm,
                pointRadius: 0,
                id: properties.id,
                borderColor: pointNm === 'P1' ? '#54A6E7' : '#FF9933',
                backgroundColor: pointNm === 'P1' ? '#54A6E7' : '#FF9933',
            })
            chartRef.current.provider = chartInfoRef.current

            //setCompList(prevList => [...prevList, selectFeature])
            setCompList(prevList => [...prevList, {clickPosition, properties}])

        }
        //safetyPinLayer.current._addFeature(clickPosition.longitude, selectFeature.latitude, {id: selectFeature.featureId})


    }

    const removeData = (removeObj) =>{
        //하나 이상일때 제거
        if(chartInfoRef.current.datasets.length > 1){
            /* 차트 데이터 제거 */
            //chartInfoRef.current.datasets = chartInfoRef.current.datasets.filter(obj => obj.label !== removeObj.featureId)
            chartInfoRef.current.datasets = chartInfoRef.current.datasets.filter(obj => obj.id !== removeObj.properties.id)
            chartRef.current.provider = chartInfoRef.current

            /* point text 데이터 제거 */
            //setCompList(prevList => prevList.filter(item => item.featureId !== removeObj.featureId))
            setCompList(prevList => prevList.filter(item => item.properties.id !== removeObj.properties.id))

            /* point Feature 제거 */
            safetyPinLayer.current.removeEntityById(removeObj.properties.id)
            //safetyPinLayer.current.removeEntityById(removeObj.featureId)
        }
    }

    const renderPointInfo = (obj, i) =>{
        return (
            <div className={`panel-box point-box ${obj.properties.pointNm === 'P1' ? 'point-1' : 'point-2'}`}/* point-1 ~ point-5 개별 색상 클래스*/ style={{color:'black'}} key={i}>
                <div className="panel-box-header">
                    <div className="point-icon"></div>
                    <h2 className={"panel-box-title"}>{obj.properties.pointNm}</h2>
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
