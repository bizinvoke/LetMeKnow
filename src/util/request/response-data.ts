import type { ResponseModel } from '@/types/shared';

export const responseData = <T>(data: ResponseModel<T> | undefined) => {
  if (data === undefined) return undefined;
  return {
    code: data.code,
    msg: data.msg,
    data: data.data,
  };
};

export const responseError = (error: Error | undefined) => {
  if (error === undefined) return undefined;
  return error as unknown as ResponseModel<null>;
};
