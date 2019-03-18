import qs from 'qs';
import assert from 'simple-assert';

export default function getFunctionalUrls(apiUrl = 'https://auth1.tst.protocol.one') {
  return {
    apiUrl,
    getAuthFormUrl({
      clientID, redirectUri, state, scopes,
    }) {
      assert(clientID, 'You must defined clientID param');
      assert(state, 'You must defined state param');

      const query = {
        client_id: clientID,
        ...(redirectUri ? { redirect_uri: redirectUri } : {}),
        ...(state ? { state } : {}),
        ...(scopes ? { scopes } : {}),
      };

      return `${apiUrl}/login/form?${qs.stringify(query)}`;
    },
    getLogoutFormUrl({
      logoutRedirectUrl,
    }) {
      assert(logoutRedirectUrl, 'You must defined logoutRedirectUrl param');

      const query = {
        redirect_uri: logoutRedirectUrl,
      };

      return `${apiUrl}/oauth2/logout?${qs.stringify(query)}`;
    },
  };
}
