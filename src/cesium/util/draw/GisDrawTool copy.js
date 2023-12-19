import { CallbackProperty, Cartesian3, Cartographic, Color, HeightReference, PolygonHierarchy, ScreenSpaceEventHandler, ScreenSpaceEventType } from "cesium";

let drawingMode = 'polyline'
let drawHandler = null
let entities = null
let drawingPositions = []
let count = 0
let entitiesArray = []

/* 그리기 Tool */
class GisDrawTool {

    map = null

    constructor(map) {
        this.map = map

    }

    activate(mode){
        drawingMode = mode

        if (!drawHandler) {
            drawHandler = new ScreenSpaceEventHandler(this.map.scene.canvas);
            drawHandler.setInputAction(this._onClick.bind(this, 'click'), ScreenSpaceEventType.LEFT_CLICK);
            drawHandler.setInputAction(this._onClick.bind(this, 'move'), ScreenSpaceEventType.MOUSE_MOVE);
            //drawHandler.setInputAction(this.deactivate.bind(this), ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            drawHandler.setInputAction(this.deactivate.bind(this), ScreenSpaceEventType.RIGHT_CLICK);


            if(drawingMode === 'polyline'){
                entities = this.map.entities.add({
                    polyline: {
                        positions: new CallbackProperty(() => drawingPositions, false),
                        width: 2,
                        material: Color.RED,
                        clampToGround: true,
                    },
                });
            }else if(drawingMode === 'polygon'){
                entities = this.map.entities.add({
                    polygon: {
                        hierarchy: new CallbackProperty(() => new PolygonHierarchy(drawingPositions), false),
                        material: new Color(0.0, 1.0, 0.0, 0.3),
                        outlineColor: Color.BLUE, // 데투리 색상 (녹색 반투명)
                        clampToGround: true,
                    },
                });
            }
            

            entitiesArray.push(entities)
        }
    }


    deactivate(){
        if (drawHandler) {
            drawHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
            drawHandler.destroy();
            drawHandler = null;
            drawingPositions = []
            entities = null
            count = 0
        }
    }

    
    remove(){
        this.deactivate()
        entitiesArray = []
        this.map.entities.removeAll()
    }

    async _onClick(type, clickEvent) {
        let position = type === 'click' ? clickEvent.position : clickEvent.endPosition

        const pickedLocation = this.map.scene.pickPosition(position);
        if (pickedLocation) {

            drawingPositions[count] = pickedLocation;
            count = type === 'click' ? count+1 : count

            if(type === 'click'){

		        let cartesian = this.map.scene.globe.pick(this.map.camera.getPickRay(clickEvent.position), this.map.scene);
                
                cartesian = {...{x:pickedLocation.x, y:pickedLocation.y}, ...cartesian }
                this.map.entities.add({
                    position: cartesian,
                    point: {
                        pixelSize: 5,
                        color: Color.BLUE,
                        heightReference: HeightReference.CLAMP_TO_GROUND,
                    }
                })
            }
            
        
            if(drawingPositions.length > 0){

                if (drawingMode === 'polyline') {
                    entities.polyline.positions = drawingPositions.slice()
                } else if (drawingMode === 'polygon') {
                    entities.polygon.hierarchy = new PolygonHierarchy(drawingPositions.slice())
                }

            }
          
        }
    }

    destroyBiz(biz) {
        
    }
}

export default GisDrawTool;