<style>
body {
	margin: 0;
	background-color: lightgray;
}

.swiper-pagination-bullet-active {
	background-color: #ef9a9a;
}
</style>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.options {
	display: flex;
	justify-content: center;
}
.options > div {
	margin: 12px;
}
.options > div > span, .options > div > label, .options > div > label > span {
	display: block;
	text-align: center;
}

textarea {
	width: 80em;
	max-width: 95%;
	height: 30em;
	border: 1px solid #ef9a9a;
	border-radius: 6px;
	padding: 6px;
}
</style>

<template>
	<main>
		<swiper :options=options style="width: 100%;">
			<swiper-slide v-for="t in text.split('\n')" style="width: 320px">
				<qr-code :size=320 :data=t :foreground=foreground :background=background :options="{margin: margin, errorCorrectionLevel:errorCorrectionLevel}" />
			</swiper-slide>

			<div class=swiper-pagination slot=pagination />
		</swiper>

		<div class=options>
			<div>
				<span>background</span>
				<color-picker v-model=background />
			</div>
			<div>
				<span>foreground</span>
				<color-picker v-model=foreground />
			</div>
			<div>
				<label>
					<span>margin</span>
					<input v-model=margin type=range min=0 max=12>
				</label>

				<label>
					<span>error correction level</span>
					<select v-model=errorCorrectionLevel>
						<option>H</option>
						<option>Q</option>
						<option>M</option>
						<option>L</option>
					</select>
				</label>
			</div>
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
			margin: 1,
			errorCorrectionLevel: 'M',
		};
	},
};
</script>
