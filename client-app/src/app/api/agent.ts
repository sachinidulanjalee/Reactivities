import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity } from "../models/activity";
import { store } from "../stores/store";
import { history } from '../..';


const sleep = (delay: number) => {
    return new Promise((resolve => {
        setTimeout(resolve, delay)
    }))
}
axios.defaults.baseURL = 'https://localhost:44397/api'
const responsBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {

    await sleep(1000);
    return response;

}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modelStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }

            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responsBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responsBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responsBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responsBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/activities', activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;