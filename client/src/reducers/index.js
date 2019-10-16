import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from './authReducer'
import cvReducer from './cvReducer'
import createCVReducer from './createCVReducer'
import myCVsReducer from './myCVsReducer'

export default combineReducers({
    form: reduxForm,
    auth: authReducer, 
    cv: cvReducer,
    create: createCVReducer,
    myCVs: myCVsReducer
});
