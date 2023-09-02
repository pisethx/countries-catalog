module.exports = {
  content: [
    './dist/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './*.html',
    './node_modules/flowbite/**/*.js'
  ],
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
  variants: {
    extend: {
      opacity: ['disabled']
    }
  }
}
