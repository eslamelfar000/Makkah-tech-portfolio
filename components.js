/**
 * Makkah Tech - Dynamic Components Loader
 * Fetches and injects shared navigation components into placeholders.
 */

async function loadComponent(placeholderId, filePath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        const html = await response.text();
        placeholder.innerHTML = html;
    } catch (error) {
        console.error("Component loading error:", error);
    }
}

async function initSharedComponents() {
    // Load components in parallel
    await Promise.all([
        loadComponent('cursor-placeholder', 'components/cursor.html'),
        loadComponent('top-nav-placeholder', 'components/top-nav.html'),
        loadComponent('main-nav-placeholder', 'components/navbar.html'),
        loadComponent('mobile-menu-placeholder', 'components/mobile-menu.html'),
        loadComponent('footer-placeholder', 'components/footer.html')
    ]);

    // Dispatch custom event when all components are loaded
    // This allows main.js to initialize listeners correctly
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
}

// Start loading
initSharedComponents();
