import {Cartesian3, Color, CustomDataSource, Entity, HeightReference, VerticalOrigin} from "cesium";
import { Chart } from "chart.js";
import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Bar, Pie } from 'react-chartjs-2';


class BaseEntityChartCollection extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}

	async _addFeature(longitude, latitude, name='', data=[], properties={}) {

		let me = this

		let canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		document.body.appendChild(canvas);


		// 파이 차트 데이터 및 옵션을 설정합니다.
		var chartData = {
			datasets: [{
				data: data,
				backgroundColor: ['red', 'green', 'blue']
			}]
		};

		var chartOptions = {
			responsive: true,
			cutoutPercentage: 0, // 파이 차트의 중앙 부분을 잘라내지 않음
			animation: {
				duration: 0
			}
		};

		// 파이 차트를 임시 캔버스에 그립니다.
		
		new Chart(ctx,{ type:"doughnut", data: chartData, options: chartOptions })

		//let canvas = ctx.canvas;
		const dataURL = canvas.toDataURL();
		canvas.remove()
	
		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude),
			clampToGround: true,
			point: {
				pixelSize: 10,
				color: Color.TRANSPARENT,
			},
			billboard: {
				image: dataURL,
				width: 35,
				height: 35,
				heightReference: HeightReference.RELATIVE_TO_GROUND,
				verticalOrigin: VerticalOrigin.BOTTOM
			},
		});
		pointEntity.properties = properties
		me.entities.add(pointEntity);

	}
	
}

export default BaseEntityChartCollection;