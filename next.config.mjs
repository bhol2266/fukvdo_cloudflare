import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental:{
    forceSwcTransforms:true,
  },
  env: {
    FRONTEND_URL: 'http://localhost:3000/',
    BACKEND_URL: 'http://localhost:5000/',
    // FRONTEND_URL: 'https://www.fuckvideo.live/',
    // BACKEND_URL: 'https://clownfish-app-jn7w9.ondigitalocean.app/',
    FACEBOOK_APP_SECRET: '691004714be90ba61d9ab8e0ba0d0c5e',
    FACEBOOK_APP_ID: '412940630805200',
    GOOGLE_CLIENT_ID: '1004706057785-deeun8t8k98p0rioe91vntv11tegp6o7.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    MONGODB_URI_STRING: 'mongodb+srv://bhola:IyNs48Pf1SNHUWpu@cluster0.acjho.mongodb.net/chutlunds?retryWrites=true&w=majority',
    JWT_SECRET: 'dsaljfhsaldkfsldaflksdf;afd',
    NEXTAUTH_URL: 'dsaljfhsaldkfsldaflksdf;afd',
  },
  images: {
    domains: ['links.papareact.com', 'platform-lookaside.fbsbx', 'firebasestorage.googleapis.com', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'www.pexels.com', 'hotdesipics.co', 'i.picsum.photos', 'static-ca-cdn.eporner.com', 'imggen.eporner.com', 'www.pezporn.com', 'https://www.pornpics.de/', 'cdni.pornpics.de', 'static-sg-cdn.eporner.com']
  },
};

export default nextConfig;
