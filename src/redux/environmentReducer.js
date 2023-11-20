import dayjs from 'dayjs';

import {
  ENV_START_DATE,
  ENV_END_DATE,
  ENV_SET_TEXT,
} from './actions';

const initialState = {
  bizName: 'Environment',
  text: [], //검색 옵션 ( 지점및 검색 텍스트 )
  startDate: dayjs().format('YYYY-MM-DD'), //검색 옵션 ( 기간설정 )
  endDate: dayjs().format('YYYY-MM-DD'),   //검색 옵션 ( 기간설정 )

};

function environmentReducer(state = initialState, action) {
  switch (action.type) {

    case ENV_SET_TEXT:
      return { ...state, text: action.text }

    case ENV_START_DATE:
      return { ...state, startDate: action.date }

    case ENV_END_DATE:
      return { ...state, endDate: action.date }
    
    


    default:
      return state;
  }
}

export default environmentReducer;