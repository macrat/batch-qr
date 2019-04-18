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

    asyncComputed: {
        async url() {
            if (!this.data) return this.fallback;

            return await QRCode.toDataURL(this.data, Object.assign(
                this.options,
                {
                    color: {
                        light: this.background,
                        dark: this.foreground,
                    },
                },
            ));
        },
    },
};
</script>
