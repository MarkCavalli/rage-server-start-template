import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		playerInfo: {
			id: 0,
			guid: 0,
		},
		views: {
			Register: {
				code: false,
				nameAvailable: false,
			},
			Login: {
				showCode: false,
				code: false,
			}
		},
		notifications: {
			nextItemId: 1,
			list: [],
		},
		Loading: {
			show: false,
		},
	},
	mutations: {
		addNotification(state, { id, text, theme, title, img,  }) {
			state.notifications.list.push({ id, text, theme, title, img });
		},

		removeNotification(state, id) {
			for (const item of state.notifications.list) if (item.id === id) return state.notifications.list.splice(state.notifications.list.indexOf(item), 1);
		},

		showLoading(state, status) {
			state.Loading.show = status;
		}
	},
	actions: {
		addNotification({ commit }, { text, theme, time, title, img } ) {
			const id = this.state.notifications.nextItemId++;
			commit('addNotification', { id, text, theme, title, img });
			if (!time) time = 5;
			setTimeout(() => {
				commit('removeNotification', id);
			}, time * 1000);
		}
	},
	getters: {
		notificationsList: (state, getters) => {
		  	return state.notifications.list;
		},
	}
});
export default store;