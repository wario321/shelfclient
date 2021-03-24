
import {combineReducers} from 'redux';
import auth from '../firebase'
import axios from 'axios'
import _ from 'lodash'
import catalogs from './catalogs'
import {reducer as formReducer,reducer} from 'redux-form'

const IntialState = {
    isLogin: false,
    currentUser: null,
    err: null
};

const Data = {
    statedata: []
}

const csvData = (state={},action) => {
    switch(action.type){
        case 'FETCH_DATA':
            return {...state,..._.mapKeys(action.payload,'item')}
        default:
            return state
    }
}

const todo = (state= IntialState ,action) => {
    switch(action.type){
        case 'SIGN_IN':
            return {...state, isLogin:true ,currentUser: action.payload}
        case 'SIGN_OUT':
            auth.signOut();
            localStorage.removeItem('CurrentUser')
            return {...state,isLogin:false,currentUser: null}
        case 'STILL_SIGNIN':
            return {...state,isLogin:true,currentUser: action.payload}
        default:
            return state
    }
}

const testStatus = () => {
    return {isLogin: false,
            currentUser: null,}
}



export default combineReducers({
    auth: todo,
    Calldata: csvData,
    Catalogs: catalogs,
    form: reducer
});