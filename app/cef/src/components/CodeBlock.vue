<template>
	<b class="code-block">
		<input type="text" class="input input_transparent-with-bottom-border input_code" @input="verify()" v-model.number="input" placeholder="Code">
		<a class="link-button theme_white transition_02 hover" @click="getCode()">Get code</a>
	</b>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
	data: function () {
		return {
			input: '',
			verifyTries: 0,
			lastGetCodeTime: 0,
		}
	},
	props: {
		code: { type: Number, },
	},
	methods: {
		verify() {
			if (this.input.toString().length !== 3) return;
			this.verifyTries++;
			if (!this.code || this.code !== this.input) {
				this.addNotification({
					text: `You entered wrong code`, 
					theme: `red`, 
					title: `Wrong code`,
					img: `error.svg`,
				});
				this.$emit('wrong-verify-try', this.verifyTries);
			}
			else {
				this.$emit('success-verify');
			}
		},

		getCode() {
			/* if (!this.lastGetCodeTime) return this.sendCode();
			const secondsFromLastGetCodeTime = ((new Date().getTime() - this.lastGetCodeTime) / 1000).toFixed();
			if (secondsFromLastGetCodeTime < 60) {
				this.addNotification({
					text: `You can request new code after ${60 - secondsFromLastGetCodeTime} seconds`, 
					theme: `red`, 
					title: `Not enough time`,
					img: `error.svg`,
				});
				return;
			} */
			this.sendCode();
		},

		sendCode() {
			this.lastGetCodeTime = new Date().getTime();
			this.$emit('send-code');
		},

		...mapActions([
			'addNotification',
		]),
	},
}
</script>

<style scoped>
.code-block {
	display: flex;
    align-items: flex-end;
    margin: 2vh 0;
}

.input_code {
	margin: 0;
}
</style>