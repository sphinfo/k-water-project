import BaseChart from "@common/chart/BaseChart";
import { G$removeWidget } from "@gis/util";
import React, { useEffect, useRef } from "react";

const name = 'TestChartWidget'

const TestChartWidget = (props) => {

    const close = () =>{
        G$removeWidget(name)
    }

    const chartRef = useRef({})

    useEffect(()=>{

        return()=>{
            
        }
    },[])

    useEffect(()=>{

        /** example 옵션 생성 */
        // chartRef.current.updateOptions = {
        //     scales:{
        //         x: {
        //             stacked: true
        //         },
        //         y: {
        //             stacked: true
        //         },
        //     }
        // }


        /** example 데이터 생성 */
        let dataset = [10, 15, 20, 11, 23, 10, 15, 20, 11, 23]
        let dataset2 = [20, 12, 10, 22, 21, 10, 15, 20, 11, 23]
        
          
        const data = {
            labels: ['Label 1', 'Label 2', 'Label 3'],
            // datasets: [
            //   {
            //     label: 'yellow',
            //     data: dataset, 
            //     borderColor: 'yellow',
            //   },
            //   {
            //     label: 'blue',
            //     data: dataset2, 
            //     backgroundColor: 'blue',
            //   },
            // ],
            datasets: [{
                data: [30, 40, 30],
                backgroundColor: ['red', 'green', 'blue'],
            }],
        };

        chartRef.current.provider = data

        //chartRef.current.toDataURL();

    },[props.param])

    // const url = () =>{
    //     if (chartRef.current) {
    //         const dataUrl = chartRef.current.url; // 차트를 Data URL로 가져옵니다.
    //         console.log(dataUrl); // Data URL을 콘솔에 출력하거나 필요한 대로 사용합니다.
    //     }
    // }

    return (
        <>
            <div>
                <button onClick={close}>close</button>
                <BaseChart width={200} height={250} ref={chartRef} chartType={'Pie'} title={'토성별 토양수 특성'}/>

                <canvas id="pieChartCanvas3"></canvas>
            </div>
            
        </>
    )
}

export default React.memo(TestChartWidget);
