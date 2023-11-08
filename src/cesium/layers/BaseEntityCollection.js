import {Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, PropertyBag, VerticalOrigin} from "cesium";
//import water from '../layers/water.png'
import water from '../../resources/images/map-satellite-icon.svg'
//point-icon.png


class BaseEntityCollection extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
		this.baseImage = props.image ? props.image : water
	}

	async _addFeature(longitude, latitude, properties, callback) {
		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(longitude, latitude),
			billboard: {
				image: this.baseImage,
				width: 35,
				height: 35,
				clampToGround: true,
				heightReference: HeightReference.RELATIVE_TO_GROUND,
				verticalOrigin: VerticalOrigin.BOTTOM,
				scale: 1.0,
				disableDepthTestDistance: Number.POSITIVE_INFINITY
			},
			properties: properties,
			name: this.id
		});

		this.entities.add(pointEntity)
		
		if(callback){
			callback(pointEntity)
		}
		
	}
	
}

export default BaseEntityCollection;