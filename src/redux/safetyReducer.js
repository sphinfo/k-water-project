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
} from './actions';
import { useDispatch } from 'react-redux';

const initialState = {
  safetyType: 'displace', // 사용 x
  text: [], //검색 옵션 ( 지점및 검색 텍스트 )
  startDate: dayjs().format('YYYY-MM-DD'), //검색 옵션 ( 기간설정 )
  endDate: dayjs().format('YYYY-MM-DD'),   //검색 옵션 ( 기간설정 )
  
  //선택 검색결과
  selectResult: false,

  //레이어 선택
  selectFeature: null,

  detailSearchType: false, //4레벨 진행시 true ( 해당 플레그 값으로 비교 클릭 이벤트 및 기타 기능 활성화)
  detailSearchTabType: '',
  detailCompDatas: [], //비교 데이터 스토리지
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
      return { ...state, detailSearchType: action.detailSearchType }
    
    case SET_DETAIL_SEARCH_TAB_TYPE:

      let value = false
      if(action.detailSearchTabType === 'comp'){
        value = true
      }
      return { ...state, detailSearchTabType: action.detailSearchTabType, detailSearchType: value }

      //3레벨 선택값
    case SET_SELECT_RESULT:

      return { ...state, selectResult: action.selectResult}


    case SAFETY_SELETE_FEATURE:
      return { ...state, selectFeature: action.selectFeature}

    //비교 데이터에 추가
    case SET_DETAIL_DATAS:  

      const findDatas = state.detailCompDatas.some(item => item.lon === action.detailCompDatas.lon && item.lat === action.detailCompDatas.lat)

      //임시 좌표로 설정
      //존재하면 그냥 return
      if (findDatas) {
        return state;
      } else {
        //데이터가 존재 하지 않으면 추가
        return {
          ...state,
          detailCompDatas: [...state.detailCompDatas, action.detailCompDatas]
        };
      }
    
    //선택데이터 삭제
    case SET_DETAIL_DATAS_DEL:
      
      const { delData } = action;
      const updatedDetailCompDatas = state.detailCompDatas.filter(item => {
          return item.lon !== delData.lon || item.lat !== delData.lat;
      });

      return {
          ...state,
          detailCompDatas: updatedDetailCompDatas
      };

    //초기화
    case SET_DETAIL_RESET:
      return { ...state, 
        detailSearchType: false,  //4레벨 진행시 true ( 해당 플레그 값으로 비교 클릭 이벤트 및 기타 기능 비 활성화)
        detailSearchTabType: '', 
        detailCompDatas: [],       //비교 데이터 스토리지 초기화
        selectResult: false
      }
    default:
      return state;
  }
}

export default safetyReducer;