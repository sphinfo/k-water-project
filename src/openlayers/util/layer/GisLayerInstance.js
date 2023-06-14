import {Vector as VectorLayer, Tile as TileLayer } from "ol/layer";
import {Vector as sourceVector, TileWMS as TWMS} from "ol/source";

class GisLayerInstance {

	createInstance({layer=null, source=null, sourceOpt=null}){

        let instance = null

        let layertInstance = this._createLayerInstance(layer)

        if(layertInstance){

            if(source){
                let SourceInstance = this._createSourceInstance(source, sourceOpt)
                layertInstance.setSource(SourceInstance)
            }

            instance = layertInstance
        }

        return instance

	}

    /* 레이어 영역 */
    _createLayerInstance(layer){

        let instance = null

        if(typeof layer === 'object'){
            instance = layer
        }else if(typeof layer === 'string'){
            //정의된 stringd로 왔을시 layer instance 생성
        }

        return instance

    }

    /* source 영역 */
    _createSourceInstance(source, sourceOpt=null){

        let instance = null

        if(typeof source === 'object'){

            if(sourceOpt){
                if(sourceOpt.url){
                    source.setUrl(sourceOpt.url)
                }

                if(sourceOpt.params){
                    source.updateParams(sourceOpt.params)
                }

            }

            instance = source
        }else if(typeof source === 'string'){
            //정의된 stringd로 왔을시 source instance 생성
        }

        return instance
    }
	
};

export default new GisLayerInstance();