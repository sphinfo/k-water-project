import {Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, LabelStyle, PropertyBag, VerticalOrigin} from "cesium";


class BaseCustomDataSource extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}

	async _addFeature(longitude, latitude, properties, other) {
		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude),
			ellipse: {
				semiMinorAxis: 1000.0,
				semiMajorAxis: 1000.0,
				material: Color.RED,
				outline: true, // height must be set for outline to display
			},
			label: {
				text: 'properties.MBSNNM',
				font: "10pt monospace",
				heightReference: HeightReference.CLAMP_TO_GROUND 
			},
			clampToGround: true,
			properties: properties,
			name: this.id,
			...other
		});

		this.entities.add(pointEntity);
	}
	
}

export default BaseCustomDataSource;