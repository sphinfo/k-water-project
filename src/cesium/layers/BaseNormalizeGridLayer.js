import { G$addLayer, G$normalizeWithColors } from "@gis/util";
import {Cartesian3, CustomDataSource, Entity, } from "cesium";

class BaseNormalizeGridLayer extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'

		this.layer = this
		G$addLayer(this)
	}	

	async _addFeature(longitude, latitude, value, properties) {
		

		const centerLongitude = longitude
		const centerLatitude = latitude

		const gridWidthMeters = 20.7; // 가로 길이
		const gridHeightMeters = 20.7; // 세로 길이

		// 경도 및 위도 차이 계산
		//const degreesPerMeterLongitude = 1.0 / (111.32 * 1000); // 경도 1도당 미터로 환산한 값
		const degreesPerMeterLongitude = 1.0 / (111320 * Math.cos(centerLatitude * Math.PI / 180)); // 경도 1도당 미터로 환산한 값
		const degreesPerMeterLatitude = 1.0 / (111.32 * 1000); // 위도 1도당 미터로 환산한 값
		

		const gridWidthDegrees = gridWidthMeters * degreesPerMeterLongitude;
		const gridHeightDegrees = gridHeightMeters * degreesPerMeterLatitude;

		const gridPolygon =  new Entity({
			polygon: {
			  hierarchy: Cartesian3.fromDegreesArray([
				centerLongitude - gridWidthDegrees / 2, centerLatitude - gridHeightDegrees / 2,
				centerLongitude + gridWidthDegrees / 2, centerLatitude - gridHeightDegrees / 2,
				centerLongitude + gridWidthDegrees / 2, centerLatitude + gridHeightDegrees / 2,
				centerLongitude - gridWidthDegrees / 2, centerLatitude + gridHeightDegrees / 2,
			  ]),
			  material: G$normalizeWithColors({value:value, opacity:0.7})
			},
			label: {
				text: value
			},
			name: this.id,
			properties: properties
		})
		this.entities.add(gridPolygon);
	}
	
}

export default BaseNormalizeGridLayer;