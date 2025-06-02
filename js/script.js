document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const CONFIG = {
        simulatedDelay: 1500, // milliseconds
        menuItems: {
            tab1: 3, // Tab 1 will have 3 menu items
            tab2: 4, // Tab 2 will have 4 menu items
            tab3: 2, // Tab 3 will have 2 menu items
            tab4: 5  // Tab 4 will have 5 menu items
        }
    };

    // DOM Elements
    const elements = {
        menuContainer: document.getElementById('menu-container'),
        apiDisplay: document.getElementById('api-endpoint'),
        menuItemName: document.getElementById('menu-item-name'),
        endpoint: document.getElementById('endpoint'),
        tabs: document.querySelectorAll('.tab')
    };

    // State
    const state = {
        currentActiveTab: null,
        isMenuVisible: false
    };
    
    // Initialize the application
    function init() {
        setupEventListeners();
        activateTab(document.querySelector('.tab.active'));
    }

    // Set up event listeners
    function setupEventListeners() {
        elements.tabs.forEach(tab => {
            tab.addEventListener('click', handleTabClick);
        });
    }

    // Handle tab clicks
    function handleTabClick() {
        const tabId = this.getAttribute('data-tab');
        
        if (tabId === state.currentActiveTab) {
            toggleMenuVisibility();
        } else {
            activateTab(this);
        }
    }

    // Activate a tab
    function activateTab(tab) {
        const tabId = tab.getAttribute('data-tab');
        
        // Update UI
        updateActiveTab(tab);
        
        // Update state
        state.currentActiveTab = tabId;
        state.isMenuVisible = true;
        
        // Load menu
        loadTabMenu(tabId);
    }

    // Update active tab styling
    function updateActiveTab(activeTab) {
        elements.tabs.forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
    }

    // Toggle menu visibility
    function toggleMenuVisibility() {
        state.isMenuVisible = !state.isMenuVisible;
        const menu = elements.menuContainer.querySelector('.menu');
        
        if (menu) {
            menu.style.display = state.isMenuVisible ? 'block' : 'none';
            if (state.isMenuVisible) {
                animateMenu(menu);
            }
        }
    }

    // Animate menu appearance
    function animateMenu(menu) {
        menu.classList.add('fade-animation');
        setTimeout(() => {
            menu.classList.remove('fade-animation');
        }, 300);
    }

    // Load menu for a specific tab
    function loadTabMenu(tabId) {
        // Clear existing menu
        elements.menuContainer.innerHTML = '';
        
        // Create new menu container
        const menu = document.createElement('div');
        menu.className = 'menu';
        
        // Generate and add menu items
        const itemCount = CONFIG.menuItems[tabId];
        for (let i = 1; i <= itemCount; i++) {
            const menuItem = createMenuItem(tabId.replace('tab', ''), i);
            menu.appendChild(menuItem);
        }
        
        // Add menu to container
        elements.menuContainer.appendChild(menu);
    }

    // Create a menu item button
    function createMenuItem(tabNumber, itemNumber) {
        const itemName = `Menu Item ${tabNumber}-${itemNumber}`;
        const endpoint = `/api/menu/item${tabNumber}-${itemNumber}`;
        
        const button = document.createElement('button');
        button.className = 'menu-button';
        button.textContent = itemName;
        button.setAttribute('data-endpoint', endpoint);
        
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            handleMenuItemClick(button, itemName, endpoint);
        });
        
        return button;
    }

    // Handle menu item clicks
    function handleMenuItemClick(button, itemName, endpoint) {
        // Update active button styling
        updateActiveButton(button);
        
        // Update API display
        showApiCallStatus(itemName, endpoint);
        
        // Simulate API call
        simulateAPICall(itemName, endpoint);
    }

    // Update active button styling
    function updateActiveButton(activeButton) {
        document.querySelectorAll('.menu-button').forEach(btn => {
            btn.classList.remove('active-button');
        });
        activeButton.classList.add('active-button');
    }

    // Show API call status
    function showApiCallStatus(itemName, endpoint) {
        elements.menuItemName.textContent = itemName;
        elements.endpoint.textContent = endpoint;
        elements.apiDisplay.style.display = 'block';
    }

    // Simulate API call - THIS IS THE FIXED VERSION
    function simulateAPICall(itemName, endpoint) {
        // Show loading state
        elements.apiDisplay.innerHTML = `
            Calling endpoint: <code>${endpoint}</code>
            <span class="loading">(loading...)</span>
        `;
        
        // Simulate network delay
        setTimeout(() => {
            elements.apiDisplay.innerHTML = `
                API called: <span>${itemName}</span>
                <br>Endpoint: <code>${endpoint}</code>
                <div class="api-status">
                    Status: Success! (${CONFIG.simulatedDelay}ms simulated delay)
                </div>
            `;
        }, CONFIG.simulatedDelay);
    }

    // Start the application
    init();
});