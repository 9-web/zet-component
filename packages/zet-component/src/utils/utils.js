import moment from 'moment';

const toString = Object.prototype.toString;

/**
 * 判断value是否为数字
 */
export const isNumber = (value) => {
  return typeof value === 'number' || toString.call(value) === '[object Number]';
}

/**
 * 获取服务器当前时间
 */
export const getServerCurrentTime = () => {
  const { timeOffest } = window.g_app._store.getState().global;
  return moment(new Date()).add(timeOffest, 'milliseconds');
};


/**
 * 小数转换为百分数
 */
export const toPercent = (number, dec = 0) => {
  return `${Number(number * 100).toFixed(dec)}%`;
};
