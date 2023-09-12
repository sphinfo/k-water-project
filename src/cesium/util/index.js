import { Cartesian3, Cartographic, Math as MathC, Transforms, WebMercatorProjection } from "cesium";
import MapManager from "../MapManager";
import MainWidgetManager from "@common/widget/WidgetManager";

/* 레이어 추가 */
const G$addLayer = (l) =>{
    
    let layer = MapManager.getLayerForId(l.id)
    if(!layer){
        MapManager.addLayer(l)
    }
}

/* 레이어 삭제 */
const G$removeLayer = (id) =>{
    console.info(id)
    let layer = MapManager.getLayerForId(id)
    if(layer){
        MapManager.removeLayer(layer)
    }
}

// 레이어 이름으로 찾기
const G$getLayerForId = (id=null)=>{
    return MapManager.getLayerForId(id)
}


/* geometry to length text */
const G$getPointToPointLength = (cartesian1, cartesian2) =>{
    const deltaX = cartesian2.x - cartesian1.x;
    const deltaY = cartesian2.y - cartesian1.y;
    const deltaZ = cartesian2.z - cartesian1.z;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
    return distance
}

const G$getPointsToLength = (points) =>{
    let totalDistance = 0.0;
    for (let i = 0; i < points.length - 1; i++) {
        const point1 = points[i];
        const point2 = points[i + 1];

        const distance = G$getPointToPointLength(point1, point2);
        totalDistance += distance;
    }
    return totalDistance;
}

/* geometry to area text */
const G$getPointsToArea = (points) =>{
    let area = 0.0;
    const numPositions = points.length;

    for (let i = 0; i < numPositions; i++) {
        const currentPos = points[i];
        const nextPos = points[(i + 1) % numPositions];

        const x1 = currentPos.x;
        const y1 = currentPos.y;
        const x2 = nextPos.x;
        const y2 = nextPos.y;

        area += (x1 * y2 - x2 * y1);
    }

    area = Math.abs(area) / 2.0;

    return area;
}

const G$pointsToCenter = (positions) =>{
    let xSum = 0.0;
    let ySum = 0.0;
    let zSum = 0.0;
    let count = 0;

    for (const position of positions) {
        xSum += position.x;
        ySum += position.y;
        zSum += position.z;
        count++;
    }

    if (count === 0) {
        return undefined;
    }

    return new Cartesian3(xSum / count, ySum / count, zSum / count);
}

const G$cartesianToLongLat = (cartesian) =>{

    let cameraPositionCartographic = Cartographic.fromCartesian(cartesian);

    // Cartographic 좌표에서 경도와 위도를 가져옵니다.
    let longitude = MathC.toDegrees(cameraPositionCartographic.longitude);
    let latitude = MathC.toDegrees(cameraPositionCartographic.latitude);

    return {longitude: longitude, latitude: latitude}
    //cameraPositionCartesian

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
        base += characters.charAt(MathC.floor(MathC.random() * charactersLength));
    }
    return base
}

const G$Transfrom = (point, to, from)=>{
    
    return point
}

const G$PointToDms = (n) =>{
    const d = parseInt(n);
    const m = parseInt((n - d) * 60);
    const s = (((n - d) * 60 - m) * 60).toFixed(2);

    return {d, m, s, label: `${d}° ${m}' ${s}"`}
}

const G$GetPointToDetail=(longitude, latitude)=>{

    var cartographicPosition = Cartographic.fromDegrees(longitude, latitude);
    var webMercatorProjection = new WebMercatorProjection();
    var webMercatorPosition = webMercatorProjection.project(cartographicPosition);

    let lonDms = G$PointToDms(longitude)
    let latDms = G$PointToDms(latitude)

    /* 도분초 계산 */
    var coord = {
        lon: longitude,
        lat: latitude,
        lonDms: lonDms.label,
        latDms: latDms.label,
        x: webMercatorPosition.x,
        y: webMercatorPosition.y
    }

    return coord
    
}


/* 위젯 추가 */
const G$addWidget = (wId) =>{
    MainWidgetManager.add(wId);
}

/* 위젯 닫기 */
const G$removeWidget = (wId) =>{
    MainWidgetManager.remove(wId);
}

export {
    G$addLayer,
    G$removeLayer,
    G$getLayerForId,
    G$getPointsToLength,
    G$getPointsToArea,
    G$pointsToCenter,
    
    G$cartesianToLongLat,
    
    G$ZeroCnt,
    G$TypeOf,
    G$RandomId,
    G$Transfrom,
    G$GetPointToDetail,

    G$addWidget,
    G$removeWidget
}
