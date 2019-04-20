<template>
	<el-tooltip :content=label>
		<el-color-picker v-model=data :show-alpha=true />
	</el-tooltip>
</template>

<script>
export default {
    props: ['value', 'label', 'clear-color'],

    computed: {
        data: {
            set(val) {
				if (val === null) {
					this.$emit('input', this.clearColor);
				} else {
					this.$emit('input', this.rgba2hex(val));
				}
            },
            get() {
                return this.hex2rgba(this.value);
            },
        },
    },

	methods: {
		hex2rgba(hex) {
			const m = hex.match(/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/)
			return `rgba(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}, ${parseInt(m[4], 16) / 255})`;
		},
		rgba2hex(rgba) {
			const m = rgba.match(/rgba\(([0-9]{1,3}), *([0-9]{1,3}), *([0-9]{1,3}), *([01](?:\.[0-9]+)?)\)/);

			let hex = '#';
			for (let i=1; i<=3; i++) {
				hex += parseInt(m[i]).toString(16).padStart(2, '0');
			}
			hex += Math.round(parseFloat(m[4]) * 255).toString(16).padStart(2, '0');

			return hex;
		},
	},
};
</script>
