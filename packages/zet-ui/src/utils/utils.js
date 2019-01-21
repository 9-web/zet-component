const toString = Object.prototype.toString;


/**
 * 判断value是否为数字
 */
export const isNumber = (value) => {
  return typeof value === 'number' || toString.call(value) === '[object Number]';
}
