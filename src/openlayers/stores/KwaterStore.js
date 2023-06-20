import WidgetManager from "../../common/manager/widget/WidgetManager";
import MapManager from "../MapManager";

class KwaterStore {

    constructor() {
        // MapManager 를 등록한다.
        this._mapManager = MapManager;
        this._widgetManager = WidgetManager;
    }

    get mapManager(){
        return this._mapManager;
    }

    // MapManager 를 반환한다.
    getMapManager = () =>{
        return this._mapManager;
    }

    get widgetManager(){
        return this._widgetManager;
    }
    // WidgetManager 를 반환한다.
    getWidgetManager = () =>{
        return this._widgetManager;
    }

}


export default new KwaterStore();