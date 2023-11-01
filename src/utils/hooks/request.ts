import axios, { AxiosResponse } from 'axios';
import { BaseRequest } from './types';
import { useCallback } from 'react';

const timeout = 60000;

export const useRequest = () => {
  const request = useCallback(
    async ({
      params,
      headers,
      body,
      endpoint,
      method,
      responseType = 'text',
    }: BaseRequest): Promise<any> => {
      const requestConfig = {
        url: endpoint,
        method,
        data: body,
        headers,
        params,
        timeout,
        responseType,
      };

      try {
        const res: AxiosResponse = await axios(requestConfig);
        const parsedRes = JSON.parse(res.data);
        return {
          data: parsedRes?.data,
          meta: parsedRes?.meta,
        };
      } catch (error: any) {
        const parsedError = JSON.parse(error);

        return {
          data: parsedError?.data,
          meta: parsedError?.meta,
        };
      }
    },
    [],
  );

  return request;
};
