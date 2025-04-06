import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		serviceWorker: {
			register: false,
		},
		paths: {
			base: '/stock-options'
		},
		router: {
			type: 'hash',
		}
	}
};

export default config;
