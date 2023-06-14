import MapManager from "../MapManager";

class OlStore {

    constructor() {
        // MapManager 를 등록한다.
        this._mapManager = MapManager;
    }

    get mapManager(){
        return this._mapManager;
    }

    // MapManager 를 반환한다.
    getMapManager = () =>{
        return this._mapManager;
    }

}


export default new OlStore();