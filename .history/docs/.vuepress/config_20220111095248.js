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
	// 设置导航栏链接
	themeConfig: {
		nav: [
			{
				text: '前端',
				items: [
					{ text: 'vue.js', link: '/vue' },
					{ text: 'node.js', link: '/node' },
					{ text: 'vite', link: '/vite' },
					{ text: 'npm', link: '/npm' },
					{ text: 'React', link: '/react' },
				],
			},
			{ text: 'javascript', link: '/js/' },
			{
				text: '后端',
				items: [
					{ text: 'java', link: '/java' },
					{ text: 'spring', link: '/spring' },
				],
			},
			{ text: '数据库', link: '/dbase' },
			{ text: '数据结构和算法', link: '/algorithm' },
		],
		logo: '/public/logo.png',
	},
}
// 每次更改该文件都需要重新 yarn run docs:dev
