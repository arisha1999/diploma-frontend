import Vue from 'vue'
import App from './app/App.vue'
import vuetify from './plugins/vuetify'
import store from './app/app-state'
import router from './app/app-routes'
import AudioRecorder from 'vue-audio-recorder'

Vue.use(AudioRecorder)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
