import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { LEGNED_PANEL } from '@redux/actions';
import LegendContainer from '@components/biz/legnedContainer/LegendContainer';
import { G$addWidget } from '@gis/util';
import { Chart } from 'chart.js';

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
        
        var ctx = document.getElementById('pieChartCanvas2').getContext('2d');

		// 파이 차트 데이터 및 옵션을 설정합니다.
		var data = {
			labels: ['Label 1', 'Label 2', 'Label 3'],
			datasets: [{
				data: [30, 40, 30],
				backgroundColor: ['red', 'green', 'blue']
			}]
		};

		// 파이 차트를 임시 캔버스에 그립니다.
		var myChart = new Chart(ctx,{
            type:"pie",
            data: data
        });
    }

    return (
        <>
            <ul>
                <LegendContainer />
            </ul>
            <canvas style={{display:'none'}} id="pieChartCanvas2"></canvas>
            <ul style={{display:'flex'}}>
                <div style={{display:'inlineBlock', marginRight:'5px'}}><button onClick={()=>{widget('Test1Container')}}>TEST</button></div>
                <div style={{display:'inlineBlock', marginRight:'5px'}}><button onClick={()=>{widget('Test2Container')}}>TEST</button></div>
                <div style={{display:'inlineBlock', marginRight:'5px'}}><button onClick={()=>{openWidget('TestChartWidget')}}>TEST</button></div>
                <div style={{display:'inlineBlock', marginRight:'5px'}}><button onClick={test}>TEST</button></div>
            </ul>
            
        </>
    )
}

export default SampleEventBox;
