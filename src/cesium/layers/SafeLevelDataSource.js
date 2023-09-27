import {Cartesian2, Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, LabelStyle, PropertyBag, VerticalOrigin} from "cesium";


class SafeLevelDataSource extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}

	async _addFeature(longitude, latitude, properties, other) {

		const random = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
		let color = {1:Color.RED,2:Color.BLUE, 3:Color.YELLOW}

		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude),
			ellipse: {
				semiMinorAxis: 200.0,
				semiMajorAxis: 200.0,
				material: color[random],
				outline: true, // height must be set for outline to display
			},
			clampToGround: true,
			//properties: properties,
			name: this.id,
			...other
		});

		const labelEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude,300),
			label: {
				text: properties,
				font: "10pt monospace",
				backgroundColor: Color.ALICEBLUE,
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

export default SafeLevelDataSource;