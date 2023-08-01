import { createStore, combineReducers } from 'redux';



// 초기 상태 (초기 값)를 정의합니다.
const initialState = {
  count: 0,
};

// 리듀서 함수를 정의합니다.
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

// 루트 리듀서를 만듭니다.
const rootReducer = combineReducers({
  counter: counterReducer,
});

// 스토어를 만듭니다.
const store = createStore(rootReducer);

export default store;