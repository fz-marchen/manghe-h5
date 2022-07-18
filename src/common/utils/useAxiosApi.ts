import { useAxios } from '@vueuse/integrations/useAxios';
import axios, { AxiosRequestConfig } from 'axios';
import Toast from 'vant/lib/toast';
import config from '/@/common/config';
// create an axios instance
// import { store } from '/@/store';
import { useCommonStore } from '/@/store/modules/common';

const commonStore = useCommonStore();
const instance = axios.create({
  baseURL: config.HOST,
  withCredentials: false,
  timeout: 5000,
});

// request interceptor
instance.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // const token = store.state.user.token;
    // console.log('store', store.state.value.common);
    const { platform } = commonStore;
    // console.log('commonStore', commonStore.platform);
    if (platform) {
      // let each request carry token
      config.headers = {
        ...config.headers,
        platform,
      };
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    console.log('response', res);
    // if the custom code is not 200, it is judged as an error.
    if (res.errno == 200) {
      return res;
    } else {
      console.log('res.errMsg', res.errMsg);
      Toast(res.errMsg);
      // 412: Token expired;
      if (res.errno === 412) {
        // store.dispatch('user/userLogout');
      }
      return Promise.reject(res.errMsg || 'Error');

      // throw new Error(res.errMsg);
    }
  },
  (error) => {
    Toast(error.message);
    return Promise.reject(error.message);
  },
);

/**
 * reactive useFetchApi
 */

export default function useAxiosApi(url: string, config: AxiosRequestConfig) {
  return useAxios(url, config, instance);
}
