# Next.js Blog Project Rules

This is a bilingual (PT/EN) Next.js 13+ blog built with TypeScript, Tailwind CSS, and Contentlayer.

## Project Structure & Architecture

### Core Technologies

- **Framework**: Next.js 13.4+ with App Router
- **Language**: TypeScript (strict: false, but use type safety)
- **Styling**: Tailwind CSS with custom configuration
- **Content**: Contentlayer for MDX blog posts
- **Font**: Space Grotesk (Google Fonts)
- **Theme**: Dark/Light mode with next-themes

### Directory Structure

```
app/           - Next.js 13 App Router pages
components/    - Reusable React components
layouts/       - Page layout components
data/          - Content, metadata, and configuration
css/           - Global styles (Tailwind, Prism)
public/static/ - Static assets (images, favicons)
scripts/       - Build and utility scripts
```

## Coding Standards

### TypeScript Rules

- Use TypeScript for all new files (.tsx/.ts)
- Import types from libraries (e.g., `import { Metadata } from 'next'`)
- Use interfaces for component props
- Leverage contentlayer types: `Blog`, `Authors`, `CoreContent<T>`
- Use proper typing for metadata and content

### Component Patterns

```typescript
// Standard component structure
import { ReactNode } from 'react'
import { SomeType } from 'contentlayer/generated'

interface ComponentProps {
  children?: ReactNode
  className?: string
  // other props
}

export default function Component({ children, className, ...props }: ComponentProps) {
  return <div className={className}>{children}</div>
}
```

### Import Patterns

- Use path aliases: `@/components/`, `@/data/`, `@/layouts/`, `@/css/`
- Import order: React, Next.js, third-party, local components, data/config
- Import contentlayer types: `import type { Blog, Authors } from 'contentlayer/generated'`

### CSS/Styling Rules

- **Always use Tailwind CSS** - no custom CSS unless absolutely necessary
- Use semantic color classes: `text-gray-900 dark:text-gray-100`
- Follow dark mode pattern: `bg-white dark:bg-gray-950`
- Use responsive prefixes: `hidden sm:block xl:divide-y`
- Leverage Tailwind typography plugin for blog content

### Content & Data Patterns

- Blog posts in `data/blog/[lang]/` (pt/en folders)
- Use frontmatter fields: `title`, `date`, `tags`, `summary`, `draft`, `images`
- Author data in `data/authors/`
- Site configuration in `data/siteMetadata.js`
- Navigation links in `data/headerNavLinks.ts`

## File Naming Conventions

- Components: PascalCase (e.g., `Header.tsx`, `PostLayout.tsx`)
- Pages: lowercase with brackets for dynamic routes (`[slug]`, `[page]`)
- Data files: camelCase (.js/.ts) or kebab-case (.mdx)
- Types: Use contentlayer generated types

## Next.js App Router Patterns

### Page Components

```typescript
// app/blog/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog posts',
}

export default function BlogPage() {
  return <div>Blog content</div>
}
```

### Layout Components

- Root layout in `app/layout.tsx` with metadata configuration
- Use `SectionContainer` wrapper for consistent spacing
- Include proper meta tags and structured data

### SEO & Metadata

- Always include proper metadata in page components
- Use `siteMetadata` for consistent site information
- Include OpenGraph, Twitter Card, and structured data
- Set proper canonical URLs and robots directives

## Content Management

### Blog Posts

- Write in MDX format in `data/blog/[lang]/`
- Use proper frontmatter with required fields
- Support for math (KaTeX), code highlighting (Prism), and citations
- Images should be in `public/static/images/`

### Multilingual Support

- Content organized by language: `/pt/` and `/en/` folders
- Language detection in routing: `app/blog/[lang]/`
- Use proper locale settings in metadata

## Component Guidelines

### Layouts

- `PostLayout`: For individual blog posts
- `ListLayout`: For blog post listings
- `AuthorLayout`: For author pages
- Always include proper TypeScript interfaces

### UI Components

- `Header`: Site navigation with logo, links, search, theme toggle
- `Footer`: Site footer information
- `ThemeSwitch`: Dark/light mode toggle
- `SearchButton`: Site search functionality
- `Tag`: Blog post tag component
- `Link`: Custom Next.js Link wrapper
- `Image`: Custom Next.js Image wrapper

### Styling Patterns

- Use consistent spacing with Tailwind
- Follow mobile-first responsive design
- Implement dark mode for all components
- Use semantic HTML elements

## Performance & SEO

### Optimization Rules

- Always use Next.js `Image` component for images
- Implement proper loading states
- Use static generation where possible
- Include proper alt text for images
- Optimize bundle size with dynamic imports when needed

### Analytics & Tracking

- Support for multiple analytics providers (Umami, Google Analytics, etc.)
- Configure in `siteMetadata.js`
- Include proper privacy considerations

## Development Workflow

### Scripts

- `yarn dev` for development
- `yarn build` for production build
- `yarn lint` for ESLint checking
- Post-build script generates tag counts and search index

### Code Quality

- Use ESLint with Next.js and TypeScript configs
- Prettier for code formatting (with Tailwind plugin)
- Husky for git hooks
- Lint-staged for pre-commit checks

### Environment Variables

- Use `.env.local` for sensitive data
- Support for analytics and comment system configuration
- Environment variables for Giscus comments

## Security Considerations

- Content Security Policy configured in `next.config.js`
- Proper security headers
- Safe handling of user-generated content in comments
- Environment variable validation

## Deployment

- Optimized for Vercel deployment
- Static asset optimization
- Proper build scripts with post-build processing
- RSS feed generation

## Common Patterns to Follow

1. **Always use TypeScript** with proper type definitions
2. **Consistent import patterns** with path aliases
3. **Tailwind-first styling** approach
4. **Responsive design** with mobile-first approach
5. **Dark mode support** for all components
6. **SEO optimization** with proper metadata
7. **Content-first architecture** with Contentlayer
8. **Performance optimization** with Next.js best practices

## Avoid These Patterns

- Don't use custom CSS files (stick to Tailwind)
- Don't bypass the contentlayer system for blog content
- Don't ignore TypeScript types (even with strict: false)
- Don't forget dark mode variants in styling
- Don't skip metadata configuration for pages
- Don't use hardcoded strings (use siteMetadata)

## When Adding New Features

1. Check if similar patterns exist in the codebase
2. Follow the established directory structure
3. Use TypeScript interfaces for new components
4. Include proper error handling
5. Add responsive design considerations
6. Test both light and dark modes
7. Update relevant configuration files if needed
8. Consider bilingual support if applicable
