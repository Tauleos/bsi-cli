import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import './components/ElementUI';
// import './assets/element-variables.scss'

<? if (user) { ?>
  console.log('ejs');
<? } ?>

Vue.config.productionTip = false;
Vue.directive('pressenter', {
  bind: function(el, binding) {
    // 聚焦元素
    document.onkeydown = function(e) {
      console.log('eee', binding);
      if (e.keyCode === 13) {
        binding.value(1);
      }
    };
  },
  unbind: function(el, binding) {
    document.onkeydown = null;
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
