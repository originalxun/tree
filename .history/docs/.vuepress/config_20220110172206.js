module.exports = {
	locales: {
		// 设置语言
		'/': {
			lang: 'zh-CN',
		},
	},
	title: '树之木',
	description: 'never give up',
	// 设置导航栏链接
	themeConfig: {
		nav: [
			{
				text: '前端',
				items: [
					{ text: 'VUE', link: '/' },
					{ text: 'Vite', link: '/' },
					{ text: 'npm', link: '/' },
                    { text: 'npm', link: '/' },
                    { text: 'npm', link: '/' },
				],
			},
			{ text: '后端', link: '/guide/' },
			{ text: 'External', link: 'https://google.com' },
		],
	},
	base: '/tree-blod/',
}
// 每次更改该文件都需要重新 yarn run docs:dev
