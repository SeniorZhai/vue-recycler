import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VTooltip from "v-tooltip";
import Stats from "stats.js";

function numDomNodes(node: any): any {
  if (!node.children || node.children.length == 0) return 0;
  var childrenCount = Array.from(node.children).map(numDomNodes);
  return (
    node.children.length +
    childrenCount.reduce(function(p, c) {
      return p + c;
    }, 0)
  );
}

const stats = new Stats();
const domPanel = new Stats.Panel("DOM nodes", "#0ff", "#002");
stats.addPanel(domPanel);
stats.showPanel(3);
document.body.appendChild(stats.dom);

const domNodeFunc = () => {
  window.requestIdleCallback(() => {
    domPanel.update(numDomNodes(document.body), 1500);
  });

  setTimeout(domNodeFunc, 100);
};

window.setTimeout(domNodeFunc, 100);

Vue.use(VTooltip);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
