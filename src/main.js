import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Observer from './directives/observer';
import './assets/tailwind.css';

const app = createApp(App);
app.directive('observe', Observer);
// app.directive('observe', {
//   beforeMount(entry) {
//     console.log(entry);
//     console.log(123);
//   },
// });

app.use(store).use(router).mount('#app');
// createApp(App).use(store).use(router).mount('#app');
