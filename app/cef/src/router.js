import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Auth/Login.vue';
import Register from './views/Auth/Register.vue';
import store from './store';

const d = store.state;

Vue.use(Router);

export default new Router({
	routes: [
		{ 	path: '/', component: Home },
		{ 	path: '/login', component: Login, props: { data: d.views.Login } },
		{ 	path: '/register', component: Register, props: { data: d.views.Register } },
	],
});
