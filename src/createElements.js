/**
 * Comes from "authone-js-payment-form" package devServer options
 */

/**
* Creates iframe container for payment form
*
* @param {String} iframeSrc
* @param {String} width
* @param {String} height
* @return {Object}
*/
export function createIframe(iframeSrc, width = '320', height = '320') {
  const iframe = document.createElement('iframe');

  iframe.setAttribute('allowpaymentrequest', 'true');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('src', iframeSrc);
  iframe.style.overflow = 'hidden';
  iframe.style.display = 'block';

  iframe.style.backgroundPosition = 'center';
  iframe.style.backgroundRepeat = 'no-repeat';
  // preloader basically
  iframe.style.backgroundImage = 'url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNLjYgNTcuNTRjNS43My02LjIzIDE3LjMzLTE1LjUgMzMuNjYtMTIuMzVDNTUuNCA0OC41IDY0IDYzLjk1IDY0IDYzLjk1UzQyLjQyIDY1IDMwLjI4IDgzLjYzYTM4LjYzIDM4LjYzIDAgMCAwLTMuNCAzMi4xNSA2NC40NyA2NC40NyAwIDAgMS01LjUyLTQuNDRBNjMuNjQgNjMuNjQgMCAwIDEgLjYgNTcuNTR6IiBmaWxsPSIjZmZjYjAyIi8+PHBhdGggZD0iTTY1LjMyIDI5LjA1YzcuNjUgMTkuOTgtMS40NCAzNS4xOC0xLjQ0IDM1LjE4UzUyLjIgNDYuMDUgMzAuMDMgNDQuODVBMzguNiAzOC42IDAgMCAwIC41NiA1Ny45MyA2My44IDYzLjggMCAwIDEgMzcuNTYgNmM4LjIgMS44IDIyLjI2IDcuMTYgMjcuNzYgMjMuMDV6IiBmaWxsPSIjZmY5ZTAyIi8+PHBhdGggZD0iTTk0LjkyIDQ3LjdjLTEzLjQ4IDE2LjYzLTMxLjIgMTYuMzYtMzEuMiAxNi4zNnM5LjkyLTE5LjItLjEzLTM5YTM4LjYgMzguNiAwIDAgMC0yNi4xOC0xOSA2My43OCA2My43OCAwIDAgMSA2My41MiA2LjAzYzIuNTYgOCA0Ljk4IDIyLjg1LTYuMDUgMzUuNnoiIGZpbGw9IiNmZjRiNDIiLz48cGF0aCBkPSJNOTMuNTIgODIuNTNDNzIuMzggNzkuMTcgNjMuNzUgNjMuNyA2My43NSA2My43czIxLjYtMS4wMiAzMy43LTE5LjYzYTM4LjYgMzguNiAwIDAgMCAzLjQzLTMyLjA0IDY0LjMzIDY0LjMzIDAgMCAxIDUuNzQgNC42IDYzLjYzIDYzLjYzIDAgMCAxIDIwLjgyIDUzLjI2Yy01LjYyIDYuMi0xNy4zNCAxNS44LTMzLjk0IDEyLjZ6IiBmaWxsPSIjYzA2M2Q2Ii8+PHBhdGggZD0iTTYyLjUgOTljLTcuNjUtMTkuOTggMS40NC0zNS4xNyAxLjQ0LTM1LjE3Uzc1LjU2IDgxLjYgOTcuNzQgODIuOGEzOS4xIDM5LjEgMCAwIDAgMjkuNzMtMTMuMDMgNjMuOCA2My44IDAgMCAxLTM3LjE2IDUyLjNjLTguMi0xLjgtMjIuMjUtNy4xNS0yNy44LTIzLjA2eiIgZmlsbD0iIzE3YTRmNiIvPjxwYXRoIGQ9Ik0yNi42NCAxMTUuNjNDMjQgMTA3LjYgMjEuNiA5My4wNiAzMi41IDgwLjVjMTMuNDgtMTYuNjIgMzEuNTgtMTYuNTUgMzEuNTgtMTYuNTVzLTkuNiAxOS4wNi40NCAzOC44NmEzOC44MiAzOC44MiAwIDAgMCAyNi4wNSAxOS4xNyA2My43OCA2My43OCAwIDAgMS02My45My02LjN6IiBmaWxsPSIjNGZjYTI0Ii8+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGZyb209IjAgNjQgNjQiIHRvPSIzNjAgNjQgNjQiIGR1cj0iMjcwMG1zIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvZz48L3N2Zz4=\')';

  // These sizes are initial
  // Right after App is mounted actual form size is transferred to iframe
  iframe.setAttribute('width', width);
  iframe.setAttribute('height', height);

  return iframe;
}

export function createModalLayer() {
  const modalLayer = document.createElement('div');
  modalLayer.className = 'p1authone-js-sdk-modal-layer';

  const modalLayerInner = document.createElement('div');
  modalLayerInner.className = 'p1authone-js-sdk-modal-layer__inner';
  modalLayer.appendChild(modalLayerInner);

  const closeButton = document.createElement('span');
  closeButton.className = 'p1authone-js-sdk-modal-layer__close';
  closeButton.innerHTML = `
    <svg viewBox="0 0 8 8" width="16" height="16" fill="#999" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M6.82118 0.202253C7.09085 -0.0674173 7.52808 -0.0674171 7.79775 0.202253C8.06742 0.471924 8.06742 0.909146 7.79775 1.17882L1.17882 7.79775C0.909146 8.06742 0.471923 8.06742 0.202253 7.79775C-0.0674175 7.52808 -0.0674177 7.09085 0.202253 6.82118L6.82118 0.202253Z"/>
        <path d="M7.79775 6.82118C8.06742 7.09085 8.06742 7.52808 7.79775 7.79775C7.52808 8.06742 7.09085 8.06742 6.82118 7.79775L0.202254 1.17882C-0.0674168 0.909146 -0.0674165 0.471923 0.202254 0.202253C0.471925 -0.0674177 0.909147 -0.0674176 1.17882 0.202253L7.79775 6.82118Z"/>
      </g>
    </svg>
  `;

  modalLayerInner.appendChild(closeButton);

  return { modalLayer, modalLayerInner, closeButton };
}

export function createModalLogoutLayer() {
  const modalLayer = document.createElement('div');
  const modalLayerInner = document.createElement('div');
  modalLayer.appendChild(modalLayerInner);

  return { modalLayer, modalLayerInner };
}
