import MapManager from "../MapManager";
import {transform} from "ol/proj"


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
            return MapManager.removeLayer(layer)
        }
    }

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

const G$SetZoomToPoint=(zoom=6, point=[])=>{
    MapManager.setZoomToPoint(zoom, point)
}

export {
    G$addLayer,
    G$removeLayer,
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

    G$SetZoomToPoint

}
