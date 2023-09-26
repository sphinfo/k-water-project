import {Cartesian2, Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, LabelStyle, PropertyBag, VerticalOrigin} from "cesium";


class WaterShedDataSource extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}

	async _addFeature(longitude, latitude, properties, other) {

		const random = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		let color = {1:Color.RED,2:Color.BLUE, 3:Color.YELLOW, 4:Color.ORANGE, 5:Color.GREEN, 6:Color.GRAY}

		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude),
			ellipse: {
				semiMinorAxis: 700.0,
				semiMajorAxis: 700.0,
				material: color[random],
				outline: true, // height must be set for outline to display
			},
			clampToGround: true,
			properties: properties,
			name: this.id,
			...other
		});

		const labelEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude),
			label: {
				text: properties.MBSNNM,
				font: "10pt monospace",
				style: LabelStyle.FILL_AND_OUTLINE,
				outlineWidth: 2,
				verticalOrigin: VerticalOrigin.BOTTOM,
				heightReference: HeightReference.RELATIVE_TO_GROUND,
			},
			name: this.id,
			...other
		});

		this.entities.add(pointEntity);
		this.entities.add(labelEntity);
	}
	
}

export default WaterShedDataSource;