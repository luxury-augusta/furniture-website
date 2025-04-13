/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://augustaluxury.in',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin9876/*', '/api/*']
      }
    ],
    additionalSitemaps: [
      'https://augustaluxury.in/sitemap.xml'
    ]
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/admin9876/*', '/api/*'],
  generateIndexSitemap: true
} 