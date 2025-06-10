document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // Configuration de l'application
    // =========================
    const CONFIG = {
        simulatedDelay: 1500, // Délai simulé pour l'appel API (en millisecondes)
        menuItems: {
            tab1: 3, // Tab 1 aura 3 éléments de menu
            tab2: 4, // Tab 2 aura 4 éléments de menu
            tab3: 2, // Tab 3 aura 2 éléments de menu
            tab4: 5  // Tab 4 aura 5 éléments de menu
        }
    };

    // =========================
    // Sélection des éléments du DOM
    // =========================
    const elements = {
        menuContainer: document.getElementById('menu-container'), // Conteneur du menu
        apiDisplay: document.getElementById('api-endpoint'),      // Affichage de l'API
        menuItemName: document.getElementById('menu-item-name'),  // Nom de l'élément sélectionné
        endpoint: document.getElementById('endpoint'),            // Endpoint affiché
        tabs: document.querySelectorAll('.tab')                   // Tous les onglets
    };

    // =========================
    // État de l'application
    // =========================
    const state = {
        currentActiveTab: null, // Onglet actuellement actif
        isMenuVisible: false    // Visibilité du menu
    };
    
    // =========================
    // Initialisation de l'application
    // =========================
    function init() {
        setupEventListeners(); // Mise en place des écouteurs d'événements
        activateTab(document.querySelector('.tab.active')); // Activer l'onglet par défaut
    }

    // =========================
    // Mise en place des écouteurs d'événements sur les onglets
    // =========================
    function setupEventListeners() {
        elements.tabs.forEach(tab => {
            tab.addEventListener('click', handleTabClick);
        });
    }

    // =========================
    // Gestion du clic sur un onglet
    // =========================
    function handleTabClick() {
        const tabId = this.getAttribute('data-tab');
        
        if (tabId === state.currentActiveTab) {
            // Si on clique sur l'onglet déjà actif, on affiche/masque le menu
            toggleMenuVisibility();
        } else {
            // Sinon, on active le nouvel onglet
            activateTab(this);
        }
    }

    // =========================
    // Activation d'un onglet
    // =========================
    function activateTab(tab) {
        const tabId = tab.getAttribute('data-tab');
        
        // Mettre à jour l'UI
        updateActiveTab(tab);
        
        // Mettre à jour l'état
        state.currentActiveTab = tabId;
        state.isMenuVisible = true;
        
        // Charger le menu correspondant à l'onglet
        loadTabMenu(tabId);
    }

    // =========================
    // Mise à jour du style de l'onglet actif
    // =========================
    function updateActiveTab(activeTab) {
        elements.tabs.forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
    }

    // =========================
    // Afficher ou masquer le menu
    // =========================
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

    // =========================
    // Animation d'apparition du menu
    // =========================
    function animateMenu(menu) {
        menu.classList.add('fade-animation');
        setTimeout(() => {
            menu.classList.remove('fade-animation');
        }, 300);
    }

    // =========================
    // Charger le menu pour un onglet donné
    // =========================
    function loadTabMenu(tabId) {
        // Vider le menu existant
        elements.menuContainer.innerHTML = '';
        
        // Créer un nouveau conteneur de menu
        const menu = document.createElement('div');
        menu.className = 'menu';
        
        // Générer et ajouter les éléments de menu
        const itemCount = CONFIG.menuItems[tabId];
        for (let i = 1; i <= itemCount; i++) {
            const menuItem = createMenuItem(tabId.replace('tab', ''), i);
            menu.appendChild(menuItem);
        }
        
        // Ajouter le menu au conteneur
        elements.menuContainer.appendChild(menu);
    }

    // =========================
    // Créer un bouton pour un élément de menu
    // =========================
    function createMenuItem(tabNumber, itemNumber) {
        const itemName = `Menu Item ${tabNumber}-${itemNumber}`;
        const endpoint = `/api/menu/item${tabNumber}-${itemNumber}`;
        
        const button = document.createElement('button');
        button.className = 'menu-button';
        button.textContent = itemName;
        button.setAttribute('data-endpoint', endpoint);
        
        // Gestion du clic sur un élément de menu
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            handleMenuItemClick(button, itemName, endpoint);
        });
        
        return button;
    }

    // =========================
    // Gestion du clic sur un élément de menu
    // =========================
    function handleMenuItemClick(button, itemName, endpoint) {
        // Mettre à jour le style du bouton actif
        updateActiveButton(button);
        
        // Afficher l'appel API
        showApiCallStatus(itemName, endpoint);
        
        // Simuler l'appel API
        simulateAPICall(itemName, endpoint);
    }

    // =========================
    // Mettre à jour le style du bouton actif
    // =========================
    function updateActiveButton(activeButton) {
        document.querySelectorAll('.menu-button').forEach(btn => {
            btn.classList.remove('active-button');
        });
        activeButton.classList.add('active-button');
    }

    // =========================
    // Afficher le statut de l'appel API
    // =========================
    function showApiCallStatus(itemName, endpoint) {
        elements.menuItemName.textContent = itemName;
        elements.endpoint.textContent = endpoint;
        elements.apiDisplay.style.display = 'block';
    }

    // =========================
    // Simuler un appel API (avec délai)
    // =========================
    function simulateAPICall(itemName, endpoint) {
        // Afficher l'état de chargement
        elements.apiDisplay.innerHTML = `
            Calling endpoint: <code>${endpoint}</code>
            <span class="loading">(loading...)</span>
        `;
        
        // Simuler un délai réseau
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

    // =========================
    // Lancer l'application
    // =========================
    init();
});