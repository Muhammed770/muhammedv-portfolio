---
bannerImage: 1.jpg
date: 2025-01-15
---

# Getting Started with Next.js 16

**Published:** January 15, 2025

Next.js 16 brings exciting new features and improvements to the React framework ecosystem. In this note, I'll share my experience upgrading to Next.js 16 and highlight some key changes.

## What's New

### Async Request APIs

One of the most significant changes in Next.js 16 is that `params` and `searchParams` are now async. This means you need to await them:

```typescript
// Before (Next.js 15)
export default function Page({ params, searchParams }) {
  const id = params.id;
  return <div>{id}</div>;
}

// After (Next.js 16)
export default async function Page({ params, searchParams }) {
  const { id } = await params;
  const { query } = await searchParams;
  return <div>{id}</div>;
}
```

### React 19 Support

Next.js 16 comes with built-in support for React 19, which includes:

- Improved server components
- Better hydration
- Enhanced performance

### Turbopack by Default

Turbopack is now the default bundler for Next.js 16, providing faster builds and better developer experience.

## Migration Tips

1. **Update async APIs**: Make sure to await `params` and `searchParams` in your page components
2. **Check for breaking changes**: Review the migration guide for removed features
3. **Test thoroughly**: Run your build and test all routes after upgrading

## Conclusion

The upgrade to Next.js 16 was smooth overall, with the main changes being around async APIs. The performance improvements and React 19 support make it worth the upgrade!

