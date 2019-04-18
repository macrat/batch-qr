<style scoped>
main {
    display: flex;
	flex-direction: column;
	align-items: center;
}
.colors {
    display: flex;
	justify-content: center;
}

textarea {
	width: 80em;
height: 30em;
}
</style>

<template>
    <main>
		<swiper :options=options style="width: 100%;">
			<swiper-slide v-for="t in text.split('\n')" style="width: 320px">
<p>{{ t}}</p>
				<qr-code :size=320 :data=t :foreground=foreground :background=background />
			</swiper-slide>

			<div class=swiper-pagination slot=pagination />
		</swiper>

        <div class=colors>
            <color-picker v-model=background />
            <color-picker v-model=foreground />
        </div>

        <textarea v-model=text />
    </main>
</template>

<script>
import ColorPicker from '~/components/ColorPicker';
import QrCode from '~/components/QRCode';


export default {
    components: {ColorPicker, QrCode},
    data() {
        return {
            text: 'hello world!\nthis is text',
            background: '#ffffff00',
            foreground: '#000000ff',
			options: {
				effect: 'coverflow',

				  grabCursor: true,
				  centeredSlides: true,
				  slidesPerView: 'auto',
				  coverflowEffect: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows : false,
				  },
				  pagination: {
					el: '.swiper-pagination',
				  },
					mousewheel: true,
			},
        };
    },
};
</script>
