<style scoped>
.colors {
    display: flex;
}
</style>

<template>
    <main>
        <qr-code :size=320 :data=t v-for="t in text.split('\n')" :foreground=foreground :background=background />

        <p><textarea v-model=text /></p>

        <div class=colors>
            <color-picker v-model=background />
            <color-picker v-model=foreground />
        </div>
    </main>
</template>

<script>
import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';

Vue.use(AsyncComputed);

import ColorPicker from '~/components/ColorPicker';
import QRCode from '~/components/QRCode';


export default {
    components: {
        'color-picker': ColorPicker,
        'qr-code': QRCode,
    },
    data() {
        return {
            text: 'this is text',
            background: '#ffffff00',
            foreground: '#000000ff',
        };
    },
};
</script>
