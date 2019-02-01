import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import homeReducer from './homeReducer';
import sharedReducer from './sharedReducer';
import companyReducer from './companyReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    home: homeReducer,
    form: formReducer,
    shared: sharedReducer,
    company: companyReducer,
});

export default rootReducer;
