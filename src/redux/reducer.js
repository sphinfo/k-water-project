import dayjs from 'dayjs';
import {
    CHANGE_MODE,
    SET_START_DATE,
    SET_END_DATE,
    SET_LAYER_LIST,
    REMOVE_LAYER_LIST,
    SET_MAIN_OPTIONS,
    REMOVE_MAIN_OPTIONS
  } from './actions';
import { G$getLayerForId, G$removeLayer } from '@gis/util';
  
  const initialState = {
    mode: '',
    mainOptions: [],
    layerList: [],
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD')
  };
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case CHANGE_MODE:
        return { ...state, mode: action.mode };
      case SET_START_DATE: //시작 날짜
        return { ...state, startDate: action.date };
      case SET_END_DATE:   //종료 날짜
        return { ...state, endDate: action.date };


      case SET_MAIN_OPTIONS:
        return { ...state, mainOptions: [...state.mainOptions, action.value] };
      case REMOVE_MAIN_OPTIONS:
        return {
            ...state,
            mainOptions: state.mainOptions.filter(obj => obj.id !== action.value)
          };


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
  
  export default reducer;