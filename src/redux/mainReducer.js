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
  OPACITY_MODE,
  SEARCH_RIVER,
  SET_PANEL_VISIBLE,
  SET_SIDE_PANEL,
  HOLD_MAP,
  MAIN_OPTIONS,
  SELECT_BOX,
  SEARCH_START,
  GEO_SEARCH,
  SEARCH_END
} from './actions';

const initialState = {
  mode: '',
  loading: false, //맵로딩
  thematic: false, //주제도
  opacity: false, //투명도
  mainOptions: [],
  selectOption: null,
  startDate: dayjs('20100101').format('YYYYMMDD'), //검색 옵션 ( 기간설정 )
  endDate: dayjs().format('YYYYMMDD'),   //검색 옵션 ( 기간설정 )
  lengedPanel: {},
  addrResult:false,
  riverResult:[],

  //탭 열기 / 닫기
  panelVisible: false,

  //두번째 패널 on / off
  panelSide: false,

  //맵 이동 control
  holdMap: false,
  
  selectBox: false,

  mainSearchOn: 0,
  mainSearchEnd: 0,

  geoSearch: true,

};


function mainReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.loading }
    case THEMATIC_MODE:
      return { ...state, thematic: action.thematic }
    case OPACITY_MODE:
      return { ...state, opacity: action.opacity }
    case CHANGE_MODE:
      return { ...state, mode: action.mode };
    case HOLD_MAP:
      return { ...state, holdMap: action.holdMap };
    case SET_PANEL_VISIBLE:
      return { ...state, panelVisible: action.panelVisible };
    case SET_SIDE_PANEL:
      return { ...state, panelSide: action.panelSide };
    case SET_MAIN_OPTIONS:
      return { ...state, mainOptions: [...state.mainOptions, action.value] };
    case REMOVE_MAIN_OPTIONS:
      return {
        ...state,
        mainOptions: state.mainOptions.filter(obj => obj.id !== action.value.id)
      };

    case SEARCH_START:
      return { ...state, mainSearchOn: state.mainSearchOn+1};
    case SEARCH_END:
      return { ...state, mainSearchEnd: state.mainSearchEnd+1};
    case GEO_SEARCH:
      return { ...state, geoSearch: action.geoSearch };
    case SET_START_DATE:
      return { ...state, startDate: action.date };
    case SET_END_DATE:
      return { ...state, endDate: action.date };
    case MAIN_OPTIONS:
      return  { ...state, mainOptions: action.mainOptions };
    case SELECT_BOX:
      return { ...state, selectBox: action.selectBox};
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