import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://e-commerce-ferd.herokuapp.com'
})

export default instance
