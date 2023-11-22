import dayjs from 'dayjs';

import {
  DROUGHT_START_DATE,
  DROUGHT_END_DATE,
  DROUGHT_SET_TEXT,
  DROUGHT_SELETE_FEATURE,
  DROUGHT_OBSRV_TAB,
  DROUGHT_SELETE_LAYER,
} from './actions';

const initialState = {
  bizName: 'Drought',
  text: [], //검색 옵션 ( 지점및 검색 텍스트 )
  startDate: dayjs().format('YYYY-MM-DD'), //검색 옵션 ( 기간설정 )
  endDate: dayjs().format('YYYY-MM-DD'),   //검색 옵션 ( 기간설정 )
  obsrvTab: 'soilMoisture', //활용주제도 Tab
  selectFeature: false,     //관측소 선택 Feature

  selectDroughtLayer: false, //가뭄 레이어 선택값

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
    
    case DROUGHT_SELETE_FEATURE:
      return { ...state, selectFeature: action.selectFeature}

    case DROUGHT_SELETE_LAYER:
      return { ...state, selectDroughtLayer: action.selectDroughtLayer}

    

    default:
      return state;
  }
}

export default droughtReducer;