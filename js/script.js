document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // Configuration
    // =========================
    const CONFIG = {
        simulatedDelay: 1500,
        errorRate: 0.2,
        menuItems: {
            tab1: 3,
            tab2: 4,
            tab3: 2,
            tab4: 5
        }
    };

    // =========================
    // DOM Elements
    // =========================
    const elements = {
        menuContainer: document.getElementById('menu-container'),
        apiDisplay: document.getElementById('api-endpoint'),
        menuItemName: document.getElementById('menu-item-name'),
        endpoint: document.getElementById('endpoint'),
        menu: document.getElementById('menu')
    };

    // =========================
    // Application State
    // =========================
    const state = {
        currentActiveTab: null,
        isMenuVisible: false
    };
    
    // =========================
    // Initialization
    // =========================
    function init() {
        setupEventListeners();
        activateTab(document.querySelector('.tab'));
    }

    // =========================
    // Event Listeners
    // =========================
    function setupEventListeners() {
        // Event delegation for tabs
        elements.menu.addEventListener('click', function(e) {
            const tab = e.target.closest('[role="tab"]');
            if (tab) {
                const tabElement = tab.parentElement;
                handleTabClick.call(tabElement, e);
            }
        });

        // Event delegation for menu items
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
    // Tab Handling
    // =========================
    function handleTabClick(e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab');
        
        if (tabId === state.currentActiveTab) {
            toggleMenuVisibility();
        } else {
            activateTab(this);
        }
    }

    function activateTab(tab) {
        const tabId = tab.getAttribute('data-tab');
        
        updateActiveTab(tab);
        updateActiveDropdown(tabId);
        
        state.currentActiveTab = tabId;
        state.isMenuVisible = true;
        
        loadTabMenu(tabId);
    }

    function updateActiveTab(activeTab) {
        document.querySelectorAll('[role="tab"]').forEach(tab => {
            tab.setAttribute('aria-selected', 'false');
        });
        activeTab.querySelector('[role="tab"]').setAttribute('aria-selected', 'true');
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
    }
    
    function updateActiveDropdown(tabId) {
        document.querySelectorAll('.tab').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-tab') === tabId) {
                item.classList.add('active');
            }
        });
    }

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

    function animateMenu(menu) {
        menu.classList.add('fade-animation');
        setTimeout(() => {
            menu.classList.remove('fade-animation');
        }, 300);
    }

    // =========================
    // Menu Generation
    // =========================
    function loadTabMenu(tabId) {
        elements.menuContainer.innerHTML = '';
        
        // Le menu sera affiché uniquement dans les dropdowns des tabs
        updateDropdownMenu(tabId, CONFIG.menuItems[tabId]);
    }
    
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
                
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMenuItemClick(a, itemName, endpoint);
                    
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
    // Menu Item Handling
    // =========================
    function handleMenuItemClick(button, itemName, endpoint) {
        updateActiveButton(button);
        showApiCallStatus(itemName, endpoint);
        simulateAPICall(itemName, endpoint);
    }

    function updateActiveButton(activeButton) {
        document.querySelectorAll('.menu-button').forEach(btn => {
            btn.classList.remove('active-button');
        });
        activeButton.classList.add('active-button');
    }

    function showApiCallStatus(itemName, endpoint) {
        elements.menuItemName.textContent = itemName;
        elements.endpoint.textContent = endpoint;
        elements.apiDisplay.style.display = 'block';
    }

    // =========================
    // API Simulation
    // =========================
    function simulateAPICall(itemName, endpoint) {
        elements.apiDisplay.innerHTML = `
            Calling endpoint: <code>${endpoint}</code>
            <span class="loading">(loading...)</span>
        `;
        
        const shouldFail = Math.random() < CONFIG.errorRate;
        
        setTimeout(() => {
            if (shouldFail) {
                elements.apiDisplay.innerHTML = `
                    API call failed: <span>${itemName}</span>
                    <br>Endpoint: <code>${endpoint}</code>
                    <div class="api-status error">
                        Status: Error! (${CONFIG.simulatedDelay}ms simulated delay)
                    </div>
                `;
            } else {
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
    // Initialize Application
    // =========================
    init();
});