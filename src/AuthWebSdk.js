import assert from 'simple-assert';
import Events from 'events';
import getFunctionalUrls from './getFunctionalUrls';
import { createIframe, createModalLayer } from './createElements';
import modalTools from './modalTools';
import { postMessage, receiveMessages } from './postMessage';
import './assets/styles.scss';

/**
 * Returns DOM element by selector or actual DOM element
 *
 * @param {String|DomElement} element
 * @return {DomElement}
 */
function getDomElement(element) {
  if (!element) {
    return undefined;
  }

  return typeof element === 'string'
    ? document.querySelector(element)
    : element;
}

/**
 * Converts region value to uppercase, throw errors on incorrect values
 *
 * @param {String} value example: "en"
 * @param {Object} navigator browser global object
 * @return {String}
 */
export function getLanguage(value) {
  if (!value) {
    return undefined;
  }
  assert(typeof value === 'string', 'Language value must be a string');
  assert(value.length === 2, 'Language value must be in 2-characters format');
  return value.toLowerCase();
}

function getFormViewOptions(windowWidth) {
  const map = [
    { max: 1690, name: 'xl' },
    { max: 1280, name: 'l' },
    { max: 980, name: 'm' },
    { max: 736, name: 's' },
    { max: 480, name: 'xs' },
  ];

  const viewSize = [];

  map.forEach(({ max, name }) => {
    if (windowWidth > max) {
      return;
    }
    viewSize.push(name);
  });

  return {
    windowWidth,
    viewSize,
  };
}

export function receiveMessagesFromPaymentForm(currentWindow, postMessageWindow) {
  receiveMessages(currentWindow, {
    /**
     * The form insize iframe is awaiting the command below with listed options to init
     * Real form rendering start here
     */
    INITED: () => {
      clearTimeout(this.iframeLoadingErrorTimeout);
      const { viewSize } = getFormViewOptions(window.innerWidth);

      /**
       * In development the form receives form data from sdk
       * but in production the page receives it by itself
       */
      postMessage(postMessageWindow, 'REQUEST_INIT_FORM', {
        formData: {},
        options: {
          ...this.formOptions,
          email: this.email,
          language: this.language,
          apiUrl: this.urls.apiUrl,
          viewSize,
        },
      });
    },

    FORM_RESIZE: ({ width, height }) => {
      this.iframe.setAttribute('width', width);
      this.iframe.setAttribute('height', height);
    },

    REDIRECT_REQUESTED: (url) => {
      window.location.href = url;
    },
  }, (name, data) => {
    this.emit(name, data);
  });
}

export default class P1PayOne extends Events.EventEmitter {
  constructor({
                clientID, redirectUri, language, apiUrl, state, scopes,
              } = {}) {
    super();
    assert(clientID, 'clientID is required for "new P1AuthWebSdk(...)"');
    assert(redirectUri, 'redirectUri is required for "new P1AuthWebSdk(...)"');
    assert(state, 'state is required for "new P1AuthWebSdk(...)"');
    this.clientID = clientID;
    this.redirectUri = redirectUri;
    this.state = state;
    this.scopes = scopes;
    this.language = getLanguage(language);

    this.iframe = null;

    this.urls = getFunctionalUrls(apiUrl);
    this.iframeLoadingErrorTimeout = null;

    this.formData = {
      clientID,
      redirectUri,
      state,
      scopes,
    };
    this.formOptions = {
      isModal: false,
    };
  }

  /**
   * Renders the payment form into target element
   *
   * @param {String|DomElement} selectorOrElement
   * @return {P1PayOne}
   */
  async render(selectorOrElement) {
    const appendContainer = getDomElement(selectorOrElement);
    assert(appendContainer, 'Mount element or selector is required for embedded form render');

    this.formOptions = {
      ...this.formOptions,
      isModal: false,
    };

    this.iframe = createIframe(
      this.urls.getAuthFormUrl({
        clientID: this.clientID,
        redirectUri: this.redirectUri,
        state: this.state,
        scopes: this.scopes,
      }),
    );
    appendContainer.appendChild(this.iframe);
    this.initIframeMessagesHandling();

    return { iframe: this.iframe };
  }

  /**
   * Renders the payment form in modal dialog layer
   *
   * @return {P1PayOne}
   */
  async renderModal() {
    this.formOptions = {
      ...this.formOptions,
      isModal: true,
    };

    const { modalLayer, modalLayerInner, closeButton } = createModalLayer();

    closeButton.addEventListener('click', () => {
      modalLayer.parentNode.removeChild(modalLayer);
      modalTools.showBodyScrollbar();
      this.emit('modalClosed');
    });
    document.body.appendChild(modalLayer);

    this.iframe = createIframe(
      this.urls.getAuthFormUrl({
        clientID: this.clientID,
        redirectUri: this.redirectUri,
        state: this.state,
        scopes: this.scopes,
      }),
    );
    modalLayerInner.appendChild(this.iframe);
    this.initIframeMessagesHandling();

    modalTools.hideBodyScrollbar();
    this.emit('modalOpened');

    return { iframe: this.iframe };
  }

  /**
   * Handling iframe message transport with the form
   *
   * @return {P1PayOne}
   */
  initIframeMessagesHandling() {
    const postMessageWindow = this.iframe.contentWindow;

    receiveMessagesFromPaymentForm.call(this, window, postMessageWindow);

    return this;
  }
}
