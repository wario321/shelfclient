import _ from 'lodash';

const initialState = {
    shelf: [],
    index:[],
    item:[],
    deleteitem:[{title:'chicken'}],
    src:[],
    fillter:[],
    index_shelf: [],
    stock : []
};


const catalogs = (state=initialState,action) => {
    switch(action.type){
        case 'CATALOGS_LIST':
            console.log(action.payload)
            return  {...state,shelf:[...action.payload]}
        case 'SHELF_INDEX':
            return {...state,index:[...action.payload]}
        case 'CATALOGS_ITEM':
            return {...state,item:[action.payload],deleteitem:[action.payload]}
        case 'ENABLE_LIST':
            return {...state,shelf:[...action.payload]}
        case 'EDIT_ITEM':
            return state;
        case 'IMG_LIST':
            return {...state,src:[...action.payload]}
        case 'ADD_LIST':
            return state;
        case 'FILLTIER_SEARCH':
            return {...state,shelf:[...action.payload]}
        case 'FILTER_SHELF':
            return {...state,index:[...action.payload]}
        case 'EDIT_SHELF':
            return state;
        case 'ADD_SHELF':
            return state
        case 'LIST_SHELF':
            return {...state,index_shelf:[...action.payload]}
        case 'MOVE_ITEM':
            return state
        case 'STOCK':
            return {...state,stock:[...action.payload]}
        default:
            return state;
    }
}

export default catalogs;