import dayjs from 'dayjs';

import {
  FLOOD_START_DATE,
  FLOOD_END_DATE,
  FLOOD_SET_TEXT,
  FLOOD_RESULT_TAB,
  FLOOD_SELECT_LAYER,
  FLOOD_DAMAGE_LAYER,
  FLOOD_SELECT_WATER_LEVEL,
  FLOOD_RESET,
  FLOOD_SELECT_BOX,
  FLOOD_RESET_LAYER,
  FLOOD_SET_LAYERS,
  FLOOD_CLEAR_LAEYRS,
  FLOOD_SEARCH_ON,
} from './actions';
import BaseWmsImageLayer from '@gis/layers/BaseWmsImageLayer';
import { G$removeLayer } from '@gis/util';

const initialState = {
  bizName: 'Flood',
  text: [], //검색 옵션 ( 지점및 검색 텍스트 )
  startDate: dayjs('20100101').format('YYYYMMDD'), //검색 옵션 ( 기간설정 )
  endDate: dayjs().format('YYYYMMDD'),   //검색 옵션 ( 기간설정 )

  floodResultTab: 'WaterBody',

  //홍수 - 수체 레이어 (3level)
  selectFloodLayer: false,
  //홍수 - 수체 - 침수피해지도 레이어 (4level)
  selectFloodDamageLayer : false,

  //수위 지점 선택
  selectWaterLevel: false,

  selectBox: 'off', //대상지역

  //레이어관리
  layers: {},

  //검색시작 ( 지점 selectbox 닫히면 true / 열리면 false * 선택중 * )
  searchOn: false,

};

function floodReducer(state = initialState, action) {
  switch (action.type) {

    case FLOOD_SET_TEXT:
      return { ...state, text: action.text }

    case FLOOD_START_DATE:
      return { ...state, startDate: action.date }

    case FLOOD_END_DATE:
      return { ...state, endDate: action.date }
    
    case FLOOD_RESULT_TAB:
      return { ...state, floodResultTab: action.floodResultTab }

    case FLOOD_SELECT_LAYER:
      return { ...state, selectFloodLayer: action.selectFloodLayer }
    
    case FLOOD_DAMAGE_LAYER:
      return { ...state, selectFloodDamageLayer: action.selectFloodDamageLayer }

    case FLOOD_SELECT_WATER_LEVEL:
      return { ...state, selectWaterLevel: action.selectWaterLevel }

    //대상지역 selectbox 
    case FLOOD_SELECT_BOX:
      return { ...state, selectBox: action.selectBox}

    case FLOOD_SEARCH_ON:
      return { ...state, searchOn: action.searchOn}

    case FLOOD_SET_LAYERS:
    //setType true => add / false => remove
    let layerId = `${action.layerInfo.store}:${action.layerInfo.layer}`
    if(action.setType){
      //layer Instace 가 없을시 
      if(!state.layers[layerId]){
        const updateLayers = {
          ...state.layers,
          [layerId]: new BaseWmsImageLayer({store:action.layerInfo.store, layerId:action.layerInfo.layer, info:action.layerInfo}),
        }
        return {...state, layers:updateLayers}
      }
    }else{
      const updatedLayers = { ...state.layers }
      if (updatedLayers[layerId]) {
        G$removeLayer(updatedLayers[layerId].layer)
        delete updatedLayers[layerId]
        return { ...state, layers: updatedLayers }
      }
    }

    //레이어 clear
    case FLOOD_CLEAR_LAEYRS:
      let layerIds = Object.keys(state.layers)
      if(layerIds.length > 0){
        layerIds.map((layerId) => {
          G$removeLayer(state.layers[layerId].layer)
          delete state.layers[layerId]
        })
      }
      return {...state, layers: {} }


    //초기화
    case FLOOD_RESET:
      let layerIdss = Object.keys(state.layers)
      if(layerIdss.length > 0){
        layerIdss.map((layerId) => {
          G$removeLayer(state.layers[layerId].layer)
          delete state.layers[layerId]
        })
      }

      return { ...state, 
        ...initialState
      }


    //레이어 초기화
    case FLOOD_RESET_LAYER:
      return { ...state,
        selectWaterLevel: false, 
        selectFloodLayer: false,
        selectFloodDamageLayer: false,
      }

    default:
      return state;
  }
}

export default floodReducer;