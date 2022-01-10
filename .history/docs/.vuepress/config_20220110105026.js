module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  // 设置导航栏链接
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: 'guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}