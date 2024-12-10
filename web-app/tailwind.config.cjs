/** @type {import('tailwindcss').Config}*/
const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            colors: {
                'background': 'rgba(255, 255, 255, 0.7)',
            },
        },
    },

    plugins: []
};

module.exports = config;