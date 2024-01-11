import MapManager from "@gis/MapManager"
import {Cartesian2, Cartesian3, Color, SceneTransforms, defined} from "cesium"

/* 디폴트 html 오버레이  */
class BaseOverlay {

    baseInfo = null
    overlays = []
    polyline = []
    

	async _addOverlay(props) {

        const {coord=null, col=null, features={}} = props
        
        if(features.id === this.baseInfo){
            return
        }

        this.removeAll()
        this.baseInfo = features.id

        //지도
		let map = MapManager.map

        /* html 생성 */
        const overlay = document.createElement('div')
        map.container.appendChild(overlay)
        overlay.className = 'map-popup-box-wrap'
        

        // widget-box div 요소 생성
        const widgetBox = document.createElement('div')
        widgetBox.className = 'map-popup-box'

        // widget-header div 요소 생성
        const widgetHeader = document.createElement('div')
        widgetHeader.className = 'map-popup-box-header'

        // h4 요소 생성
        const title = document.createElement('h4')
        title.className = 'map-popup-box-title'
        if(col){
            title.textContent = `${features.properties[col]}`
        }
        

        // 요소들을 구조에 맞게 조립
        widgetHeader.appendChild(title)
        widgetBox.appendChild(widgetHeader)
        overlay.appendChild(widgetBox)
        

        if(coord){

            features.geometry.coordinates.map((coords)=>{

                const outline = MapManager.map.entities.add({
                    polyline: {
                        positions: Cartesian3.fromDegreesArray([...[].concat(...coords[0])]),
                        width: 5,
                        material: Color.RED
                    }
                })
                this.polyline.push(outline)

            })

            

            /* 해당좌표로 오버레이 html 위치 지정 */
            var catresian3 = Cartesian3.fromDegrees(coord.longitude, coord.latitude, 0)
            var tmp = new Cartesian2()

            /* 지도 위치가 변경되면 해당 위치 변경 */
            map.scene.preRender.addEventListener(function(){
                var result = SceneTransforms.wgs84ToWindowCoordinates(map.scene, catresian3, tmp)
                if(defined(result)){
                    overlay.style.display = 'block'
                    overlay.style.top = tmp.y - 33 + 'px'
                    overlay.style.left = tmp.x + 20 + 'px'
                } else {
                    overlay.style.display = 'none'
                }
            })


            this.overlays.push(overlay)
        }
		
	}

    //오버레이 전체 삭제
    removeAll() {
        let map = MapManager.map
        if(this.overlays.length > 0){
            this.overlays.forEach((overlay) => {
                if (overlay && overlay.parentNode === map.container) {
                    map.container.removeChild(overlay);
                }
            });
        }

        this.polyline.forEach(line => {
            map.entities.remove(line);
        })
        this.polyline = []
    }
}

export default BaseOverlay