import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import App from './App.vue';
import { router } from './router/index.js';
import store from './store/index.js';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js';
// import './assets/element-variables.scss'
if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        dsn: 'https://36ec54fa54ad4d549edcd1a8886d5482@sentry.micloud.d.xiaomi.net/194',
        integrations: [new Integrations.Vue({ Vue, attachProps: true })]
    });
}

// console.log(a.ggg);

Vue.config.productionTip = false;
Vue.directive('pressenter', {
    bind: function (el, binding) {
        // 聚焦元素
        document.onkeydown = function (e) {
            console.log('eee', binding);
            if (e.keyCode === 13) {
                binding.value(1);
            }
        };
    },
    unbind: function (el, binding) {
        document.onkeydown = null;
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
