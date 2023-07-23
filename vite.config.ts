import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
	// server: { 
	// 	https: false,
	// 	cors: {
	// 		origin: 'https://bpbcrm.bpbltd.com',
	// 		allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Set-Cookie'],
	// 		credentials: true,
	// 	},
    //     hmr: {
    //         host: 'http://crm.bpbltd.com',
    //     },
    // }, 
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
});
