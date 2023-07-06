class Test2Layer {

	_layer = null;
    _layerId = 'test2';
    
    /* observable */
    _props = null;

	constructor() {


	}

    getLayer(){
        return this._layer;
    }
    
    
    removeLayer(){

        if(this._layer !== null){
            this._layer.serVisible(false);
        }

    }
    
}

export default new Test2Layer();