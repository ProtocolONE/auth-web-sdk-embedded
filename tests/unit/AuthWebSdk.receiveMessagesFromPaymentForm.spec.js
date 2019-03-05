import { invert } from 'lodash-es';
import { receiveMessagesFromPaymentForm } from '../../src/AuthWebSdk';
import { payonePaymentFormSourceName, receivingMessagesNames } from '../../src/postMessage';

const invertedReceivingMessagesNames = invert(receivingMessagesNames);

class WindowMock {
  constructor() {
    this.listeners = {
      message() { },
    };
  }

  addEventListener(name, handler) {
    this.listeners[name] = handler;
    return this;
  }

  postMessage(data) {
    this.listeners.message({
      data,
    });
  }

  imitateReceivedMessage(name, data) {
    this.listeners.message({
      data: {
        source: payonePaymentFormSourceName,
        name: invertedReceivingMessagesNames[name],
        data,
      },
    });
  }
}

function getAuthWebSdkMock() {
  return {
    email: 'check',
    language: 'en',
    formData: {
      id: '111',
      check: true,
    },
    urls: {
      apiUrl: 'check',
      getPaymentFormUrl(id) {
        return `test${id}`;
      },
    },
    iframe: {
      src: 'none',
      width: 0,
      height: 0,
      setAttribute(attr, value) {
        this[attr] = value;
      },
    },
    async createOrder() {
      return {
        id: '222',
      };
    },
    emit() {

    },
  };
}

describe('AuthWebSdk.receiveMessagesFromPaymentForm ', () => {
  it('should handle INITED properly', () => {
    const currentWindow = new WindowMock();
    const postMessageWindow = new WindowMock();
    const AuthWebSdkMock = getAuthWebSdkMock();
    receiveMessagesFromPaymentForm.call(
      AuthWebSdkMock,
      currentWindow,
      postMessageWindow,
    );

    let result;
    postMessageWindow.addEventListener('message', (event) => {
      result = event.data.data;
    });

    currentWindow.imitateReceivedMessage('INITED');
    expect(result.options.email).toEqual('check');
    expect(result.options.language).toEqual('en');
    expect(result.options.apiUrl).toEqual('check');
  });

  it('should handle INITED properly in production', () => {
    const currentWindow = new WindowMock();
    const postMessageWindow = new WindowMock();
    const AuthWebSdkMock = getAuthWebSdkMock();
    receiveMessagesFromPaymentForm.call(
      AuthWebSdkMock,
      currentWindow,
      postMessageWindow,
    );

    let result;
    postMessageWindow.addEventListener('message', (event) => {
      result = event.data.data;
    });

    currentWindow.imitateReceivedMessage('INITED');

    /**
     * formData should not be passed into form in production
     */
    expect(result.formData.check).toEqual(undefined);
  });

  it('should handle FORM_RESIZE properly', () => {
    const currentWindow = new WindowMock();
    const postMessageWindow = new WindowMock();
    const AuthWebSdkMock = getAuthWebSdkMock();
    receiveMessagesFromPaymentForm.call(
      AuthWebSdkMock,
      currentWindow,
      postMessageWindow,
    );

    const messageData = {
      width: 222,
      height: 111,
    };
    currentWindow.imitateReceivedMessage('FORM_RESIZE', messageData);

    expect(AuthWebSdkMock.iframe.width).toEqual(messageData.width);
    expect(AuthWebSdkMock.iframe.height).toEqual(messageData.height);
  });
});
