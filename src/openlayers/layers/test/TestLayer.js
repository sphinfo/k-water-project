

class TestLayer {

	_layer = null;
    _layerId = 'test';
    
    /* observable */
    _props = null;

	constructor() {

	}

    getLayer(){
        return this._layer;
    }
    
    
    removeLayer(){

        if(this._layer !== null){
            this._layer.setVisibleLayers([-1]);
        }

    }
    
}

export default new TestLayer();