import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../redux/mainReducer';
import layerReducer from '../redux/layerReducer';

const rootReducer = combineReducers({
  main: mainReducer,
  layer: layerReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;