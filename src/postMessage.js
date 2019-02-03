import assert from 'assert';
import { invert } from 'lodash-es';

export const payonePaymentFormSourceName = 'P1_AUTH_FORM';

export const sendingMessagesNames = {
  REQUEST_INIT_FORM: 'requestInitForm',
};

/**
 * If a status is not in list the SDK won't react on it (no handling, no event emmitting)
 */
export const receivingMessagesNames = invert({
  INITED: 'inited',
  LOADED: 'loaded',
  FORM_RESIZE: 'formResize',
  TOKEN_RECEIVED: 'tokenReceived',
});

export function postMessage(targetWindow, nameID, data = {}) {
  const name = sendingMessagesNames[nameID];
  assert(name, `Undefiend postMessage nameID: ${nameID}`);
  targetWindow.postMessage({
    source: 'P1_AUTH_WEB_SDK',
    name,
    data,
  }, '*');
}

export function receiveMessages(from, objectWithCallbacks, callbackEvery) {
  from.addEventListener('message', (event) => {
    if (event.data && event.data.source !== payonePaymentFormSourceName) {
      return;
    }
    const { name } = event.data;
    const messageAlias = receivingMessagesNames[name];
    if (!messageAlias) {
      return;
    }
    callbackEvery(name, event.data.data);
    const callback = objectWithCallbacks[messageAlias];
    if (!callback) {
      return;
    }
    callback(event.data.data);
  });
}
