import BaseChart from "@com/manager/chart/BaseChart";
import React, { memo, useEffect } from "react";
import { useRef } from "react";

const TestWidget2 = (props) => {

    useEffect(()=>{
        return()=>{
            console.info('bye')
        }
    },[])

    const chartRef = useRef({})

    useEffect(()=>{
    },[props.params])

    useEffect(()=>{
        console.info(chartRef)
    },[])

    return (
        <>
            TestWidget2
            <BaseChart width={700} height={400} ref={chartRef} chartType={'Bar'} title={'Test Chart'}/>
        </>
    )
}

export default memo(TestWidget2);
