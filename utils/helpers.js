import axios from 'axios'
const baseURL = 'http://178.128.57.157/API_questions.php/questions/'

const axiosInstance = axios.create({
  baseURL
})

export const apiHelper = axiosInstance
