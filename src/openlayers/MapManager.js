import OlMap from "ol/Map";
import OlView from "ol/View";

import {fromLonLat} from 'ol/proj';

import LayerManager from "./LayerManager";

import DoubleClickZoom from "ol/interaction/DoubleClickZoom"
import { defaults as defaultControls } from 'ol/control';


class MapManager {
    _map = null
    _draw = null

    _initCenter = fromLonLat([127.920580, 36.32540779])
    _initZoom =  7

    constructor() {
        //내부적으로 사용할 LayerManager를 등록한다.
        this.l_manager = LayerManager;
    }

    get map() {
        return this._map;
    }

    getMap() {
        return this._map;
    }

    getView(){
        return this._map.getView();
    }

    getZoom(){
        return this._map.getView().getZoom();
    }

    setZoom(level){
        this._map.getView().setZoom(level);
    }

    setExtent(extent){
        this.getView().fit(extent)
    }

    setZoomToPoint(zoom, point){
        this.getView().setZoom(zoom)
        this.getView().setCenter(point)
    }

    setZoomToExtent(extent){
        this.getView().fit(extent)
    }

    setOverlay(overlay){
        this._map.addOverlay(overlay)
    }

    removeDoubleClickZoom(){
        let me = this
        this._map.getInteractions().forEach(function(interaction) {
           if (interaction instanceof DoubleClickZoom) {
            me._map.removeInteraction(interaction);
           }
        });
    }

    


    // Map 를 생성하여 반환한다.
    createMap(target, options = {}) {


        this._map = new OlMap({
            target: target,
            layers: [],
            view: new OlView({
                center: this._initCenter,
                zoom: this._initZoom,
                projection: 'EPSG:3857'
            }),
            /* 기본 컨트롤러 제거 */
            controls: defaultControls({
                zoom: false,
                rotate: false
            })
        })

        this.removeDoubleClickZoom()
        return this._map;

        
    }

    //레이어 이름으로 레이어 가져오기
    getLayerForName(name){

        let layer = null
        this.getMap().getAllLayers().map((lyr) => {
            if(name === lyr.get('name')){
              layer = lyr
            }
          })
        return layer

    }

    //레이어 추가
    addLayer(layer) {
        /*레이어 추가전에 instance 추가*/
        this.l_manager.addLayerInstance(layer.get('name'), layer)
        /* 레이어 추가 */
        this._map.addLayer(layer)
    }

    //레이어 제거
    removeLayer(item){
        //레이어 id만 넘어올경우
        if(typeof item === 'string'){
            let layer = this.l_manager.getFindLayerInstance(item)
            this.l_manager.removeLayer(layer)
            this._map.removeLayer(layer)
        } else if (typeof item === 'object'){ //레이어 형태로 넘어올경우
            this.l_manager.removeLayer(item)
            this._map.removeLayer(item)
        }
        
    }

}



export default new MapManager();