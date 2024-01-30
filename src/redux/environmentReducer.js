import dayjs from 'dayjs';

import {
  ENV_START_DATE,
  ENV_END_DATE,
  ENV_SET_TEXT,
  ENV_RESULT_TAB,
  ENV_SELECT_LAYER,
  ENV_LANDCOVER_DETECTION,
  ENV_SELECT_BOX,
  ENV_RESET,
  ENV_RESET_LAYER,
  ENV_SET_LAYERS,
  ENV_CLEAR_LAEYRS,
  ENV_SEARCH_ON,
} from './actions';
import { G$removeLayer } from '@gis/util';
import BaseWmsImageLayer from '@gis/layers/BaseWmsImageLayer';

const initialState = {
  bizName: 'Environment',
  text: [], //검색 옵션 ( 지점및 검색 텍스트 )
  startDate: dayjs('20100101').format('YYYYMMDD'), //검색 옵션 ( 기간설정 )
  endDate: dayjs().format('YYYYMMDD'),   //검색 옵션 ( 기간설정 )

  //검색결과 Tab
  environmentResultTab: 'LandCover',

  //환경 선택 레이어
  selectEnvironmentLayer : false,

  //수변피복 변화탐지
  landCoverDetection: false,

  //대상지역 selectbox
  selectBox: false,
  
  layers: {},

  searchOn: false
};

function environmentReducer(state = initialState, action) {
  switch (action.type) {

    case ENV_SET_TEXT:
      return { ...state, text: action.text }

    case ENV_START_DATE:
      return { ...state, startDate: action.date }

    case ENV_END_DATE:
      return { ...state, endDate: action.date }
    
    case ENV_RESULT_TAB:
      return { ...state, environmentResultTab: action.environmentResultTab }

    case ENV_SELECT_LAYER:
      return { ...state, selectEnvironmentLayer: action.selectEnvironmentLayer }

    case ENV_LANDCOVER_DETECTION:
      return { ...state, landCoverDetection: action.landCoverDetection }

    //대상지역 selectbox 
    case ENV_SELECT_BOX:
      return { ...state, selectBox: action.selectBox}

    case ENV_SEARCH_ON:
      return { ...state, searchOn: action.searchOn}
      
    case ENV_SET_LAYERS:

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
    case ENV_CLEAR_LAEYRS:
      let layerIds = Object.keys(state.layers)
      if(layerIds.length > 0){
        layerIds.map((layerId) => {
          G$removeLayer(state.layers[layerId].layer)
          delete state.layers[layerId]
        })
      }
      return {...state, layers: {} }


    //초기화
    case ENV_RESET:
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

    case ENV_RESET_LAYER:
      return { ...state,
        selectEnvironmentLayer : false,
        landCoverDetection: false,
      }
    default:
      return state;
  }
}

export default environmentReducer;