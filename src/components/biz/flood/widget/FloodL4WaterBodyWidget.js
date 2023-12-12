import React, { useEffect, useRef, useState } from "react";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FLOOD_DAMAGE_LAYER } from "@redux/actions";
import BaseChart from "@common/chart/BaseChart";
import { G$paramWidget } from "@gis/util";

/**
 * 홍수 - 수체 ( 활용주제도 )
 */

const sample = {store:'WaterBody', layer: '20230718T21water_GS_RGB000102'}

const FloodL4WaterBodyWidget = () => {

    const dispatch = useDispatch()
    /**
     * selectFloodDamageLayer : 침수피해지도 
     */
    const { selectFloodDamageLayer, selectWaterLevel } = useSelector(state => state.flood)

    const chartRef = useRef()
    const chartInfoRef = useRef({
        labels: ['목지','수체','건물','초지','나지'],
        datasets: [50,150,100,130,60],
    })

    //widget 이 닫힐때 주제도 침수피해 off
    useEffect(()=>{
        return () =>{
            dispatch({type:FLOOD_DAMAGE_LAYER, selectFloodDamageLayer: false})
        }
    },[])

    useEffect(()=>{

        if(selectFloodDamageLayer){

            chartRef.current.updateOptions = {
                plugins: {
                    legend: {
                        display: false
                    },
                },
                scales: {
                    'y': {
                        title: {
                            display: true,
                            text: "Area(m2)",
                            font: {
                              size: 10,
                            },
                        },
                    }
                },
            }

            chartInfoRef.current.datasets = []

            //let label = []  //날짜 x 축
            let datas = [50,150,100,130,60]
            
            //chartInfoRef.current.labels = label

            chartInfoRef.current.datasets.push({
                type: 'bar',
                borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                data: datas,
            })

            chartRef.current.provider = chartInfoRef.current
        }

    }, [selectFloodDamageLayer])
    

    return (
        <>
            <div className={"content-body"}>
                <div className="content-row">
                    <div className="panel-box">
                        <div className="number-dashboard">
                            <div className="nd-item">
                                <h4 className="nd-item-title">전체면적(㎡)</h4>
                                <div className="nd-item-body">1,000k</div>
                            </div>
                            <div className="nd-item">
                                <h4 className="nd-item-title">최대 피해 면적(㎡)</h4>
                                <div className="nd-item-body">
                                    <span className="text-naji">나지</span> 380k
                                </div>
                            </div>
                            <div className="nd-item">
                                <h4 className="nd-item-title">최소 피해 면적(㎡)</h4>
                                <div className="nd-item-body">
                                    <span className="text-mokji">목지</span> 30k
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    selectFloodDamageLayer &&
                    <div className="content-row">
                        <div className="panel-box">
                            <BaseChart width={'100%'} height={220} ref={chartRef} chartType={'Bar'} title={''}/>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default React.memo(FloodL4WaterBodyWidget);
