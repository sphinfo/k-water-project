import {Tile as TileLayer } from "ol/layer";
import VectorLayer from "ol/layer/Vector";
import {TileWMS , XYZ, TileJSON, Vector as sourceVector} from "ol/source";


import GisLayerInstance from "../util/layer/GisLayerInstance";

/* 주제도 레이어 사용을 위한 config */
const vwroldUrl = 'http://xdworld.vworld.kr:8080/2d/Base/service/{z}/{x}/{y}.png?key=59AF06C1-DBD7-38D5-B6CC-9944FBA2A1F9'
const vwrold3DUrl = 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=59AF06C1-DBD7-38D5-B6CC-9944FBA2A1F9'
const vwroldUrl_sate = 'https://xdworld.vworld.kr/2d/Satellite/service/{z}/{x}/{y}.jpeg'
const geoserverUrl = `http://221.147.56.177:58080/geoserver/sckmpp/wms??`
const LayerConfig = {

	MEASURE_LAYER : { 
		id:'MEASURE_LAYER', 
		instance: new VectorLayer({name:'MEASURE_LAYER', source: new sourceVector({wrapX: false})})
	},

	DRAW_LAYER : { 
		id:'DRAW_LAYER', 
		instance: new VectorLayer({name:'DRAW_LAYER',source: new sourceVector({wrapX: false})})
	},

	VWORLD_MAP	: { 
		id:'VWORLD_MAP',
		instance: new TileLayer({name:'VWORLD_MAP', source: new XYZ({url:vwroldUrl})})
	},

	VWORLD_3D_MAP	: { 
		id:'VWORLD_3D_MAP',
		instance: null
	},

	/* layer instance 추가 sample */
	VWORLD_MAP_SATE : {
		instance: GisLayerInstance.createInstance({
			layer: new TileLayer({name:'VWORLD_MAP_SATE'}), 
			source: new XYZ(), 
			sourceOpt:{
				url:vwroldUrl_sate
			}
		})
	},

	TL_SCCO_SIG : {
		id: 'TL_SCCO_SIG', 
		instance: GisLayerInstance.createInstance({
			layer: new TileLayer({name:'TL_SCCO_SIG'}), 
			source: new TileWMS(),
			sourceOpt:{
				url: geoserverUrl,
				params:{
					LAYERS:`sckmpp:TL_SCCO_SIG`,
					urlType: 'geoServer'
				}
			}
		})
	},
	TL_SCCO_EMD : {
		id: 'TL_SCCO_EMD', 
		instance: GisLayerInstance.createInstance({
			layer: new TileLayer({name:'TL_SCCO_EMD'}), 
			source: new TileWMS(),
			sourceOpt:{
				url: geoserverUrl,
				params:{
					LAYERS:`sckmpp:TL_SCCO_EMD`,
					urlType: 'geoServer'
				}
			}
		})
	}

};


export default LayerConfig;