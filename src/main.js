/**
 * App entry point
 */
import AuthWebSdk from './AuthWebSdk';

// Public API
if (typeof window !== 'undefined') {
  window.P1AuthWebSdk = AuthWebSdk;
}
export default AuthWebSdk;
