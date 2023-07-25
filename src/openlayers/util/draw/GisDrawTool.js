
import LayerManager from "../../LayerManager";
import MapManager from "../../MapManager";
import GisDraw from "./GisDraw";
import GisOverlay from "../GisOverlay/GisOverlay";

import {G$getGeometryLength, G$getGeometryArea, G$TypeOf, G$addOverlay, G$addLayer, G$getGeometrySize, G$RemveOverlays} from "../../util"

/*
	그리기 기능을 기능별로 다르게 적용하기 위한 DRAW CLASS
*/

class GisDrawTool {

    _bizs = {}
    _bizProps = {}
    _listeners = {};

    constructor() {
        this._init();
    }

    _init() {
        if (MapManager.map) {
            this._drawTool = new GisDraw({
                onDrawStart: this.onDrawStart,
                onDrawEnd: this.onDrawEnd,
            });
        }
    }

    // draw 이벤트 등록 (biz명 / callbackFunction / addFeature)
    addBiz(biz, callback, draw=true, measureOverlay=null) {
        
        if (!this._drawTool) {
            this._init();
        }

        this._bizs[biz] = false;
        this.parseBizProps(biz, callback, draw, measureOverlay);

    }

    //collback 등록 (biz명, callbackFunction, addFeature, 측정overlay)
    parseBizProps(biz, callback, draw, measureOverlay) {

        this._bizProps[biz] = {
            callback: callback,
            layer: LayerManager.createLayer(biz),
            draw: draw,
            measureOverlay: measureOverlay,
            
        }
        
        if(draw){
            if(MapManager.map){
                G$addLayer(this._bizProps[biz].layer)
            }
        }

    }

    //그리기 이벤트 실행 (biz명, 그리기 타입, 측정오버레이)
    activate(biz, type) {

        this._drawTool.deactivate();

        //이벤트 중복 발생 방지
        for (const key of Object.keys(this._bizs)) {
            this._bizs[key] = key === biz ? true : false
        }

        //그리기 실행
        this._drawTool.activate(type);

    }


    //그리기 이벤트 삭제
    deactivate() {
        
        for (const key of Object.keys(this._bizs)) {
            this._bizs[key] = false;
        }

        this._drawTool.deactivate();

    }


    //feature 삭제
    deleteFeature(biz, delFeature) {

    }

    //그래픽 지우기
    clearLayer(biz) {

        const bizeProps = this._bizProps[biz];

        const {layer, measureOverlay} = bizeProps;
        
        //feature 지우기
        if(layer){
            layer.getSource().clear()
        }

        //오버레이 삭제
        if(measureOverlay){
            G$RemveOverlays(biz)
        }

    }

    //추가 feature
    addFeature(biz, feature) {
        
    }

    //그리기 이벤트 start
    onDrawStart = (feature) =>{

        for (const [biz, isUse] of Object.entries(this._bizs)) {

            //_bizProps
            if (isUse) {
                
                const bizeProps = this._bizProps[biz];
                const {measureOverlay} = bizeProps;

                //오버레이 툴팁이 필요한경우
                if(measureOverlay){

                    let ov = new GisOverlay({id:biz})
                    G$addOverlay(ov._overlay)

                    ov._overlay.geometry = feature.getGeometry()
                    ov._overlay.geometry.on('change', (evt)=>{

                        let geom = evt.target

                        ov.setElement(G$getGeometrySize(geom))
                        ov.setPosition(geom.getLastCoordinate())

                    })

                }

            }

        }

    }

    getBiz = (biz) => {

    }

    //그리기 이벤트 end
    onDrawEnd = (feature) => {

        let geometry = feature.getGeometry()

        //tool 에 등록된 biz collback 찾기
        for (const [biz, isUse] of Object.entries(this._bizs)) {

            //_bizProps
            if (isUse) {
                const bizeProps = this._bizProps[biz];
                const {callback, draw, layer} = bizeProps;
                const source = layer.getSource()
                
                //biz에 등록된 레이어에 feature 추가
                if (draw) {
                    source.addFeature(feature)
                }

                
                
                if (callback) {

                    /* react ref callback */
                    if (callback.hasOwnProperty('current')) {
                        //geometry return
                        if (callback.current.getGeometry) {
                            callback.current.getGeometry(geometry);
                        }
                        //feature return
                        if (callback.current.getFeautre) {
                            callback.current.getFeautre(feature);
                        }

                        if (callback.current.drawEnd) {
                            callback.current.drawEnd();
                        }

                    } else if (G$TypeOf(callback, 'object')) {

                        if (callback.getGeometry) {
                            callback.getGeometry(geometry);
                        }
                        if (callback.getFeature) {
                            callback.getFeature(feature);
                        }

                        if (callback.drawEnd) {
                            callback.drawEnd();
                        }

                    } else if (G$TypeOf(callback, 'function')) {
                        callback(geometry, feature);
                    } else {
                        console.log('please check callback process!');
                    }


                }

                if (biz in this._listeners) {

                    for (const listener of this._listeners[biz]) {
                        if (G$TypeOf(listener, 'function')) {
                            listener(geometry, feature, layer);
                        } else {
                            console.log('please check callback process!');
                        }
                    }
                }
            }
        }
    }
    

    destroyBiz(biz) {
        
    }
}

export default new GisDrawTool();