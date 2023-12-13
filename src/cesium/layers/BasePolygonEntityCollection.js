import {Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, PropertyBag, Rectangle, ScreenSpaceEventHandler, ScreenSpaceEventType, VerticalOrigin, defined} from "cesium";
//import water from '../layers/water.png'
import water from '../../resources/images/map-satellite-icon.svg'
import { G$addLayer } from "@gis/util";
import MapManager from "@gis/MapManager";
import { debounce } from "@mui/material";
//point-icon.png


class BasePolygonEntityCollection extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
		this.layer = this
		G$addLayer(this)
	}

	async _addFeature(provider, callback) {

		const {xmin, ymin, xmax, ymax, properties} = provider

		const polygonEntity = new Entity({
			rectangle: {
				coordinates: Rectangle.fromDegrees(xmin, ymin, xmax, ymax),
				material:  Color(1.0, 1.0, 1.0, 0.0),
				outline: true,
				outlineColor: Color.WHITE,
				outlineWidth: 2, 
				heightReference: HeightReference.CLAMP_TO_GROUND, 
			},
			properties: { ...properties },
			name: this.id,
			id: properties.id ? properties.id : null,
		});

		this.entities.add(polygonEntity)
		
		if(callback){
			callback(polygonEntity)
		}
		
	}
	
}

export default BasePolygonEntityCollection;