document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // Application configuration
    // =========================
    const CONFIG = {
        simulatedDelay: 1500, // Simulated delay for API call (in ms)
        errorRate: 0.2,       // Simulated error rate for API call
        menuItems: {          // Number of items for each tab
            tab1: 3,
            tab2: 4,
            tab3: 2,
            tab4: 5
        }
    };

    // =========================
    // Get DOM elements
    // =========================
    const elements = {
        menuContainer: document.getElementById('menu-container'),
        apiDisplay: document.getElementById('api-endpoint'),
        menuItemName: document.getElementById('menu-item-name'),
        endpoint: document.getElementById('endpoint'),
        menu: document.getElementById('menu')
    };

    // =========================
    // Application state
    // =========================
    const state = {
        currentActiveTab: null, // Active tab
        isMenuVisible: false    // Menu visibility
    };
    
    // =========================
    // Application initialization
    // =========================
    function init() {
        setupEventListeners(); // Add event listeners
        activateTab(document.querySelector('.tab')); // Activate the first tab by default
    }

    // =========================
    // Event handling
    // =========================
    function setupEventListeners() {
        // Handle tab click (event delegation)
        elements.menu.addEventListener('click', function(e) {
            const tab = e.target.closest('[role="tab"]');
            if (tab) {
                const tabElement = tab.parentElement;
                handleTabClick.call(tabElement, e);
            }
        });

        // Handle menu item click
        elements.menuContainer.addEventListener('click', function(e) {
            const button = e.target.closest('.menu-button');
            if (button) {
                const itemName = button.textContent;
                const endpoint = button.getAttribute('data-endpoint');
                handleMenuItemClick(button, itemName, endpoint);
            }
        });

        // Keyboard navigation for tabs
        elements.menu.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const tab = e.target.closest('[role="tab"]');
                if (tab) {
                    e.preventDefault();
                    const tabElement = tab.parentElement;
                    handleTabClick.call(tabElement, e);
                }
            }
        });
    }

    // =========================
    // Tab handling
    // =========================
    function handleTabClick(e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab');
        
        // If the tab is already active, show/hide the menu
        if (tabId === state.currentActiveTab) {
            toggleMenuVisibility();
        } else {
            activateTab(this);
        }
    }

    // Activate a tab and load its menu
    function activateTab(tab) {
        const tabId = tab.getAttribute('data-tab');
        
        updateActiveTab(tab);         // Update the active tab visually
        updateActiveDropdown(tabId);  // Update the active dropdown
        
        state.currentActiveTab = tabId;
        state.isMenuVisible = true;
        
        loadTabMenu(tabId);           // Load the menu items for this tab
    }

    // Update the visual state of the active tab
    function updateActiveTab(activeTab) {
        document.querySelectorAll('[role="tab"]').forEach(tab => {
            tab.setAttribute('aria-selected', 'false');
        });
        activeTab.querySelector('[role="tab"]').setAttribute('aria-selected', 'true');
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
    }
    
    // Update the active dropdown
    function updateActiveDropdown(tabId) {
        document.querySelectorAll('.tab').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-tab') === tabId) {
                item.classList.add('active');
            }
        });
    }

    // Show or hide the menu of the active tab
    function toggleMenuVisibility() {
        state.isMenuVisible = !state.isMenuVisible;
        const menu = elements.menuContainer.querySelector('.menu');
        
        if (menu) {
            menu.style.display = state.isMenuVisible ? 'grid' : 'none';
            if (state.isMenuVisible) {
                animateMenu(menu);
            }
        }
    }

    // Menu fade-in animation
    function animateMenu(menu) {
        menu.classList.add('fade-animation');
        setTimeout(() => {
            menu.classList.remove('fade-animation');
        }, 300);
    }

    // =========================
    // Dynamic menu generation
    // =========================
    function loadTabMenu(tabId) {
        elements.menuContainer.innerHTML = '';
        
        // The menu is only displayed in the tab dropdowns
        updateDropdownMenu(tabId, CONFIG.menuItems[tabId]);
    }
    
    // Update the dropdown content for the selected tab
    function updateDropdownMenu(tabId, itemCount) {
        const dropdown = document.querySelector(`.tab[data-tab="${tabId}"] .dropdown-menu`);
        if (dropdown) {
            dropdown.innerHTML = '';
            
            for (let i = 1; i <= itemCount; i++) {
                const tabNumber = tabId.replace('tab', '');
                const itemName = `Menu Item ${tabNumber}-${i}`;
                const endpoint = `/api/menu/item${tabNumber}-${i}`;
                
                const li = document.createElement('li');
                li.setAttribute('role', 'menuitem');
                
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = itemName;
                a.setAttribute('data-endpoint', endpoint);
                a.setAttribute('tabindex', '0');
                
                // Handle click on a dropdown item
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMenuItemClick(a, itemName, endpoint);
                    
                    // Update the active state in the dropdown
                    document.querySelectorAll('.dropdown-menu li').forEach(item => {
                        item.classList.remove('active');
                    });
                    li.classList.add('active');
                });
                
                li.appendChild(a);
                dropdown.appendChild(li);
            }
        }
    }

    // =========================
    // Handle click on a menu item
    // =========================
    function handleMenuItemClick(button, itemName, endpoint) {
        updateActiveButton(button);      // Update the active button
        showApiCallStatus(itemName, endpoint); // Show the API call status
        simulateAPICall(itemName, endpoint);   // Simulate the API call
    }

    // Update the active button in the menu
    function updateActiveButton(activeButton) {
        document.querySelectorAll('.menu-button').forEach(btn => {
            btn.classList.remove('active-button');
        });
        activeButton.classList.add('active-button');
    }

    // Show the API call status
    function showApiCallStatus(itemName, endpoint) {
        elements.menuItemName.textContent = itemName;
        elements.endpoint.textContent = endpoint;
        elements.apiDisplay.style.display = 'block';
    }

    // =========================
    // Simulate API call
    // =========================
    function simulateAPICall(itemName, endpoint) {
        // Show a loading message
        elements.apiDisplay.innerHTML = `
            Calling endpoint: <code>${endpoint}</code>
            <span class="loading">(loading...)</span>
        `;
        
        const shouldFail = Math.random() < CONFIG.errorRate;
        
        setTimeout(() => {
            if (shouldFail) {
                // Show a simulated error
                elements.apiDisplay.innerHTML = `
                    API call failed: <span>${itemName}</span>
                    <br>Endpoint: <code>${endpoint}</code>
                    <div class="api-status error">
                        Status: Error! (${CONFIG.simulatedDelay}ms simulated delay)
                    </div>
                `;
            } else {
                // Show a simulated success
                elements.apiDisplay.innerHTML = `
                    API called: <span>${itemName}</span>
                    <br>Endpoint: <code>${endpoint}</code>
                    <div class="api-status success">
                        Status: Success! (${CONFIG.simulatedDelay}ms simulated delay)
                    </div>
                `;
            }
        }, CONFIG.simulatedDelay);
    }

    // =========================
    // Start the application
    // =========================
    init();
});