import dayjs from 'dayjs';

import {
  CHANGE_MODE,
  SET_START_DATE,
  SET_END_DATE,
  SET_MAIN_OPTIONS,
  REMOVE_MAIN_OPTIONS,
  LEGNED_PANEL
} from './actions';
import { useDispatch } from 'react-redux';
import { G$addLayer } from '@gis/util';

const initialState = {
  mode: '',
  mainOptions: [],
  selectOption: null,
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),
  lengedPanel: {
  }
};

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MODE:

      //G$addLayer('')

      return { ...state, mode: action.mode };
    case SET_START_DATE:
      return { ...state, startDate: action.date };
    case SET_END_DATE:
      return { ...state, endDate: action.date };
    case SET_MAIN_OPTIONS:
      return { ...state, mainOptions: [...state.mainOptions, action.value] };
    case REMOVE_MAIN_OPTIONS:
      return {
        ...state,
        mainOptions: state.mainOptions.filter(obj => obj.id !== action.value.id)
      };

    //하단 
    case LEGNED_PANEL:

      const containerName = action.container;
      const currentContainerState = state.lengedPanel[containerName];
    
      const updatedLengedPanel = {
        ...state.lengedPanel,
        [containerName]: !currentContainerState,
      };

      return {
        ...state,
        lengedPanel: updatedLengedPanel, 
      }

    default:
      return state;
  }
}

export default mainReducer;