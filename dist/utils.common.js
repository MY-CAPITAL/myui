'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const adjustImgShape = (container, ratio) => {
  const imgs = document.querySelectorAll(container + ' .img-wrap img');
  imgs.forEach(img => {
    img.onload = () => {
      img.parentNode.classList.add(img.naturalWidth / img.naturalHeight >= ratio ? 'img-w' : 'img-h');
    };
  });
};

const connectWS = option => {
  console.log(`Connecting to ${option.uri} ...`);

  const ws = new WebSocket(option.uri);

  ws.onopen = ev => {
    console.log('RTServer Connection Created!');

    option.type && ws.send(JSON.stringify({
      type: option.type,
      data: 'Set Request Type'
    }));

    option.host && ws.send(JSON.stringify({
      type: option.type,
      data: option.host
    }));
  };

  ws.onmessage = ev => {
    option.receive(ev.data);
  };

  ws.onclose = ev => {
    console.log('RTServer Connection Closed!');
  };

  ws.onerror = ev => {
    console.log('RTServer Connection Broken!');
    throw new Error(ev)
  };

  return ws
};

/*
 * 将表格数据转换为csv格式的字符串
 *
 * @access public
 * @param {object} data - 表头：data.headers, head: {title: 'title', prop: 'prop'}；数据：data.rows
 * @returns {string}
 * */

const convertTableDataToString = data => {
  if (!data.headers || !data.rows) {
    throw new ReferenceError('数据源格式不正确')
  }

  let str = '', body = [];

  data.headers.forEach(head => {
    body.push(head.title);
  });
  str += body.join(',') + '\n';
  body = [];

  data.rows.forEach(row => {
    data.headers.forEach(head => {
      let x = '' + row[head.prop];
      body.push(x.includes(',') ? `\"${x}\"` : x);
    });
    str += body.join(',') + '\n';
    body = [];
  });
  return str
};

const config = {
  errorMsg: {
    101: '该用户已存在',
    102: '验证码错误',
    103: '验证码已过期',
    104: '用户名或密码错误',
    105: '用户未登录',
    106: '用户已登录，请刷新页面',
    107: '原密码错误',
    108: '无效的邮箱地址',
    109: '无效的手机号',
    110: '无效的用户名',
    111: '邮箱地址未绑定',
    112: '手机号未绑定',
    113: '用户登录失败次数大于4次，已被锁定，请1小时后再试',
    114: '用户权限不足',
    115: '验证失败次数过多，请重新发送验证码',
    116: '邮箱地址已绑定',
    117: '手机号已绑定',
    200: '请求超时',
    201: '请求发送失败',
    202: '后台服务未启动',
    203: '系统错误',
    204: '对象不存在',
    205: '请求过于频繁',
    206: '非法参数',
    207: '必选参数不能为空',
    208: '签名不匹配',
    209: '非开放API',
    210: '数据解析失败',
    211: '要存储的对象超过了大小限制',
    212: 'API请求次数超过限制',
    213: '创建对象失败',
    214: '查询对象失败',
    215: '更新对象失败',
    216: '删除对象失败',
    217: '对象已存在'
  },
  errorStatusMsg: {
    403: '拒绝访问',
    404: 'API不存在',
    405: '请求方法不允许',
    500: '内部服务器发生错误',
    502: '后台服务未启动',
    504: '请求超时，请重试'
  }
};

const wrapFetch = function (request) {
  let status = 200;
  return new Promise((resolve, reject) => {
    fetch(request).then(res => {
      if (res.ok) return res.json()
      status = res.status;
      throw {
        status,
        msg: config.errorStatusMsg[res.status] || res
      }
      // return res.text()
    }).then(body => {
      if (body.code === 0) {
        resolve(body.data);
      } else {
        throw {
          status,
          code: body.code,
          msg: config.errorMsg[body.code] || body.msg || body.error || 'Unknown Error'
        }
      }
    }).catch(reject);
  })
};
let urlPrefix = '/api', CSRFHeader = 'X-CSRFToken', CSRFValue = 'csrf';
const requestUrl = function (url) {
  if (url.startsWith('/') || url.startsWith('http')) return url
  return `${urlPrefix}/${url}`
};

