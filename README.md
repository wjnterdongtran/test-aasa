This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables

This project supports environment-dependent configuration for mobile app deep linking. Set the following environment variables:

### Apple App Site Association

-   `APPLE_BUNDLE_ID`: The bundle identifier for your iOS app (default: `HGS93H2L2H.com.kpslholdings.ootnox.dev`)

### Android Asset Links

-   `ANDROID_PACKAGE_NAME`: The package name for your Android app (default: `com.kpslholdings.ootnox.dev`)
-   `ANDROID_SHA256_FINGERPRINTS`: Comma-separated list of SHA256 certificate fingerprints for your Android app

### Example `.env.local`:

```bash
APPLE_BUNDLE_ID=HGS93H2L2H.com.kpslholdings.ootnox.dev
ANDROID_PACKAGE_NAME=com.kpslholdings.ootnox.dev
ANDROID_SHA256_FINGERPRINTS=AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99
```

The app will serve dynamic Apple App Site Association and Android Asset Links files at:

-   `/.well-known/apple-app-site-association`
-   `/.well-known/assetlinks.json`
