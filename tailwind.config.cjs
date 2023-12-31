/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.vue', './index.html'],
    theme: {
        extend: {
            animation: {
                'spin-reverse': 'spin 1s linear reverse infinite'
            },
            width: {
                128: '32rem'
            },
            maxWidth: {
                128: '32rem'
            },
            height: {
                128: '32rem',
                '11/12': '91.666667%'
            },
            maxHeight: {
                128: '32rem'
            },
            flex: {
                fixed: '0 0 auto'
            }
        }
    },
    daisyui: {
        logs: false // Shows info about daisyUI version and used config in the console when building your CSS
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/container-queries'),
        require('tailwindcss-containment')
    ]
}
