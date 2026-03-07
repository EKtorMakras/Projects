<template>
    <div class="min-h-screen flex flex-col bg-surface text-surface-fg">
        <header class="px-8 py-4 bg-surface-variant border-b border-surface-variant-dark">
            <h2>Nuxt Template</h2>
        </header>
        <main class="flex-1">
            <slot></slot>
        </main>
        <footer class="px-8 py-4 bg-surface-variant border-t border-surface-variant-dark text-center">
            <p>&copy; 2026 Your App</p>
        </footer>
    </div>
</template>
