import {Cartesian3, Color, CustomDataSource, Entity, EntityCollection, HeightReference, PropertyBag, ScreenSpaceEventHandler, ScreenSpaceEventType, VerticalOrigin, defined} from "cesium";
//import water from '../layers/water.png'
import water from '../../resources/images/map-satellite-icon.svg'
import { G$addLayer } from "@gis/util";
import MapManager from "@gis/MapManager";
import { debounce } from "@mui/material";
//point-icon.png


class BaseEntityCollection extends CustomDataSource {

	constructor(props) {

		super(props.name)
		this.id = props.name
		this.type = 'datasource'
		this.baseImage = props.image ? props.image : water
		this.layer = this
		this.overlay = props.overlay ? props.overlay : null
		G$addLayer(this)
	}

	async _addFeature(provider, callback) {

		const {lng, lat, properties, hover, img} = provider
		
		if(img){
			this.baseImage = img
		}
		
		const pointEntity = new Entity({
			position: Cartesian3.fromDegrees(lng, lat),
			billboard: {
				image: this.baseImage,
				clampToGround: true,
				heightReference: HeightReference.RELATIVE_TO_GROUND,
				verticalOrigin: VerticalOrigin.BOTTOM,
				scale: 1.0,
				disableDepthTestDistance: Number.POSITIVE_INFINITY
			},
			properties: properties,
			name: this.id,
			id: properties.id ? properties.id : null
		});

		this.entities.add(pointEntity)

		//hove이벤트와 오버레이가 존재하면
		if(hover && this.overlay){
			this._createHoverHandler()
		}
		
		if(callback){
			callback(pointEntity)
		}
		
	}

	//mouse이벤트 생성 ( 추후 공통 으로 overlay 작업 필수 )
	_createHoverHandler() {
        if (!this.hoverHandler) {
            let isHovering = false

            const mouseMoveAction = (movement) => {
                const pickedObject = MapManager.map.scene.pick(movement.endPosition);
				if (defined(pickedObject)) {
					if (!isHovering) {
						this.overlay.removeAll()
						isHovering = true
						let properties = pickedObject.id.properties.getValue('')
						this.overlay._addOverlay(properties.Lon, properties.Lat, properties)

					}
				} else {
					if (isHovering) {
						isHovering = false
						this.overlay.removeAll()
					}
				}
            };

            this.hoverHandler = new ScreenSpaceEventHandler(MapManager.map.canvas)
            this.hoverHandler.setInputAction(debounce(mouseMoveAction, 5), ScreenSpaceEventType.MOUSE_MOVE)
        }
    }

	//개별 entity 삭제
	removeEntityById(id=null) {
		if(id){
			const entityToRemove = this.entities.getById(id);
			if (entityToRemove) {
				this.entities.remove(entityToRemove)
			}
		}
	}
	
}

export default BaseEntityCollection;