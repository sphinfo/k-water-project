import { Cartesian3, CesiumTerrainProvider, Credit, Math, Rectangle, ScreenSpaceEventType, Terrain, Viewer, WebMapTileServiceImageryProvider } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";


class MapManager {
    _map = null

    constructor(opt) {

    }

    // Map 를 생성하여 반환한다.
    createMap(target, options = {}) {

        var layers = [{layer : 'Base', tileType : 'png'}, 
                    {layer : 'gray', tileType : 'png'},
                    {layer : 'midnight', tileType : 'png'},
                    {layer : 'Hybrid', tileType : 'png'},
                    {layer : 'Satellite', tileType : 'jpeg'} ]

      var selLayer = layers[0];

      let vworld_key = 'B9A40D30-8F5B-3141-839A-DAA04BB600F0'

        // var vworld = new WebMapTileServiceImageryProvider({
        //     url : `http://api.vworld.kr/req/wmts/1.0.0/${vworld_key}/${selLayer.layer}/{TileMatrix}/{TileRow}/{TileCol}.${selLayer.tileType}`,
        //     layer : 'Base',
        //     style : 'default',
        //     tileMatrixSetID: 'EPSG:900913',
        //     maximumLevel: 19,
        //     credit : new Credit('VWorld Korea')
        // });

        this._map = new Viewer(target, {
            homeButton: false,
            sceneModePicker: false,
            timeline: false,
            geocoder: false,
            fullscreenButton: false,
            selectionIndicator: false,
            trackedEntity : false,
            infoBox: false,
            //selectedImageryProviderViewModel: false,
            terrain: Terrain.fromWorldTerrain()
        });

        //this._map.imageryLayers.addImageryProvider(vworld)

        const targetLongitude = 126.59894525349623
        const targetLatitude = 35.772996001653
        this._map.camera.flyTo({
            destination: Cartesian3.fromDegrees(targetLongitude, targetLatitude, 850000), // 목표 위치의 카메라 높이 (높이 값 조절 가능)
            orientation: {
              heading: Math.toRadians(0), // 방위각 (degrees)
              pitch: Math.toRadians(-90), // 피치각 (degrees)
              roll: 0, // 롤각 (degrees)
            },
            duration: 3, // 애니메이션 지속 시간 (초)
        });


        
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

    get map() {
        return this._map;
    }

    getMap(){
        return this._map
    }

    //point 이동
    flyToPoint(point, zoom=850000){
        this._map.camera.flyTo({
            destination: Cartesian3.fromDegrees(point[0], point[1], zoom), // 목표 위치의 카메라 높이 (높이 값 조절 가능)
            orientation: {
              heading: Math.toRadians(0), // 방위각 (degrees)
              pitch: Math.toRadians(-90), // 피치각 (degrees)
              roll: 0, // 롤각 (degrees)
            },
            duration: 3, // 애니메이션 지속 시간 (초)
        })
    }

    //extent 이동
    flyToExtent(extent){
        this._map.camera.flyTo({
            destination: Rectangle.fromDegrees(
                extent[0], extent[1], extent[2], extent[3]
            ),
            duration: 2.0
        })
    }


    addLayer(layer){
        if(layer.type === 'wms'){
            this._map.imageryLayers.addImageryProvider(layer)
        }else{
            this._map.dataSources.add(layer)
        }
        
    }

    removeLayer(layer){
        if(layer.constructor.name === 'ImageryLayer'){
            this._map.imageryLayers.remove(layer)
        }else{
            this._map.dataSources.remove(layer)
        }
        
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
        return this._map.imageryLayers._layers.find(layer => layer.imageryProvider.id === id)
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