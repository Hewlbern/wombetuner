/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Add any environment variables you want to expose to the browser here
    REPLICATE_API_TOKEN:process.env.REPLICATE_API_TOKEN,
      
},
};

export default nextConfig;
