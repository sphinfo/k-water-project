import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../redux/mainReducer';
import layerReducer from '../redux/layerReducer';
import safetyReducer from '../redux/safetyReducer';

const rootReducer = combineReducers({
  main: mainReducer,     //메인
  layer: layerReducer,   //레이어
  safety: safetyReducer, //안전
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;