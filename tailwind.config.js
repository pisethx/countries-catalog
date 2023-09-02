module.exports = {
  content: ['./dist/**/*.html', './src/**/*.{js,jsx,ts,tsx}', './*.html'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['lofi']
  }
}
