import axios from 'axios'

const fetcher = axios.create({
    baseURL:"https://parrot-backend-si0b.onrender.com/api/",
    withCredentials:true,

})
fetcher.defaults.headers['Content-Type'] = 'application/json';


export default fetcher