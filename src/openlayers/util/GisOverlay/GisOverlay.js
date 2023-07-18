import { Overlay } from "ol";
import { G$RandomId } from "..";

class GisOverlay {

	elemnet = document.createElement('div')

	constructor(options = {}){
		
		const {map, className, id, props, ...option} = options;

		this.elemnet.className = !className ? 'tooltip tooltip-measure' : ''

		let overlayId = G$RandomId(id)

		this._overlay = new Overlay({
			id: overlayId,
			element: this.elemnet,
			offset: [0,-10],
			positioning: 'bottom-center',
			... props
		});
		
	}

	setElement(element){
		this.elemnet.innerHTML = element
	}

	setPosition(coord){
		this._overlay.setPosition(coord)
	}

};

export default GisOverlay;