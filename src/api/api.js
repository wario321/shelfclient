import axios from 'axios'

export default axios.create({
    baseURL: 'https://shelflabelapi.herokuapp.com'
})

//const deploy = 'https://shelflabelapi.herokuapp.com'
//http://127.0.0.1:5000