import BaseChart from "@common/chart/BaseChart";
import { G$removeWidget } from "@gis/util";
import React, { useEffect, useRef } from "react";
import chartImg from '../../../resources/images/chart-2.png'


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
        let dataset = [10, 13, 17, 18, 23, 20, 18, 17, 21, 23]
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
                data: dataset,
                tension: 0.1
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
            <div className="map-popup-box">
                <div className="map-popup-box-header">
                    <h1 className="map-popup-box-title">날짜별 계측 수위</h1>
                <button onClick={close} className="popup-close-btn"></button>
                </div>
                <div className="map-popup-box-body">
                    <div className="img-wrap">
                    <img src={chartImg} />
                    </div>
                    {/* <BaseChart width={200} height={250} ref={chartRef} chartType={'Pie'} title={'토성별 토양수 특성'}/> */}
                    <div className="table-wrap">
                    <table className="popup-table">
                        <thead>
                        <tr>
                            <th>일시</th>
                            <th>수위<span className="th-unit">(EL.m)</span></th>
                            <th>저수량<span className="th-unit">(백만㎡)</span></th>
                            <th>저수율<span className="th-unit">(%)</span></th>
                            <th>강우량<span className="th-unit">(mm)</span></th>
                            <th>유입량<span className="th-unit">(㎡/s)</span></th>
                            <th>총방류량<span className="th-unit">(㎡/s)</span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2795</td>
                            <td>13.7462</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.228</td>
                        </tr>
                        <tr>
                            <td>01.12 13:10</td>
                            <td>187.2800</td>
                            <td>13.7469</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.228</td>
                        </tr>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2800</td>
                            <td>13.7469</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.228</td>
                        </tr>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2800</td>
                            <td>13.7469</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.225</td>
                        </tr>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2800</td>
                            <td>13.7469</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.226</td>
                        </tr>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2805</td>
                            <td>13.7476</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.226</td>
                        </tr>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2810</td>
                            <td>13.7483</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.226</td>
                        </tr>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2810</td>
                            <td>13.7483</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.226</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default React.memo(TestChartWidget);
