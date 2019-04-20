<style>
.swiper-pagination-bullet-active {
	background-color: #592266;
}
</style>

<template>
	<swiper :options=swiperOptions style="width: 100%;">
		<swiper-slide v-for="x in data" style="width: 320px">
			<qr-code :size=320 :data=x :options=options />
		</swiper-slide>

		<div class=swiper-pagination slot=pagination />
	</swiper>
</template>

<script>
import QrCode from '~/components/QRCode';


export default {
	props: ['data', 'options'],

	components: {QrCode},

	data() {
		return {
			swiperOptions: {
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
