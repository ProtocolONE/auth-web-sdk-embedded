import Vue from 'vue';
import App from './App.vue';
import store from './store/RootStore';

Vue.config.productionTip = false;

function mountApp(targetElement) {
  new Vue({
    store,
    render: h => h(App),
  }).$mount(targetElement);
}

if (process.env.NODE_ENV === 'production') {
  class ProtocolOneAuthWebSdk {
    constructor(targetElement) {
      mountApp(targetElement);
    }
  }
  window.ProtocolOneAuthWebSdk = ProtocolOneAuthWebSdk;
} else {
  mountApp('#app');
}
