import dayjs from 'dayjs';

import {
  SAFETY_TYPE,
  SAFETY_START_DATE,
  SAFETY_END_DATE,
  SAFETY_TEXT_SAFETY,
  SAFETY_DETAIL_SEARCH_TYPE,
  SAFETY_DETAIL_SEARCH_TAB_TYPE,
  SAFETY_DETAIL_RESET,
  SAFETY_SELECT_RESULT,
  SAFETY_SELETE_FEATURE,
  SAFETY_SELECT_4_LEVEL,
  SAFETY_SELECT_4_LEVEL_RESET,
  SAFETY_SELECT_DISPLACE_LEVEL,
  SAFETY_SELECT_BOX,
} from './actions';
import safetyLayers from '@gis/layers/safety/safetyLayers';

const initialState = {
  bizName: 'Safety',
  safetyType: 'displace', // 사용 x
  text: [], //검색 옵션 ( 지점및 검색 텍스트 )
  startDate: dayjs().format('YYYY-MM-DD'), //검색 옵션 ( 기간설정 )
  endDate: dayjs().format('YYYY-MM-DD'),   //검색 옵션 ( 기간설정 )

  /* 비교 탭 선택시 레이어 클릭 이벤트 활성화 */
  compLayerClick: false, //4레벨 진행시 true ( 해당 플레그 값으로 비교 클릭 이벤트 및 기타 기능 활성화)
  
  //4레벨 탭 
  detailSearchTabType: 'datas',

  /* 3레벨 선택 검색결과 */
  select3Level: false,

  /* 4레벨 선택값 */
  select4Level: false,

  /* 변위등급 레이어 */
  displaceLevel: false,

  //레이어 선택
  selectFeature: null,

  //검색박스 ON / OFF
  selectBox : 'off',
  
  //safetyLayers: new safetyLayers()
};

function safetyReducer(state = initialState, action) {
  switch (action.type) {
    case SAFETY_TYPE: 
      return { ...state, safetyType: action.safetyType }

    case SAFETY_TEXT_SAFETY:
      return { ...state, text: action.text }

    case SAFETY_START_DATE:
      return { ...state, startDate: action.date }

    case SAFETY_END_DATE:
      return { ...state, endDate: action.date }

    case SAFETY_DETAIL_SEARCH_TYPE:
      return { ...state, compLayerClick: action.compLayerClick }
    
    case SAFETY_DETAIL_SEARCH_TAB_TYPE:

      let value = false
      //비교탭이 선택된 경우 비교 레이어 click 이벤트 활성화
      if(action.detailSearchTabType === 'comp'){
        value = true
      }
      return { ...state, detailSearchTabType: action.detailSearchTabType, compLayerClick: value }

    //3레벨 선택값
    case SAFETY_SELECT_RESULT:
      return { ...state, select3Level: action.select3Level}

    //4레벨 선택값
    case SAFETY_SELECT_4_LEVEL:
      return { ...state, select4Level: action.select4Level}

    //변위 등급 선택값
    case SAFETY_SELECT_DISPLACE_LEVEL:
      return { ...state, displaceLevel: action.displaceLevel}

    //4레벨 선택값 초기화
    case SAFETY_SELECT_4_LEVEL_RESET:
      return { ...state, select4Level: false, selectFeature: null}

    //선택 feature 값
    case SAFETY_SELETE_FEATURE:
      return { ...state, selectFeature: action.selectFeature}

    //대상지역 selectbox 
    case SAFETY_SELECT_BOX:
      return { ...state, selectBox: action.selectBox}

    //초기화
    case SAFETY_DETAIL_RESET:
      return { ...state, 
        compLayerClick: false,  //4레벨 진행시 true ( 해당 플레그 값으로 비교 클릭 이벤트 및 기타 기능 비 활성화)
        detailSearchTabType: 'datas', 
        select3Level: false, //3레벨 선택
        select4Level: false, //4레벨 선택
        displaceLevel: false, //변위등급 레이어
        selectFeature: null,
        selectBox : 'off', // selectbox 초기화
      }
    default:
      return state;
  }
}

export default safetyReducer;