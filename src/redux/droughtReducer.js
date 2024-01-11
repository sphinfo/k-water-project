import dayjs from 'dayjs';

import {
  DROUGHT_START_DATE,
  DROUGHT_END_DATE,
  DROUGHT_SET_TEXT,
  DROUGHT_SELECT_FEATURE,
  DROUGHT_OBSRV_TAB,
  DROUGHT_SELECT_LAYER,
  DROUGHT_SELECT_BOX,
  DROUGHT_RESET,
  DROUGHT_RESULT_TAB,
  DROUGHT_RESET_LAYER,
  DROUGHT_SELECT_LAYERS,
  DROUGHT_SET_LAYERS,
  DROUGHT_CLEAR_LAEYRS,
} from './actions';
import BaseWmsImageLayer from '@gis/layers/BaseWmsImageLayer';
import { G$removeLayer } from '@gis/util';

const initialState = {
  bizName: 'Drought',
  text: [], //검색 옵션 ( 지점및 검색 텍스트 )
  startDate: dayjs('20100101').format('YYYYMMDD'), //검색 옵션 ( 기간설정 )
  endDate: dayjs().format('YYYYMMDD'),   //검색 옵션 ( 기간설정 )
  obsrvTab: 'soilMoisture', //활용주제도 Tab

  selectResultTab: 'A1', //가뭄 검색결과 Tab

  selectObs: false,     //관측소 선택 Feature

  selectDroughtLayer: false, //가뭄 레이어 선택값

  selectBox: 'off', //대상지역

  //가뭄 레이어 
  layers: {}

  
};

function droughtReducer(state = initialState, action) {
  switch (action.type) {

    case DROUGHT_SET_TEXT:
      return { ...state, text: action.text }

    case DROUGHT_START_DATE:
      return { ...state, startDate: action.date }

    case DROUGHT_END_DATE:
      return { ...state, endDate: action.date }

    case DROUGHT_OBSRV_TAB:
      return { ...state, obsrvTab: action.obsrvTab }

    case DROUGHT_RESULT_TAB:
      return { ...state, selectResultTab: action.selectResultTab }
    
    case DROUGHT_SELECT_FEATURE:
      return { ...state, selectObs: action.selectObs}

    case DROUGHT_SELECT_LAYER:
      return { ...state, selectDroughtLayer: action.selectDroughtLayer}

    case DROUGHT_SELECT_LAYERS:
      return { ...state, selectDroughtLayers: action.selectDroughtLayer}

    //대상지역 selectbox 
    case DROUGHT_SELECT_BOX:
      return { ...state, selectBox: action.selectBox}


    case DROUGHT_SET_LAYERS:

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
    case DROUGHT_CLEAR_LAEYRS:
      let layerIds = Object.keys(state.layers)
      if(layerIds.length > 0){
        layerIds.map((layerId) => {
          G$removeLayer(state.layers[layerId].layer)
          delete state.layers[layerId]
        })
      }
      return {...state }


    //초기화
    case DROUGHT_RESET:
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

    case DROUGHT_RESET_LAYER:
      return { ...state, 
        selectObs: false,
        selectDroughtLayer: false,
      }
    default:
      return state;
  }
}

export default droughtReducer;