import dayjs from 'dayjs';

import {
  ENV_START_DATE,
  ENV_END_DATE,
  ENV_SET_TEXT,
  ENV_RESULT_TAB,
  ENV_SELECT_LAYER,
  ENV_LANDCOVER_DETECTION,
} from './actions';

const initialState = {
  bizName: 'Environment',
  text: [], //검색 옵션 ( 지점및 검색 텍스트 )
  startDate: dayjs().format('YYYY-MM-DD'), //검색 옵션 ( 기간설정 )
  endDate: dayjs().format('YYYY-MM-DD'),   //검색 옵션 ( 기간설정 )

  //검색결과 Tab
  environmentResultTab: 'LandCover',

  //환경 선택 레이어
  selectEnvironmentLayer : false,

  //수변피복 변화탐지
  landCoverDetection: false
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

    default:
      return state;
  }
}

export default environmentReducer;