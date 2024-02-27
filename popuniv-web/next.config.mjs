/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	output: 'standalone',
	webpack: (config, _) => ({
		...config,
		watchOptions: {
			...config.watchOptions,
			poll: 1000,
			aggregateTimeout: 300,
		},
	}),
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
};

export default nextConfig;
