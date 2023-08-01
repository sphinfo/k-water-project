import React, { forwardRef, memo, useMemo, useRef, useImperativeHandle } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { Line, Bar } from 'react-chartjs-2';

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
        text: 'Chart.js Line chart example',
      },
    }
};
 
// 데이터
const data = {
	//'January', 'February', 'March', 'April', 'May', 'June', 'July', 'July', 'July', 'July'
	labels: [],

	// { label: 'data1', data: [12, 19, 3, 5, 2, 3, 10] },
	// { label: 'data2', data: [11, 12, 33, 1, 22, 13, 10, 10, 10, 10, 10] },
	datasets: [],
};


const BaseChart = (props, ref) => {

	const chartRef = useRef(null)

	const { width, height, title, chartType='Line', className='', ...other } = props;

	const ChartComponent = useMemo(() => {
		return chartType === 'Line' ? Line : Bar;
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
		}

	}))
  

  return (
	<div style={{width: wid, height: hei}} className={className}>
		<ChartComponent ref={chartRef} options={defaultOption} data={data}/>
	</div>
	
  );
};

export default memo(forwardRef(BaseChart));