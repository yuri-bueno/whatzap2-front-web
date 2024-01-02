interface IUseApiConfig extends AxiosRequestConfig {
  baseURL?: string;
}

type ResponseSuccess<data> = data & {
  success: true;
};

type ResponseError<data> = data & {
  success: false;
  error: string;
};

export type ResponseApi<dataSuccess, dataError> =
  | ResponseSuccess<dataSuccess>
  | ResponseError<dataError>;

import type { AxiosRequestConfig } from "axios";

async function useApi<ResponseSuccess = {}, ResponseError = {}>(
  data: IUseApiConfig
) {
  if (!data.baseURL) data.baseURL = useRuntimeConfig().public.base_url;

  const axios = useNuxtApp().$axios;

  return (await axios(data)
    .then((response) => response.data)
    .catch((response) => response.response?.data)) as ResponseApi<
    ResponseSuccess,
    ResponseError
  >;
}

export { useApi };
