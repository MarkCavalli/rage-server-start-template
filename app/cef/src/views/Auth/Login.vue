<template>
	<b class="full" style="background-color: rgba(0, 0, 0, 0.4);">
		<router-link to="/register" class="link-button link-button_top transition_02">Create new account</router-link>
		<b class="login-window">
			<input type="email" class="input input_transparent-with-bottom-border" placeholder="Email" v-model="email" :disabled="data.showCode" autofocus>
			<input type="password" class="input input_transparent-with-bottom-border" placeholder="Password" v-model="password" :disabled="data.showCode">
			<code-block v-if="data.showCode" :code="data.code" @wrong-verify-try="wrongCodeVerifyTry" @success-verify="successVerify" @send-code="sendCode"/>
			<a class="link-button link-button_login theme_orange transition_02 hover" @click="login" :disabled="data.showCode">Log in</a>
		</b>
	</b>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CodeBlock from '@/components/CodeBlock.vue';

export default {
	data: function () {
		return {
			email: '',
			password: '',
		}
	},
	props: {
		data: {
			showCode: { type: Boolean },
			code: { type: Number },
		},
	},
	methods: {
		login() {
			const obj = {
				email: this.email.toLowerCase(),
				password: this.password,
			}
			mp.trigger("cMisc-CallServerEvent", "sLogin-Login", JSON.stringify(obj));
		},

		sendCode() {
			mp.trigger("cMisc-CallServerEvent", "sLogin-SendCode", this.email.toLowerCase());
		},

		wrongCodeVerifyTry(tries) {
			mp.trigger("cMisc-CallServerEvent", "sLogin-WrongCodeVerifyTry", JSON.stringify({tries}));
		},

		successVerify() {
			const obj = {
				email: this.email.toLowerCase(),
				password: this.password,
			}
			mp.trigger("cMisc-CallServerEvent", "sLogin-LoginWithSuccessCode", JSON.stringify(obj));
		},

		...mapActions([
			'addNotification',
		]),
	},
	components: {
		'code-block': CodeBlock,
	}
}
</script>

<style scoped>
.login-window {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: auto; 
	width: 20vw;
	height: 100%;
}

.link-button_login {
	margin: 1em 0;
}
.link-button_top {
	padding: 1em 2em;
	width: auto;
	position: fixed;
	left: 0;
	top: 0;
	cursor: pointer;
}
.link-button_top:hover {
    background: rgba(255, 255, 255, 0.5);
}

.code-block {
	display: flex;
    align-items: flex-end;
    margin: 2vh 0;
}

.input_code {
	margin: 0;
}

</style>
