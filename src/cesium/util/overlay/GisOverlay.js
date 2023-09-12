import { Cartesian3, Cartographic, Math } from "cesium";

class GisOverlay {

	elemnet = document.createElement('div')
	entities = {
		position: Cartesian3.fromDegrees(127.2254, 37.5224),
		description: "<h1>Custom Overlay</h1><p>This is a custom overlay.</p>"
	}

	constructor(options = {}){
		const {map, className, id, props, ...option} = options;
		this.elemnet.className = !className ? 'tooltip tooltip-measure' : 'tooltip tooltip-measure'
		this.elemnet.innerHTML = "<h1>Custom Overlay</h1><p>This is a custom overlay.</p>";
		map.entities.add(this.entities)
		
	}

	setElement(element){

		this.elemnet.innerHTML = element
	}

	_setPosition(coord){

		const cartographicCoordinates = Cartographic.fromCartesian(coord) 
		const longitude = cartographicCoordinates.longitude;
		const latitude = cartographicCoordinates.latitude;

		// 경도와 위도를 도 단위로 변환
		const degreesLongitude = Math.toDegrees(longitude);
		const degreesLatitude = Math.toDegrees(latitude);

		this.entities.position = coord
	}

};

export default GisOverlay;