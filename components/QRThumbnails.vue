<style>
.swiper-pagination-bullet-active {
	background-color: #592266;
}
</style>

<template>
	<div
		ref=swiper
		v-swiper:thumbnails=swiperOptions
		@slideChange="$emit('update:current', $refs.swiper.swiper.activeIndex)"
		style="width: 100%">
		<div class=swiper-wrapper>
			<div class=swiper-slide v-for="x in data" :key=x style="width: 320px">
				<qr-code :size=320 :data=x :options=options />
			</div>
		</div>

		<div class="swiper-pagination swiper-pagination-bullets" v-show="data.length > 1" />
	</div>
</template>

<script>
import QrCode from '~/components/QRCode';


export default {
	props: ['data', 'options', 'current'],

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

	watch: {
		current(val) {
			this.$refs.swiper.swiper.slideTo(val);
		},
		data() {
			const current = this.$refs.swiper.swiper.activeIndex;
			if (this.current !== current) {
				this.$emit('update:current', current);
			}
		},
	},
};
</script>
