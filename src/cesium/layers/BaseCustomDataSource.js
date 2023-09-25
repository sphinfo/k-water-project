import {Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, PropertyBag, VerticalOrigin} from "cesium";


class BaseCustomDataSource extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}

	async _addFeature(longitude, latitude, properties, other) {
		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude),
			clampToGround: true,
			properties: properties,
			name: this.id,
			...other
		});

		this.entities.add(pointEntity);
	}
	
}

export default BaseCustomDataSource;