import { Cartesian3, Cartographic, Color, Math as MathC, PolygonGraphics, PolygonHierarchy, Rectangle, Transforms, WebMercatorProjection } from "cesium";
import createColormap from "colormap";
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
const G$removeLayer = (l) =>{
    if(typeof l !== 'string'){
        MapManager.removeLayer(l)
    }else{
        G$removeLayerForId(l)
    }
}

/* 레이어 삭제 by id */
const G$removeLayerForId = (id) =>{
    if(id){
        let layer = MapManager.getLayerForId(id)
        if(layer){
            MapManager.removeLayer(layer)
        }
    }   
}

// 레이어 이름으로 찾기
const G$getLayerForId = (id=null)=>{
    return MapManager.getLayerForId(id)
}

//wms 레이어 이름으로 찾기
const G$getWmsLayerForId = (id)=>{
    return MapManager.getImageryLayersById(id)
}

const G$changeMapLayer = (type=null) =>{
    if(type){
        if(MapManager._baseMapType !== type){
            MapManager._changeBaseMap(type)
        }
    }
}

//point를 ?x? 격자 생성 (long, lat, 50x50 = 50)
const G$pointToPolygon = (lon, lat, size)=>{
    const gridSize = size/2
    const polygon = new PolygonGraphics({
        hierarchy: new PolygonHierarchy(
            Cartesian3.fromDegreesArray([
                lon - gridSize / 111319.9,
                lat + gridSize / 111319.9,
                lon + gridSize / 111319.9,
                lat + gridSize / 111319.9,
                lon + gridSize / 111319.9,
                lat - gridSize / 111319.9,
                lon - gridSize / 111319.9,
                lat - gridSize / 111319.9,
            ])
        ),
    })

    return polygon
}

/* point를 grid 로 변환 return extent */
const G$pointToGrid = (point, grid=50) =>{

   
    

}

//geometry to centroid
const G$polygonToCentroid = (multiPolygon)=>{
    let totalArea = 0;
    let weightedSumX = 0;
    let weightedSumY = 0;

    for (let i = 0; i < multiPolygon[0].length; i++) {
        const polygon = multiPolygon[0][i];
        const polygonArea = G$calculatePolygonArea(polygon);
        const centroid = G$calculatePolygonCentroid(polygon);

        weightedSumX += centroid[0] * polygonArea;
        weightedSumY += centroid[1] * polygonArea;
        totalArea += polygonArea;
    }

    const centroidX = weightedSumX / totalArea;
    const centroidY = weightedSumY / totalArea;

    return [centroidX, centroidY];
}

const G$calculatePolygonArea = (polygon) =>{
    const numPoints = polygon.length;
    let area = 0;

    for (let i = 0; i < numPoints; i++) {
        const currentPoint = polygon[i];
        const nextPoint = polygon[(i + 1) % numPoints];

        const x1 = currentPoint[0];
        const y1 = currentPoint[1];
        const x2 = nextPoint[0];
        const y2 = nextPoint[1];

        area += (x1 * y2 - x2 * y1);
    }

    area /= 2;
    return Math.abs(area);

}

