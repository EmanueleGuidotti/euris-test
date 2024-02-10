import axios from "axios";

export const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 20000,
});

axiosApiInstance.interceptors.request.use(
  (config) => {
    const configMod = {
      ...config,
      headers: {
        ...config.headers,
        Accept: "application/json",
        "Content-Type": config?.headers?.contentType ?? "application/json",
      },
    };
    return configMod;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosBaseQuery = () => async (res) => {
  const { url, method = "GET", body } = res;

  try {
    const result = await axiosApiInstance({
      url,
      method,
      data: JSON.stringify(body),
      responseType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return { data: result.data ?? result };
  } catch (axiosError) {
    return {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
    };
  }
};
