import { createApp } from 'vue'
import { Quasar } from 'quasar'
import stores from "./stores";
import quasarUserOptions from "./quasar-user-options";

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
import router from "./router";

const myApp = createApp(App)

myApp.use(Quasar, quasarUserOptions)

myApp.use(router).use(stores)

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')