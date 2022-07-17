import wx from 'weixin-js-sdk';
import axios from 'axios';

import useAxiosApi from '/@/common/utils/useAxiosApi';

// export function productList(data) {
//   return useAxiosApi(`/h5/productList`, {
//     method: 'POST',
//     data,
//   });
// }
// import { isShareEnv } from './device';

const debug = process.env.NODE_ENV !== 'production';

const JS_API_LIST = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage'];

const resolveLink = (link) => link.split('#')[0];

// 检查重新调用config的次数
let invokeConfigCount = 0;

// 是否微信配置成功
let isConfigOk = false;

export async function config(link) {
  //   if (!isShareEnv) {
  //     console.log('当前环境不是微信浏览器~~');
  //     return;
  //   }

  link = link || window.location.href;
  link = resolveLink(link);

  const url = encodeURIComponent(link);

  console.log('config: ' + url);
  //   const res = await axios.get('https://carapi.kongjianhao.cn/wechat/getWechatShareConfig.do', {
  //     params: {
  //       url: url,
  //     },
  //   });

  const res = await useAxiosApi(`/userH5/getWxCode`, {
    method: 'GET',
    params: {
      url: url,
    },
  });

  const result = res.data.data;

  // if (result.errorCode === 200) {
  //     let data = Object.assign({}, result.data, {
  //         debug,
  //         JS_API_LIST
  //     })
  //     // 微信配置
  //     wx.config(data)
  // }

  // 微信配置
  wx.config({
    debug, // 开启调试模式
    appId: result.appId, // 必填，公众号的唯一标识
    timestamp: result.timestamp, // 必填，生成签名的时间戳
    nonceStr: result.nonceStr, // 必填，生成签名的随机串
    signature: result.signature, // 必填，签名，见附录1
    jsApiList: JS_API_LIST,
  });
}

wx.error((error) => {
  /* eslint no-console:"off" */
  console.log(JSON.stringify(error, null, 2));
  isConfigOk = false;

  if (invokeConfigCount < 3 && error.errMsg.indexOf('config:fail') !== -1) {
    invokeConfigCount++;
    isConfigOk = true;
    // 更改微信配置
    config();
  } else {
    invokeConfigCount = 0;
  }
});

export function ready() {
  if (!isConfigOk) {
    isConfigOk = true;
    config();
  }
  if (process.env.NODE_ENV !== 'production') {
    wx.ready(() => {
      // 检查微信功能权限
      wx.checkJsApi({
        JS_API_LIST,
        success(result) {
          console.log(`checkJsApi: ${JSON.stringify(result, null, 2)}`);
        },
        fail(error) {
          console.log(`checkJsApi: ${JSON.stringify(error, null, 2)}`);
        },
      });
    });
  }
  return new Promise((resolve, reject) => {
    wx.ready(() => {
      console.log('wx ready');
      resolve();
    });
  });
}

export function share(options) {
  // var success, cancel, link, type, dataUrl
  let link;
  const { title, imgUrl, desc, type = 'link', dataUrl = '' } = options;
  if (!isConfigOk) {
    isConfigOk = true;
    config();
  }

  if (process.env.NODE_ENV !== 'production') {
    wx.ready(() => {
      // 检查微信功能权限
      wx.checkJsApi({
        JS_API_LIST,
        success(result) {
          alert(`checkJsApi: ${JSON.stringify(result, null, 2)}`);
        },
        fail(error) {
          alert(`checkJsApi: ${JSON.stringify(error, null, 2)}`);
        },
      });
    });
  }
  link = link || window.location.href;
  link = resolveLink(link);

  wx.ready(() => {
    // 分享到好友
    wx.onMenuShareAppMessage({
      // 分享标题
      title,
      // 分享描述
      // 分享图标
      imgUrl,
      desc,
      // 分享链接
      link,
      // 分享类型，music、video或者link，默认为link
      type,
      // 如果type是music或者video，则要提供数据链接，默认为空
      dataUrl,
      // 用户确认分享后执行的回调函数
      success: function (res) {
        console.log('shared success');
      },
      // 用户取消分享后执行的回调函数
      cancel: function (res) {
        console.log('shared cancle');
      },
    });
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      // 分享标题
      title,
      // 分享链接，该链接域名与路径必须与当前页面对象的公众号JS安全域一致
      imgUrl,
      // 分享图标
      link,
      // 用户确认分享后执行的回调函数
      success: function (res) {
        console.log('shared success');
      },
      // 用户取消分享后执行的回调函数
      cancel: function (res) {
        console.log('shared cancle');
      },
    });
  });
}

export default {
  config,
  ready,
  share,
};

// const plugin = (Vue) => {
//   if (plugin.install) {
//     return;
//   }

//   plugin.install = true;

//   Vue.wechat = wechat;

//   Object.defineProperties(Vue.prototype, {
//     $wechat: {
//       get() {
//         return wechat;
//       },
//     },
//   });
// };

// export default plugin;
