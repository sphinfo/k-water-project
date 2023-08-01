import BaseChart from "@com/manager/chart/BaseChart";
import { G$removeWidget } from "@gis/util";
import React, { useEffect, useRef } from "react";

const name = 'TimeSeriesSoilChartWidget'

/** 시계열 토양수분 및 강수량 */
const TimeSeriesSoilChartWidget = (props) => {

    const chartRef = useRef({})

    const close = () =>{
        G$removeWidget(name)
    }

    useEffect(()=>{

        return()=>{
            console.info('bye')
        }
    },[])

    useEffect(()=>{

        /** example 옵션 생성 */
        chartRef.current.updateOptions = {
            scales:{
                y: {
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: '토양수분(vol.%)'
                    }
                },
                y1: {
                    display: true,
                    position: 'right',
                    reverse: true,
                    title: {
                        display: true,
                        text: '강수량(mm)'
                    }
                },
            },
            interaction: {
                mode: 'index'
            },
        }


        /** example 데이터 생성 */
        const dataset = [];
        const dataset2 = [];
        let prev = 100;
        let prev2 = 80;
        for (let i = 0; i < 300; i++) {
            prev += 5 - Math.random() * 10;
            dataset.push({x: i, y: Math.floor(prev)});
            prev2 += 5 - Math.random() * 10;
            dataset2.push({x: i, y: Math.floor(prev2)});
        }
          
        const data = {
            labels: Array.from({ length: 300 }, (_, i) => i),
            datasets: [
              {
                label: 'Large Dataset',
                data: dataset, 
                borderColor: 'blue',
                yAxisID: 'y',
                radius: 0,
              },
              {
                label: 'Large Dataset2',
                data: dataset2, 
                backgroundColor: 'rgb(20, 148, 209)',
                type: 'bar',
                yAxisID: 'y1',
                radius: 0,
              },
            ],
        };

        chartRef.current.provider = data

    },[props.param])

    return (
        <>
            <div>
                <h1>시계열 토양수분 및 강수량</h1>
                <button onClick={close}>close</button>
                <div>
                    <BaseChart width={700} height={250} ref={chartRef} chartType={'Line'} title={''}/>
                </div>
                
            </div>
            
        </>
    )
}

export default React.memo(TimeSeriesSoilChartWidget);
