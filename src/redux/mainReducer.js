import dayjs from 'dayjs';

import {
  LOADING,
  CHANGE_MODE,
  SET_START_DATE,
  SET_END_DATE,
  SET_MAIN_OPTIONS,
  REMOVE_MAIN_OPTIONS,
  LEGNED_PANEL,
  SEARCH_ADDR,
  THEMATIC_MODE,
  SEARCH_RIVER
} from './actions';

const initialState = {
  mode: '',
  loading: false, //맵로딩
  thematic: false, //주제도
  mainOptions: [],
  selectOption: null,
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),
  lengedPanel: {},
  addrResult:{},
  riverResult:[]
};


function mainReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.loading }
    case THEMATIC_MODE:
      return { ...state, thematic: action.thematic }
    case CHANGE_MODE:
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

    //주소검색 
    case SEARCH_ADDR:
      return {
        ...state,
        addrResult: action.result,
      }

    //하천 검색
    case SEARCH_RIVER:
      return {
        ...state,
        riverResult: action.result,
      }
    default:
      return state;
  }
}

export default mainReducer;