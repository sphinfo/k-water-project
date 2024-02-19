import { Cartesian3, Credit, Math, Rectangle, ScreenSpaceEventType, Terrain, Viewer, WebMapTileServiceImageryProvider } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from 'cesium';
import BaseWmsImageLayer from "./layers/BaseWmsImageLayer";
//import 'cesium-geoserverterrainprovider';


class MapManager {
    _map = null
    _baseMapLayer = null
    _baseMapType = 'Satellite'
    _vworld_key = '4660313D-1779-3BEA-8424-812231F3B59D'
    _vwroldLayer = { Base:{layer : 'Base', tileType : 'png'}, 
                     gray: {layer : 'gray', tileType : 'png'},
                     midnight: {layer : 'midnight', tileType : 'png'},
                     Hybrid : {layer : 'Hybrid', tileType : 'png'},
                     Satellite: {layer : 'Satellite', tileType : 'jpeg'} 
                    }
    _holdMap = false
    _baseOpactiy = 1
    constructor(opt) {

    }

    // Map 를 생성하여 반환한다.
    createMap(target, options = {}) {

        this._map = new Viewer(target, {
            homeButton: false,
            sceneModePicker: false,
            timeline: false,
            geocoder: false,
            fullscreenButton: false,
            selectionIndicator: false,
            trackedEntity : false,
            infoBox: false,
            skyAtmosphere : false
        });

        
        //this._map.imageryLayers.addImageryProvider(vworld2)

        const targetLongitude = 127.61790470489117
        const targetLatitude = 36.52505158669595
        this._map.camera.flyTo({
            destination: Cartesian3.fromDegrees(targetLongitude, targetLatitude, 850000), // 목표 위치의 카메라 높이 (높이 값 조절 가능)
            orientation: {
              heading: Math.toRadians(0), // 방위각 (degrees)
              pitch: Math.toRadians(-90), // 피치각 (degrees)
              roll: 0, // 롤각 (degrees)
            },
            duration: 3, // 애니메이션 지속 시간 (초)
        });


        this._changeBaseMap('Satellite')
        
        this.map.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        var animationContainer = document.querySelector('.cesium-viewer-animationContainer');
        var bottomContainer = document.querySelector('.cesium-viewer-bottom');
        var toolbarContainer = document.querySelector('.cesium-viewer-toolbar');
        //

        if (animationContainer) { animationContainer.parentNode.removeChild(animationContainer) }
        if (bottomContainer) { bottomContainer.parentNode.removeChild(bottomContainer) }
        if (toolbarContainer) { toolbarContainer.parentNode.removeChild(toolbarContainer) }



        return this._map;
    }

    _test(){

    }

    _mapLabel(type=false){
        if(type){
            let subMap = null
            let subOption = this._vwroldLayer['Hybrid']

            subMap = this.addImageLayer(
                new WebMapTileServiceImageryProvider({
                    url : `http://api.vworld.kr/req/wmts/1.0.0/${this._vworld_key}/${subOption.layer}/{TileMatrix}/{TileRow}/{TileCol}.${subOption.tileType}`,
                    layer : 'Hybrid',
                    style : 'default',
                    tileMatrixSetID: 'EPSG:900913',
                    maximumLevel: 19,
                    credit : new Credit('VWorld Korea')
            }))
            subMap.id = 'Hybrid'
        }else{
            this.removeLayer(this.getImageryLayersById('Hybrid'))
        }
    }

    _changeBaseMap(type=null) {
        if(type){

            if(this._baseMapLayer){
                this.removeLayer(this.getImageryLayersById('baseMap'))
                this.removeLayer(this.getImageryLayersById('Hybrid'))
            }
            
            let option = this._vwroldLayer[type]

            this._baseMapLayer = this.addImageLayer(
                new WebMapTileServiceImageryProvider({
                    url : `http://api.vworld.kr/req/wmts/1.0.0/${this._vworld_key}/${option.layer}/{TileMatrix}/{TileRow}/{TileCol}.${option.tileType}`,
                    layer : 'Base',
                    style : 'default',
                    tileMatrixSetID: 'EPSG:900913',
                    maximumLevel: 19,
                    credit : new Credit('VWorld Korea')
            }))
            this._baseMapLayer.id = 'baseMap'
            this._baseMapType = type
            
            //this.map.imageryLayers.lower(this._baseMapLayer)
            this._map.imageryLayers.lowerToBottom(this._baseMapLayer)

            return this._baseMapLayer
        }else{
            return null
        }
    }

