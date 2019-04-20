<style scoped>
div > div {
	width: 100%;
	height: 100%;
}
</style>

<template>
	<div :style="{width: size + 'px', height: size + 'px'}">
		<div v-if=empty :style="{backgroundColor: mergedOptions.color.light}" />
		<img v-else :width=size :height=size :src=url />
	</div>
</template>

<script>
import QRCode from 'qrcode';


export default {
	props: {
		size: {
			type: Number,
			default: 200,
		},
		data: [String, Number],
		fallback: {
			type: String,
			default: undefined,
		},
		options: {
			type: Object,
			default() {
				return {};
			},
		},
		foreground: String,
		background: String,
	},

	computed: {
		mergedOptions() {
			const op = Object.assign({}, this.options);
			op.color = op.color || {};
			op.color.light = this.background || op.color.light;
			op.color.dark = this.foreground || op.color.dark;
			return op;
		},
		empty() {
			return !this.data && !this.fallback;
		},
	},

	asyncComputed: {
		async url() {
			if (!this.data) return this.fallback;

			return await QRCode.toDataURL(this.data, this.mergedOptions);
		},
	},
};
</script>
