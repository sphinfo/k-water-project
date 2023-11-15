import MapManager from "@gis/MapManager"
import {Cartesian2, Cartesian3, SceneTransforms, defined} from "cesium"

/* 공통 html 오버레이  */
class BaseOverlay {

    overlays = []

	async _addOverlay(longitude, latitude, properties) {

        //지도
		let map = MapManager.map

        /* html 생성 */
		var overlay = document.createElement('div')
        map.container.appendChild(overlay)
        overlay.style.display = 'none'
        overlay.style.backgroundColor = 'white'
        overlay.style.position = 'absolute'
        overlay.style.width = '80px'
        overlay.style.height = '20px'

        //overlay.appendChild(document.createElement('div')

        overlay.innerHTML = `<div>등급 ${properties.GRAY_INDEX}(안전)</div>`

        var button = document.createElement('button')
        button.textContent = 'close'
        button.addEventListener('click', function () {
            console.log(properties)
            map.container.removeChild(overlay)
        })

        overlay.appendChild(button)

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

export default BaseOverlay