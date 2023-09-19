import { Cartographic, Entity, Math, ScreenSpaceEventHandler, ScreenSpaceEventType, SelectionIndicatorViewModel, defined } from "cesium";
import EventBus from "@common/eventBus/EventBus";
import MapEvents from "@common/eventBus/MapEvents";
import MapManager from "@gis/MapManager";
import { G$getLayerForId } from "@gis/util";

export default class CesiumMap {

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

        //map 이벤트 정리
        this.setMapEventDispatch() 

        //이벤트 
        this.setMapEventListener();


    }

    //기본배경지도 생성
    setBaseMap = () =>{

    }


    //지도 이벤트 관리 eventDispatch 관리
    setMapEventDispatch = () =>{

        let me = this

        var handler = new ScreenSpaceEventHandler(this.map.scene.canvas);
        var delayInterval = 50
        var lastMouseMoveTime = 0

        
        // move move event
        handler.setInputAction((event)=>{
            var currentTime = new Date().getTime();
            // 너무 많이 호출되므로 interval 적용
            if (currentTime - lastMouseMoveTime > delayInterval) {
                lastMouseMoveTime = currentTime
                var cartesian = me.map.camera.pickEllipsoid(event.endPosition, me.map.scene.globe.ellipsoid);
                if (cartesian) {
                    let cartographic = Cartographic.fromCartesian(cartesian);
                    let longitude = Math.toDegrees(cartographic.longitude);
                    let latitude = Math.toDegrees(cartographic.latitude);
                    // event bus 활용
                    EventBus.dispatch(new CustomEvent(MapEvents.mouseMove, { detail: {longitude:longitude, latitude:latitude}}));
                }
            }
            
        }, ScreenSpaceEventType.MOUSE_MOVE);

        //map move end
        me.map.camera.moveEnd.addEventListener( async ()=>{
            var cameraPositionCartesian = me.map.camera.position;
            EventBus.dispatch(new CustomEvent(MapEvents.mapMoveEnd, { detail: cameraPositionCartesian }));
        });


        handler.setInputAction((event)=>{
            var cartesian = me.map.camera.pickEllipsoid(event.position, me.map.scene.globe.ellipsoid);
            if (cartesian) {
                var cartographic = Cartographic.fromCartesian(cartesian);
                var longitude = Math.toDegrees(cartographic.longitude);
                var latitude = Math.toDegrees(cartographic.latitude);
                //console.log("마우스 좌표:", longitude, latitude);
                //console.info(longitude+','+latitude)
            }
            
        }, ScreenSpaceEventType.LEFT_CLICK);

    }

    mouseMove = (event) =>{
        
    }
    
    //이벤트 등록
    setMapEventListener = () =>{

    }


    destroy = () => {
        
        if (this.map) {
            this.map = null
        }
    }

}