import { Draw } from "ol/interaction";
import Overlay from "ol/Overlay"
import EventBus from "../../../common/eventbus/EventBus";
import MapEvents from "../../../common/eventbus/MapEvents";
import MapManager from "../../MapManager";


const Event = ( eventName , eventData = {} )=>{

	return new CustomEvent(eventName, eventData );
}

const {drawEndSketch} = MapEvents;

class GisDraw{

	onDrawStartHandler = null
	onDrawEndHandler  = null

	listener = null
	sketch = null

	constructor(options = {}){
		
		const {map, onDrawEnd, onDrawStart, measure, ...option} = options;
		this._drawTool = new Draw( {type: 'LineString'});
		this._onDrawEnd = onDrawEnd;
		this._onDrawStart = onDrawStart;

	}

	//MAP DRAW 생성
	setDraw(type='LineString'){

		this._drawTool = new Draw( {type: type} );
		
		this.onDrawEndHandler = this._drawTool.on('drawend',(e)=>{
			
			// 그리기 기능 종료
			this.deactivate();
			
			const {feature} = e;

			//EVENT BUS로 활용가능
			EventBus.dispatch(Event( drawEndSketch, {
				detail: { feature }
			}));

			(this._onDrawEnd && this._onDrawEnd(feature));

		})


		this.onDrawStartHandler = this._drawTool.on('drawstart', (e)=>{

			const {feature} = e;

			(this._onDrawStart && this._onDrawStart(feature));

		})

		if(!this.map){
			this.map.getViewport().addEventListener('contextmenu', function() {
				this.onDrawEndHandler()
			}, {once : true});
		}
		

	}

	//그리기 이벤트 생성
	activate(type){
		this.checkMap()
		this.setDraw(type)
		this.map.addInteraction(this._drawTool)
	}

	//그리기 이벤트 종료
	deactivate(){
		this.checkMap()
		this.map.removeInteraction(this._drawTool)
	}

	//지도가 있는지 확인. *지도 렌더링이 늦을경우가 있어 체크
	checkMap(){
		if(!this.map){
			this.map = MapManager.map
		}
	}

	//DRAW 이벤트 나갈때 INSTANCE 삭제
	destroy(){
		if(this.onDrawEndHandler){
			this.onDrawEndHandler.remove();
		}
	}

};

export default GisDraw;