import axios from "axios"

const BASE_URL = "https://crmrelevel.onrender.com"

export async function fetchTickets(){
    return await axios.get(`${BASE_URL}/crm/api/v1/tickets`, {
        headers: {
            'x-access-token' : localStorage.getItem("token")
        }
    })
}

export async function createTicketApi(data){
    return await axios.post(`${BASE_URL}/crm/api/v1/tickets`, data, {
        headers:{
            'x-access-token' : localStorage.getItem("token")
        }
    })
}

export async function updateTicketApi(ticketId, data){
    return await axios.put(`${BASE_URL}/crm/api/v1/tickets/${ticketId}`, data, {
        headers:{
            'x-access-token' : localStorage.getItem("token")
        }
    })
}