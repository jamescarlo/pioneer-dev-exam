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

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Project Directory Structure

```
root
├── _home            # Contains Client Components for the home page or index page
├── components       # Reusable React components
│   ├── ui           # UI components (e.g., buttons, modals)
├── pages            # Next.js pages (routes)
|    ├── api         # API routes
├── public           # Static assets (images, fonts, etc.)
├── styles           # Global and component-specific styles
└── lib            # Shared utilities and helper functions
```

## Directory Structure Explanation

### `/app` Directory

- Root directory using Next.js 13+ App Router
- Contains all page routes and layout components
- Follows Next.js file-based routing convention

### `/app/_home` Directory

- Contains components specific to the home page
- Underscore prefix indicates private routing
- Sections are modularized for better organization

### `/components` Directory

- Houses reusable components
- Global components that can be used across different pages

### `/types` Directory

- Contains TypeScript type definitions
- Organized by domain/feature
- Helps maintain type safety across the application

## Key Files

- `page.tsx`: Main entry point/home page
- `Header.tsx`: Global navigation component
- `MovieDetails.tsx`: Detailed view for individual movies
- `PopularSection.tsx`: Displays popular movies
- `NowPlayingSection.tsx`: Shows currently playing movies

## Naming Conventions

- Pages: `page.tsx`
- Components: PascalCase (e.g., `Header.tsx`)
- Type definitions: camelCase (e.g., `movie.ts`)
- Private folders: Prefix with underscore (e.g., `_home`)
- Dynamic routes: Square brackets (e.g., `[id]`)

## Additional Information

- This project uses the TMDB API to fetch data
- The API key is stored in the `.env.local` file
- The project is hosted on Vercel

## Live Preview

- [Movie Hub](https://movie-hub-one-phi.vercel.app/)
