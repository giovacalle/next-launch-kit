import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        search: ''
      }
    ]
  },
  serverExternalPackages: ['arctic'], // since arctic use oslo under the hood,
  output: 'standalone',
  reactStrictMode: true
};

export default withNextIntl(nextConfig);
