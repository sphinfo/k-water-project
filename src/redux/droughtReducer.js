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
} from './actions';

const initialState = {
  bizName: 'Drought',
  text: [], //검색 옵션 ( 지점및 검색 텍스트 )
  startDate: dayjs().format('YYYY-MM-DD'), //검색 옵션 ( 기간설정 )
  endDate: dayjs().format('YYYY-MM-DD'),   //검색 옵션 ( 기간설정 )
  obsrvTab: 'soilMoisture', //활용주제도 Tab

  selectResultTab: 'a', //가뭄 검색결과 Tab

  selectObs: false,     //관측소 선택 Feature

  selectDroughtLayer: false, //가뭄 레이어 선택값

  selectBox: 'off', //대상지역

  
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

    //대상지역 selectbox 
    case DROUGHT_SELECT_BOX:
      return { ...state, selectBox: action.selectBox}

    //초기화
    case DROUGHT_RESET:
      return { ...state, 
        selectDroughtLayer: false,
        selectObs: false,
        selectBox : 'off', // selectbox 초기화
      }

    default:
      return state;
  }
}

export default droughtReducer;