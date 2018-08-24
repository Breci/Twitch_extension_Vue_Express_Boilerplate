// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRessource from 'vue-resource'
import App from './components/App.vue'

Vue.config.productionTip = false;
Vue.use(VueRessource);

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  render: h => h(App)
});

if (window.Twitch.ext) {
    window.Twitch.ext.onAuthorized((auth) => {
        var app = vue.$children[0];
        Vue.http.headers.common['Authorization'] = `Bearer ${auth.token}`
        app.init(auth);
    });


    window.Twitch.ext.onContext(function (context, contextFields) {
        console.log(context);
        console.log(contextFields)
    });

    window.Twitch.ext.onError(function (err) {
        console.error(err)
    });
}
