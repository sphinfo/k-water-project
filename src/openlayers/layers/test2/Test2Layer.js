import EventBus from "../eventbus/EventBus";
import MapEvents from "../eventbus/MapEvents";
import MapManager from "../MapManager";
import {E$addLayer, E$getLayer, E$getLevel, E$removeLayer, E$getLayerInfo} from "@gis/util";
import {connect} from "@gis/loaders/dojos";
import { makeObservable } from "mobx";


class Test2Layer {

	_layer = null;
    _layerId = 'test2';
    
    /* observable */
    _props = null;

	constructor() {


	}

    getLayer(){
        return this._layer;
    }
    
    
    removeLayer(){

        if(this._layer !== null){
            this._layer.serVisible(false);
        }

    }
    
}

export default new Test2Layer();