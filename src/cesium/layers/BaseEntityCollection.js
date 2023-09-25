import {Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, PropertyBag, VerticalOrigin} from "cesium";
import water from '../layers/water.png'


class BaseEntityCollection extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}

	async _addFeature(longitude, latitude, properties) {
		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude),
			billboard: {
				image: water,
				width: 35,
				height: 35,
				clampToGround: true,
				heightReference: HeightReference.RELATIVE_TO_GROUND,
				verticalOrigin: VerticalOrigin.BOTTOM,
				scale: 1.0
			},
			properties: properties,
			name: this.id
		});

		this.entities.add(pointEntity);
	}
	
}

export default BaseEntityCollection;