const baseURL = process.env.DEPLOY_ENV !== 'GH_PAGES' ? '' : 'https://macrat.github.io';
const router = process.env.DEPLOY_ENV !== 'GH_PAGES' ? {} : {
	base: '/batch-qr/',
};

export default {
	env: {baseURL: baseURL},
	head: {
		title: 'BatchQR',
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
		],
		link: [
			{rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto'},
			{rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css', integrity: 'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf', crossorigin: 'anonymous'},
		],
	},
	plugins: [
		{src: '~plugins/vue-async-computed'},
		{src: '~plugins/vue-awesome-swiper', ssr: false},
		{src: '~plugins/element-ui'},
		{src: '~plugins/codemirror', ssr: false},
	],
	router: router,
};
