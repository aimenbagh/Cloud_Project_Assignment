document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // Configuration de l'application
    // =========================
    const CONFIG = {
        simulatedDelay: 1500, // Délai simulé pour l'appel API (en ms)
        errorRate: 0.2,       // Taux d'échec simulé pour l'appel API
        menuItems: {          // Nombre d'items pour chaque onglet
            tab1: 3,
            tab2: 4,
            tab3: 2,
            tab4: 5
        }
    };

    // =========================
    // Récupération des éléments du DOM
    // =========================
    const elements = {
        menuContainer: document.getElementById('menu-container'),
        apiDisplay: document.getElementById('api-endpoint'),
        menuItemName: document.getElementById('menu-item-name'),
        endpoint: document.getElementById('endpoint'),
        menu: document.getElementById('menu')
    };

    // =========================
    // État de l'application
    // =========================
    const state = {
        currentActiveTab: null, // Onglet actif
        isMenuVisible: false    // Visibilité du menu
    };
    
    // =========================
    // Initialisation de l'application
    // =========================
    function init() {
        setupEventListeners(); // Ajout des écouteurs d'événements
        activateTab(document.querySelector('.tab')); // Active le premier onglet par défaut
    }

    // =========================
    // Gestion des événements
    // =========================
    function setupEventListeners() {
        // Gestion du clic sur les onglets (event delegation)
        elements.menu.addEventListener('click', function(e) {
            const tab = e.target.closest('[role="tab"]');
            if (tab) {
                const tabElement = tab.parentElement;
                handleTabClick.call(tabElement, e);
            }
        });

        // Gestion du clic sur les items du menu
        elements.menuContainer.addEventListener('click', function(e) {
            const button = e.target.closest('.menu-button');
            if (button) {
                const itemName = button.textContent;
                const endpoint = button.getAttribute('data-endpoint');
                handleMenuItemClick(button, itemName, endpoint);
            }
        });

        // Navigation clavier sur les onglets
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
    // Gestion des onglets
    // =========================
    function handleTabClick(e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab');
        
        // Si l'onglet est déjà actif, on affiche/masque le menu
        if (tabId === state.currentActiveTab) {
            toggleMenuVisibility();
        } else {
            activateTab(this);
        }
    }

    // Active un onglet et charge son menu
    function activateTab(tab) {
        const tabId = tab.getAttribute('data-tab');
        
        updateActiveTab(tab);         // Met à jour l'onglet actif visuellement
        updateActiveDropdown(tabId);  // Met à jour le dropdown actif
        
        state.currentActiveTab = tabId;
        state.isMenuVisible = true;
        
        loadTabMenu(tabId);           // Charge les items du menu pour cet onglet
    }

    // Met à jour l'état visuel de l'onglet actif
    function updateActiveTab(activeTab) {
        document.querySelectorAll('[role="tab"]').forEach(tab => {
            tab.setAttribute('aria-selected', 'false');
        });
        activeTab.querySelector('[role="tab"]').setAttribute('aria-selected', 'true');
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
    }
    
    // Met à jour le dropdown actif
    function updateActiveDropdown(tabId) {
        document.querySelectorAll('.tab').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-tab') === tabId) {
                item.classList.add('active');
            }
        });
    }

    // Affiche ou masque le menu du tab actif
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

    // Animation d'apparition du menu
    function animateMenu(menu) {
        menu.classList.add('fade-animation');
        setTimeout(() => {
            menu.classList.remove('fade-animation');
        }, 300);
    }

    // =========================
    // Génération dynamique du menu
    // =========================
    function loadTabMenu(tabId) {
        elements.menuContainer.innerHTML = '';
        
        // Le menu est affiché uniquement dans les dropdowns des tabs
        updateDropdownMenu(tabId, CONFIG.menuItems[tabId]);
    }
    
    // Met à jour le contenu du dropdown pour l'onglet sélectionné
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
                
                // Gestion du clic sur un item du dropdown
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMenuItemClick(a, itemName, endpoint);
                    
                    // Met à jour l'état actif dans le dropdown
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
    // Gestion du clic sur un item du menu
    // =========================
    function handleMenuItemClick(button, itemName, endpoint) {
        updateActiveButton(button);      // Met à jour le bouton actif
        showApiCallStatus(itemName, endpoint); // Affiche l'appel API en cours
        simulateAPICall(itemName, endpoint);   // Simule l'appel API
    }

    // Met à jour le bouton actif dans le menu
    function updateActiveButton(activeButton) {
        document.querySelectorAll('.menu-button').forEach(btn => {
            btn.classList.remove('active-button');
        });
        activeButton.classList.add('active-button');
    }

    // Affiche le statut de l'appel API
    function showApiCallStatus(itemName, endpoint) {
        elements.menuItemName.textContent = itemName;
        elements.endpoint.textContent = endpoint;
        elements.apiDisplay.style.display = 'block';
    }

    // =========================
    // Simulation d'appel API
    // =========================
    function simulateAPICall(itemName, endpoint) {
        // Affiche un message de chargement
        elements.apiDisplay.innerHTML = `
            Calling endpoint: <code>${endpoint}</code>
            <span class="loading">(loading...)</span>
        `;
        
        const shouldFail = Math.random() < CONFIG.errorRate;
        
        setTimeout(() => {
            if (shouldFail) {
                // Affiche une erreur simulée
                elements.apiDisplay.innerHTML = `
                    API call failed: <span>${itemName}</span>
                    <br>Endpoint: <code>${endpoint}</code>
                    <div class="api-status error">
                        Status: Error! (${CONFIG.simulatedDelay}ms simulated delay)
                    </div>
                `;
            } else {
                // Affiche un succès simulé
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
    // Lancement de l'application
    // =========================
    init();
});