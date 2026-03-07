<template>
    <div class="default-layout">
        <header class="layout-header">
            <h2>Nuxt Template</h2>
        </header>
        <main class="layout-main">
            <slot></slot>
        </main>
        <footer class="layout-footer">
            <p>&copy; 2026 Your App</p>
        </footer>
    </div>
</template>

<style scoped lang="scss">
.default-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.layout-header {
    padding: 1rem 2rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
}

.layout-main {
    flex: 1;
}

.layout-footer {
    padding: 1rem 2rem;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
    text-align: center;
}
</style>
