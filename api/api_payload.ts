import axios from 'axios'
export const api_payload = axios.create({baseURL:'https://payloadback-production.up.railway.app/api'})