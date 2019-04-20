<style scoped>
div > div {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}
i {
	display: block;
	font-size: 36px;
}
</style>

<template>
	<div :style="{width: size + 'px', height: size + 'px'}">
		<img :width=size :height=size :src=url v-if=url />
		<div v-else-if=empty :style="{backgroundColor: mergedOptions.color.light}" />
		<div v-else :style="{backgroundColor: mergedOptions.color.light}">
			<i class="el-icon-loading" :style="{color: mergedOptions.color.dark}" />
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import QRCode from 'qrcode';


async function tick() {
	await new Promise((resolve, reject) => Vue.nextTick(resolve));
}


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
	},

	data() {
		return {
			url: this.fallback,
			empty: false,
		};
	},

	methods: {
        async updateURL() {
            if (!this.data) {
				this.url = this.fallback;
				if (!this.fallback) this.empty = true;
				return;
			}

			this.url = null;
			this.empty = false;
			await tick();

            this.url = await QRCode.toDataURL(this.data, this.mergedOptions);
        },
    },
	watch: {
		async data() {
			await this.updateURL();
		},
	},
	mounted() {
		tick().then(() => this.updateURL());
	},
};
</script>
