import { createApp } from 'vue';
import App from './App.vue';
import { nutUiComponents } from './plugins/nutUI';
import { i18n } from '/@/i18n';
import router from './router';
import { setupStore } from '/@/store';
import './assets/font/iconfont.css';
import './assets/style/base.scss';
import VueLuckyCanvas from '@lucky-canvas/vue';
const app = createApp(App);
app.use(router);

setupStore(app);
app.use(i18n);
app.use(VueLuckyCanvas);
app.mount('#app');

// nutUi按需加载
nutUiComponents.forEach((item) => {
  app.use(item);
});
