<template>
	<b class="notifications" >
		<transition-group name="notification" tag="b">
			<Notification v-for="n of notifications" :key="n.id" :text="n.text" :theme="n.theme" :title="n.title" :img="n.img"  @click.native="removeNotification(n.id)"/>
		</transition-group>
	</b>
</template>

<script>
import Notification from '@/components/Notification.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
	data () {
		return {}
	},
	methods: {
		...mapMutations([
			'removeNotification',
		]),
	},
	components: {
		Notification,
	},
	computed: {
		...mapGetters({
			notifications: 'notificationsList',
		}),
	}
}

</script>

<style scoped>
.notifications {
	position: fixed; 
	width: 25%; 
	height: auto; 
	right: 1vw; 
	bottom: 1vw;
	transition: all 0.3s; 
}


.notification-enter-active, .notification-leave-active  { 
    transition: all 0.3s; 
}
.notification-enter, .notification-leave-to { 
    opacity: 0; 
    transform: translateX(25vw); 
}
</style>