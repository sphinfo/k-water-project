import MapManager from "@gis/MapManager";
import {Cartesian2, Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, LabelStyle, PropertyBag, VerticalOrigin} from "cesium";

class SafeLevel2DataSource extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}	

	async _addFeature(longitude, latitude, value) {

		


		//[127.5053342,	35.9578153]
		const centerLongitude = longitude
		const centerLatitude = latitude

		const gridWidthMeters = 20.5; // 가로 길이
		const gridHeightMeters = 20.5; // 세로 길이

		// 경도 및 위도 차이 계산
		const degreesPerMeterLongitude = 1.0 / (111.32 * 1000); // 경도 1도당 미터로 환산한 값
		const degreesPerMeterLatitude = 1.0 / (111.32 * 1000); // 위도 1도당 미터로 환산한 값

		const gridWidthDegrees = gridWidthMeters * degreesPerMeterLongitude;
		const gridHeightDegrees = gridHeightMeters * degreesPerMeterLatitude;

		//const gridPolygon = MapManager.map.entities.add();
		const gridPolygon =  new Entity({
			polygon: {
			  hierarchy: Cartesian3.fromDegreesArray([
				centerLongitude - gridWidthDegrees / 2, centerLatitude - gridHeightDegrees / 2,
				centerLongitude + gridWidthDegrees / 2, centerLatitude - gridHeightDegrees / 2,
				centerLongitude + gridWidthDegrees / 2, centerLatitude + gridHeightDegrees / 2,
				centerLongitude - gridWidthDegrees / 2, centerLatitude + gridHeightDegrees / 2,
			  ]),
			  material: this._normalizeWithColors(value)
			},
		})
		this.entities.add(gridPolygon);
	}

	_normalizeWithColors(value, min=-9, max=9) {
		let color = [Color.RED, Color.ORANGE, Color.YELLOW, Color.GREENYELLOW, Color.GREEN, Color.SKYBLUE, Color.BLUE ]
		value = Math.min(Math.max(value, min), max)
		const normalized = (value - min) / (max - min)
		const index = Math.floor(normalized * color.length)
		return color[index];
	}
	
}

export default SafeLevel2DataSource;