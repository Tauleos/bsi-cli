import Vue from "vue";
import draggableTree from "../dist/index";
import App from "./app.vue";

Vue.use(draggableTree);
new Vue({
  el: "#app",
  render: h => h(App)
});
