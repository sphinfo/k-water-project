import MapManager from "@gis/MapManager"
import {Cartesian2, Cartesian3, SceneTransforms, defined} from "cesium"

/* 가뭄 html 오버레이  */
class DroughtOverlay {

    overlays = []

	async _addOverlay(longitude, latitude, properties) {

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
        title.textContent = `${properties.Station}`

        // 요소들을 구조에 맞게 조립
        widgetHeader.appendChild(title)
        widgetBox.appendChild(widgetHeader)
        overlay.appendChild(widgetBox)
        

        if(longitude && latitude){
            /* 해당좌표로 오버레이 html 위치 지정 */
            var anchor = Cartesian3.fromDegrees(longitude, latitude, 0)
            var tmp = new Cartesian2()

            /* 지도 위치가 변경되면 해당 위치 변경 */
            map.scene.preRender.addEventListener(function(){
                var result = SceneTransforms.wgs84ToWindowCoordinates(map.scene, anchor, tmp)
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
    }
}

export default DroughtOverlay