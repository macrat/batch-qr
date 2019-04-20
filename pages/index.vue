<style>
html, body {
	margin: 0;
	background-color: #D6D6D6;
}
</style>

<style scoped>
header {
	background-color: #E9E9E9;
	display: flex;
	justify-content: center;
}
header > div {
	width: 1200px;
	max-width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
header a {
	color: #606060;
	text-decoration: none;
}
header h1 {
	display: inline-block;
	font-size: 20px;
}

main {
	display: flex;
	flex-direction: column;
	align-items: center;
}
main > * {
	width: 1200px;
	max-width: 100%;
}

.controls {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	margin: auto;
}
.controls > * {
	margin: 12px;
}
@media (min-width:800px) {
	.controls > :last-child {
		position: absolute;
		top: 0;
		right: 0;
	}
}
</style>

<template>
	<el-container>
		<el-header>
			<div>
				<a href="https://macrat.github.io/batch-qr"><h1>BatchQR</h1></a>

				<a href="https://github.com/macrat/batch-qr"><img src="~assets/github.svg" width=32px height=32px></a>
			</div>
		</el-header>

		<el-main>
			<qr-thumbnails ref=thumbnails :data=data :options=options />

			<div class=controls>
				<color-picker label="background color" v-model=options.color.light clear-color=#FFFFFF00 />

				<color-picker label="foreground color" v-model=options.color.dark clear-color=#000000FF />

				<el-slider
					v-model=options.margin
					:min=0
					:max=12
					:format-tooltip="x => `margin: ${x}`"
					style="width: 160px" />

				<el-tooltip content="error correction level">
					<el-select v-model=options.errorCorrectionLevel style="width: 8em">
						<el-option value=High />
						<el-option value=Quartile />
						<el-option value=Medium />
						<el-option value=Low />
					</el-select>
				</el-tooltip>

				<el-dropdown split-button type=primary @click=downloadAll @command=handleDownloadCommand>
					Download
					<el-dropdown-menu slot=dropdown>
						<el-dropdown-item command=it>Download It</el-dropdown-item>
						<el-dropdown-item command=all>Download All</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>

			<el-input v-model=text type=textarea :autosize="{minRows: 10}" />
		</el-main>

		<qr-downloader ref=downloader />
	</el-container>
</template>

<script>
import ColorPicker from '~/components/ColorPicker';
import QrThumbnails from '~/components/QRThumbnails';
import QrDownloader from '~/components/QRDownloader';


export default {
	components: {ColorPicker, QrThumbnails, QrDownloader},

	data() {
		return {
			text: 'hello world!\nthis is text',
			options: {
				color: {
					light: '#BC67D0FF',
					dark: '#F4F6F9FF',
				},
				margin: 1,
				errorCorrectionLevel: 'Medium',
			},
		};
	},

	computed: {
		data() {
			return this.text.split('\n');
		},
	},

	methods: {
		async downloadIt() {
			const current = this.$refs.thumbnails.current;
			this.$refs.downloader.downloadIt(this.data[current], current, this.options);
		},
		async downloadAll() {
			this.$refs.downloader.downloadAll(this.data, this.options);
		},
		async handleDownloadCommand(command) {
			switch (command) {
			case 'it':
				return await this.downloadIt();
			case 'all':
				return await this.downloadAll();
			}
		},
	},
};
</script>
