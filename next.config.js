/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'truongfoods.vn',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'tiemkemsuti.com',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'thegioibiaruou.com',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'jollibee.com.vn',
                pathname: '/media/**',
            }
        ]
    }
  }
   
  module.exports = nextConfig