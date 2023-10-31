import {Cartesian2, Cartesian3, Color, CustomDataSource, Entity, HeightReference, LabelStyle, VerticalOrigin} from "cesium";
import { Chart } from "chart.js";
import { Chart as ChartJS } from 'chart.js/auto'


class SaftyLevelChartDataSource extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}

	async _addFeature(longitude, latitude, properties='', data=[]) {

		let me = this

		let canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		document.body.appendChild(canvas);


		//임시 RANDOM COLOR 
		const color = ['BLUE', 'YELLOW', 'RED']
		const rand = Math.floor(Math.random() * color.length)

		console.info(color[rand])
		// 파이 차트 데이터 및 옵션을 설정합니다.
		var chartData = {
			datasets: [{
				data: [1],
				backgroundColor: [color[rand]]
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
		
		new Chart(ctx,{ type:"pie", data: chartData, options: chartOptions })

		//let canvas = ctx.canvas;
		const dataURL = canvas.toDataURL();
		canvas.remove()

		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude),
			clampToGround: true,
			point: {
				pixelSize: 30,
				color: Color.TRANSPARENT,
			},
			label: {
				text: properties.MBSNNM,
				font: "14px sans-serif", // 폰트 및 크기 설정
				fillColor: Color.BLACK, // 텍스트 색상
				outlineColor: Color.BLACK, // 텍스트 외곽선 색상
				outlineWidth: 2, // 텍스트 외곽선 두께
				style: LabelStyle.FILL_AND_OUTLINE, // 텍스트 스타일
				verticalOrigin: VerticalOrigin.BOTTOM, // 세로 정렬 위치
				pixelOffset: new Cartesian2(0, -40), // 텍스트 픽셀 오프셋
				disableDepthTestDistance: Number.POSITIVE_INFINITY
			},
			billboard: {
				image: dataURL,
				width: 35,
				height: 35,
				heightReference: HeightReference.RELATIVE_TO_GROUND,
				verticalOrigin: VerticalOrigin.BOTTOM,
				disableDepthTestDistance: Number.POSITIVE_INFINITY
			},
		});
		pointEntity.properties = properties
		me.entities.add(pointEntity);

	}
	
}

export default SaftyLevelChartDataSource;