import { Feature } from "ol";
import MapManager from "../MapManager";
import {transform} from "ol/proj"
import WidgetManager from "@com/manager/widget/WidgetManager";
import GisLayerInstance from "./layer/GisLayerInstance";
import TileLayer from "ol/layer/Tile";
import { TileWMS } from "ol/source";
import LayerConfig from "@gis/config/LayerConfig";

/* 레이어 추가 */
const G$addLayer = (l) =>{
    //지도상에 레이어가 있는지 확인
    let layer = MapManager.getLayerForName(l.get('name'))
    
    //레이어가 없으면 레이어 추가
    if(layer === null){
        return MapManager.addLayer(l)
    }
    return null
}

/* 레이어 추가 */
const G$removeLayer = (l) =>{

    if(l){
        //레이어 있는지 확인
        let layer = MapManager.getLayerForName(l.get('name'))
        
        //레이어가 지도에 있으면 레이어 삭제
        if(layer){
            //범례값 공통으로 쓸경우 임시230731
            WidgetManager.remove('LegendWidget')
            return MapManager.removeLayer(layer)
        }
    }
}

// 레이어 이름으로 찾기
const G$getLayerForName = (name=null)=>{
    let l = null
    if(name){
        l = MapManager.getLayerForName(name)
    }
    return l
}

/* create vectore feature */
const G$createFeature = () => {
    return new Feature()
}

/* 오버레이 추가 */
const G$addOverlay = (o)=>{
    return MapManager.map.addOverlay(o)
}

/* 오버레이 삭제 */
const G$RemveOverlays = (id) =>{

    // 전체 오버레이 가지고 오기 *깔끔하게 지워지지 않는 현상때문에
    const overlays = MapManager.map.getOverlays().getArray();
    if (overlays.length > 0) {
        
        // id와 일치하지 않는 오버레이만 필터링
        const filteredOverlays = overlays.filter((obj) => {
            return obj.id && obj.id.indexOf(id) === -1; 
        });

        // 기존의 오버레이 모두 제거
        MapManager.map.getOverlays().clear(); 
        
        // 필터링된 오버레이들을 다시 추가
        filteredOverlays.map((overlay) => {
            MapManager.map.addOverlay(overlay); 
        });
    }

}

/* geometry to length text */
const G$getGeometryLength = (g, m=true) =>{
    var length = Math.round(g.getLength() * 100) / 100
    
    var output = `${G$ZeroCnt((Math.round(length * 100) / 100))} m`
    return output
}

/* geometry to area text */
const G$getGeometryArea = (g) =>{
    let area = g.getArea();
    let output = `${G$ZeroCnt((Math.round(area * 100) / 100))} m<sup>2</sup>`;
    return output;
}

const G$getGeometrySize = (g)=>{

    let type = g.constructor.name

    let value = ''

    console.info(type)
    if(type === 'Polygon'){
        value = G$getGeometryArea(g)
    }else if(type === 'LineString'){
        value = G$getGeometryLength(g)
    }else if(type = 'Circle'){
        var length = Math.round(g.getRadius() * 100) / 100
        value = `${G$ZeroCnt((Math.round(length * 100) / 100))} m`
    }

    return value

}

const G$ZeroCnt = (v=0)=>{
    return typeof v === 'string' ? toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : typeof v === 'number' ? v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '-'
}

const G$TypeOf = (object, type='')=>{
    if (!object || !type || typeof type !== 'string') return false;
    const name = Object.prototype.toString.call(object).slice(8, -1);
    return name.toLowerCase() === type.toLowerCase();
}

const G$RandomId = (base='', length=15) =>{
    base = `${base}_`
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        base += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return base
}

const G$Transfrom = (point, to, from)=>{
    point = transform(point, `EPSG:${to}`, `EPSG:${from}`)
    return point
}

const G$PointToDms = (n) =>{
    const d = parseInt(n);
    const m = parseInt((n - d) * 60);
    const s = (((n - d) * 60 - m) * 60).toFixed(2);

    return {d, m, s, label: `${d}° ${m}' ${s}"`}
}

const G$GetPointToDetail=(x,y)=>{

    let longlat = G$Transfrom([x,y], 3857, 4326)

    let lonDms = G$PointToDms(longlat[0])
    let latDms = G$PointToDms(longlat[1])

    /* 도분초 계산 */
    var coord = {
        lon: longlat[0],
        lat: longlat[1],
        lonDms: lonDms.label,
        latDms: latDms.label,
        x: x,
        y: y
    }

    return coord
    
}

/* point 지점 이동 */
const G$SetZoomToPoint=(zoom=6, point=[])=>{
    MapManager.setZoomToPoint(zoom, point)
}

/* 위젯 추가 */
const G$addWidget = (wId) =>{
    WidgetManager.add(wId);
}

/* 위젯 닫기 */
const G$removeWidget = (wId) =>{
    WidgetManager.remove(wId);
}


/* 공통된 WMS TILE LAYER instance 만들기 */
const G$makeWmsTileInstance = (name) =>{
    let instance = GisLayerInstance.createInstance({
        layer: new TileLayer({name: name}), 
        source: new TileWMS(),
        sourceOpt:{
            url: '/starGeo/sckmpp/wms?',
            params:{
                LAYERS:`sckmpp:${name}`,
                urlType: 'geoServer',
				'FORMAT': 'image/png',
				'VERSION': '1.3.0',
            },
			serverType: 'geoserver',
			crossOrigin: 'anonymous'
        }
    })
    return instance

}

//레이어 Opacity 변경
const G$setLayerOpacity = (name, val=1) =>{
    let layer = G$getLayerForName(name)
    if(layer){
        layer.setOpacity(val)
    }
}

export {
    G$addLayer,
    G$removeLayer,
    G$getLayerForName,
    G$createFeature,
    G$addOverlay,
    G$RemveOverlays,
    G$getGeometryLength,
    G$getGeometryArea,
    G$getGeometrySize,
    
    
    G$ZeroCnt,
    G$TypeOf,
    G$RandomId,
    G$Transfrom,
    G$GetPointToDetail,

    G$SetZoomToPoint,

    G$removeWidget,
    G$addWidget,
    
    G$makeWmsTileInstance,
    G$setLayerOpacity,
}
