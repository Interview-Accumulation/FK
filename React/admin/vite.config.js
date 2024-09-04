import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        react(),
        // 同步tsconfig.json的path设置alias
        tsconfigPaths(),
        visualizer({
            open: true
        })
    ],
    server: {
        open: true,
        port: 3088,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/api/, ''); }
            }
        }
    },
    build: {
        target: 'esnext',
        minify: 'terser',
        rollupOptions: {
            output: {
                manualChunks: function (id) {
                    if (id.includes('node_modules')) {
                        // 让每个插件都打包成独立的文件
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                    return null;
                },
            },
        },
        terserOptions: {
            compress: {
                keep_infinity: true,
                drop_console: true,
                drop_debugger: true
            }
        },
    }
});
