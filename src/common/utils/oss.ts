/* eslint-disable */
// @ts-nocheck
import { IMG_BASE_URL } from '/@/common/constant/index';
export function imgOssAppend(url = '', params) {
  url = url && url.trim();
  if (!url) return '';

  const [imgUrl = ''] = (url && url.split('?')) || [];

  let splitParams: any = [];
  if (typeof params === 'number') {
    splitParams = [params];
  } else {
    splitParams = params.split(',');
  }
  return imgUrl + imgOssParams(...splitParams);
}

export function mhImgOss() {
  const [params, ...rest] = arguments;

  const mhImgs = mhImg.apply(null, rest);
  if (!params) return mhImgs;

  // 解析params对应上url的ossparams
  const mhImgsKeys = Object.keys(mhImgs);
  let oosParams = params;
  if (typeof params === 'string') {
    // 全体应用
    oosParams = mhImgsKeys.reduce((res, value) => {
      res[value] = params;
      return res;
    }, {});
  } else if (Array.isArray(params)) {
    // 与img按索引一一对应
    oosParams = coverArr2Obj(params);
  }

  return mhImgsKeys.reduce((res, value) => {
    res[value] = imgOssAppend(mhImgs[value], oosParams[value]);
    return res;
  }, {});
}

function range(start, end, pass = []) {
  const passMap = pass.reduce((res, cur) => {
    res[cur] = true;
    return res;
  }, {});

  const list = [];
  for (let i = start; i < end; i++) {
    if (passMap[i]) break;
    list.push(i);
  }
  return list;
}
/**
 * 图片文件路径处理
 * 参数说明
 *   1.当参数个数为1时:
 *     a.参数类型为对象时, 为对象的所有键值进行convertImageSrc处理;
 *     b.参数类型为数组时, 将传入的数组数据转换成对象数据, 对象key为mhImg0, mhImg1, 再按情况a处理;
 *     c.参数类型为字符串时, 将字符串以逗号拆分为数组,再按情况b处理;
 *   2.当参数个数大于1时,接收参数 prefix, lenOrKeys, postfix
 *     prefix:前缀;
 * 				a.参数类型为字符串时,作为前缀使用
 * 				b.参数类型为对象时,格式为{pre:String, name:String},pre为前缀,name将做为数组数据转换为对
 * 					象数据时,对象key中的mhImg${prefixName}${index}变量prefixName;
 *     lenOrKeys:长度或键值;
 * 				a.参数类型为数组时,map数组返回prefix+value+postfix新数组,再将新数组数据转换成对象数据,
 *          对象key为mhImg0, mhImg1, 再按情况1-a处理;
 * 				b.参数类型为数字时,处理为范围[0,lenOrKeys)的数组,再按情况a处理;
 * 				c.参数类型为字符串时,将字符串以逗号拆分为数组,再按情况a处理;
 * 				d.参数类型为对象时,接收参数格式为{start:Number, end:Number, pass:Array},
 *          处理为范围[start,end)并排除pass中配置的值的数组,再按情况a处理;
 *     postfix:后缀;
 */
export function mhImg(data = {}) {
  if (arguments.length > 1) {
    // 参数个数大于1
    let [prefix, lenOrKeys, postfix = '.png'] = arguments;
    let list: any = [];
    const typeofLen = typeof lenOrKeys;
    if (typeofLen == 'number') {
      list = range(0, lenOrKeys);
    } else if (typeofLen == 'string') {
      list = lenOrKeys.split(',');
    } else if (Array.isArray(lenOrKeys)) {
      list = lenOrKeys;
    } else if (typeofLen == 'object') {
      const { start = 0, end, pass } = lenOrKeys;
      list = range(start, end, pass);
    }

    let namePrefix = '';
    if (typeof prefix === 'object') {
      // 若prefix为对象
      const { pre, name } = prefix;
      prefix = pre;
      namePrefix = name;
    }
    list = list.map((value) => `${prefix}${value}${postfix}`);
    data = coverArr2Obj(list, namePrefix);
  } else {
    if (Array.isArray(data)) {
      // 将传入的数组数据转换成对象数据, key为 mhImg0, mhImg1
      data = coverArr2Obj(data);
    } else if (typeof data === 'string') {
      // 将传入的字符串逗号分隔的数据转换成对象数据, key为 mhImg0, mhImg1
      data = coverArr2Obj(data.split(','));
    }
  }
  return Object.keys(data).reduce((res, key) => {
    res[key] = convertImageSrc(data[key]);
    return res;
  }, {});
}

function convertImageSrc(src) {
  let result = src;
  if (!result.startsWith('http:') && !result.startsWith('https:')) {
    const index = result.indexOf('static');
    if (index > 0) {
      result = result.substr(index + 6);
    } else {
      // 是否为'/'开始
      if (!result.startsWith('/')) {
        result = `/${result}`;
      }
    }
    result = `${IMG_BASE_URL}${result}`;
  }
  return result;
}

function coverArr2Obj(arr, prefix = '') {
  return arr.reduce((res, value, index) => {
    res[`mhImg${prefix}${index}`] = value;
    return res;
  }, {});
}

function imgOssParams(w = 375, q = 85, r = 2) {
  return `?x-oss-process=image/resize,w_${w * r}/quality,Q_${q}`;
}

export default {
  mhImg,
};
