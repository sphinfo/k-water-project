import {Tile as TileLayer } from "ol/layer";
import {Source as Source, TileWMS} from "ol/source";

import MapManager from "../../MapManager";

class TileLayer extends TileLayer {

	constructor(u, option) {
	
		const source = new TileWMS({
			url : u
		})

		super({
			source: source,
			...option
		})
	}


}

export default TileLayer;