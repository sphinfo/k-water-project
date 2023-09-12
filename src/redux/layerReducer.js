import {
    SET_LAYER_LIST,
    REMOVE_LAYER_LIST,
  } from './actions';
import { G$getLayerForId, G$removeLayer } from '@gis/util';
  
  const initialState = {
    layerList: [],
  };
  
  function layerReducer(state = initialState, action) {
    switch (action.type) {

      case SET_LAYER_LIST:
        console.info(action.layerInfo)
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