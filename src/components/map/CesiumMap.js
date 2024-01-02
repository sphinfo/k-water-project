import { Cartographic, Math, ScreenSpaceEventHandler, ScreenSpaceEventType } from "cesium";
import EventBus from "@common/eventBus/eventBus";
import MapEvents from "@common/eventBus/MapEvents";
import MapManager from "@gis/MapManager";

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
                    EventBus.dispatch(new CustomEvent(MapEvents.mouseMove, { detail: {longitude:longitude, latitude:latitude }}));
                }
            }
            
        }, ScreenSpaceEventType.MOUSE_MOVE);

        //map move end
        me.map.camera.moveEnd.addEventListener( async ()=>{
            var cameraPositionCartesian = me.map.camera.position;
            EventBus.dispatch(new CustomEvent(MapEvents.mapMoveEnd, { detail: cameraPositionCartesian }));
            EventBus.dispatch(new CustomEvent(MapEvents.mapMoveEnd2, { detail: cameraPositionCartesian }));

            var currentExtent = me.map.camera.computeViewRectangle()

            var camPos = me.map.camera.positionCartographic; 
            // console.info(camPos)
            // console.log(camPos.longitude * (180/Math.PI)); 
            // console.log(camPos.latitude * (180/Math.PI));

            //Extract the extent values
            var west = Math.toDegrees(currentExtent.west)
            var south = Math.toDegrees(currentExtent.south)
            var east = Math.toDegrees(currentExtent.east)
            var north = Math.toDegrees(currentExtent.north)

            //console.info(`bbox : xmin: ${west}, ymin: ${south}, xmax: ${east}, ymax: ${north}`)

        });

        me.map.camera.changed.addEventListener(function() {
            // 변경된 heading 값 가져오기
            const heading = me.map.camera.heading
            let adjustedHeading = (heading * (180 / Math.PI)) % 360
            if (adjustedHeading < 0) {
                adjustedHeading += 360
            }
            EventBus.dispatch(new CustomEvent(MapEvents.headingChange, { detail: {heading:adjustedHeading.toFixed(0) }}))
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