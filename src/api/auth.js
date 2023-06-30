import axios from "axios";
const BASE_URL = "https://crmrelevel.onrender.com";

//signup
export async function userSignUp(data){
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data)
}

//sigin
export async function userLogin(data){
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data)
}