import MapManager from "@gis/MapManager";
import { G$addLayer } from "@gis/util";
import {Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, VerticalOrigin} from "cesium";
import { Chart } from "chart.js";
import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Bar, Pie } from 'react-chartjs-2';

class BaseEntityCollection extends CustomDataSource {

	constructor(props) {

		super(props.name)
	}

	async _addFeature(longitude, latitude, name='', data=[30, 40, 30]) {

		let me = this

		const ctx = document.getElementById('pieChartCanvas2').getContext('2d');

		var existingChart = Chart.getChart("pieChartCanvas2");
		if (existingChart) {
			existingChart.destroy();
		}

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
		};

		// 파이 차트를 임시 캔버스에 그립니다.
		
		let chart = new Chart(ctx,{ type:"doughnut", data: chartData, options: chartOptions })

		await new Promise(resolve => setTimeout(resolve, 300));

		let canvas = ctx.canvas;
		const dataURL = canvas.toDataURL();
	
		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude),
			clampToGround: true,
			point: {
				pixelSize: 10,
				color: Color.RED,heightReference: HeightReference.RELATIVE_TO_GROUND,
			},
			billboard: {
				image: dataURL,
				width: 50,
				height: 50,
				heightReference: HeightReference.RELATIVE_TO_GROUND,
				verticalOrigin: VerticalOrigin.BOTTOM
			},
			name: name
		});
	
		// 이제 pointEntity를 시세어스(프레임워크) 시각화에 추가하세요.
		me.entities.add(pointEntity);

	}
	
}

export default BaseEntityCollection;