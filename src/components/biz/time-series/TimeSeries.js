import React, { useCallback, useEffect, useRef, useState } from "react";
import WidgetManager from "@com/manager/widget/WidgetManager";
import TimeSeriesLayer from "@gis/layers/time-series/TimeSeries";
import { G$SetZoomToPoint, G$Transfrom, G$addLayer, G$removeLayer } from "@gis/util";
import TimeBar from "./component/TimeBar";


const TimeSeries = () => {

    const timeSeriesTestLayerRef = useRef()
    const timeBarRef = useRef()

    const [sampleProvider, setSampleProvider] = useState([])

    useEffect(()=>{
        
        let p = G$Transfrom([127.920580, 36.32540779], 4326, 3857)
        //G$SetZoomToPoint(5, [-11819701.111425765,4896364.200931263])

        timeSeriesTestLayerRef.current = new TimeSeriesLayer()
        G$addLayer(timeSeriesTestLayerRef.current)

        //날짜 세팅
        setSampleProvider(timeSeriesTestLayerRef.current._exampleDateProvider())

        return()=>{
            G$removeLayer(timeSeriesTestLayerRef.current)
            //G$SetZoomToPoint(7, p)

            WidgetManager.remove('SoilMoistureChartWidget')

        } 

    },[])


    const timeBarChange = useCallback((v=>{
        if(timeSeriesTestLayerRef.current){            
            timeSeriesTestLayerRef.current.updateParam(v)
        }
    }))



    const timeseriesChart = () =>{
        WidgetManager.add('SoilMoistureChartWidget', {
            params: 'testParam'
        });
    }

    return (
        <>
            시계열 변위 모니터링
            <TimeBar 
                delay={2500}
                ref={timeBarRef}
                provider={sampleProvider}
                onChange={timeBarChange}
            />
            <div>
                <button onClick={()=>{timeBarRef.current.action = true}}>play</button>
                <button onClick={()=>{timeBarRef.current.action = false}}>stop</button>
                <button onClick={()=>{timeBarRef.current.reset()}}>reset</button>
            </div>

            <div>
                <button onClick={timeseriesChart}>시계열 토양수분 및 강수량 차트</button>
            </div>
        </>
    )
}

export default React.memo(TimeSeries);
