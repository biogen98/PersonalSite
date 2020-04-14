const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')({
  preset: 'default'
})
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nesting'),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss, autoprefixer, cssnano]
      : []
  ]
}
