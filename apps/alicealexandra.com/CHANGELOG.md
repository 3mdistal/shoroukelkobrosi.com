# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2024-02-27

### Changed
- Moved application into a monorepo alongside some other projects.
- Improved typing for internal Notion fetching.

### Fixed
- Resolved an edge case where users could encounter a 404 error when attempting to visit a blog post after hard refreshing the homepage and then navigating to the blog.

### Cancelled
- Migration from SvelteKit to Next.js. After evaluation, decided to remain with SvelteKit due to its semantics and native performance benefits.

## [0.3.0] - 2023-11-21

### Added
- New studio homepage (/studio) with upcoming projects and links.
- New poems page (/studio/hfc).
- New illustrations page (/studio/illustrations).
- New arcade page (/studio/arcade) for HTML canvas experiments.
- Vercel Analytics for basic page request tracking.
- Blog categories and auto-generated read times.
- Pong loading spinner for blog images.
- Metadata and OG images for various pages.
- HR element to Notion parser.
- Mastodon verification.

### Changed
- Moved Notion synced block fetching to the server, enabling caching with ISR.
- Continued elimination of TypeScript issues across the application.
- Refactored notion.ts server fetching for improved reusability and customization.
- Extended Tailwind usage across the application.

### Fixed
- Smoothed out homepage transition to other pages at slow loading speeds.
- Various Notion CMS error instances.
- Background image behavior on mobile devices.

## [0.2.0] - 2023-03-10

### Added
- Notion CMS integration for blog posts and entries.
- Automatically generated Table of Contents for each blog post.
- Custom subscript and superscript tags for blog content.
- Blog post light mode / dark mode toggle.
- Syntax highlighting for code examples in blog posts.
- Incremental Static Regeneration (ISR) for blog data.
- Github link in social media area.
- Animation for home button on landing pages and blogs.
- Scroll smoothing on the blog.
- Open Graph images and descriptions.

### Changed
- Implemented TypeScript app-wide.

### Fixed
- Updated Notion image links when they expire.
- Corrected Prettier configuration for sorting Tailwind classes.

## [0.1.1] - 2023-02-21

### Added
- Notion backend for commissions form with email notification system.
- Dedicated routes for all landing pages.
- Transition effect between homepage and landing pages.
- Blog section.
- "Coming soon" content for all studio pages.
- GSAP animations, including scroll-triggered animations on landing pages.
- MDSvex implementation for simple content.

### Changed
- Converted Sass to TailwindCSS.
- Renamed "news" section to "connect".
- Deprecated store in favor of blog.
- Updated bio information.
- Improved homepage accessibility.

### Fixed
- Prevented email reveal on commissions button.
- Resolved graphical performance issues on Safari across devices.
- Eliminated various Flash of Unstyled Content (FOUC) instances.

## [0.1.0] - 2022-08-01

### Added
- Initial site structure and functionality.
- Basic content and form placeholders.
