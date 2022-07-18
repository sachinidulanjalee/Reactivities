import axios, { AxiosResponse } from "axios";
import { Console } from "console";
import { resolve } from "path";
import { Activity } from "../models/activity";

const sleep = (delay :number) =>{
    return new Promise((resolve => {
        setTimeout(resolve,delay)
    }))
}
axios.defaults.baseURL='https://localhost:44397/api'
const responsBody =<T>(response:AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response =>{
    try{
    await sleep(1000);
        return response;
    }catch(error){
        console.log(error);
        return await Promise.reject(error);
    }
})

const requests ={
    get:<T>(url:string)=> axios.get<T>(url).then(responsBody),
    post:<T> (url:string,body:{})=> axios.post<T>(url,body).then(responsBody),
    put:<T> (url:string,body:{})=> axios.put<T>(url,body).then(responsBody),
    delete:<T> (url:string)=> axios.delete<T>(url).then(responsBody),
}

const Activities ={
    list:() => requests.get<Activity[]>('/activities'),
    details:(id:string) => requests.get<Activity>(`/activities/${id}`),
    create:(activity:Activity)=>axios.post<void>('/activities',activity),
    update:(activity:Activity)=>axios.put<void>(`/activities/${activity.id}`,activity),
    delete:(id:string) => axios.delete<void>(`/activities/${id}`)
}

const agent={
    Activities
}

export default agent;