/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.vue', './index.html'],
    theme: {
        extend: {
            animation: {
                'spin-reverse': 'spin 1s linear reverse infinite'
            }
        }
    },
    plugins: [require('daisyui')]
}
