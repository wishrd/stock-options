import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			strategies: 'generateSW',
			registerType: 'autoUpdate',
			manifest: {
				name: 'Stock Options',
				short_name: 'StockOptions',
				description: 'Stock Options Trading Application',
				theme_color: '#2563eb',
				background_color: '#ffffff',
				display: 'standalone',
				scope: '/stock-options',
				start_url: '/stock-options',
				icons: [
					{
						src: '/icon-192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable'
					},
					{
						src: '/icon-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			injectManifest: {
			  globPatterns: ['**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
			},
			workbox: {
			  globPatterns: ['**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
			},
			injectRegister: 'auto',
			includeAssets: ['favicon.png'],
			scope: '/stock-options'
		})
	]
});
