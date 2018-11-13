/**
 * App entry point
 * Сборка начинается отсюа
 */

import Vue from 'vue';
import './plugins/vue-material';
import './plugins/vuelidate';
import App from './App.vue';
import store from './store/RootStore';
import i18n from './i18n';

Vue.config.productionTip = false;

function mountApp(targetElement) {
  new Vue({
    store,
    i18n,
    render: h => h(App),
  }).$mount(targetElement);
}

if (process.env.NODE_ENV === 'production') {
  class ProtocolOneAuthWebSdk {
    constructor(targetElement) {
      mountApp(targetElement);
    }
  }
  // Имя конструктора, который будет доступен в браузере после подключения sdk
  // ( new ProtocolOneAuthWebSdk('#app') );
  window.ProtocolOneAuthWebSdk = ProtocolOneAuthWebSdk;
} else {
  mountApp('#app');
}
