import { extend } from 'lodash-es';

export default {
  scrollBarWidth: null,

  /**
   * Вычисление ширины скроллбара
   *
   * @return {number}
   */
  getScrollbarWidth() {
    if (this.scrollBarWidth) {
      return this.scrollBarWidth;
    }
    // Элемент, у котого мы будем проверять размеры скроллбара
    const scrollTester = document.createElement('div');
    extend(scrollTester.style, {
      width: '50px',
      height: '50px',
      overflowY: 'scroll',
    });
    document.body.appendChild(scrollTester);

    // Вычисляем разница между внутренней и внешней шириной элемента
    const result = scrollTester.offsetWidth - scrollTester.clientWidth;

    scrollTester.parentNode.removeChild(scrollTester);

    this.scrollBarWidth = result;
    return result;
  },

  /**
   * Проверяем присутствует ли вертикальный скроллбар на странице
   *
   * @return {boolean}
   */
  isPageScrollbarPresent() {
    const htmlNode = document.body.parentNode;
    const hasHtmlScroll = htmlNode.scrollHeight > htmlNode.clientHeight;
    const hasBodyScroll = document.body.scrollHeight > document.body.clientHeight;

    const htmlOverflowY = window.getComputedStyle(htmlNode).getPropertyValue('overflow-y');
    const bodyOverflowY = window.getComputedStyle(document.body).getPropertyValue('overflow-y');

    if (!hasHtmlScroll && !hasBodyScroll && htmlOverflowY !== 'scroll' && bodyOverflowY !== 'scroll') {
      return false;
    }

    return true;
  },

  /**
   * Показываем скроллбар страницы
   */
  showBodyScrollbar() {
    document.body.style.overflow = '';
    document.body.style.marginRight = '';
    return this;
  },

  /**
 * Прячем скроллбар страницы
 */
  hideBodyScrollbar() {
    if (!this.isPageScrollbarPresent()) {
      return;
    }

    const scrollBarWidth = this.getScrollbarWidth();

    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scrollBarWidth}px`;
  },
};
