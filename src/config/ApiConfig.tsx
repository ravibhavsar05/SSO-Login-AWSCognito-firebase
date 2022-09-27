import axios, {AxiosInstance} from 'axios';
import {configure} from 'axios-hooks';

export let axiosInstance: AxiosInstance | null = null;
let axiosCancelSource = axios.CancelToken.source();
export function cancelAllAPIRequests() {
  axiosCancelSource.cancel('Cancel all requests');
  axiosCancelSource = axios.CancelToken.source();
}
export default async function configureAPI() {
  axiosInstance = axios.create({
    baseURL: global.apiBaseUrl,
    timeout: 30000,
    headers: {},
  });

  axiosInstance.interceptors.request.use(async config => {
    config.cancelToken = axiosCancelSource.token;
    return config;
  });
  configure({axios: axiosInstance, cache: false});
}
