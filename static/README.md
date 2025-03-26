# Static Assets

This directory contains all static assets for the Quest Planner application.

## Directory Structure

- `images/` - General images, screenshots, and media files
- `icons/` - Icons and small graphics (including favicon)
- `fonts/` - Custom fonts (if needed)

## Usage

In SvelteKit, files in this directory are served at the root path. For example:
- `static/images/logo.png` is accessible at `/images/logo.png`
- `static/icons/favicon.png` is accessible at `/icons/favicon.png`

## Guidelines

1. Use appropriate file formats:
   - PNG for images with transparency
   - JPG for photographs
   - SVG for scalable graphics
   - WebP for modern web optimization

2. Optimize assets for web use:
   - Compress images without significant quality loss
   - Use appropriate image dimensions
   - Consider lazy loading for large images

3. Naming conventions:
   - Use lowercase letters
   - Use hyphens for spaces
   - Be descriptive but concise
   - Example: `quest-completion-icon.png`

