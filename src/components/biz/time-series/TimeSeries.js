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

        //날짜 세팅
        setSampleProvider(timeSeriesTestLayerRef.current._exampleDateProvider())

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
