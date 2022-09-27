import apiConfig from './ApiURLConfig';

export default function appConfig() {
  const {apiBaseUrl} = getJSConfigForEnvironment();

  global.apiBaseUrl = apiBaseUrl;

  function getJSConfigForEnvironment() {
    return apiConfig;
  }
}
