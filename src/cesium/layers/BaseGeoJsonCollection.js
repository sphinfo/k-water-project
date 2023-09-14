import {Cartesian3, Color, CustomDataSource, Entity, EntityCollection, GeoJsonDataSource, HeightReference, PropertyBag, VerticalOrigin} from "cesium";
import water from '../layers/water.png'


class BaseGeoJsonCollection extends GeoJsonDataSource {
	constructor(props) {
		super(props.name)
		this.id = props.name
		this.type = 'datasource'
	}
	
	add(res){

		this.load(res, {
			stroke: Color.HOTPINK,
			fill: Color.PINK.withAlpha(0.5),
			strokeWidth: 3,
		})
		
	}
}

export default BaseGeoJsonCollection;