import type { ResponseModel } from '@/types/shared';
import { message } from 'antd';
import { camelToUnderline, underlineToCamel } from '../object';
import { reservedKeys } from '../storages';
import domain from './domain';
import type { ArgumentForUseFetch } from './headers';
import { createBasicRequestHeaders } from './headers';

interface HttpError {
  code: 'STATUS ERROR' | 'Refresh Token Error' | 'Response Error';
  status: number;
  statusText: string;
}

let reTryCount = 0;

export default function fetcher(
  argument: string | ArgumentForUseFetch,
  config?: RequestInit,
  timeout = 20000,
  newAccessToken?: string,
): Promise<ResponseModel<PureValue>> {
  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort();
    if (reTryCount < 4) {
      reTryCount++;
      return fetcher(argument, config, timeout, newAccessToken);
    }
  }, timeout);

  const method = typeof argument === 'string' ? 'GET' : argument.method;
  const uri = typeof argument === 'string' ? argument : argument.uri;
  const isFormData =
    typeof argument === 'object' &&
    typeof argument.parameters === 'object' &&
    argument.parameters instanceof FormData;
  const parmHeaders =
    typeof argument === 'string' ? undefined : argument.headers;
  const parameters =
    typeof argument === 'string'
      ? undefined
      : argument.parameters instanceof FormData
      ? argument.parameters
      : JSON.stringify(camelToUnderline(argument.parameters));

  const requestOption = fetch(`${domain}${uri}`, {
    ...config,
    // credentials: "include",
    keepalive: !isFormData,
    signal: controller.signal,
    method: method,
    body: parameters,
    headers: createBasicRequestHeaders(
      method,
      parmHeaders,
      newAccessToken || localStorage.getItem(reservedKeys.accessToken),
      isFormData,
    ),
  });

  const httpInterceptor = requestOption
    .then((res) => {
      const response = res.clone();

      if (response.ok) {
        const _responseObj = response.json();
        return _responseObj;
      }
      return Promise.reject({
        code: 'STATUS ERROR',
        status: response.status,
        statusText: response.statusText,
      });
    })
    .catch((err: HttpError) => {
      if (err?.code === 'STATUS ERROR') {
        console.log(` Status Error ======> 「${domain}${uri}」`);
      } else if (!navigator.onLine) {
        console.log(` NetWork Error ======> 「${domain}${uri}」`);
        controller.abort();
      } else {
        console.log(` Server ERROR ======> 「${domain}${uri}」`);
      }
      return Promise.reject(new Error('Http Error', { cause: err }));
    })
    .finally(() => {
      clearTimeout(id);
      reTryCount = 0;
    });

  const responseInterceptor = httpInterceptor
    .then((res: ResponseModel<PureValue>) => {
      if (res.code === 1000) {
        const response: ResponseModel<PureValue> = {
          data: res.data === null ? undefined : underlineToCamel(res.data),
          code: res.code,
          msg: res.msg,
        };
        return Promise.resolve(response);
      }
      return Promise.reject(res);
    })
    .catch((err: ResponseModel<PureValue>) => {
      if (err?.code === 1004) {
        console.log(`Access Token Expired ======> `);
        location.assign('/login');
      }
      message.error(`(${err.code})${err.msg}`);
      return Promise.reject(new Error(err.msg, { cause: err }));
    });

  return responseInterceptor;
}
