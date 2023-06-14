import MapManager from "../MapManager";
import {transform} from "ol/proj"


const G$addLayer = (l) =>{
    console.info(l.get('name'))
    let layer = MapManager.getLayerForName(l.get('name'))
    if(layer === null){
        return MapManager.addLayer(l)
    }
    return null
}

const G$addOverlay = (o)=>{
    return MapManager.map.addOverlay(o)
}

const G$RemveOverlays = (id) =>{

    if(MapManager.map.getOverlays().getArray().length > 0){
        MapManager.map.getOverlays().getArray().map((obj)=>{
          if(obj.id){
            if(obj.id.indexOf(id) > -1){
                MapManager.map.removeOverlay(obj)
            }
          }
          
        })
      }

}

const G$getGeometryLength = (g) =>{
    var length = Math.round(g.getLength() * 100) / 100
    var output = `${G$ZeroCnt((Math.round(length * 100) / 100))} m`
    return output
}

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