const G$calculatePolygonCentroid = (polygon) =>{
    const numPoints = polygon.length;
    let centroidX = 0;
    let centroidY = 0;
    let totalArea = 0;

    for (let i = 0; i < numPoints; i++) {
        const currentPoint = polygon[i];
        const nextPoint = polygon[(i + 1) % numPoints];

        const x1 = currentPoint[0];
        const y1 = currentPoint[1];
        const x2 = nextPoint[0];
        const y2 = nextPoint[1];

        const commonFactor = x1 * y2 - x2 * y1;

        centroidX += (x1 + x2) * commonFactor;
        centroidY += (y1 + y2) * commonFactor;
        totalArea += commonFactor;

    }

    centroidX /= (3 * totalArea);
    centroidY /= (3 * totalArea);

    return [centroidX, centroidY];
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

//포인트들의 센터점 
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

// point 중 가장 lowsest 에 있는 point
const G$pointsToLowest = (positions) =>{
    if (!positions || positions.length === 0) {
        return undefined;
    }

    let lowestPoint = positions[0];

    for (let i = 1; i < positions.length; i++) {
        const currentPoint = positions[i];
        if (currentPoint.x < lowestPoint.x) {
            lowestPoint = currentPoint; 
        }
    }

    console.info(lowestPoint)
    return lowestPoint;

}

//cartesina -> 경위도
const G$cartesianToLongLat = (cartesian) =>{

    let cameraPositionCartographic = Cartographic.fromCartesian(cartesian);

    let longitude = MathC.toDegrees(cameraPositionCartographic.longitude);
    let latitude = MathC.toDegrees(cameraPositionCartographic.latitude);

    return {longitude: longitude, latitude: latitude}

}

//color map을 통한 min max nomalizetion ( colormap 분리필요 ) 230927
const G$normalizeWithColors = ({value=0, min=-10, max=10, type='jet', nshades=30, format='hex', opacity=1}) =>{
    
    let colormap = createColormap({
        colormap: type,
        nshades: nshades,
        format: format,
        alpha: 1
    })

    const normalized = (value - min) / (max - min)
    const index = Math.floor(normalized * colormap.length)

    let hex = colormap[index].replace(/^#/, '')
    const bigint = parseInt(hex, 16)

    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    const cesiumColor = new Color(
        r / 255,
        g / 255,
        b / 255,
        opacity 
    );

    return cesiumColor;
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
    
    return point
}

//point to dms
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

const G$multiPolygonToExtent = (multipolygon=[]) =>{
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    // Multipolygon 내의 모든 포인트에 대한 반복
    for (const polygon of multipolygon) {
        for (const ring of polygon) {
            for (const point of ring) {
                const [x, y] = point;
                // 최소 및 최대 좌표 업데이트
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
    }

    return [minX, minY,  maxX, maxY]
}


const G$pointsToExtent = (points = []) =>{

    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let maxY = Number.MIN_VALUE;

    // Loop through the points to find the minimum and maximum coordinates
    for (const point of points) {
        //const cartographic = Cartographic.fromCartesian(point)
        const longitude = MathC.toDegrees(point.longitude);
        const latitude = MathC.toDegrees(point.latitude);

        minX = Math.min(minX, longitude);
        minY = Math.min(minY, latitude);
        maxX = Math.max(maxX, longitude);
        maxY = Math.max(maxY, latitude);
    }

    return [minY, minX, maxX, maxY]

}

const G$flyToExtent= (extent, pitch=false) =>{
    MapManager.flyToExtent(extent, pitch)
}

const G$flyToPoint= (point, zoom, pitch) =>{
    MapManager.flyToPoint(point, zoom, pitch)
}


/* 위젯 추가 */
const G$addWidget = (wId,props) =>{
    MainWidgetManager.add(wId,props);
}

/* 위젯 닫기 */
const G$removeWidget = (wId) =>{
    MainWidgetManager.remove(wId);
}

/* 위젯 props 전송 */
const G$paramWidget = (wId, props) =>{
    MainWidgetManager.changeParam(wId, props);
}

export {
    G$addLayer,
    G$removeLayer,
    G$removeLayerForId,
    G$getLayerForId,
    G$getWmsLayerForId,
    G$pointToPolygon,
    G$pointToGrid,
    
    G$changeMapLayer,

    G$polygonToCentroid,
    G$calculatePolygonArea,
    G$calculatePolygonCentroid,

    G$getPointsToLength,
    G$getPointsToArea,
    G$pointsToLowest,
    G$pointsToCenter,
    
    G$normalizeWithColors,
    G$cartesianToLongLat,

    G$multiPolygonToExtent,
    G$pointsToExtent,
    G$flyToExtent,
    G$flyToPoint,
    
    G$ZeroCnt,
    G$TypeOf,
    G$RandomId,
    G$Transfrom,
    G$GetPointToDetail,

    G$addWidget,
    G$removeWidget,
    G$paramWidget
}
