import MapManager from "@gis/MapManager"
import {Cartesian2, Cartesian3, SceneTransforms, defined} from "cesium"
import { G$GetPointToDetail } from ".."

/* 안전 html 오버레이  */
class SafetyOverlay {

    overlays = []

	async _addOverlay(longitude, latitude, properties) {

        this.removeAll()
        
        //지도
		let map = MapManager.map

        /* html 생성 */
        const overlay = document.createElement('div')
        map.container.appendChild(overlay)
        overlay.className = 'map-popup-box-wrap box-point'

        // widget-box div 요소 생성
        const widgetBox = document.createElement('div')
        widgetBox.className = 'map-popup-box'

        // widget-header div 요소 생성
        const widgetHeader = document.createElement('div')
        widgetHeader.className = 'map-popup-box-header'

        // h4 요소 생성
        //const title = document.createElement('h4')
        //title.className = 'map-popup-box-title'
        //title.textContent = '변위 등급'

        // IconButton 요소 생성
        const iconButton = document.createElement('div')
        iconButton.className = 'popup-close-btn';
        iconButton.addEventListener('click', function () {
            console.log(properties)
            map.container.removeChild(overlay)
        })

        let coord = G$GetPointToDetail(longitude, latitude)

        // widget-body div 요소 생성
        const widgetBody = document.createElement('div')
        widgetBody.className = 'map-popup-box-body'
        widgetBody.textContent = `LON ${coord.lonDms} lAT ${coord.latDms}`

        // 요소들을 구조에 맞게 조립
        //widgetHeader.appendChild(title);
        widgetHeader.appendChild(iconButton)
        widgetBox.appendChild(widgetHeader)
        widgetBox.appendChild(widgetBody)
        overlay.appendChild(widgetBox)

        /* 해당좌표로 오버레이 html 위치 지정 */
        var anchor = Cartesian3.fromDegrees(longitude, latitude, 0)
        var tmp = new Cartesian2()

        /* 지도 위치가 변경되면 해당 위치 변경 */
        map.scene.preRender.addEventListener(function(){
            var result = SceneTransforms.wgs84ToWindowCoordinates(map.scene, anchor, tmp)
            if(defined(result)){
                overlay.style.display = 'block'
                overlay.style.top = tmp.y + 'px'
                overlay.style.left = tmp.x + 'px'
            } else {
                overlay.style.display = 'none'
            }
        })


        this.overlays.push(overlay)
		
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

export default SafetyOverlay