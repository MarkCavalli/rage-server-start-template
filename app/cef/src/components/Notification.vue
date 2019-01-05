<template>
	<b :class="`link-button notification transition_02 theme_${theme}`">
		<b v-if="img" :class="`notification__img notification__img_${theme}`":style="style"></b>
		<b class="notification__text-container">
			<b v-if="title" class="notification__title">{{ title }}</b>
			<b v-html="text" class="notification__text"></b>
		</b>
	</b>
</template>

<script>
export default {
	props: {
		text: { type: String, required: true, },
		theme: { type: String, default: 'white', },
		title: { type: String, default: '', },
		img: { type: String, default: 'info.svg', },
	},
	computed: {
		style() {
			return `-webkit-mask-image: url('img/icons/${this.img}');`
		}
	},
}
</script>