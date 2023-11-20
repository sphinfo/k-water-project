import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../redux/mainReducer';
import layerReducer from '../redux/layerReducer';
import safetyReducer from '../redux/safetyReducer';
import droughtReducer from './droughtReducer';
import environmentReducer from './environmentReducer';
import floodReducer from './floodReducer';

const rootReducer = combineReducers({
  main: mainReducer,                //메인
  layer: layerReducer,              //레이어
  safety: safetyReducer,            //안전
  drought: droughtReducer,          //가뭄
  environment: environmentReducer,  //환경
  flood: floodReducer               //홍수
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;