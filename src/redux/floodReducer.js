import dayjs from 'dayjs';

import {
  FLOOD_START_DATE,
  FLOOD_END_DATE,
  FLOOD_SET_TEXT,
} from './actions';

const initialState = {
  bizName: 'Flood',
  text: [], //검색 옵션 ( 지점및 검색 텍스트 )
  startDate: dayjs().format('YYYY-MM-DD'), //검색 옵션 ( 기간설정 )
  endDate: dayjs().format('YYYY-MM-DD'),   //검색 옵션 ( 기간설정 )

};

function floodReducer(state = initialState, action) {
  switch (action.type) {

    case FLOOD_SET_TEXT:
      return { ...state, text: action.text }

    case FLOOD_START_DATE:
      return { ...state, startDate: action.date }

    case FLOOD_END_DATE:
      return { ...state, endDate: action.date }
    
    


    default:
      return state;
  }
}

export default floodReducer;