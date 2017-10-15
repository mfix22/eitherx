const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/eitherx.cjs.js',
    format: 'cjs'
  },
  name: 'Eitherx',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['env', { 'modules': false }],
        'react'
      ],
      babelrc: false
    }),
    uglify()
  ]
}
