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
		sidebar: [
			{
				title: 'node', // 必要的
				path: '/node/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
				collapsable: false, // 可选的, 默认值是 true,
				sidebarDepth: 1, // 可选的, 默认值是 1
				children: [
					{
						title: 'guide', // 必要的
						path: '/guide/',
					},
				],
			},
			{
				title: 'vue', // 必要的
				path: '/vue/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
				collapsable: false, // 可选的, 默认值是 true,
				sidebarDepth: 1, // 可选的, 默认值是 1
				children: [
					{
						title: 'VUE3工具函数', // 必要的
						path: '/util-function/',
					},
				],
			},
		],
	},
}
// 每次更改该文件都需要重新 yarn run docs:dev