    get map() {
        return this._map;
    }

    // test terrain load
    async terrainLoad() {
    }

    getMap(){
        return this._map
    }

    //point 이동
    flyToPoint(point, zoom=850000, pitch=-90, ignore=false){
        if(!this._holdMap || ignore){
            this._map.camera.flyTo({
                destination: Cartesian3.fromDegrees(point[0], point[1], zoom), // 목표 위치의 카메라 높이 (높이 값 조절 가능)
                orientation: {
                  heading: Math.toRadians(0), // 방위각 (degrees)
                  pitch: Math.toRadians(pitch), // 피치각 (degrees)
                  roll: 0, // 롤각 (degrees)
                },
                duration: 3, // 애니메이션 지속 시간 (초)
            })
        }
        
    }

    //정북 방향
    headingChange(heading=0){
        this._map.camera.flyTo({
            destination: this._map.camera.position,
            orientation: {
              heading: Math.toRadians(heading),
              pitch: this._map.camera.pitch,
              roll: this._map.camera.roll, 
            },
            duration: 3,
        })
    }

    holdeMap(type){
        this._holdMap = type
    }

    //extent 이동
    flyToExtent(extent, pitch){
        if(!this._holdMap){
            this._map.camera.flyTo({
                destination: Rectangle.fromDegrees(
                    extent[0], extent[1], extent[2], extent[3]
                ),
                orientation: {
                    heading: Math.toRadians(0),
                    pitch: Math.toRadians(!pitch ? -90 : pitch),
                    roll: 0.0,
                },
                duration: 2.0
            })
        }
        
    }

    //레이어 추가
    addLayer(layer){
        if(layer.type === 'wms'){
            this._map.imageryLayers.addImageryProvider(layer)
        }else{
            this._map.dataSources.add(layer)
        }   
    }

    //imagelayer 추가
    addImageLayer(layer){
        return this._map.imageryLayers.addImageryProvider(layer)
    }

    //레이어 제거
    removeLayer(layer){
        if(layer){
            this._map.imageryLayers.remove(layer)
            this._map.dataSources.remove(layer)
        }
    }

    //전체 imagelayers 투명도 조절
    setImageLayersOpacity(opacity){
        this._baseOpactiy = opacity
        this._map.imageryLayers._layers.forEach(layer => {
            if(layer.id?.indexOf('thematic') > -1){
                layer.alpha = 1
            }else{
                layer.alpha = layer.id !== 'baseMap' ? opacity : 1
            }
            
        })
    }

    getLayerForId(id){
        let l = null

        // wfs 레이어 검색
        if(id){
            l = this.getDatasourcesById(id)
        }

        // wms 레이어 검색
        if(!l){
            l = this.getImageryLayersById(id)
        }

        return l
    }
    
    getDatasourcesById(id){
        //return this._map.dataSources.get(id)
        return this._map.dataSources.getByName(id)[0]
    }

    getImageryLayersById(id){
        return this._map.imageryLayers._layers.find(layer => layer.id === id)
    }


    zoomIn() {

        var camera = this._map.camera;
        var currentDistance = camera.positionCartographic.height;
        var newDistance = currentDistance * 0.5; // 적절한 비율로 조정
        camera.setView({
            destination: Cartesian3.fromRadians(
            camera.positionCartographic.longitude,
            camera.positionCartographic.latitude,
            newDistance
            )
        });

    }

    zoomOut() {

        var camera = this._map.camera;
        var currentDistance = camera.positionCartographic.height;
        var newDistance = currentDistance * 2; // 적절한 비율로 조정
        camera.setView({
            destination: Cartesian3.fromRadians(
                camera.positionCartographic.longitude,
                camera.positionCartographic.latitude,
                newDistance
            )
        });
        
    }
}



export default new MapManager();