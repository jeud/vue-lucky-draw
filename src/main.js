import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import routes from './config/routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes
})

new Vue({
    router,
    el: '#vueApp',
    render(createApp) {
        return createApp(App)
    }
})
