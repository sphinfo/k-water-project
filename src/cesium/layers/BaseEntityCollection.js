import MapManager from "@gis/MapManager";
import { G$addLayer } from "@gis/util";
import {Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, PropertyBag, VerticalOrigin} from "cesium";
import { Chart } from "chart.js";
import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Bar, Pie } from 'react-chartjs-2';
import water from '../layers/water.png'


class BaseEntityCollection extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}

	async _addFeature(longitude, latitude) {
		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude, 300),
			clampToGround: true,
			billboard: {
				image: water,
				width: 35,
				height: 35,
				heightReference: HeightReference.RELATIVE_TO_GROUND,
				verticalOrigin: VerticalOrigin.BOTTOM
			},
			name: this.id
		});

		this.entities.add(pointEntity);
	}
	
}

export default BaseEntityCollection;