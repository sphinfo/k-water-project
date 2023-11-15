import dayjs from 'dayjs';

import {
  SAFETY_TYPE,
  SET_START_DATE_SAFETY,
  SET_END_DATE_SAFETY,
  SET_TEXT_SAFETY,
  SET_DETAIL_SEARCH_TYPE,
  SET_DETAIL_SEARCH_TAB_TYPE,
  SET_DETAIL_RESET,
  SET_DETAIL_DATAS,
  SET_DETAIL_DATAS_DEL,
  SET_SELECT_RESULT,
  SAFETY_SELETE_FEATURE,
  SET_SELECT_4_LEVEL,
  SET_SELECT_4_LEVEL_RESET,
  SET_SELECT_DISPLACE_LEVEL,
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

  

  safetyLayers: new safetyLayers()
};

function safetyReducer(state = initialState, action) {
  switch (action.type) {
    case SAFETY_TYPE: 
      return { ...state, safetyType: action.safetyType }

    case SET_TEXT_SAFETY:
      return { ...state, text: action.text }

    case SET_START_DATE_SAFETY:
      return { ...state, startDate: action.date }

    case SET_END_DATE_SAFETY:
      return { ...state, endDate: action.date }

    case SET_DETAIL_SEARCH_TYPE:
      return { ...state, compLayerClick: action.compLayerClick }
    
    case SET_DETAIL_SEARCH_TAB_TYPE:

      let value = false
      //비교탭이 선택된 경우 비교 레이어 click 이벤트 활성화
      if(action.detailSearchTabType === 'comp'){
        value = true
      }
      return { ...state, detailSearchTabType: action.detailSearchTabType, compLayerClick: value }

    //3레벨 선택값
    case SET_SELECT_RESULT:
      return { ...state, select3Level: action.select3Level}

    //4레벨 선택값
    case SET_SELECT_4_LEVEL:
      return { ...state, select4Level: action.select4Level}

    //변위 등급 선택값
    case SET_SELECT_DISPLACE_LEVEL:
      return { ...state, displaceLevel: action.displaceLevel}

    //4레벨 선택값 초기화
    case SET_SELECT_4_LEVEL_RESET:
      return { ...state, select4Level: false, selectFeature: null}

    //선택 feature 값
    case SAFETY_SELETE_FEATURE:
      return { ...state, selectFeature: action.selectFeature}

    //초기화
    case SET_DETAIL_RESET:
      return { ...state, 
        compLayerClick: false,  //4레벨 진행시 true ( 해당 플레그 값으로 비교 클릭 이벤트 및 기타 기능 비 활성화)
        detailSearchTabType: 'datas', 
        //detailCompDatas: [],       //비교 데이터 스토리지 초기화
        select3Level: false, //3레벨 선택
        select4Level: false, //4레벨 선택
        displaceLevel: false, //변위등급 레이어
        selectFeature: null,
      }
    default:
      return state;
  }
}

export default safetyReducer;