import { authMiddleware } from '@clerk/nextjs';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
    publicRoutes: ['/billboards', '/settings'],
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

// Now that Clerk is installed and mounted in your application,
// it’s time to decide which pages are public and which need to hide behind authentication.
// We do this by creating a middleware.ts file at the root folder (or inside src/ if that is how you set up your app).
// https://clerk.com/docs/nextjs/get-started-with-nextjs