const $fetch = {
  prefix(prefix) {
    urlPrefix = prefix;
  },
  setCSRF(header, value) {
    CSRFHeader = header;
    CSRFValue = value;
  },
  get(url) {
    return wrapFetch(new Request(requestUrl(url), {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'x-access-token': localStorage.token
      }
    }))
  },
  post(url, params) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        [CSRFHeader]: sessionStorage[CSRFValue]
      },
      body: JSON.stringify(params)
    }))
  },
  form(url, params) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'x-access-token': localStorage.token,
        [CSRFHeader]: sessionStorage[CSRFValue]
      },
      body: params
    }))
  },
  put(url, params) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'put',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        [CSRFHeader]: sessionStorage[CSRFValue]
      },
      body: JSON.stringify(params)
    }))
  },
  putForm(url, params) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'put',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'x-access-token': localStorage.token,
        [CSRFHeader]: sessionStorage[CSRFValue]
      },
      body: params
    }))
  },
  delete(url) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'delete',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'x-access-token': localStorage.token,
        [CSRFHeader]: sessionStorage[CSRFValue]
      }
    }))
  }
};

const fillDateNumber = value => {
  return value < 10 ? `0${value}` : value
};

const formatDate = (date, type) => {
  let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();

  switch (type) {
    case 'YYYY-M-D':
    case 1:
      return `${year}-${month}-${day}`
    case 'YYYYMMDD':
    case 2:
      return Number(`${year}${fillDateNumber(month)}${fillDateNumber(day)}`)
    case 3:
      return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
    case 'YYYY-MM-DD':
    case 4:
      return `${year}-${fillDateNumber(month)}-${fillDateNumber(day)}`
    case 'YYYY-M-D h:m:s':
      return `${year}-${month}-${day} ${hour % 12}:${minute}:${second}`
    case 'YYYY-M-D H:m:s':
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    case 'YYYY-MM-DD HH:mm:ss':
      return `${year}-${fillDateNumber(month)}-${fillDateNumber(day)} ${fillDateNumber(hour)}:${fillDateNumber(minute)}:${fillDateNumber(second)}`
    case 'YYYY-MM-DD hh:mm:ss':
      return `${year}-${fillDateNumber(month)}-${fillDateNumber(day)} ${fillDateNumber(hour % 12)}:${fillDateNumber(minute)}:${fillDateNumber(second)}`
    default:
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
};

const getAverageRGB = imgEl => {
  let blockSize = 5, // only visit every 5 pixels
    defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d'),
    data, width, height,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;
  if (!context) {
    return defaultRGB;
  }
  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
  context.drawImage(imgEl, 0, 0);
  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    return defaultRGB;
  }
  length = data.data.length;
  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
    // rgb.a += data.data[i+3];
  }
  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);
  // rgb.a = ~~(rgb.a/count);
  return rgb;
};

function getElemHeight (el) {
  const elStyle = getComputedStyle(el);
  const elDisplay = elStyle.display;
  const elPosition = elStyle.position;
  const elVisibility = elStyle.visibility;

  if (elDisplay !== 'none') return el.offsetHeight

  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  el.style.display = 'block';

  const elHeight = el.offsetHeight;

  el.style.display = elDisplay;
  el.style.position = elPosition;
  el.style.visibility = elVisibility;

  return elHeight
}

const getKeyByValue = (obj, value) => {
  for (let key in obj) {
    if (obj[key] === value) return key
  }
};

const getScrollTop = () => {
  if (document.documentElement.scrollTop) {
    return document.documentElement.scrollTop
  }
  return document.body.scrollTop
};

/*
 * get the value of name in a URL search.
 *
 * @access public
 * @function getSearchParam
 * @param {string} name - A string we want to get the value of
 * @returns {string}
 * */

const getSearchParam = name => {
  const searchString = new URL(location).search;
  if ('URLSearchParams' in window) {
    const params = new URLSearchParams(searchString);

    return params.get(name)
  }

  const params = {};
  searchString.substring(1).split('&').forEach(pair => {
    pair = pair.split('=');
    params[pair[0]] = pair[1];
  });
  return params[name]
};

const getTimeDiff = time => {
  const d = new Date();
  let diff = Math.floor(d.getTime() / 1000) - time;

  let thisDate = new Date(time * 1000),
    thisYear = thisDate.getFullYear(),
    thisMonth = thisDate.getMonth() + 1,
    thisDay = thisDate.getDate(),
    thisHour = thisDate.getHours(),
    thisMinute = thisDate.getMinutes();

  thisHour = thisHour === 0 ? '00' : thisHour;
  thisMinute = thisMinute === 0 ? '00' : thisMinute;

  if (diff < 60) {
    return `${diff < 1 ? 1 : diff}秒前`
  }
  if (diff >= 60 && diff < 60 * 60) {
    return `${Math.floor(diff / 60)}分钟前`
  }
  if (thisDate.toDateString() === d.toDateString()) {
    return `今天 ${thisHour}:${thisMinute}`
  }
  if (thisYear === d.getFullYear()) {
    return `${thisMonth}月${thisDay}日 ${thisHour}:${thisMinute}`
  }
  return `${thisYear}-${thisMonth}-${thisDay} ${thisHour}:${thisMinute}`
};

