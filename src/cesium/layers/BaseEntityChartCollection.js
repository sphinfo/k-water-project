import MapManager from "@gis/MapManager";
import { G$addLayer } from "@gis/util";
import {Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, PropertyBag, VerticalOrigin} from "cesium";
import { Chart } from "chart.js";
import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Bar, Pie } from 'react-chartjs-2';
import water from '../layers/water.png'


class BaseEntityChartCollection extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}

	async _addFeature(longitude, latitude, name='', data=[30, 40, 30], properties={}) {

		let me = this

		const ctx = document.getElementById('pieChartCanvas2').getContext('2d')
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
			animation: {
				duration: 0
			}
		};

		// 파이 차트를 임시 캔버스에 그립니다.
		
		let chart = new Chart(ctx,{ type:"doughnut", data: chartData, options: chartOptions })

		await new Promise(resolve => setTimeout(resolve, 100));

		let canvas = ctx.canvas;
		const dataURL = canvas.toDataURL();
		const logoUrl = "../sample.png";
	
		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude, 300),
			clampToGround: true,
			point: {
				pixelSize: 10,
				color: Color.RED,
			},
			billboard: {
				image: water,
				width: 35,
				height: 35,
				heightReference: HeightReference.RELATIVE_TO_GROUND,
				verticalOrigin: VerticalOrigin.BOTTOM
			},
			name: name
		});
		pointEntity.properties = properties
		me.entities.add(pointEntity);

	}
	
}

export default BaseEntityChartCollection;