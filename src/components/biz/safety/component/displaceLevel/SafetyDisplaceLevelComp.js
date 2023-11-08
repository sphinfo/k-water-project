import BaseChart from "@common/chart/BaseChart";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import { SET_DETAIL_DATAS_DEL } from "@redux/actions";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import pin from "@images/point-icon.png"
import { G$addLayer, G$removeLayer } from "@gis/util";

const SafetyDisplaceLevelComp = () => {

    const dispatch = useDispatch()
    const detailCompDatas = useSelector(state => state.safety.detailCompDatas);
    const selectFeature = useSelector(sate => sate.safety.selectFeature)

    const chartRef = useRef({})

    const chartInfoRef = useRef({
        labels: ['21-10-01','21-10-02','21-10-03','21-10-04','21-10-05','21-10-06','21-10-07','21-10-08','21-10-09','21-10-10'],
        datasets: [],
    })

    //지점 pin 레이어
    const safetyPinLayer = useRef()

    useEffect(()=>{

        safetyPinLayer.current = new BaseEntityCollection({name:'safetyPinLayer', image: pin})
        G$addLayer(safetyPinLayer.current)

        /** example 옵션 생성 */
        chartRef.current.updateOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                },
            }
        }
        
        return()=>{

            G$removeLayer(safetyPinLayer.current)

        }
    },[])

    useEffect(()=>{
        console.info(selectFeature)
    },[selectFeature])

    // useEffect(()=>{
    //     if(detailCompDatas.length > 0){
            

    //         chartInfoRef.current.datasets = []

    //         let dataset = [10, 13, 17, 18, 23, 20, 18, 17, 21, 23]


    //         detailCompDatas.map((obj, i)=>{

    //             safetyPinLayer.current._addFeature(obj.lon, obj.lat, {})

    //             //샘플 데이터
    //             let updatedDataset = dataset.map(value => {
    //                 let multiplier = Math.random() < 0.5 ? 1 : 5;
    //                 return value + multiplier;
    //             });

    //             chartInfoRef.current.datasets.push({data:updatedDataset, tension: 0.4, label: 'D'+i })
    //         })
    //         chartRef.current.provider = chartInfoRef.current
    //     }
    // },[detailCompDatas])

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
        if(detailCompDatas.length > 0){
            dispatch({type: SET_DETAIL_DATAS_DEL, delData: obj})
        }
        
    }

    return (
        <>
            <div className="img-wrap">
                <h2>그래프</h2>
                <BaseChart width={200} height={250} ref={chartRef} chartType={'Line'} title={''}/>
            </div>
            <div>
                <h2>Point</h2>
                {detailCompDatas.map((obj, i)=> renderPointInfo(obj, i) )}
            </div>
        </>
    )
}

export default React.memo(SafetyDisplaceLevelComp);
