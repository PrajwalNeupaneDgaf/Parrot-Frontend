import axios from 'axios'

const fetcher = axios.create({
    baseURL:"http://localhost:5000/api/",
    withCredentials:true,

})
fetcher.defaults.headers['Content-Type'] = 'application/json';


export default fetcher