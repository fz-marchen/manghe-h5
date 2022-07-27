import useAxiosApi from '/@/common/utils/useAxiosApi';

export function productList(data) {
  return useAxiosApi(`/h5/productList`, {
    method: 'POST',
    data,
  });
}

export function allProductList(data) {
  return useAxiosApi(`/h5/allProductList`, {
    method: 'POST',
    data,
  });
}

// 用户注册登录 请求参数  mobile
export function addH5User(data) {
  return useAxiosApi(`/userH5/addH5User`, {
    method: 'POST',
    data,
  });
}

// 用户开启盲盒  请求参数 mangheId
export function openBlindBoxToPay(data) {
  return useAxiosApi(`/userH5/openBlindBoxToPay`, {
    method: 'POST',
    data,
  });
}

// 查询支付结果  请求参数 tradeCode

export function queryHeguiPayResult(data) {
  return useAxiosApi(`/userH5/queryHeguiPayResult`, {
    method: 'POST',
    data,
  });
}

export function getWxCodeToPay(data) {
  return useAxiosApi(`https://mpauth.wux7.com/userH5/getWxCodeToPay`, {
    method: 'get',
    params: data,
  });
}
