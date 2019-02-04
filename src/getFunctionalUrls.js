import qs from 'qs';
import assert from 'simple-assert';

export default function getFunctionalUrls(apiUrl = 'https://auth1.eu.gamenet.ru') {
  return {
    apiUrl,
    apiCreateOrderUrl: `${apiUrl}/api/v1/order`,
    apiGetProjectPackagesUrl: `${apiUrl}/api/v1/project/package`,
    devAuthFormUrl: 'https://localhost:4040/',
    getAuthFormUrl({ clientID, redirectUri }) {
      if (process.env.NODE_ENV === 'development') {
        return this.devAuthFormUrl;
      }

      assert(clientID, '');

      const query = {
        client_id: clientID,
        ...(redirectUri ? { redirect_uri: redirectUri } : {}),
      };

      return `${apiUrl}/login/form?${qs.stringify(query)}`;
    },
  };
}
