import { VueShowdownPlugin, showdown } from "vue-showdown";
import showdownHighlight from "showdown-highlight";

showdown.extension("highlight", showdownHighlight());

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueShowdownPlugin);
});
