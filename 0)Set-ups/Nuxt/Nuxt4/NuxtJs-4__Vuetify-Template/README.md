# Nuxt.js Starting Template

A clean and simple Nuxt.js starter template with essential development tools pre-configured.

## Features

- ✨ **Nuxt 4** - Latest Nuxt framework
- 🎨 **SCSS Support** - Write styles with Sass
- 📝 **ESLint** - Code linting and formatting
- 🚀 **Development Ready** - Pre-configured for quick start
- 📱 **Responsive Layouts** - Default and empty layouts included
- 🎯 **TypeScript Support** - Full TypeScript configuration

## Project Structure

```
app/
├── assets/scss/       # SCSS styles and variables
├── components/        # Vue components
├── composables/       # Composable functions
├── layouts/           # Layout components
│   ├── default.vue   # Default layout with header/footer
│   └── empty.vue     # Empty layout for minimal pages
├── pages/            # Application pages (auto-routed)
│   ├── index.vue    # Home page
│   └── about.vue    # About page
├── app.vue          # Root component
└── error.vue        # Error page
```

## Setup

Install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Linting

Run ESLint to check and fix code:

```bash
npm run lint
```

## Customization

### Styling
- Customize global styles in `app/assets/scss/`
- Modify CSS variables in `_variables.scss`
- Add typography settings in `_typography.scss`

### Layouts
- Use `default` layout for pages with header/footer
- Use `empty` layout for minimal pages
- Create custom layouts in `app/layouts/`

### Pages
- Add new pages in `app/pages/` directory
- Nuxt will automatically create routes based on file structure

## Learn More

- [Nuxt Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Deployment Guide](https://nuxt.com/docs/getting-started/deployment)
