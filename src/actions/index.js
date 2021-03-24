import api from '../api/api'
import history from '../history'
import Loading from '../components/Loading'

export const signIn = (user) => {
    return {
        type:'SIGN_IN',
        payload: user
    }
}

export const signOut = () => {
    return {
        type:'SIGN_OUT'
    }
}

export const stillSignIn = (user) => {
    return {
        type: 'STILL_SIGNIN',
        payload:user
    }
}

export const catalogsList = (shelf) => async (dispatch) => {
    const response = await api.get(`/catalogs/${shelf}`);

    dispatch({type: 'CATALOGS_LIST',payload: response.data})
}

export const catalogs = (shelf,id) => async (dispatch) => {
    const response = await api.get(`/catalogs/${shelf}/${id}`);

    dispatch({type: 'CATALOGS_ITEM',payload: response.data})
}

export const callApi = () => async (dispatch) => {
    const response = await api.get('/api');
    dispatch({type: 'FETCH_DATA' , payload: response.data})
}

export const callShelf = () => async (dispatch) => {
    const response = await api.get('/testapi');
    dispatch({type: 'SHELF_INDEX',payload: response.data})
}

export const editItem = (shelf,id,formValue) => async (dispatch) => {
    const response = await api.post(`/edit/${shelf}/${id}`,formValue);
    dispatch({type: 'EDIT_ITEM'})
    window.location.replace(`/item/${shelf}`)
}

export const enableList = () => async (dispatch) => {
    const response = await api.get("/enable");
    dispatch({type: 'ENABLE_LIST',payload: response.data});
}

export const deleteItem = (shelf,id) => async (dispatch) => {
    const response = await api.get(`/delete/${shelf}/${id}`);
    dispatch({type: 'DELETE_ITEM'})
    window.location.replace(`/item/${shelf}`);
}

export const callImg = () => async (dispatch) => {
    const response = await api.get(`/catalogsIMG`);
    dispatch({type: 'IMG_LIST',payload: response.data})
}

export const addItem = (shelf,data) => async (dispatch) => {
    const response = await api.post(`/add/${shelf}`,data);
    dispatch({type: 'ADD_LIST'})
    window.location.replace(`/item/${shelf}`);
}

export const filter = (data,id) => async (dispatch) =>{
    const response = await api.get('/enable');
    const filter = response.data.filter(mem => mem.id == id || mem.title == id );
    console.log(filter)
    dispatch({
        type: 'FILLTIER_SEARCH',
        payload: filter
    });
}

export const edit_shelf = (shelf,data) => async (dispatch) => {
    const respones = await api.post(`/upload/${shelf}`,data)
    dispatch({
        type: 'EDIT_SHELF'
    })
    window.location.replace("/catalogs")
}

export const filter_shelf = (shelf) => async (dispatch) => {
    const response = await api.get('/testapi')
    const filter = response.data.filter(mem => mem.name == shelf);
    console.log(filter)
    dispatch({
        type : 'FILTER_SHELF',
        payload: filter
    })
}

export const add_shelf = (data) => async (dispatch) => {
    const response = await api.post('add_shelf',data)
    dispatch({
        type: 'ADD_SHELF'
    })
    window.location.replace("/catalogs")

}

export const delete_shelf = (shelf,uid) => async (dispatch) => {
    const response = await api.post(`/delete/${shelf}`,uid)
    dispatch({
        type: 'DELETE_SHELF'
    })
    window.location.replace("/catalogs")
}

export const list_of_shelf = () => async (dispatch) => {
    const response = await api.get('/catalogs')
    dispatch({
        type: 'LIST_SHELF',
        payload : response.data
    })
}

export const move_to_shelf = (shelf,data) => async (dispatch) => {
    const response = await api.post(`/move_item/${shelf}`,data)
    dispatch({
        type: 'MOVE_ITEM'
    })
    window.location.replace(`/item/${shelf}`)
}

export const stock = () => async (dispatch) => {
    const response = await api.get('/stock')
    dispatch({
        type: 'STOCK',
        payload: response.data
    })
}