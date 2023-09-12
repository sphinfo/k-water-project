import { Cartesian3, CesiumTerrainProvider, Credit, Math, ScreenSpaceEventType, Terrain, Viewer, WebMapTileServiceImageryProvider } from "cesium";
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

        if (animationContainer) { animationContainer.parentNode.removeChild(animationContainer) }
        if (bottomContainer) { bottomContainer.parentNode.removeChild(bottomContainer) }



        return this._map;
    }

    get map() {
        return this._map;
    }

    getMap(){
        return this._map
    }

    addLayer(layer){
        if(layer.constructor.name === 'BaseEntityCollection'){
            this._map.dataSources.add(layer);
        }else{
            this._map.imageryLayers.addImageryProvider(layer);
        }
        
    }

    removeLayer(layer){
        this._map.imageryLayers.remove(layer);
    }


    getLayerForId(id){
        let l = undefined
        if(id){
            const allLayers = this._map.imageryLayers._layers;
            for (const layer of allLayers) {
                if(layer.imageryProvider){
                    if (layer.imageryProvider.id === id) {
                        l = layer
                        break;
                    }
                }
            }
        }
        return l
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