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
} from './actions';

const initialState = {
  bizName: 'Flood',
  text: [], //검색 옵션 ( 지점및 검색 텍스트 )
  startDate: dayjs().format('YYYYMMDD'), //검색 옵션 ( 기간설정 )
  endDate: dayjs().format('YYYYMMDD'),   //검색 옵션 ( 기간설정 )

  floodResultTab: 'WaterBody',

  //홍수 - 수체 레이어 (3level)
  selectFloodLayer: false,
  //홍수 - 수체 - 침수피해지도 레이어 (4level)
  selectFloodDamageLayer : false,

  //수위 지점 선택
  selectWaterLevel: false,

  selectBox: 'off', //대상지역

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

    //초기화
    case FLOOD_RESET:
      return { ...state, 
        selectBox: 'off', 
        selectWaterLevel: false, 
        selectFloodLayer: false,
      }

    default:
      return state;
  }
}

export default floodReducer;