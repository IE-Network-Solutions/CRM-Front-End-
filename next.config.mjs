/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    esmExternals: false,
  },
  images: {
    domains: [
      'cdn.prod.website-files.com',
      'files.ienetworks.co',
      'example.com',
    ],
  },
  env: {
    ORG_AND_EMP_URL: process.env.ORG_AND_EMP_URL,
    TENANT_MGMT_URL: process.env.TENANT_MGMT_URL,
    TENANT_BASE_URL: process.env.TENANT_BASE_URL,
    NOTIFICATION_URL: process.env.NOTIFICATION_URL,
    PUBLIC_DOMAIN: process.env.PUBLIC_DOMAIN,

    APPROVER_URL: process.env.NEXT_PUBLIC_APPROVERS_URL,
    EMAIL_URL: process.env.EMAIL_URL,
    TENANT_BASE_URL:process.env.TENANT_BASE_URL,
    TENANT_MGMT_URL: process.env.TENANT_BASE_URL,
  },
};

export default nextConfig;
