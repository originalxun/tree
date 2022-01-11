module.exports = {
	locales: {
		// 设置语言
		'/': {
			lang: 'zh-CN',
		},
	},
	title: '树之木',
	description: 'never give up',
	base: '/tree-blod/',
	themeConfig: {
		// 导航栏配置
		nav: [
			{
				text: '前端',
				items: [
					{ text: 'vue.js', link: '/vue/' },
					{ text: 'node.js', link: '/node/' },
					{ text: 'vite', link: '/vite/' },
					{ text: 'npm', link: '/npm/' },
					{ text: 'React', link: '/react/' },
				],
			},
			{ text: 'javascript', link: '/js/' },
			{
				text: '后端',
				items: [
					{ text: 'java', link: '/java/' },
					{ text: 'spring', link: '/spring/' },
				],
			},
			{ text: '数据库', link: '/dbase/' },
			{ text: '数据结构和算法', link: '/algorithm/' },
		],
		sidebar: {
			'/npm/': [
				'' /* /foo/ */,
				'validate-package-name' /* /foo/one.html */,
			],
			'/vue/': [
				'' /* /bar/ */,
				'util-function' /* /bar/three.html */,
			],
			'/': [
				'' /* / */,
				'contact' /* /contact.html */,
				'about' /* /about.html */,
			]
		}
	}
}
// 每次更改该文件都需要重新 yarn run docs:dev
