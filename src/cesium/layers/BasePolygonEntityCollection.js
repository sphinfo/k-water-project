import {Cartesian2, Cartesian3, Cartographic, Color, CustomDataSource, Entity, EntityCollection, HeightReference, LabelStyle, PolygonHierarchy, PropertyBag, Rectangle, ScreenSpaceEventHandler, ScreenSpaceEventType, VerticalOrigin, defined} from "cesium";
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

		const positions = [
			Cartesian3.fromDegrees(xmin, ymin),
			Cartesian3.fromDegrees(xmax, ymin),
			Cartesian3.fromDegrees(xmax, ymax),
			Cartesian3.fromDegrees(xmin, ymax),
			Cartesian3.fromDegrees(xmin, ymin), // 폴리라인을 닫기 위해 처음 좌표와 같은 좌표 추가
		  ];

		const polygonEntity = new Entity({
			polyline: {
				positions: positions,
				material: Color.WHITE.withAlpha(1), 
				outline: true
			},
			properties: { ...properties },
			name: this.id,
			id: properties.id ? properties.id : null,
		});

		this.entities.add(polygonEntity)

		const centerCartographic = Cartographic.fromDegrees(xmin, ymax);
		const centerPosition = Cartesian3.fromRadians(centerCartographic.longitude, centerCartographic.latitude);

		this.entities.add({
            position: centerPosition,
            clampToGround: true,
            label: {
                text: '1',
                font: "17pt monospace",
                style: LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                outlineColor: Color.WHITE,
                verticalOrigin: VerticalOrigin.BOTTOM,
                heightReference: HeightReference.RELATIVE_TO_GROUND,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
				backgroundColor: Color.BLACK, 
                backgroundPadding: new Cartesian2(8, 4),
				pixelOffset: new Cartesian2(-10, 0), 
            },
        });
		
		if(callback){
			callback(polygonEntity)
		}
		
	}
	
}

export default BasePolygonEntityCollection;