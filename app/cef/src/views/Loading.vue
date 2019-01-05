<template>
	<b v-if="show" class="full theme_green" >
		<b class="loading" style="-webkit-mask-image: url('img/icons/spinner2.svg');"></b>
	</b>
</template>

<script>

export default {
	computed: {
		show() {
			return this.$store.state.Loading.show;
		},
	},
}

</script>

<style scoped>
.loading {
	position: absolute;
	top: calc(50% - 5vw);
	left: calc(50% - 5vw);
	width: 10vw;
    height: 10vw;
    -webkit-mask-size: cover;
	background-color: white;
	animation: rotate  1s infinite linear;
}

@keyframes rotate {
	from { transform: rotate(0deg); }
	50% { transform: rotate(180deg); }
	to { transform: rotate(360deg); }
}
</style>