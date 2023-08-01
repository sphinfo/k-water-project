import BaseChart from "@com/manager/chart/BaseChart";
import { G$removeWidget } from "@gis/util";
import React, { useEffect, useRef } from "react";

const name = 'SoilMoistureChartWidget'

/** 토양수분 지수 */
const SoilMoistureChartWidget = (props) => {

    const close = () =>{
        G$removeWidget(name)
    }

    const chartRef = useRef({})

    useEffect(()=>{

        return()=>{
            console.info('bye')
        }
    },[])

    useEffect(()=>{

        /** example 옵션 생성 */
        chartRef.current.updateOptions = {
            scales:{
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                },
            }
        }


        /** example 데이터 생성 */
        let dataset = [10, 15, 20, 11, 23, 10, 15, 20, 11, 23]
        let dataset2 = [20, 12, 10, 22, 21, 10, 15, 20, 11, 23]
        
          
        const data = {
            labels: Array.from({ length: 10 }, (_, i) => i),
            datasets: [
              {
                label: 'yellow',
                data: dataset, 
                borderColor: 'yellow',
              },
              {
                label: 'blue',
                data: dataset2, 
                backgroundColor: 'blue',
              },
            ],
        };

        chartRef.current.provider = data

    },[props.param])

    return (
        <>
            <div>
                <h1>토양수분 지수</h1>
                <button onClick={close}>close</button>
                <div>
                    {`토양 수분량(%)`}
                    토양에 포함된 수분을~
                </div>
                <div>
                    입력자료
                     * Sentinel-1
                     
                     산출알고리즘
                     *Multiple Linear ~

                </div>
                <div>
                    <BaseChart width={200} height={250} ref={chartRef} chartType={'Bar'} title={'토성별 토양수 특성'}/>    
                </div>
                
            </div>
            
        </>
    )
}

export default React.memo(SoilMoistureChartWidget);
