import axios from 'axios'

export default axios.create({
    baseURL: 'https://shelflabelapi.herokuapp.com'
})

//const deploy = 'https://shelflabelapi.herokuapp.com'