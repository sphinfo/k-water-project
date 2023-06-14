import MapManager from "../../openlayers/MapManager";
import EventBus from "../../common/eventbus/EventBus";
import MapEvents from "../../common/eventbus/MapEvents";
import LayerManager from "../../openlayers/LayerManager";
import { G$addLayer } from "../../openlayers/util";

import { debounce } from "lodash";

export default class OlMap {

    mapRef = null

    drawRef = null

    baseMapLayers = []

    constructor(mapRef){

        this.mapRef = mapRef

        this.mapInit();

    }


    //지도 초기화
    mapInit = () =>{

        // MapManager로 MAP 생성
        this.map = MapManager.createMap(this.mapRef.current);

        //배경지도 생성
        this.setBaseMap()

        //ol map 이벤트 정리
        this.setMapEventDispatch() 

        //이벤트 
        this.setMapEventListener();

        //
        this.setInitLayer()

    }

    //기본배경지도 생성
    setBaseMap = () =>{

        //일반맵
        let mapBaseLayer = LayerManager.createLayer('VWORLD_MAP')
        
        //위성맵
        let mapSateLayer = LayerManager.createLayer('VWORLD_MAP_SATE')
        mapSateLayer.setVisible(false)
        

        this.baseMapLayers.push(mapBaseLayer)
        this.baseMapLayers.push(mapSateLayer)

        G$addLayer(mapBaseLayer)
        G$addLayer(mapSateLayer)

    }

    setInitLayer(){

        /* 그리기 */

    }

    //지도 이벤트 관리 eventDispatch 관리
    setMapEventDispatch = () =>{

        let me = this

        //이벤트 연속호출 방지를 위한 함수 지연
        const mouseMoveDebounce = debounce(event => this.mouseMove(event), 8);
        //지도 마우스 포인터 이벤트
        this.map.on('pointermove',function(event){
            mouseMoveDebounce(event)
            event.preventDefault();
        });

        //
        this.map.on('change:size', function(event) {
            event.preventDefault();
        });

        //
        this.map.on('click', function(event) {
            event.preventDefault();
            EventBus.dispatch(new CustomEvent(MapEvents.mapViewClicked, {
                    detail: event
                }
            ));
        })

        //
        this.map.on('moveend', function(event) {
            event.preventDefault();
        })

    }

    mouseMove = (event) =>{
        
        EventBus.dispatch(new CustomEvent(MapEvents.mouseMove, {
                detail: event
            }
        ));
    }
    
    //이벤트 등록
    setMapEventListener = () =>{

        //레이어 등록
        EventBus.addListener(MapEvents.addLayer, event => {
            if (event.detail.layer) {
                this.map.addLayer(event.detail.layer);
                if (event.detail.eventCallback) {
                    event.detail.eventCallback.call();
                }
            }
        });

        //레이어 삭제
        EventBus.addListener(MapEvents.removeLayer, event => {
            if (event.detail.layer) {
                this.map.removeLayer(event.detail.layer);
                if (event.detail.eventCallback) {
                    event.detail.eventCallback.call();
                }
            }
        });

        // mapview
        EventBus.addListener(MapEvents.getView, event => {
            if (event.detail.callbackFunction) {
                event.detail.callbackFunction.call({}, this.map);
            }
        });


        EventBus.addListener(MapEvents.changeBaseMap, event => {
            
            if(event.detail.type === 'Satellite'){
                this.baseMapLayers[0].setVisible(false)
                this.baseMapLayers[1].setVisible(true)
            }else if(event.detail.type === 'Base'){
                this.baseMapLayers[0].setVisible(true)
                this.baseMapLayers[1].setVisible(false)
            }

        });

    }


    destroy = () => {
        
        if (this.map) {
            this.map = null
        }
    }

}