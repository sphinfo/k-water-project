import React, { useEffect, useRef, useState } from "react";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FLOOD_DAMAGE_LAYER } from "@redux/actions";
import BaseChart from "@common/chart/BaseChart";
import { G$arrayGetMinMax, G$paramWidget, G$setNumberFixedKomma } from "@gis/util";
import FloodChangeDataConfig from "@gis/config/FloodChangeDataConfig";
import FloodL4ChartConfig from "@gis/config/FloodL4ChartConfig";

/**
 * 홍수 - 수체 ( 활용주제도 )
 */

const indexName = {0:'수체', 1:'초지', 2:'목지', 3:'나지', 4:'건물'}

const FloodL4WaterBodyWidget = () => {

    const dispatch = useDispatch()
    /**
     * selectFloodDamageLayer : 침수피해지도 
     */
    const { selectFloodDamageLayer, selectWaterLevel } = useSelector(state => state.flood)

    const chartRef = useRef()
    const chartInfoRef = useRef({
        labels: ['목지','수체','건물','나지','초지'],
        datasets: [],
    })

    const [max, setMax] = useState('')
    const [min, setMin] = useState('')
    const [maxArea, setMaxArea] = useState(0)

    //widget 이 닫힐때 주제도 침수피해 off
    useEffect(()=>{
        return () =>{
            dispatch({type:FLOOD_DAMAGE_LAYER, selectFloodDamageLayer: false})
        }
    },[])

    useEffect(()=>{

        if(selectFloodDamageLayer){

            let data = FloodL4ChartConfig[`${selectFloodDamageLayer.filename}`]

            if(data && data.length>0){

                let datas = [data[2],data[0],data[4],data[1],data[3]]
                setMaxArea(G$setNumberFixedKomma(data[5]))

                setMin(`${chartInfoRef.current.labels[G$arrayGetMinMax(datas).min]} - ${G$setNumberFixedKomma(datas[G$arrayGetMinMax(datas).min])}`)
                setMax(`${chartInfoRef.current.labels[G$arrayGetMinMax(datas).max]} - ${G$setNumberFixedKomma(datas[G$arrayGetMinMax(datas).max])}`)
                //['목지','수체','건물','초지','나지']

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
                    yAxes:{
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)',
                        },
                        ticks:{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: 12,
                        }
                    },
                    xAxes: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)',
                        },
                        ticks:{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: 12,
                        }
                    }
                }

                chartInfoRef.current.datasets = []

                
                //chartInfoRef.current.labels = label

                chartInfoRef.current.datasets.push({
                    type: 'bar',
                    borderColor: ['#35783B', '#557BDF', '#DD59B2', '#A1F8A5', '#F3AC50'],
                    backgroundColor: ['#35783B', '#557BDF', '#DD59B2', '#A1F8A5', '#F3AC50'],
                    data: datas,
                    barThickness: 18,
                    maxBarThickness: 25
                })

                chartRef.current.provider = chartInfoRef.current

            }
            
        }

    }, [selectFloodDamageLayer])
    

    return (
        <>
            <div className="content-body">
                <div className="content-row">
                    <div className="panel-box">
                        <div className="number-dashboard">
                            <div className="nd-item">
                                <h4 className="nd-item-title">전체면적(㎡)</h4>
                                <div className="nd-item-body">{maxArea}</div>
                            </div>
                            <div className="nd-item">
                                <h4 className="nd-item-title">최대 피해 면적(㎡)</h4>
                                <div className="nd-item-body">
                                    <span className="text">{max}</span>
                                </div>
                            </div>
                            <div className="nd-item">
                                <h4 className="nd-item-title">최소 피해 면적(㎡)</h4>
                                <div className="nd-item-body">
                                    <span className="text">{min}</span>
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
