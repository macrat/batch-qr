<style>
body {
	margin: 0;
	background-color: lightgray;
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
		<qr-thumbnails :data="text.split('\n')" :options=options />

		<div class=options>
			<div>
				<span>background</span>
				<color-picker v-model=options.color.light />
			</div>
			<div>
				<span>foreground</span>
				<color-picker v-model=options.color.dark />
			</div>
			<div>
				<label>
					<span>margin</span>
					<input v-model=options.margin type=range min=0 max=12>
				</label>

				<label>
					<span>error correction level</span>
					<select v-model=options.errorCorrectionLevel>
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
import QrThumbnails from '~/components/QRThumbnails';


export default {
	components: {ColorPicker, QrThumbnails},

	data() {
		return {
			text: 'hello world!\nthis is text',
			options: {
				color: {
					light: '#ffffff00',
					dark: '#000000ff',
				},
				margin: 1,
				errorCorrectionLevel: 'M',
			},
		};
	},
};
</script>
