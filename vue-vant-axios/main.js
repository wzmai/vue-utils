// rem 自动化适配
import "amfe-flexible/index.js"

import Vant from 'vant';
import {Lazyload} from 'vant';
import 'vant/lib/index.css';

// 跨域
import axios from "axios";
import promiseHelper from "./mixins/promiseHelper";

// 兼容 IE
import "core-js/stable";
import "regenerator-runtime/runtime";

// 禁止浏览器滑动事件;
document.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault()
    },
    {
      passive: false
    }
);

// 阻止浏览器菜单的出现
document.oncontextmenu = function (e) {
  e.preventDefault();
};

Vue.use(Lazyload);
Vue.use(Vant);
Vue.mixin(promiseHelper);
Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
