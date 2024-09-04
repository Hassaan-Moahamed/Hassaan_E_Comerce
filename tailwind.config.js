/** @type {import('tailwindcss').Config} */
export default {
  content: [
          'node_modules/flowbite-react/lib/esm/**/*.js',
          './src/**/*.{js,jsx,ts,tsx,html}',
          './index.html'],
  theme: {
    extend: {},
  },
  plugins: [    require('flowbite/plugin')],
}

