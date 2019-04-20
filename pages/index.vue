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
@media (min-width:1000px) {
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

				<el-tooltip content="open repository">
					<a href="https://github.com/macrat/batch-qr"><img src="~assets/github.svg" width=32px height=32px></a>
				</el-tooltip>
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

				<el-tooltip content="convert mode">
					<el-switch v-model=lineAsQR active-text="line as QR" inactive-text="single QR" />
				</el-tooltip>

				<el-dropdown split-button type=primary @click=downloadAll @command=handleDownloadCommand v-if=lineAsQR>
					Download
					<el-dropdown-menu slot=dropdown>
						<el-dropdown-item command=it>Download It</el-dropdown-item>
						<el-dropdown-item command=all>Download All</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-button type=primary v-else @click=downloadSingle>Download</el-button>
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

	validate({query}) {
		return (
			(!query.mode || /^(line-as-qr|single-qr)$/.test(query.mode))
			&& (!query.background || /^#[0-9a-fA-F]{8}$/.test(query.background))
			&& (!query.foreground || /^#[0-9a-fA-F]{8}$/.test(query.foreground))
			&& (!query.margin || /^[0-9]+$/.test(query.margin))
			&& (!query.errorlevel || /^(Low|Medium|Quartile|High)$/.test(query.errorlevel))
		);
	},

	data() {
		return {
			text: this.$route.query.text || 'hello world!\nthis is text',
			options: {
				color: {
					light: this.$route.query.background || '#BC67D0FF',
					dark: this.$route.query.foreground || '#F4F6F9FF',
				},
				margin: this.$route.query.margin ? parseInt(this.$route.query.margin) : 1,
				errorCorrectionLevel: this.$route.query.errorlevel || 'Medium',
			},
			lineAsQR: this.$route.query !== 'single-qr',
		};
	},

	computed: {
		data() {
			if (this.lineAsQR) {
				return this.text.split('\n');
			} else {
				return [this.text];
			}
		},
	},

	methods: {
		async downloadIt() {
			const current = this.$refs.thumbnails.current;
			this.$refs.downloader.downloadIt(this.data[current], current, this.options);
		},
		async downloadSingle() {
			this.$refs.downloader.downloadIt(this.text, 'batch-qr', this.options);
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
		updateURL() {
			const query = new URLSearchParams();
			query.append('background', this.options.color.light);
			query.append('foreground', this.options.color.dark);
			query.append('margin', this.options.margin);
			query.append('errorlevel', this.options.errorCorrectionLevel);
			query.append('mode', this.lineAsQR ? 'line-as-qr' : 'single-qr');
			query.append('text', this.text);

			if (query.toString() !== new URLSearchParams(location.search).toString()) {
				if (history.state !== 'batch-qr') {
					history.pushState('batch-qr', null, '/?' + query);
				} else {
					history.replaceState('batch-qr', null, '/?' + query);
				}
			}
		},
	},

	watch: {
		text() {
			this.updateURL();
		},
		options: {
			handler() {
				this.updateURL();
			},
			deep: true,
		},
		lineAsQR() {
			this.updateURL();
		},
	},

	mounted() {
		window.addEventListener('popstate', () => {
			this.text = this.$route.query.text || 'hello world!\nthis is text';
			this.options = {
				color: {
					light: this.$route.query.background || '#BC67D0FF',
					dark: this.$route.query.foreground || '#F4F6F9FF',
				},
				margin: this.$route.query.margin ? parseInt(this.$route.query.margin) : 1,
				errorCorrectionLevel: this.$route.query.errorlevel || 'Medium',
			};
			this.lineAsQR = this.$route.query !== 'single-qr';
		});
	},
};
</script>
