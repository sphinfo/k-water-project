import { CallbackProperty, Cartesian3, Cartographic, Color, ColorMaterialProperty, HeightReference, PolygonHierarchy, ScreenSpaceEventHandler, ScreenSpaceEventType, defined } from "cesium";
import * as Cesium from 'cesium';
import { G$getPointsToArea, G$getPointsToLength, G$pointsToCenter } from '@gis/util';

let activeShapePoints = []  //클릭좌표
let activeShape             //map add
let floatingPoint           //마우스 이동 좌표
let drawingMode = ''        //( LINE / POLYGON)
let drawHandler = null      //draw 이벤트

/* 그리기 Tool */
class GisDrawTool {

    map = null

    constructor(map) {
        this.map = map

    }

    activate(mode){
        console.info(mode)
        drawingMode = mode
        if (!drawHandler) {
            drawHandler = new ScreenSpaceEventHandler(this.map.scene.canvas);
            drawHandler.setInputAction(this._onClick.bind(this, 'click'), ScreenSpaceEventType.LEFT_CLICK);
            drawHandler.setInputAction(this._mouseMove.bind(this), ScreenSpaceEventType.MOUSE_MOVE);
            drawHandler.setInputAction(this.deactivate.bind(this), ScreenSpaceEventType.RIGHT_CLICK);
        }
    }


    deactivate(){
        activeShapePoints.pop();
        this.drawShape(activeShapePoints, true);
        this.map.entities.remove(floatingPoint);
        this.map.entities.remove(activeShape);
        floatingPoint = undefined;
        activeShape = undefined;
        activeShapePoints = [];

        if(drawHandler){
            drawHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
            drawHandler.destroy();
            drawHandler = null
        }

    }

    //초기화
    remove(){
        this.deactivate()
        this.map.entities.removeAll()
    }

    //마우스 클릭 이벤트
    async _onClick(type, event) {
        const ray = this.map.camera.getPickRay(event.position);
        const earthPosition = this.map.scene.globe.pick(ray, this.map.scene);
        console.info(earthPosition)
        if (defined(earthPosition)) {
            if (activeShapePoints.length === 0) {
                floatingPoint = this.createPoint(earthPosition);
                activeShapePoints.push(earthPosition);
                const dynamicPositions = new CallbackProperty(function () {
                    if (drawingMode === "polygon") {
                        return new PolygonHierarchy(activeShapePoints);
                    }
                    return activeShapePoints;
                }, false);
                activeShape = this.drawShape(dynamicPositions);
            }
            activeShapePoints.push(earthPosition);


            if(drawingMode === 'line'){
                let lineLength = G$getPointsToLength(activeShapePoints)
                this.createPoint(earthPosition, lineLength.toFixed())
            }
            
        }
    }

    //마우스 이동이벤트
    _mouseMove(event) {
        if (defined(floatingPoint)) {
            const ray = this.map.camera.getPickRay(event.endPosition);
            const newPosition = this.map.scene.globe.pick(ray, this.map.scene);
            if (defined(newPosition)) {

                floatingPoint.position.setValue(newPosition);
                activeShapePoints.pop();
                activeShapePoints.push(newPosition);

                if(drawingMode === 'line'){
                    let lineLength = G$getPointsToLength(activeShapePoints)
                    floatingPoint.label.text = lineLength.toFixed() + 'm'
                }else if(drawingMode === 'polygon'){
                    let polygonArea = G$getPointsToArea(activeShapePoints)
                    floatingPoint.label = {
                        text: polygonArea.toFixed() + '㎡',
                        font: "14pt monospace",
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth: 2,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                    }
                }
            }
        }
    }


    createPoint(worldPosition, lineLength) {
        //라인일시 매 기점마다 label 추가
        let label = drawingMode === 'line' ? {
            text: `${lineLength === 0 ? 'start' : lineLength+'m'}`,
            font: "14pt monospace",
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        } : null

        //클린 분기점 point
        const point = this.map.entities.add({
          position: worldPosition,
          clampToGround: true,
          point: {
            color: Color.BLUE,
            pixelSize: 5,
            heightReference: HeightReference.CLAMP_TO_GROUND,
          },
          label: label
        });
        return point;
    }

    //draw
    drawShape(positionData, draw) {
        let shape;
        if (drawingMode === "line") {
          shape = this.map.entities.add({
            polyline: {
              positions: positionData,
              clampToGround: true,
              width: 3,
            },
          });
        } else if (drawingMode === "polygon") {

            let polygon = {
                hierarchy: positionData,
                material: new ColorMaterialProperty(
                  Color.WHITE.withAlpha(0.3)
                ),
              }

            shape = this.map.entities.add({ polygon: polygon })
            //polygon draw end center label
            if(draw){
                const center = G$pointsToCenter(positionData)
                this.createLabel(center, G$getPointsToArea(activeShapePoints));
            }
        }
        return shape;
    }

    //polygon center label
    createLabel(position, text) {
        if (!position || !defined(text)) {
            return;
        }

        this.map.entities.add({
            position: position,
            clampToGround: true,
            label: {
                text: text.toFixed()+'㎡',
                font: "14pt monospace",
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            },
        });
    }


}

export default GisDrawTool;