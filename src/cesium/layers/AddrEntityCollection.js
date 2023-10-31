import {Cartesian3, CustomDataSource, Entity, HeightReference, VerticalOrigin} from "cesium";
import icon from '../../resources/images/point-icon.png'


class AddrEntityCollection extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}

	async _addFeature(longitude, latitude) {
		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude),
			billboard: {
				image: icon,
				width: 35,
				height: 35,
				clampToGround: true,
				heightReference: HeightReference.RELATIVE_TO_GROUND,
				verticalOrigin: VerticalOrigin.BOTTOM,
				scale: 1.0,
				disableDepthTestDistance: Number.POSITIVE_INFINITY
			},
			name: this.id
		});

		this.entities.add(pointEntity);
	}
	
}

export default AddrEntityCollection;