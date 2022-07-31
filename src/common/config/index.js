// const fileHost = 'https://yin-miniprogram.oss-cn-hangzhou.aliyuncs.com/';

const CONFIG = {
  // 开发环境配置
  development: {
    HOST: 'https://mp.wux7.com', //  http://192.168.60.26:8089
  },

  // 测试环境配置
  stage: {
    HOST: 'https://test-api.huiyinkeji.cn',
  },

  // 生产环境配置
  production: {
    HOST: 'https://mp.wux7.com/', // api请求地址 https://api.huiyinkeji.cn
  },
};

let config = CONFIG[process.env.NODE_ENV];
console.log('config', config);
// #ifdef STAGE
// config = CONFIG.stage;
// #endif
export default config;