/*
 * getype returns a string which represents the type of value.
 *
 * @access public
 * @function getype
 * @param {*} value - A thing we want to check the type of
 * @returns {string}
 * */

const getype = value => {
  let type = Object.prototype.toString.call(value);

  if (type === '[object Undefined]') {
    return 'undefined'
  }

  if (type === '[object Null]') {
    return 'null'
  }

  if (type === '[object Number]') {
    return 'number'
  }

  if (type === '[object String]') {
    return 'string'
  }

  if (type === '[object Array]') {
    return 'array'
  }

  if (type === '[object Object]') {
    return 'object'
  }

  if (type === '[object Function]') {
    return 'function'
  }

  if (type === '[object Boolean]') {
    return 'boolean'
  }

  if (type === '[object Date]') {
    return 'date'
  }

  if (type === '[object Error]') {
    return 'error'
  }

  if (type === '[object RegExp]') {
    return 'regexp'
  }
};

const isEmptyObject = obj => {
  if (getype(obj) !== 'object') {
    throw new TypeError(`${obj} 不是对象字面量`)
  }

  return !Object.keys(obj).length
};

const isFirefox = () => {
  return /Firefox/i.test(navigator.userAgent)
};

const isIE = () => {
  return /Trident/i.test(navigator.userAgent)
};

const isMobile = () => {
  return /Mobi/i.test(navigator.userAgent)
};

const isMobileEx = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};

const isSupportWebGL = () => {
  const canvas = document.createElement('canvas');
  const supports = 'probablySupportsContext' in canvas ? 'probablySupportsContext' : 'supportsContext';

  if (supports in canvas) {
    return canvas[supports]('webgl') || canvas[supports]('experimental-webgl')
  }
  return 'WebGLRenderingContext' in window
};

const isWeixin = () => {
  let userAgent = navigator.userAgent.toLowerCase();
  return userAgent.match(/micromessenger/)
};

const isWeixinInIphone = () => {
  let userAgent = navigator.userAgent.toLowerCase();
  return userAgent.match(/iphone os/) && userAgent.match(/micromessenger/)
};

const reload = () => {
  if (isWeixin()) {
    location.href = location.href + '?v=' + 10000 * Math.random();
  } else {
    location.reload();
  }
};

