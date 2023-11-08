import type { RequestMethod } from './methods';

export type ArgumentForUseFetch = {
  method: RequestMethod;
  uri: string;
  parameters?: string | PureObject;
  headers?: PureObject;
  //   token: string;
};

export const createBasicRequestHeaders = (
  method: RequestMethod,
  parmHeaders: ArgumentForUseFetch['headers'] = {},
  token: string | null,
  isFormData?: boolean,
) => {
  const headers: HeadersInit = {
    Accept: 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };

  if (method !== 'GET' && !isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  return { ...headers, ...parmHeaders };
};
