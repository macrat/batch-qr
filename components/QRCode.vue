<template>
    <img :width=size :height=size :src=url />
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
	},
    asyncComputed: {
        async url() {
            if (!this.data) return this.fallback;

            return await QRCode.toDataURL(this.data, this.mergedOptions);
        },
    },
};
</script>
