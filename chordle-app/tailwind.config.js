module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'custom-black': 'var(--default-piano-bg-color)',
        'custom-absent': 'var(--absent-piano-bg-color)',
        'custom-present': 'var(--present-piano-bg-color)',
        'custom-correct': 'var(--correct-piano-bg-color)',
      },
      screens: {
        short: { raw: '(max-height: 650px)' },
        xshort: { raw: '(max-height: 560px)' },
        xxshort: { raw: '(max-height: 490px)' },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
