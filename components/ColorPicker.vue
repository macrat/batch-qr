<style scoped>
.color-picker {
    box-shadow: none;
}
</style>

<template>
    <no-ssr>
        <chrome class=color-picker v-model=data />
    </no-ssr>
</template>

<script>
import {Chrome} from 'vue-color';

export default {
    props: ['value'],

    components: {Chrome},

    computed: {
        data: {
            set(val) {
                this.$emit('input', val.hex + Math.round(val.a * 255).toString(16).padStart(2, '0'));
            },
            get() {
                return {hex: this.value};
            },
        },
    },
};
</script>
