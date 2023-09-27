import {Cartesian2, Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, LabelStyle, PropertyBag, VerticalOrigin} from "cesium";
import { Chart } from "chart.js";


class WaterShedChartDataSource extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}

	async _addFeature(longitude, latitude, data=[10]) {

		let me = this

		

		const image = await this._createChartImage();

		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude, 1000),
			clampToGround: true,
			point: {
				pixelSize: 10,
				color: Color.RED,
			},
			billboard: {
				image: image,
				width: 35,
				height: 35,
				heightReference: HeightReference.RELATIVE_TO_GROUND,
				verticalOrigin: VerticalOrigin.BOTTOM
			},
			name: this.id
		});
		//pointEntity.properties = properties
		me.entities.add(pointEntity);

	}

	_createChartImage() {
		return new Promise((resolve) => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
		
			// 파이 차트 데이터 및 옵션을 설정합니다.
			const chartData = [10, 20, 30];
			const chartOptions = {
				responsive: true,
				cutoutPercentage: 0, // 파이 차트의 중앙 부분을 잘라내지 않음
				animation: {
				duration: 0,
				},
			};
		
			// 파이 차트를 임시 캔버스에 그립니다.
			new Chart(ctx, { type: "doughnut", data: chartData, options: chartOptions });
		
			// 이미지가 준비되면 콜백 함수 호출
			canvas.toBlob((blob) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					resolve(reader.result);
				};
				reader.readAsDataURL(blob);
			});
		});
	}
	
}

export default WaterShedChartDataSource;