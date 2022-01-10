module.exports = {
	locales: {
		// 设置语言
		'/': {
			lang: 'zh-CN',
		},
	},
	title: 'Hello VuePress',
	description: 'Just playing around',
	base: '/tree-blod/',
	// 设置导航栏链接
	themeConfig: {
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Guide', link: '/guide/' },
			{ text: 'External', link: 'https://google.com' },
		],
	},
}
// 每次更改该文件都需要重新 yarn run docs:dev
