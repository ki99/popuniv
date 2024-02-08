/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'build',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pbs.twimg.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
