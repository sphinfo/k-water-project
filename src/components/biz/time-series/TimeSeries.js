import TimeSeriesLayer from "@gis/layers/time-series/TimeSeries";
import { G$SetZoomToPoint, G$Transfrom, G$addLayer, G$removeLayer } from "@gis/util";
import React, { useCallback, useEffect } from "react";
import { useRef } from "react";
import TimeBar from "./component/TimeBar";
import { useState } from "react";

const TimeSeries = () => {

    const timeSeriesTestLayerRef = useRef()
    const timeBarRef = useRef()

    const [sampleProvider, setSampleProvider] = useState([])

    useEffect(()=>{
        
        let p = G$Transfrom([127.920580, 36.32540779], 4326, 3857)
        G$SetZoomToPoint(5, [-11819701.111425765,4896364.200931263])

        timeSeriesTestLayerRef.current = new TimeSeriesLayer()
        G$addLayer(timeSeriesTestLayerRef.current)

        /* example 날짜 데이터 */
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1); // 하루 전 날짜로 설정

        const startDate = new Date(currentDate); // 시작 날짜
        startDate.setHours(0, 0, 0, 0); // 시작 시간을 0시 0분 0초로 설정

        const endDate = new Date(); // 현재 시간을 끝 날짜로 설정
        endDate.setMinutes(0, 0, 0); // 끝 시간을 0분 0초로 설정

        const datesArray = [];
        const interval = 0.5; // 시간 간격

        let currentDateTime = new Date(startDate);

        while (currentDateTime <= endDate) {
            datesArray.push(new Date(currentDateTime));
            currentDateTime.setTime(currentDateTime.getTime() + interval * 60 * 60 * 1000);
        }

        setSampleProvider(datesArray)

        return()=>{
            G$removeLayer(timeSeriesTestLayerRef.current)
            G$SetZoomToPoint(7, p)
        } 

    },[])


    const timeBarChange = useCallback((v=>{
        if(timeSeriesTestLayerRef.current){            
            timeSeriesTestLayerRef.current.updateParam(v)
        }
    }))

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
        </>
    )
}

export default React.memo(TimeSeries);
