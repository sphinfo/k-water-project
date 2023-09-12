import {
    SET_LAYER_LIST,
    REMOVE_LAYER_LIST,
    ADD_LAYER,
    REMOVE_LAYER,
  } from './actions';
import { G$getLayerForId, G$removeLayer } from '@gis/util';
  
  const initialState = {
    layerList: [],
  };
  
  function layerReducer(state = initialState, action) {
    switch (action.type) {
      
      case ADD_LAYER:
       return {state}
      case REMOVE_LAYER:
        return {state}


      case SET_LAYER_LIST:
        return { ...state, layerList: [...state.layerList, action.layerInfo] };
      case REMOVE_LAYER_LIST:
        let layer = G$getLayerForId(action.layerId)
        if(layer){ G$removeLayer(layer) }
        return {
            ...state,
            layerList: state.layerList.filter(obj => obj.id !== action.layerId)
        };

      default:
        return state;
    }
  }
  
  export default layerReducer;