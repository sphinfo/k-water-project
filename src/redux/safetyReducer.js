import dayjs from 'dayjs';

import {
  SAFETY_TYPE,
  SET_START_DATE_SAFETY,
  SET_END_DATE_SAFETY,
  SET_TEXT_SAFETY,
} from './actions';

const initialState = {
  safetyType: 'displace',
  text: '',
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),
};


function safetyReducer(state = initialState, action) {
  switch (action.type) {
    case SAFETY_TYPE:
      return { ...state, safetyType: action.safetyType };
    case SET_TEXT_SAFETY:
      return { ...state, text: action.text };
    case SET_START_DATE_SAFETY:
      return { ...state, startDate: action.date };
    case SET_END_DATE_SAFETY:
      return { ...state, endDate: action.date };
    default:
      return state;
  }
}

export default safetyReducer;