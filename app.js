/* ==========================================================================
   BUY BY BARTER - Core Application Logic
   Peer-to-Peer Physical Item Exchange & Cash Top-Up Platform
   ========================================================================== */

(function () {
    'use strict';

    // LOCAL STORAGE KEYS
    const STORAGE_KEYS = {
        USERS: 'bbb_users_v1',
        ITEMS: 'bbb_items_v1',
        OFFERS: 'bbb_offers_v1',
        MESSAGES: 'bbb_messages_v1',
        ACTIVE_USER: 'bbb_active_user_v1'
    };

    // HIGH-QUALITY PRESET IMAGE URLS FOR CLEAN DEMO LISTINGS
    const PRESET_IMAGES = [
        { name: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80' },
        { name: 'Film Camera', url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80' },
        { name: 'Keyboard', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80' },
        { name: 'Dumbbells', url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80' },
        { name: 'Guitar', url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80' },
        { name: 'Gaming Console', url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80' },
        { name: 'Denim Jacket', url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80' },
        { name: 'Record Player', url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80' }
    ];

    // INITIAL PRE-SEEDED DATASET
    const INITIAL_USERS = [
        {
            id: 'usr_alex',
            name: 'Alex Rivera',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
            bio: 'Tech enthusiast, mechanical keyboard builder, and audiophile.',
            location: 'Brooklyn, NY'
        },
        {
            id: 'usr_maya',
            name: 'Maya Lin',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
            bio: 'Vintage fashion collector and analog camera hobbyist.',
            location: 'Manhattan, NY'
        },
        {
            id: 'usr_sam',
            name: 'Sam Taylor',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
            bio: 'Fitness fanatic & outdoor camping enthusiast.',
            location: 'Queens, NY'
        },
        {
            id: 'usr_elena',
            name: 'Elena Rostova',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            bio: 'Musician, indie record lover, and vinyl collector.',
            location: 'Jersey City, NJ'
        }
    ];

    const INITIAL_ITEMS = [
        {
            id: 'item_1',
            ownerId: 'usr_alex',
            title: 'Sony WH-1000XM4 Wireless Headphones',
            category: 'Electronics',
            condition: 'Like New',
            estimatedValue: 180,
            location: 'Brooklyn, NY',
            imageUrl: PRESET_IMAGES[0].url,
            description: 'Industry-leading noise cancelling wireless headphones. Mint condition, includes original carrying case, USB-C charging cable, and audio jack.',
            wishlist: 'Looking for mechanical keyboards, retro cameras, or guitar pedals.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-28T10:00:00Z'
        },
        {
            id: 'item_2',
            ownerId: 'usr_maya',
            title: 'Canon AE-1 Program 35mm Vintage Camera',
            category: 'Vintage & Fashion',
            condition: 'Good',
            estimatedValue: 220,
            location: 'Manhattan, NY',
            imageUrl: PRESET_IMAGES[1].url,
            description: 'Classic 1980s 35mm SLR film camera with Canon 50mm f/1.8 FD lens. Tested with film, light meter works perfectly. Comes with vintage leather strap.',
            wishlist: 'Looking for wireless noise-cancelling headphones or Nintendo Switch OLED.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-28T11:30:00Z'
        },
        {
            id: 'item_3',
            ownerId: 'usr_alex',
            title: 'Keychron K2 Wireless Mechanical Keyboard',
            category: 'Gaming & Tech',
            condition: 'Brand New',
            estimatedValue: 110,
            location: 'Brooklyn, NY',
            imageUrl: PRESET_IMAGES[2].url,
            description: 'RGB Backlit Gateron Brown Tactile Switches. Aluminum frame, Bluetooth 5.1 & wired mode. Complete in original box with keycap puller.',
            wishlist: 'Looking for denim jackets, vintage vinyl, or camping gear.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-28T12:15:00Z'
        },
        {
            id: 'item_4',
            ownerId: 'usr_sam',
            title: 'Bowflex SelectTech Adjustable Dumbbells (Pair)',
            category: 'Sports & Outdoor',
            condition: 'Good',
            estimatedValue: 175,
            location: 'Queens, NY',
            imageUrl: PRESET_IMAGES[3].url,
            description: 'Adjustable dumbbells from 5 to 52.5 lbs each. Smooth dial selector system. Perfect for home workouts, saves tons of space.',
            wishlist: 'Looking for camping gear, electric guitars, or high-end headphones.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-28T13:00:00Z'
        },
        {
            id: 'item_5',
            ownerId: 'usr_elena',
            title: 'Fender Squier Stratocaster Electric Guitar',
            category: 'Music & Audio',
            condition: 'Like New',
            estimatedValue: 195,
            location: 'Jersey City, NJ',
            imageUrl: PRESET_IMAGES[4].url,
            description: 'Sunburst finish with maple neck. Tuned and set up with fresh D’Addario strings. Includes padded guitar gig bag and guitar strap.',
            wishlist: 'Looking for adjustable dumbbells, turntables, or Nintendo Switch.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-28T14:20:00Z'
        },
        {
            id: 'item_6',
            ownerId: 'usr_alex',
            title: 'Nintendo Switch OLED Model (White)',
            category: 'Gaming & Tech',
            condition: 'Like New',
            estimatedValue: 275,
            location: 'Brooklyn, NY',
            imageUrl: PRESET_IMAGES[5].url,
            description: 'Vibrant 7-inch OLED screen edition. Comes with white Joy-Cons, dock, HDMI cable, power adapter, and carrying case. Screen protector installed since day 1.',
            wishlist: 'Looking for vintage film cameras or electric guitar + cash top up.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-28T15:45:00Z'
        },
        {
            id: 'item_7',
            ownerId: 'usr_maya',
            title: 'Levi’s Vintage Sherpa Trucker Denim Jacket',
            category: 'Vintage & Fashion',
            condition: 'Like New',
            estimatedValue: 95,
            location: 'Manhattan, NY',
            imageUrl: PRESET_IMAGES[6].url,
            description: 'Classic medium wash denim trucker jacket with cozy warm sherpa lining. Unisex Size M. Barely worn, immaculate stitching.',
            wishlist: 'Looking for mechanical keyboard, vinyl record player, or audio gear.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-28T16:10:00Z'
        },
        {
            id: 'item_8',
            ownerId: 'usr_elena',
            title: 'Audio-Technica AT-LP60X Bluetooth Turntable',
            category: 'Music & Audio',
            condition: 'Good',
            estimatedValue: 135,
            location: 'Jersey City, NJ',
            imageUrl: PRESET_IMAGES[7].url,
            description: 'Fully automatic belt-drive stereo turntable with wireless Bluetooth connectivity and built-in phono preamp. Crystal clear vinyl sound.',
            wishlist: 'Looking for denim jacket or mechanical keyboard.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-28T17:00:00Z'
        }
    ];

    const INITIAL_OFFERS = [
        {
            id: 'off_sample_1',
            targetItemId: 'item_1', // Alex's Headphones ($180)
            targetOwnerId: 'usr_alex',
            offeredByUserId: 'usr_maya',
            offeredItemIds: ['item_7'], // Maya's Denim Jacket ($95)
            cashTopUp: 85, // Maya offers +$85 cash to balance the $180 - $95 = $85 gap!
            cashDirection: 'offer',
            note: 'Hey Alex! I love your Sony headphones. Offering my Levi Sherpa jacket plus $85 cash top-up to match your $180 valuation. Let me know!',
            status: 'pending',
            createdAt: '2026-08-28T18:00:00Z'
        },
        {
            id: 'off_sample_2',
            targetItemId: 'item_5', // Elena's Guitar ($195)
            targetOwnerId: 'usr_elena',
            offeredByUserId: 'usr_sam',
            offeredItemIds: ['item_4'], // Sam's Dumbbells ($175)
            cashTopUp: 20, // Sam offers +$20 cash
            cashDirection: 'offer',
            note: 'Hi Elena! I would love to trade my Bowflex adjustable dumbbells for your Fender Stratocaster. Adding $20 cash top up for the small delta!',
            status: 'accepted',
            createdAt: '2026-08-28T19:30:00Z'
        }
    ];

    const INITIAL_MESSAGES = [
        {
            id: 'msg_1',
            offerId: 'off_sample_2',
            senderId: 'usr_sam',
            text: 'Hey Elena! Thanks for accepting the trade proposal. Are you free to meet up near Washington Square Park tomorrow around 2 PM?',
            timestamp: '2026-08-28T19:35:00Z'
        },
        {
            id: 'msg_2',
            offerId: 'off_sample_2',
            senderId: 'usr_elena',
            text: 'Sounds great Sam! Tomorrow at 2 PM works. I will bring the guitar in its gig bag along with the strap. I can test the dumbbells on spot!',
            timestamp: '2026-08-28T19:40:00Z'
        }
    ];

    // APPLICATION STATE
    let state = {
        users: [],
        items: [],
        offers: [],
        messages: [],
        activeUserId: 'usr_alex',
        currentView: 'marketplace', // 'marketplace' | 'closet'
        searchQuery: '',
        activeCategory: 'all',
        topUpFilter: 'all', // 'all' | 'topup' | 'straight'
        sortBy: 'newest', // 'newest' | 'value-desc' | 'value-asc' | 'popular'
        selectedTargetItem: null,
        selectedOfferItemIds: [],
        activeChatOfferId: null
    };

    // DOM ELEMENTS CACHE
    const DOM = {
        appRoot: document.getElementById('app-root'),
        userPersonaSelect: document.getElementById('user-persona-select'),
        activePersonaAvatar: document.getElementById('active-persona-avatar'),
        activePersonaName: document.getElementById('active-persona-name'),
        searchInput: document.getElementById('search-input'),
        clearSearchBtn: document.getElementById('clear-search'),
        categoryPillsContainer: document.getElementById('category-pills-container'),
        topUpFilterSelect: document.getElementById('topup-filter'),
        sortSelect: document.getElementById('sort-select'),
        listingsGrid: document.getElementById('listings-grid'),
        emptyState: document.getElementById('empty-state'),
        emptyStateMsg: document.getElementById('empty-state-msg'),
        resetFiltersBtn: document.getElementById('reset-filters-btn'),
        viewTitle: document.getElementById('view-title'),
        viewCountText: document.getElementById('view-count-text'),
        closetCountBadge: document.getElementById('closet-count-badge'),
        inboxCountBadge: document.getElementById('inbox-count-badge'),
        
        // Navigation Buttons
        navFeedBtn: document.getElementById('nav-feed-btn'),
        navClosetBtn: document.getElementById('nav-closet-btn'),
        navInboxBtn: document.getElementById('nav-inbox-btn'),
        openAddItemModalBtn: document.getElementById('open-add-item-modal-btn'),
        brandLogoBtn: document.getElementById('brand-logo-btn'),
        resetDemoDataBtn: document.getElementById('reset-demo-data-btn'),
        
        // Modals
        itemDetailModal: document.getElementById('item-detail-modal'),
        itemDetailContent: document.getElementById('item-detail-content'),
        
        tradeBuilderModal: document.getElementById('trade-builder-modal'),
        builderTargetOwner: document.getElementById('builder-target-owner'),
        builderTargetCard: document.getElementById('builder-target-card'),
        builderOfferOwner: document.getElementById('builder-offer-owner'),
        builderClosetPicker: document.getElementById('builder-closet-picker'),
        tradeValueDeltaBadge: document.getElementById('trade-value-delta-badge'),
        topUpNoneRadio: document.getElementById('topup-none-radio'),
        topUpOfferRadio: document.getElementById('topup-offer-radio'),
        topUpRequestRadio: document.getElementById('topup-request-radio'),
        topUpAmountContainer: document.getElementById('topup-amount-container'),
        topUpAmountInput: document.getElementById('topup-amount-input'),
        topUpHint: document.getElementById('topup-hint'),
        tradeNoteInput: document.getElementById('trade-note-input'),
        tradeBuilderSummary: document.getElementById('trade-builder-summary'),
        submitTradeOfferBtn: document.getElementById('submit-trade-offer-btn'),

        inboxModal: document.getElementById('inbox-modal'),
        inboxReceivedCount: document.getElementById('inbox-received-count'),
        inboxSentCount: document.getElementById('inbox-sent-count'),
        inboxActiveCount: document.getElementById('inbox-active-count'),
        receivedOffersList: document.getElementById('received-offers-list'),
        sentOffersList: document.getElementById('sent-offers-list'),
        acceptedOffersList: document.getElementById('accepted-offers-list'),
        paneReceived: document.getElementById('pane-received'),
        paneSent: document.getElementById('pane-sent'),
        paneAccepted: document.getElementById('pane-accepted'),

        chatModal: document.getElementById('chat-modal'),
        chatTradeSubtitle: document.getElementById('chat-trade-subtitle'),
        chatDealSummaryBox: document.getElementById('chat-deal-summary-box'),
        chatMessagesList: document.getElementById('chat-messages-list'),
        chatForm: document.getElementById('chat-form'),
        chatMessageInput: document.getElementById('chat-message-input'),
        completeTradeBtn: document.getElementById('complete-trade-btn'),

        addItemModal: document.getElementById('add-item-modal'),
        addItemForm: document.getElementById('add-item-form'),
        imagePresetPicker: document.getElementById('image-preset-picker'),
        itemImageUrl: document.getElementById('item-image-url'),
        itemFileInput: document.getElementById('item-file-input'),

        toastContainer: document.getElementById('toast-container')
    };

    /* ==========================================================================
       INITIALIZATION & LOCAL STORAGE PERSISTENCE
       ========================================================================== */
    function initApp() {
        loadState();
        setupUserPersonaDropdown();
        setupPresetImagesPicker();
        bindEvents();
        render();
    }

    function loadState() {
        try {
            const usersData = localStorage.getItem(STORAGE_KEYS.USERS);
            const itemsData = localStorage.getItem(STORAGE_KEYS.ITEMS);
            const offersData = localStorage.getItem(STORAGE_KEYS.OFFERS);
            const messagesData = localStorage.getItem(STORAGE_KEYS.MESSAGES);
            const activeUser = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER);

            if (usersData && itemsData && offersData) {
                state.users = JSON.parse(usersData);
                state.items = JSON.parse(itemsData);
                state.offers = JSON.parse(offersData);
                state.messages = messagesData ? JSON.parse(messagesData) : [];
                if (activeUser) state.activeUserId = activeUser;
            } else {
                // Seed initial data
                state.users = INITIAL_USERS;
                state.items = INITIAL_ITEMS;
                state.offers = INITIAL_OFFERS;
                state.messages = INITIAL_MESSAGES;
                state.activeUserId = 'usr_alex';
                saveState();
            }
        } catch (e) {
            console.error('Error loading state from LocalStorage:', e);
            state.users = INITIAL_USERS;
            state.items = INITIAL_ITEMS;
            state.offers = INITIAL_OFFERS;
            state.messages = INITIAL_MESSAGES;
            state.activeUserId = 'usr_alex';
        }
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(state.users));
            localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(state.items));
            localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(state.offers));
            localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(state.messages));
            localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, state.activeUserId);
        } catch (e) {
            console.error('Error saving state to LocalStorage:', e);
        }
    }

    function resetDemoData() {
        localStorage.removeItem(STORAGE_KEYS.USERS);
        localStorage.removeItem(STORAGE_KEYS.ITEMS);
        localStorage.removeItem(STORAGE_KEYS.OFFERS);
        localStorage.removeItem(STORAGE_KEYS.MESSAGES);
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
        
        state.users = INITIAL_USERS;
        state.items = INITIAL_ITEMS;
        state.offers = INITIAL_OFFERS;
        state.messages = INITIAL_MESSAGES;
        state.activeUserId = 'usr_alex';
        saveState();

        showToast('Demo data restored to initial state!', 'success');
        setupUserPersonaDropdown();
        render();
    }

    /* ==========================================================================
       USER PERSONA & HEADER CONTROLS
       ========================================================================== */
    function setupUserPersonaDropdown() {
        DOM.userPersonaSelect.innerHTML = '';
        state.users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = `👤 ${user.name} (${user.location})`;
            if (user.id === state.activeUserId) option.selected = true;
            DOM.userPersonaSelect.appendChild(option);
        });
        updatePersonaHeaderDisplay();
    }

    function updatePersonaHeaderDisplay() {
        const currentUser = getActiveUser();
        if (currentUser) {
            DOM.activePersonaAvatar.src = currentUser.avatar;
            DOM.activePersonaName.textContent = currentUser.name.split(' ')[0];
        }
    }

    function getActiveUser() {
        return state.users.find(u => u.id === state.activeUserId) || state.users[0];
    }

    function getUserById(userId) {
        return state.users.find(u => u.id === userId) || { name: 'Unknown', avatar: '', location: '' };
    }

    function getItemById(itemId) {
        return state.items.find(i => i.id === itemId);
    }

    /* ==========================================================================
       EVENT BINDINGS
       ========================================================================== */
    function bindEvents() {
        // User Persona Change
        DOM.userPersonaSelect.addEventListener('change', (e) => {
            state.activeUserId = e.target.value;
            saveState();
            updatePersonaHeaderDisplay();
            showToast(`Switched persona to ${getActiveUser().name}`, 'info');
            render();
        });

        // Navigation
        DOM.navFeedBtn.addEventListener('click', () => {
            state.currentView = 'marketplace';
            render();
        });

        DOM.navClosetBtn.addEventListener('click', () => {
            state.currentView = 'closet';
            render();
        });

        DOM.brandLogoBtn.addEventListener('click', () => {
            state.currentView = 'marketplace';
            state.searchQuery = '';
            state.activeCategory = 'all';
            DOM.searchInput.value = '';
            render();
        });

        // Search Input
        DOM.searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.trim();
            DOM.clearSearchBtn.classList.toggle('hidden', state.searchQuery.length === 0);
            renderListings();
        });

        DOM.clearSearchBtn.addEventListener('click', () => {
            state.searchQuery = '';
            DOM.searchInput.value = '';
            DOM.clearSearchBtn.classList.add('hidden');
            renderListings();
        });

        // Category Pills
        DOM.categoryPillsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.pill-btn');
            if (!btn) return;

            DOM.categoryPillsContainer.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.activeCategory = btn.dataset.category;
            renderListings();
        });

        // Filters & Sort
        DOM.topUpFilterSelect.addEventListener('change', (e) => {
            state.topUpFilter = e.target.value;
            renderListings();
        });

        DOM.sortSelect.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            renderListings();
        });

        DOM.resetFiltersBtn.addEventListener('click', () => {
            state.searchQuery = '';
            state.activeCategory = 'all';
            state.topUpFilter = 'all';
            DOM.searchInput.value = '';
            DOM.clearSearchBtn.classList.add('hidden');
            DOM.topUpFilterSelect.value = 'all';
            DOM.categoryPillsContainer.querySelectorAll('.pill-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.category === 'all');
            });
            renderListings();
        });

        // Modals Open / Close handlers
        DOM.openAddItemModalBtn.addEventListener('click', () => openModal('add-item-modal'));
        DOM.navInboxBtn.addEventListener('click', () => {
            renderInboxContent();
            openModal('inbox-modal');
        });

        DOM.resetDemoDataBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all demo items, users, and offers?')) {
                resetDemoData();
            }
        });

        // Close modal buttons
        document.querySelectorAll('[data-close-modal]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.dataset.close-modal;
                closeModal(modalId);
            });
        });

        // Overlay click to close
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal(overlay.id);
            });
        });

        // Add Item Form Submit
        DOM.addItemForm.addEventListener('submit', handleAddItemSubmit);

        // Trade Builder Inputs
        DOM.topUpNoneRadio.addEventListener('change', updateTradeBuilderCalculations);
        DOM.topUpOfferRadio.addEventListener('change', updateTradeBuilderCalculations);
        DOM.topUpRequestRadio.addEventListener('change', updateTradeBuilderCalculations);
        DOM.topUpAmountInput.addEventListener('input', updateTradeBuilderCalculations);
        DOM.submitTradeOfferBtn.addEventListener('click', handleSubmitTradeProposal);

        // Inbox Tabs
        document.querySelectorAll('.inbox-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.inbox-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const tab = btn.dataset.tab;
                DOM.paneReceived.classList.toggle('hidden', tab !== 'received');
                DOM.paneSent.classList.toggle('hidden', tab !== 'sent');
                DOM.paneAccepted.classList.toggle('hidden', tab !== 'accepted');
            });
        });

        // Chat Form Submit
        DOM.chatForm.addEventListener('submit', handleSendChatMessage);
        DOM.completeTradeBtn.addEventListener('click', handleCompleteTrade);
    }

    /* ==========================================================================
       MAIN RENDERING ENGINE
       ========================================================================== */
    function render() {
        updateBadges();
        updateNavState();
        renderListings();
    }

    function updateNavState() {
        DOM.navFeedBtn.classList.toggle('active', state.currentView === 'marketplace');
        DOM.navClosetBtn.classList.toggle('active', state.currentView === 'closet');

        if (state.currentView === 'closet') {
            const user = getActiveUser();
            DOM.viewTitle.textContent = `My Closet (${user.name})`;
        } else {
            DOM.viewTitle.textContent = 'Available for Barter';
        }
    }

    function updateBadges() {
        const closetItems = state.items.filter(i => i.ownerId === state.activeUserId && i.status === 'available');
        DOM.closetCountBadge.textContent = closetItems.length;

        const pendingReceived = state.offers.filter(o => o.targetOwnerId === state.activeUserId && o.status === 'pending');
        DOM.inboxCountBadge.textContent = pendingReceived.length;
        DOM.inboxCountBadge.classList.toggle('hidden', pendingReceived.length === 0);
    }

    function filterItems() {
        return state.items.filter(item => {
            // View mode filter
            if (state.currentView === 'closet' && item.ownerId !== state.activeUserId) {
                return false;
            }
            if (state.currentView === 'marketplace' && item.ownerId === state.activeUserId) {
                // In marketplace mode, show everything or exclude owned if desired.
                // We show all items, highlighting owned ones.
            }

            // Category filter
            if (state.activeCategory !== 'all' && item.category !== state.activeCategory) {
                return false;
            }

            // Top up filter
            if (state.topUpFilter === 'topup' && !item.allowTopUp) return false;
            if (state.topUpFilter === 'straight' && item.allowTopUp) return false;

            // Search query
            if (state.searchQuery) {
                const q = state.searchQuery.toLowerCase();
                const matchTitle = item.title.toLowerCase().includes(q);
                const matchDesc = item.description.toLowerCase().includes(q);
                const matchWish = (item.wishlist || '').toLowerCase().includes(q);
                const matchLoc = item.location.toLowerCase().includes(q);
                if (!matchTitle && !matchDesc && !matchWish && !matchLoc) return false;
            }

            return true;
        }).sort((a, b) => {
            if (state.sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
            if (state.sortBy === 'value-desc') return b.estimatedValue - a.estimatedValue;
            if (state.sortBy === 'value-asc') return a.estimatedValue - b.estimatedValue;
            return 0;
        });
    }

    function renderListings() {
        const filtered = filterItems();
        DOM.listingsGrid.innerHTML = '';

        DOM.viewCountText.textContent = `Showing ${filtered.length} item${filtered.length === 1 ? '' : 's'}`;

        if (filtered.length === 0) {
            DOM.emptyState.classList.remove('hidden');
            if (state.currentView === 'closet') {
                DOM.emptyStateMsg.textContent = "Your closet is currently empty. Click 'List An Item' to add items you want to barter!";
            } else {
                DOM.emptyStateMsg.textContent = "No barter listings match your current search or category filter.";
            }
            return;
        } else {
            DOM.emptyState.classList.add('hidden');
        }

        filtered.forEach(item => {
            const card = createItemCard(item);
            DOM.listingsGrid.appendChild(card);
        });
    }

    function createItemCard(item) {
        const owner = getUserById(item.ownerId);
        const isOwnedByMe = item.ownerId === state.activeUserId;

        const card = document.createElement('div');
        card.className = 'barter-card';

        const topUpBadgeText = item.allowTopUp ? '💵 Accepts Top-Up' : '🔄 Straight Swap';
        const topUpClass = item.allowTopUp ? '' : 'straight-swap';

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}" class="card-image" loading="lazy">
                <span class="card-value-tag">Est. $${item.estimatedValue}</span>
                <span class="card-topup-badge ${topUpClass}">${topUpBadgeText}</span>
            </div>
            <div class="card-body">
                <div class="card-meta-row">
                    <span class="card-category">${escapeHtml(item.category)}</span>
                    <span class="card-condition">${escapeHtml(item.condition)}</span>
                </div>
                <h3 class="card-title">${escapeHtml(item.title)}</h3>
                <p class="card-description">${escapeHtml(item.description)}</p>

                <div class="card-wishlist-box">
                    <span class="wishlist-label"><i class="fa-solid fa-gift"></i> Looking for:</span>
                    <div class="wishlist-text">${escapeHtml(item.wishlist || 'Open to all physical item offers')}</div>
                </div>

                <div class="card-footer">
                    <div class="owner-info">
                        <img src="${escapeHtml(owner.avatar)}" alt="${escapeHtml(owner.name)}" class="owner-avatar">
                        <div class="owner-details">
                            <span class="owner-name">${escapeHtml(owner.name)} ${isOwnedByMe ? '(You)' : ''}</span>
                            <span class="owner-location"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(item.location)}</span>
                        </div>
                    </div>

                    <div class="card-actions">
                        ${isOwnedByMe ? `
                            <button class="btn btn-secondary btn-sm edit-item-btn" data-id="${item.id}" title="Delete listing">
                                <i class="fa-solid fa-trash"></i> Delete
                            </button>
                        ` : `
                            <button class="btn btn-primary btn-sm propose-trade-btn" data-id="${item.id}">
                                <i class="fa-solid fa-handshake"></i> Propose Barter
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;

        // Card Click opens Detail Modal (unless clicking action button)
        card.addEventListener('click', (e) => {
            if (e.target.closest('.card-actions')) return;
            openItemDetailModal(item);
        });

        // Propose Trade Button
        const proposeBtn = card.querySelector('.propose-trade-btn');
        if (proposeBtn) {
            proposeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openTradeBuilderModal(item);
            });
        }

        // Delete Item Button
        const deleteBtn = card.querySelector('.edit-item-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(`Are you sure you want to remove "${item.title}" from your closet?`)) {
                    deleteItem(item.id);
                }
            });
        }

        return card;
    }

    function deleteItem(itemId) {
        state.items = state.items.filter(i => i.id !== itemId);
        saveState();
        showToast('Item removed from closet', 'info');
        render();
    }

    /* ==========================================================================
       MODAL 1: ITEM DETAIL MODAL
       ========================================================================== */
    function openItemDetailModal(item) {
        const owner = getUserById(item.ownerId);
        const isOwnedByMe = item.ownerId === state.activeUserId;

        DOM.itemDetailContent.innerHTML = `
            <div class="detail-image-box">
                <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}">
            </div>
            <div class="detail-info-box">
                <div class="detail-category-row">
                    <span class="card-category">${escapeHtml(item.category)}</span>
                    <span class="card-condition">${escapeHtml(item.condition)}</span>
                </div>
                <h2 class="detail-title">${escapeHtml(item.title)}</h2>

                <div class="detail-price-box">
                    <span class="detail-value">Estimated Value: $${item.estimatedValue}</span>
                    <span class="detail-topup-status">${item.allowTopUp ? '💵 Cash Top-Up Allowed' : '🔄 Straight Swap Only'}</span>
                </div>

                <p class="detail-desc">${escapeHtml(item.description)}</p>

                <div class="detail-wishlist-box">
                    <span class="detail-wishlist-title"><i class="fa-solid fa-gift"></i> Owner's Swap Wishlist:</span>
                    <p style="color: #cbd5e1; font-size: 0.9rem;">${escapeHtml(item.wishlist || 'Open to any fair value physical item proposal.')}</p>
                </div>

                <div class="detail-owner-card">
                    <img src="${escapeHtml(owner.avatar)}" alt="${escapeHtml(owner.name)}" class="owner-avatar" style="width: 44px; height: 44px;">
                    <div>
                        <strong style="color: #fff; font-size: 0.95rem;">Listed by ${escapeHtml(owner.name)} ${isOwnedByMe ? '(You)' : ''}</strong>
                        <div style="font-size: 0.8rem; color: #94a3b8;"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(item.location)}</div>
                    </div>
                </div>

                <div style="margin-top: auto; display: flex; gap: 0.75rem;">
                    ${isOwnedByMe ? `
                        <button class="btn btn-secondary btn-lg" style="width: 100%;" onclick="alert('This item is in your closet!')">In Your Closet</button>
                    ` : `
                        <button class="btn btn-primary btn-lg detail-propose-btn" style="width: 100%;">
                            <i class="fa-solid fa-handshake"></i> Propose Barter Deal Now
                        </button>
                    `}
                </div>
            </div>
        `;

        const proposeBtn = DOM.itemDetailContent.querySelector('.detail-propose-btn');
        if (proposeBtn) {
            proposeBtn.addEventListener('click', () => {
                closeModal('item-detail-modal');
                openTradeBuilderModal(item);
            });
        }

        openModal('item-detail-modal');
    }

    /* ==========================================================================
       MODAL 2: BARTER DEAL BUILDER (THE TRADE PROPOSAL MATRIX)
       ========================================================================== */
    function openTradeBuilderModal(targetItem) {
        state.selectedTargetItem = targetItem;
        state.selectedOfferItemIds = [];

        const owner = getUserById(targetItem.ownerId);
        DOM.builderTargetOwner.textContent = `Owner: ${owner.name}`;

        // Render target item preview
        DOM.builderTargetCard.innerHTML = `
            <img src="${escapeHtml(targetItem.imageUrl)}" alt="${escapeHtml(targetItem.title)}" class="target-img-thumb">
            <div class="target-item-details">
                <span class="target-item-title">${escapeHtml(targetItem.title)}</span>
                <span style="font-size: 0.75rem; color: #6366f1;">${escapeHtml(targetItem.category)} • ${escapeHtml(targetItem.condition)}</span>
                <span class="target-item-val">Est. $${targetItem.estimatedValue}</span>
            </div>
        `;

        // Render closet items of active user
        const myClosetItems = state.items.filter(i => i.ownerId === state.activeUserId && i.status === 'available');
        DOM.builderClosetPicker.innerHTML = '';

        if (myClosetItems.length === 0) {
            DOM.builderClosetPicker.innerHTML = `
                <div style="padding: 1rem; text-align: center; color: #94a3b8; font-size: 0.85rem; background: rgba(30,41,59,0.3); border-radius: 8px;">
                    <i class="fa-solid fa-info-circle"></i> You have no items in your closet. You can offer a <strong>Cash Top-Up</strong> only or list an item first!
                </div>
            `;
        } else {
            myClosetItems.forEach(item => {
                const row = document.createElement('div');
                row.className = 'closet-pick-item';
                row.dataset.id = item.id;
                row.innerHTML = `
                    <input type="checkbox" class="closet-item-checkbox" id="chk-${item.id}">
                    <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}" class="closet-pick-thumb">
                    <div class="closet-pick-info">
                        <span class="closet-pick-title">${escapeHtml(item.title)}</span>
                        <span class="closet-pick-val">Est. $${item.estimatedValue}</span>
                    </div>
                `;

                row.addEventListener('click', (e) => {
                    const checkbox = row.querySelector('.closet-item-checkbox');
                    if (e.target !== checkbox) checkbox.checked = !checkbox.checked;

                    row.classList.toggle('selected', checkbox.checked);
                    
                    if (checkbox.checked) {
                        state.selectedOfferItemIds.push(item.id);
                    } else {
                        state.selectedOfferItemIds = state.selectedOfferItemIds.filter(id => id !== item.id);
                    }
                    updateTradeBuilderCalculations();
                });

                DOM.builderClosetPicker.appendChild(row);
            });
        }

        // Reset inputs
        DOM.topUpNoneRadio.checked = true;
        DOM.topUpAmountInput.value = 0;
        DOM.topUpAmountContainer.classList.add('hidden');
        DOM.tradeNoteInput.value = '';

        updateTradeBuilderCalculations();
        openModal('trade-builder-modal');
    }

    function updateTradeBuilderCalculations() {
        if (!state.selectedTargetItem) return;

        const targetVal = state.selectedTargetItem.estimatedValue;
        
        // Sum selected offered items
        let offeredItemsVal = 0;
        state.selectedOfferItemIds.forEach(id => {
            const item = getItemById(id);
            if (item) offeredItemsVal += item.estimatedValue;
        });

        const direction = document.querySelector('input[name="topup-direction"]:checked')?.value || 'none';
        DOM.topUpAmountContainer.classList.toggle('hidden', direction === 'none');

        let topUpVal = parseFloat(DOM.topUpAmountInput.value) || 0;
        if (direction === 'none') topUpVal = 0;

        let netOfferedValue = offeredItemsVal;
        if (direction === 'offer') {
            netOfferedValue += topUpVal;
            DOM.topUpHint.textContent = `+$${topUpVal} cash will be paid by you upon meet-up.`;
        } else if (direction === 'request') {
            netOfferedValue -= topUpVal;
            DOM.topUpHint.textContent = `-$${topUpVal} cash requested from item owner upon meet-up.`;
        }

        const delta = targetVal - offeredItemsVal;
        if (delta > 0) {
            DOM.tradeValueDeltaBadge.textContent = `Value Gap: +$${delta} for target item`;
            DOM.tradeValueDeltaBadge.style.color = '#f59e0b';
        } else if (delta < 0) {
            DOM.tradeValueDeltaBadge.textContent = `Value Gap: +$${Math.abs(delta)} for your offer`;
            DOM.tradeValueDeltaBadge.style.color = '#10b981';
        } else {
            DOM.tradeValueDeltaBadge.textContent = `Equal Estimated Value ($${targetVal})`;
            DOM.tradeValueDeltaBadge.style.color = '#818cf8';
        }

        // Auto suggestion hint if topup radio changed first time
        if (direction === 'offer' && topUpVal === 0 && delta > 0) {
            DOM.topUpAmountInput.value = delta;
            netOfferedValue = offeredItemsVal + delta;
        }

        DOM.tradeBuilderSummary.innerHTML = `
            Your Total Offer: <strong>$${netOfferedValue}</strong> (${offeredItemsVal} items + ${direction === 'offer' ? '$' + topUpVal + ' cash' : 'no cash'}) vs Target: <strong>$${targetVal}</strong>
        `;
    }

    function handleSubmitTradeProposal() {
        if (!state.selectedTargetItem) return;

        const direction = document.querySelector('input[name="topup-direction"]:checked')?.value || 'none';
        const cashAmount = parseFloat(DOM.topUpAmountInput.value) || 0;

        if (state.selectedOfferItemIds.length === 0 && (direction === 'none' || cashAmount <= 0)) {
            alert('Please select at least 1 item from your closet OR add a Cash Top-Up amount to make an offer!');
            return;
        }

        const newOffer = {
            id: 'off_' + Date.now(),
            targetItemId: state.selectedTargetItem.id,
            targetOwnerId: state.selectedTargetItem.ownerId,
            offeredByUserId: state.activeUserId,
            offeredItemIds: [...state.selectedOfferItemIds],
            cashTopUp: cashAmount,
            cashDirection: direction,
            note: DOM.tradeNoteInput.value.trim() || 'Excited to barter with you!',
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        state.offers.unshift(newOffer);
        saveState();

        const owner = getUserById(state.selectedTargetItem.ownerId);
        showToast(`Barter proposal sent to ${owner.name}!`, 'success');

        closeModal('trade-builder-modal');
        updateBadges();
    }

    /* ==========================================================================
       MODAL 3: INBOX & OFFERS MANAGEMENT
       ========================================================================== */
    function renderInboxContent() {
        const received = state.offers.filter(o => o.targetOwnerId === state.activeUserId);
        const sent = state.offers.filter(o => o.offeredByUserId === state.activeUserId);
        const activeAccepted = state.offers.filter(o => (o.targetOwnerId === state.activeUserId || o.offeredByUserId === state.activeUserId) && (o.status === 'accepted' || o.status === 'completed'));

        DOM.inboxReceivedCount.textContent = received.length;
        DOM.inboxSentCount.textContent = sent.length;
        DOM.inboxActiveCount.textContent = activeAccepted.length;

        renderReceivedOffers(received);
        renderSentOffers(sent);
        renderActiveTrades(activeAccepted);
    }

    function renderReceivedOffers(list) {
        DOM.receivedOffersList.innerHTML = '';
        if (list.length === 0) {
            DOM.receivedOffersList.innerHTML = `
                <div style="text-align: center; padding: 2.5rem; color: #94a3b8;">
                    <i class="fa-solid fa-inbox" style="font-size: 2.5rem; margin-bottom: 0.5rem;"></i>
                    <p>No trade proposals received yet.</p>
                </div>
            `;
            return;
        }

        list.forEach(offer => {
            const card = createOfferCard(offer, 'received');
            DOM.receivedOffersList.appendChild(card);
        });
    }

    function renderSentOffers(list) {
        DOM.sentOffersList.innerHTML = '';
        if (list.length === 0) {
            DOM.sentOffersList.innerHTML = `
                <div style="text-align: center; padding: 2.5rem; color: #94a3b8;">
                    <i class="fa-solid fa-paper-plane" style="font-size: 2.5rem; margin-bottom: 0.5rem;"></i>
                    <p>You haven't sent any trade proposals yet.</p>
                </div>
            `;
            return;
        }

        list.forEach(offer => {
            const card = createOfferCard(offer, 'sent');
            DOM.sentOffersList.appendChild(card);
        });
    }

    function renderActiveTrades(list) {
        DOM.acceptedOffersList.innerHTML = '';
        if (list.length === 0) {
            DOM.acceptedOffersList.innerHTML = `
                <div style="text-align: center; padding: 2.5rem; color: #94a3b8;">
                    <i class="fa-solid fa-handshake-check" style="font-size: 2.5rem; margin-bottom: 0.5rem;"></i>
                    <p>No active accepted trades yet. Accept a proposal to open trade meet-up chat!</p>
                </div>
            `;
            return;
        }

        list.forEach(offer => {
            const card = createOfferCard(offer, 'active');
            DOM.acceptedOffersList.appendChild(card);
        });
    }

    function createOfferCard(offer, type) {
        const card = document.createElement('div');
        card.className = 'offer-item-card';

        const targetItem = getItemById(offer.targetItemId);
        const offerer = getUserById(offer.offeredByUserId);
        const owner = getUserById(offer.targetOwnerId);

        const offeredItems = offer.offeredItemIds.map(id => getItemById(id)).filter(Boolean);
        const offeredItemsVal = offeredItems.reduce((acc, i) => acc + i.estimatedValue, 0);

        let cashPillHtml = '';
        if (offer.cashDirection === 'offer' && offer.cashTopUp > 0) {
            cashPillHtml = `<span class="cash-topup-pill">+ $${offer.cashTopUp} Cash Top-Up Paid By Offerer</span>`;
        } else if (offer.cashDirection === 'request' && offer.cashTopUp > 0) {
            cashPillHtml = `<span class="cash-topup-pill">Requests $${offer.cashTopUp} Cash Top-Up</span>`;
        }

        const isReceived = type === 'received';
        const displayUser = isReceived ? offerer : owner;
        const roleLabel = isReceived ? 'Proposer' : 'Target Owner';

        const statusClass = `status-${offer.status}`;

        card.innerHTML = `
            <div class="offer-card-header">
                <div class="offer-user-info">
                    <img src="${escapeHtml(displayUser.avatar)}" alt="${escapeHtml(displayUser.name)}" class="owner-avatar">
                    <div>
                        <strong style="color: #fff;">${escapeHtml(displayUser.name)}</strong>
                        <span style="font-size: 0.75rem; color: #94a3b8; margin-left: 0.3rem;">(${roleLabel})</span>
                        <div style="font-size: 0.7rem; color: #64748b;">${new Date(offer.createdAt).toLocaleDateString()}</div>
                    </div>
                </div>
                <span class="offer-status-badge ${statusClass}">${offer.status}</span>
            </div>

            <div class="offer-comparison-row">
                <!-- Target Item -->
                <div class="offer-side-item">
                    <img src="${escapeHtml(targetItem ? targetItem.imageUrl : '')}" alt="Target">
                    <div class="offer-item-meta">
                        <strong>${escapeHtml(targetItem ? targetItem.title : 'Item')}</strong>
                        <span>Est. $${targetItem ? targetItem.estimatedValue : 0}</span>
                    </div>
                </div>

                <div style="text-align: center; color: #6366f1; font-weight: bold;">
                    <i class="fa-solid fa-arrow-right-arrow-left"></i>
                </div>

                <!-- Offered Item(s) -->
                <div class="offer-side-item">
                    ${offeredItems.length > 0 ? `
                        <img src="${escapeHtml(offeredItems[0].imageUrl)}" alt="Offered">
                        <div class="offer-item-meta">
                            <strong>${escapeHtml(offeredItems.map(i => i.title).join(', '))}</strong>
                            <span>Est. $${offeredItemsVal}</span>
                            ${cashPillHtml}
                        </div>
                    ` : `
                        <div class="offer-item-meta">
                            <strong>Cash Only Offer</strong>
                            ${cashPillHtml}
                        </div>
                    `}
                </div>
            </div>

            <div class="offer-note-preview">
                "${escapeHtml(offer.note)}"
            </div>

            <div class="offer-card-footer">
                <span style="font-size: 0.8rem; color: #94a3b8;">Offer ID: ${offer.id}</span>
                <div style="display: flex; gap: 0.5rem;">
                    ${isReceived && offer.status === 'pending' ? `
                        <button class="btn btn-danger btn-sm decline-offer-btn" data-id="${offer.id}">Decline</button>
                        <button class="btn btn-success btn-sm accept-offer-btn" data-id="${offer.id}">Accept Trade</button>
                    ` : ''}
                    ${(offer.status === 'accepted' || offer.status === 'completed') ? `
                        <button class="btn btn-primary btn-sm open-chat-btn" data-id="${offer.id}">
                            <i class="fa-solid fa-comments"></i> Meet-Up Chat
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        // Action Handlers
        const acceptBtn = card.querySelector('.accept-offer-btn');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => handleAcceptOffer(offer.id));
        }

        const declineBtn = card.querySelector('.decline-offer-btn');
        if (declineBtn) {
            declineBtn.addEventListener('click', () => handleDeclineOffer(offer.id));
        }

        const chatBtn = card.querySelector('.open-chat-btn');
        if (chatBtn) {
            chatBtn.addEventListener('click', () => {
                closeModal('inbox-modal');
                openChatModal(offer.id);
            });
        }

        return card;
    }

    function handleAcceptOffer(offerId) {
        const offer = state.offers.find(o => o.id === offerId);
        if (!offer) return;

        offer.status = 'accepted';

        // Add automated notification message to chat thread if empty
        const existingMsgs = state.messages.filter(m => m.offerId === offerId);
        if (existingMsgs.length === 0) {
            state.messages.push({
                id: 'msg_' + Date.now(),
                offerId: offerId,
                senderId: state.activeUserId,
                text: `🎉 Trade proposal accepted! Let's arrange a convenient meet-up time and safe public place to exchange items.`,
                timestamp: new Date().toISOString()
            });
        }

        saveState();
        showToast('Trade offer accepted! You can now chat to organize meet-up.', 'success');
        renderInboxContent();
        updateBadges();

        openChatModal(offerId);
    }

    function handleDeclineOffer(offerId) {
        const offer = state.offers.find(o => o.id === offerId);
        if (!offer) return;

        offer.status = 'rejected';
        saveState();
        showToast('Trade offer declined.', 'info');
        renderInboxContent();
        updateBadges();
    }

    /* ==========================================================================
       MODAL 4: MEET-UP CHAT & COORDINATION
       ========================================================================== */
    function openChatModal(offerId) {
        state.activeChatOfferId = offerId;
        const offer = state.offers.find(o => o.id === offerId);
        if (!offer) return;

        const targetItem = getItemById(offer.targetItemId);
        const offerer = getUserById(offer.offeredByUserId);
        const owner = getUserById(offer.targetOwnerId);

        const otherUser = offer.targetOwnerId === state.activeUserId ? offerer : owner;
        DOM.chatTradeSubtitle.textContent = `Coordinating barter meet-up with ${otherUser.name} (${otherUser.location})`;

        const offeredItems = offer.offeredItemIds.map(id => getItemById(id)).filter(Boolean);
        const offeredTitle = offeredItems.length > 0 ? offeredItems.map(i => i.title).join(', ') : 'Cash Offer';

        let cashText = '';
        if (offer.cashDirection === 'offer' && offer.cashTopUp > 0) {
            cashText = `+ $${offer.cashTopUp} Cash Top-Up`;
        }

        DOM.chatDealSummaryBox.innerHTML = `
            <div>
                <strong>Agreed Barter:</strong> Exchanging <em>${targetItem ? targetItem.title : 'Item'}</em> for <em>${offeredTitle} ${cashText}</em>
            </div>
            <div>
                <span class="offer-status-badge status-${offer.status}">${offer.status}</span>
            </div>
        `;

        DOM.completeTradeBtn.classList.toggle('hidden', offer.status === 'completed');

        renderChatMessages();
        openModal('chat-modal');
    }

    function renderChatMessages() {
        if (!state.activeChatOfferId) return;

        const msgs = state.messages.filter(m => m.offerId === state.activeChatOfferId);
        DOM.chatMessagesList.innerHTML = '';

        msgs.forEach(msg => {
            const sender = getUserById(msg.senderId);
            const isMine = msg.senderId === state.activeUserId;

            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${isMine ? 'chat-bubble-mine' : 'chat-bubble-other'}`;

            const timeStr = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            bubble.innerHTML = `
                ${!isMine ? `<div class="chat-sender-name">${escapeHtml(sender.name)}</div>` : ''}
                <div>${escapeHtml(msg.text)}</div>
                <div class="chat-time">${timeStr}</div>
            `;

            DOM.chatMessagesList.appendChild(bubble);
        });

        DOM.chatMessagesList.scrollTop = DOM.chatMessagesList.scrollHeight;
    }

    function handleSendChatMessage(e) {
        e.preventDefault();
        const text = DOM.chatMessageInput.value.trim();
        if (!text || !state.activeChatOfferId) return;

        const newMsg = {
            id: 'msg_' + Date.now(),
            offerId: state.activeChatOfferId,
            senderId: state.activeUserId,
            text: text,
            timestamp: new Date().toISOString()
        };

        state.messages.push(newMsg);
        saveState();

        DOM.chatMessageInput.value = '';
        renderChatMessages();
    }

    function handleCompleteTrade() {
        if (!state.activeChatOfferId) return;
        const offer = state.offers.find(o => o.id === state.activeChatOfferId);
        if (!offer) return;

        if (confirm('Mark this barter as successfully completed? Items will be archived as swapped.')) {
            offer.status = 'completed';

            // Mark items as swapped
            const targetItem = getItemById(offer.targetItemId);
            if (targetItem) targetItem.status = 'swapped';

            offer.offeredItemIds.forEach(id => {
                const item = getItemById(id);
                if (item) item.status = 'swapped';
            });

            state.messages.push({
                id: 'msg_' + Date.now(),
                offerId: offer.id,
                senderId: state.activeUserId,
                text: '🎉 Trade marked as COMPLETED! Thank you for bartering!',
                timestamp: new Date().toISOString()
            });

            saveState();
            showToast('Barter trade successfully completed! 🎉', 'success');
            openChatModal(offer.id);
            render();
        }
    }

    /* ==========================================================================
       MODAL 5: ADD ITEM / MY CLOSET
       ========================================================================== */
    function setupPresetImagesPicker() {
        DOM.imagePresetPicker.innerHTML = '';
        PRESET_IMAGES.forEach((preset, index) => {
            const img = document.createElement('img');
            img.src = preset.url;
            img.alt = preset.name;
            img.className = `preset-thumb ${index === 0 ? 'selected' : ''}`;
            img.dataset.url = preset.url;

            img.addEventListener('click', () => {
                DOM.imagePresetPicker.querySelectorAll('.preset-thumb').forEach(t => t.classList.remove('selected'));
                img.classList.add('selected');
                DOM.itemImageUrl.value = preset.url;
            });

            DOM.imagePresetPicker.appendChild(img);
        });

        DOM.itemImageUrl.value = PRESET_IMAGES[0].url;

        // Custom File Upload reader
        DOM.itemFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (evt) {
                    DOM.itemImageUrl.value = evt.target.result;
                    showToast('Local photo loaded!', 'info');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function handleAddItemSubmit(e) {
        e.preventDefault();

        const title = document.getElementById('item-title-input').value.trim();
        const category = document.getElementById('item-category-input').value;
        const condition = document.getElementById('item-condition-input').value;
        const estimatedValue = parseFloat(document.getElementById('item-value-input').value) || 0;
        const location = document.getElementById('item-location-input').value.trim();
        const imageUrl = DOM.itemImageUrl.value.trim() || PRESET_IMAGES[0].url;
        const description = document.getElementById('item-description-input').value.trim();
        const wishlist = document.getElementById('item-wishlist-input').value.trim();
        const allowTopUp = document.getElementById('item-topup-allowed-checkbox').checked;

        if (!title || estimatedValue <= 0 || !location || !description) {
            alert('Please fill in all required fields.');
            return;
        }

        const newItem = {
            id: 'item_' + Date.now(),
            ownerId: state.activeUserId,
            title,
            category,
            condition,
            estimatedValue,
            location,
            imageUrl,
            description,
            wishlist: wishlist || 'Open to all physical barter proposals',
            allowTopUp,
            status: 'available',
            createdAt: new Date().toISOString()
        };

        state.items.unshift(newItem);
        saveState();

        showToast(`"${title}" listed in your closet!`, 'success');
        DOM.addItemForm.reset();
        setupPresetImagesPicker();
        closeModal('add-item-modal');

        state.currentView = 'closet';
        render();
    }

    /* ==========================================================================
       UTILITY FUNCTIONS & TOASTS
       ========================================================================== */
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('hidden');
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('hidden');
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const iconMap = {
            success: 'fa-circle-check',
            info: 'fa-circle-info',
            warning: 'fa-triangle-exclamation'
        };

        toast.innerHTML = `
            <i class="fa-solid ${iconMap[type] || 'fa-circle-info'}"></i>
            <span>${escapeHtml(message)}</span>
        `;

        DOM.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // INITIALIZE APP ON DOM READY
    document.addEventListener('DOMContentLoaded', initApp);

})();