const saveDataToFile = (data, filename, ext) => {
  let blob = new Blob(['\ufeff' + data], { type: `text/${ext};charset=utf-8` }),
    url = URL.createObjectURL(blob);

  let link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.${ext}`);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const smoothToTop = () => {
  pageYOffset > 500 && scroll(0, 500);
  let y = -pageYOffset / 15,
    t = setInterval(() => {
      pageYOffset !== 0 ? scrollBy(0, y) : clearInterval(t);
    }, 15);
};

const sortObjectArray = (arr, column, dir = 1) => {
  arr.sort((a, b) => {
    if (typeof a[column] === 'number') return dir > 0 ? (a[column] - b[column]) : (b[column] - a[column])

    return new Intl.Collator(/*'zh-Hans-CN', */{
      sensitivity: 'base'
    }).compare(dir > 0 ? a[column] : b[column], dir > 0 ? b[column] : a[column])
  });
  return arr
};

const sleep = (ms = 1000) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), ms);
	})
};

const browserType = () => {
	const ua = navigator.userAgent;
	let browser = ua.match(/Edge\/([\d.]+)/i);
	if (browser) return 'edge'

	browser = ua.match(/Firefox\/([\d.]+)/i);
	if (browser) return 'firefox'

	browser = ua.match(/Version\/([\d.]+)/i);
	if (browser) return 'safari'

	browser = ua.match(/Chrome\/([\d.]+)/i);
	if (browser) return 'chrome'
};

/*
 * 将数字按国际化格式显示
 *
 * @access public
 * @function intlNumber
 * @param {number} value - 待处理数字
 * @returns {string}
 * */

const intlNumber = (value) => {
	if (typeof Intl === 'undefined') return value
	if (value === undefined) return 0

	return new Intl.NumberFormat(undefined, {maximumFractionDigits: 6}).format(value)
};

/*
 * Generate a string for GET query
 *
 * @access public
 * @function generateQueryString
 * @param {object} obj
 * @returns {string}
 * */

const generateQueryString = obj => {
	let str = '';
	for (let k in obj) {
		str += `&${k}=${obj[k]}`;
	}
	return str.substring(1)
};

const getNumberArray = (min, max) => {
	return new Array(max - min + 1).fill(0).map((v, i) => (min + i))
};

const secondsToDuration = (num, type = 1) => {
  if (num <= 0) return ''

  let days = 0, hours = 0, minutes = 0, seconds = 0;

  minutes = Math.trunc(num / 60);
  if (minutes === 0) {
    seconds = fillDateNumber(num);
    return [`00:00:${seconds}`, `${seconds}s`][type - 1]
  }

  seconds = fillDateNumber(num % 60);
  hours = Math.trunc(minutes / 60);
  if (hours === 0) {
    minutes = fillDateNumber(minutes);
    return [`00:${minutes}:${seconds}`, `${minutes}m${seconds}s`][type - 1]
  }

  minutes = fillDateNumber(minutes % 60);
  days = Math.trunc(hours / 24);
  if (days === 0) {
    hours = fillDateNumber(hours);
    return [`${hours}:${minutes}:${seconds}`, `${hours}h${minutes}m${seconds}s`][type - 1]
  }

  hours = fillDateNumber(hours % 24);
  return [`${days}天 ${hours}:${minutes}:${seconds}`, `${days}day${hours}h${minutes}m${seconds}s`][type - 1]
};

const kvAry2Obj = ary => ary.reduce((obj, [key, value]) => ({...obj, [key]: value}), {});

// YYYYMMDD -> YYYY-MM-DD
const intDate2Dashed = date => {
  if (!date) return date

  return `${date}`.replace(/^(\d{4})(\d{2})(\d{2})$/, function (x, a, b, c) {
    return `${a}-${b}-${c}`
  })
};

// YYYY-MM-DD -> YYYYMMDD
const dashedDate2Int = date => {
  return Number(date.replace(/-/g, ''))
};

const utils = {
  adjustImgShape,
  connectWS,
  convertTableDataToString,
  fetch: $fetch,
  fillDateNumber,
  formatDate,
  getAverageRGB,
  getElemHeight,
  getKeyByValue,
  getScrollTop,
  getSearchParam,
  getTimeDiff,
  getype,
  isEmptyObject,
  isFirefox,
  isIE,
  isMobile,
  isMobileEx,
  isSupportWebGL,
  isWeixin,
  isWeixinInIphone,
  reload,
  saveDataToFile,
  smoothToTop,
  sortObjectArray,
  sleep,
  browserType,
  intlNumber,
  generateQueryString,
  getNumberArray,
  secondsToDuration,
  kvAry2Obj,
  intDate2Dashed,
  dashedDate2Int
};

exports.$fetch = $fetch;
exports.adjustImgShape = adjustImgShape;
exports.browserType = browserType;
exports.connectWS = connectWS;
exports.convertTableDataToString = convertTableDataToString;
exports.dashedDate2Int = dashedDate2Int;
exports.default = utils;
exports.fillDateNumber = fillDateNumber;
exports.formatDate = formatDate;
exports.generateQueryString = generateQueryString;
exports.getAverageRGB = getAverageRGB;
exports.getElemHeight = getElemHeight;
exports.getKeyByValue = getKeyByValue;
exports.getNumberArray = getNumberArray;
exports.getScrollTop = getScrollTop;
exports.getSearchParam = getSearchParam;
exports.getTimeDiff = getTimeDiff;
exports.getype = getype;
exports.intDate2Dashed = intDate2Dashed;
exports.intlNumber = intlNumber;
exports.isEmptyObject = isEmptyObject;
exports.isFirefox = isFirefox;
exports.isIE = isIE;
exports.isMobile = isMobile;
exports.isMobileEx = isMobileEx;
exports.isSupportWebGL = isSupportWebGL;
exports.isWeixin = isWeixin;
exports.isWeixinInIphone = isWeixinInIphone;
exports.kvAry2Obj = kvAry2Obj;
exports.reload = reload;
exports.saveDataToFile = saveDataToFile;
exports.secondsToDuration = secondsToDuration;
exports.sleep = sleep;
exports.smoothToTop = smoothToTop;
exports.sortObjectArray = sortObjectArray;
