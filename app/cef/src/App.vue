<template>
	<b id="app">
		<transition name="fade">
			<router-view/>
		</transition>
		<transition name="fade">
			<Loading/>
		</transition>
		<Notifications/>
	</b>
</template>

<script>
import styles from './bem-blocks/css/index';
import Notifications from '@/views/Notifications.vue';
import Loading from '@/views/Loading.vue';


export default {
	name: 'App',
	components: {
		Notifications,
		Loading
	}
}
</script>

<style>
/*
html {
	background-image: url('https://i.ytimg.com/vi/B2lHyV0URAk/maxresdefault.jpg');
	background-size: cover;
}*/

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}


</style>
