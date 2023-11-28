import React, { forwardRef, memo, useMemo, useRef, useImperativeHandle } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart, Line, Bar, Pie } from 'react-chartjs-2';
ChartJS.register(zoomPlugin)

//초기 옵션
const defaultOption = {
    responsive: true,  //반응형 랜더링
	maintainAspectRatio: false, //canvas 사이즈 조정
    plugins: {
		legend: { //범례
			position: 'top', //범례위치
		},
		title: { //차트 제목
			display: true,
			text: '',
		},
		zoom: {
			pan: {
				enabled: true, // 이동 가능하도록 설정
				mode: 'x', // x축으로만 이동할 수 있도록 설정
			},
			zoom: {
			  wheel: {
				enabled: true,
			  },
			  mode: 'x', // x축만 확대/축소 가능하도록 설정
			},
		},
    }
};
 
// 데이터
const data = {
	labels: [],
	datasets: [],
};


const BaseChart = (props, ref) => {

	const chartRef = useRef(null)

	const { width, height, title, chartType='Line', className='', ...other } = props;

	const ChartComponent = useMemo(() => {
		return chartType === 'Line' ? Line : chartType === 'Bar' ? Bar : chartType === 'Pie' ? Pie : Pie;
	}, [chartType]);
	

	const tit = useMemo(()=>{
		return title ? defaultOption.plugins.title.text = title : defaultOption.plugins.title.display = false
	}, [title])

	const wid = useMemo(()=>{
		return width ? width : 600
	}, [width])

	const hei = useMemo(()=>{
		return height ? height : 200
	}, [height])
	

	// chart 레퍼런스 API
	useImperativeHandle(ref, () =>({
		// set datas
		set provider (data) {
			if(chartRef.current){
				chartRef.current.data = data
				chartRef.current.update()
			}
		},
		// get datas
		get provider () {
			return chartRef.current.data
		},

		// option change
		set updateOptions (options) {
			if(chartRef.current){
				chartRef.current.options = {...defaultOption, ...options}
				chartRef.current.update()
			}
		},

		get url(){
			if(chartRef.current){
				return chartRef.current.toBase64Image()
			}
		}

	}))

	const plugins = [
		{
			afterDraw: function (chart) {
			  if (chart.data.length < 1) {
				let ctx = chart.ctx;
				let width = chart.width;
				let height = chart.height;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.font = "13px Arial";
				ctx.fillText("확인가능한 데이터가 없습니다.", width / 2, height / 2);
				ctx.restore();
			  }
			},
		  },
	]

  return (
	<div style={{width: wid, height: hei}} className={className}>
		<ChartComponent ref={chartRef} options={defaultOption} data={data} plugins={plugins}/>
	</div>
	
  );
};

export default memo(forwardRef(BaseChart));