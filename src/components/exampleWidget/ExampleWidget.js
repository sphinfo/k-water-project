import React, { useCallback, useEffect, useRef, useState } from "react";
import WidgetManager from "@com/manager/widget/WidgetManager";

/** 추후 사용될 위젯 */
const ExampleWidget = () => {

    useEffect(()=>{
        return()=>{
            WidgetManager.remove('SoilMoistureChartWidget')
            WidgetManager.remove('TimeSeriesSoilChartWidget')
        }
    },[])


    const timeseriesChart = () =>{
        WidgetManager.add('TimeSeriesSoilChartWidget', {
            params: 'testParam'
        });
    }

    const soilMoistureChart = () =>{
        WidgetManager.add('SoilMoistureChartWidget', {
            params: 'testParam'
        });
    }

    const facDetailWidget = () =>{
        WidgetManager.add('FacDetailWidget', {
            params: 'testParam'
        });
    }


    

    return (
        <>
            example widgets
            <div>
                <button onClick={soilMoistureChart}>시계열 토양수분 지수</button>
                <br></br>
                <button onClick={timeseriesChart}>시계열 토양수분 및 강수량 차트</button>
                <br></br>
                <button onClick={facDetailWidget}>시설상세정보</button>
            </div>
        </>
    )
}

export default React.memo(ExampleWidget);
