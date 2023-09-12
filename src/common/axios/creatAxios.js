import axios from 'axios';

const createAxios = (config = {}) => {
  const instance = axios.create({
    timeout: config.timeout || (1000 * 60 * 10),
    headers: config.headers || {}
  });

  instance.interceptors.request.use(
    function (config) {
      if (config.method.toUpperCase() === 'POST' && config.headers['Content-Type'] === undefined) {
        config.headers = { ...config.headers, ...{ 'Content-Type': 'application/x-www-form-urlencoded' } };
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
      return Promise.reject(error);
    }
  );

  return { original: instance, get: instance.get, post: instance.post, request: instance.request };
};

export default createAxios;