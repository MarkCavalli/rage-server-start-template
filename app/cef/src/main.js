import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { mapGetters, mapMutations, mapActions } from 'vuex';


Vue.config.productionTip = false;

const app = new Vue({
	router,
	store,
	render: function (h) { return h(App) },
	methods: {
		...mapMutations([
			'showLoading',
		]),

		...mapActions([
			'addNotification',
		]),
	},
}).$mount('#app');
export default app;

global.app = app;
global.appData = app.$store.state;



// appData.views.Register.code = 777;