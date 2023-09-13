import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { LEGNED_PANEL } from '@redux/actions';
import LegendContainer from '@components/biz/legnedContainer/LegendContainer';
import { G$addLayer, G$addWidget } from '@gis/util';
import { Chart } from 'chart.js';
import BaseWmsGwcLayer from '@gis/layers/BaseWmsGwcLayer';

//샘플 하단 패널
const SampleEventBox = () => {
    
    const dispatch = useDispatch()

    useEffect(()=>{

    },[])

    const widget = (wId) =>{
        dispatch({ type: LEGNED_PANEL, container: wId })
    }

    const openWidget = () =>{
        G$addWidget('TestChartWidget')


		// 임시 캔버스의 데이터 URL을 가져옵니다.
		//var dataURL = ctx.toDataURL();

		// 데이터 URL을 출력하거나 사용할 수 있습니다.
		//console.log(dataURL);

		// 필요한 경우 임시 캔버스를 삭제합니다.
		//ctx = null;
    }

    const test = () =>{
        const wmsImageryProvider = new BaseWmsGwcLayer('lv1_1980yr','EGIS', 'egisGeo')
        G$addLayer(wmsImageryProvider)
    }

    return (
        <>
            <div>
                <LegendContainer />
            </div>
            <canvas style={{display:'none'}} id="pieChartCanvas2"></canvas>
            <ul className="map-bottom-btn">
                <li style={{display:'inlineBlock', marginRight:'5px'}}><button onClick={()=>{widget('Test1Container')}}>TEST1</button></li>
                <li style={{display:'inlineBlock', marginRight:'5px'}}><button onClick={()=>{widget('Test2Container')}}>TEST2</button></li>
                <li style={{display:'inlineBlock', marginRight:'5px'}}><button onClick={()=>{openWidget('TestChartWidget')}}>TEST3</button></li>
                <li style={{display:'inlineBlock', marginRight:'5px'}}><button onClick={test}>TEST4</button></li>
            </ul>
            
        </>
    )
}

export default SampleEventBox;
