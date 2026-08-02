import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        tailwindcss(),
    ],
    server: {
        host: '0.0.0.0', // 👈 ត្រូវតែមានដើម្បីឱ្យ Docker បាញ់ Data ចេញមកក្រៅបាន
        port: 5173,      // 👈 កំណត់ Port ឱ្យត្រូវជាមួយ Docker
        strictPort: true,
        hmr: {
            host: 'localhost', // 👈 ដើម្បីឱ្យ Browser ភ្ជាប់ Hot Reload មកកាន់ localhost បាន
        },
        watch: {
            usePolling: true, // 👈 ជួយឱ្យកូដ Update ភ្លាមៗពេល Save លើ Windows/Docker
            ignored: ['**/storage/framework/views/**'],
        },
    },
});