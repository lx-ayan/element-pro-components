import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import 'element-plus'
import ProComponents from 'pro-components-element-plus';

createApp(App).use(ElementPlus).use(ProComponents).mount('#app')
