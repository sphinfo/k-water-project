import {Vector as VectorLayer, Tile as TileLayer } from "ol/layer";
import {Vector as sourceVector, TileWMS as TWMS} from "ol/source";

import LayerConfig from "./config/LayerConfig";

/* 단순 주제도 레이어 wms 관리 */
class LayerManager {
    
    constructor() {

        //레이어 객체
        this._layerInstance = {};

    }

    // 레이어 존재 확인
    _getLayerInstance(id) {
        return this._layerInstance.hasOwnProperty(id);
    }

    //레이어 config 확인
    _layerConfig(id) {
        return LayerConfig.hasOwnProperty(id);
    }

    _hasLayerInstance(id) {
        // 정의된 레이어 객체 여부 확인
        return this._layerInstance.hasOwnProperty(id);
    }

    //레이어 instance 추가
    addLayerInstance(id, instance){

        if(!this._getLayer(id)){
            this._layerInstance[id] = instance
        }

    }

    // 생성된 레이어 객체가 있으면 해당 레이어 객체를 반환한다.
    getFindLayerInstance(id) {
        if (this._hasLayerInstance(id)) {
            return this._layerInstance[id];
        }
        return null;
    }

    //레이어 생성
    createLayer(id, instance=null){

        let layer = null

        // 레이어 확인
        if(this._getLayerInstance(id)){
            //레이어가 존재하면 반환
            layer = this._layerInstance[id]
        }else{
            //config에 레이어가 있는지 확인
            if(this._layerConfig(id)){
                console.info(id)
                //레이어 config 확인
                const item = LayerConfig[id];
                this._layerInstance[id] = item.instance
                return item.instance
            }else{   
                if(instance){

                }else{
                    layer = null
                    console.info(`add config / type ${id}`)
                }
            }
        }

        return layer
    }

    //vector 레이어 생성
    createVectorLayer(id, layerCfg){

        let layer = new VectorLayer({
            id : id,
            name : id,
            source : new sourceVector()
        })

        return layer

    }

    //vector 레이어 생성
    _createVectorLayer(id, layerCfg){

        let layer = new VectorLayer({
            id : id,
            name : id,
            source : new sourceVector()
        })

        return layer

    }

    // 레이어 인스턴스 삭제
    removeLayerById(id){

        if (this._hasLayerInstance(id)) {
            delete this._layerInstance[id];
        }

    }

    // 레이어 확인
    removeLayer(instance) {

        if (instance.get('name')) {
            this.removeLayerById(instance.get('name'));
        }

    }


}


export default new LayerManager();
