export const pageCount = 20;
const u = window.navigator.userAgent;
export const isIOS = !!u.match(/(i[^;]+;)( U;)? CPU.+Mac OS X/);
export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;

export const reservedKeys = {
  accessToken: 'ACCESS_TOKEN',
  refreshToken: 'REFRESH_TOKEN',
  uid: 'UID',
  path: 'PATH',
};
