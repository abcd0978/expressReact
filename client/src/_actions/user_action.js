import axios from "axios";
import {LOGIN_USER} from './types'
import { REGISTER_USER } from "./types";
import {AUTH_USER} from "./types"
import api from '../api/index'



export function loginUser(dataSubmit){
    const request = axios.post('/api/users/login',dataSubmit)
        .then(res=>res.data)
    
    return {
        type:LOGIN_USER,
        payload:request
    }
}
export async function registerUser(dataSubmit){
    const request = await api.post('/users/register',dataSubmit)
    return {
        type:REGISTER_USER,
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/users/auth')
        .then(res=>res.data)
    return {
        type:AUTH_USER,
        payload:request
    }
}