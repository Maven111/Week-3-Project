/* ==========================================================================
   BUY BY BARTER NIGERIA - Core Application Logic (V2)
   Nigerian Peer-to-Peer Physical Item Exchange & Cash Top-Up (₦) Platform
   ========================================================================== */

(function () {
    'use strict';

    // LOCAL STORAGE KEYS
    const STORAGE_KEYS = {
        USERS: 'bbb_users_v3',
        ITEMS: 'bbb_items_v3',
        OFFERS: 'bbb_offers_v3',
        MESSAGES: 'bbb_messages_v3',
        ACTIVE_USER: 'bbb_active_user_v3',
        THEME: 'bbb_theme_v3'
    };

    // HIGH-QUALITY PRESET IMAGE URLS FOR CLEAN DEMO LISTINGS
    const PRESET_IMAGES = [
        { name: 'Nokia 3310 Phone', url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80' },
        { name: 'Sony Walkman Phone', url: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=600&q=80' },
        { name: 'Teak Dining Set', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80' },
        { name: 'Generator', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
        { name: 'Double Door Fridge', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80' },
        { name: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80' },
        { name: 'Film Camera', url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80' },
        { name: 'Keyboard', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80' },
        { name: 'Dumbbells', url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80' },
        { name: 'Electric Guitar', url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80' },
        { name: 'Gaming Console', url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80' },
        { name: 'Aso-Oke Vintage', url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80' },
        { name: 'PS5 Console', url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80' },
        { name: 'PS4 Slim Console', url: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&w=600&q=80' },
        { name: 'Racing Wheel', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80' },
        { name: 'ASUS ROG Ally', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80' }
    ];

    // NIGERIAN PERSONA USERS
    const INITIAL_USERS = [
        {
            id: 'usr_tunde',
            name: 'Tunde Bakare',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
            bio: 'Tech entrepreneur, mechanical keyboard builder, & vintage gadget enthusiast.',
            location: 'Yaba, Lagos'
        },
        {
            id: 'usr_amina',
            name: 'Amina Bello',
            avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80',
            bio: 'Vintage fashion curator, analog camera lover, & retro tech collector.',
            location: 'Wuse II, Abuja'
        },
        {
            id: 'usr_chidi',
            name: 'Chidi Okonkwo',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
            bio: 'Software engineer, smart home enthusiast, & power backup expert.',
            location: 'Lekki Phase 1, Lagos'
        },
        {
            id: 'usr_funke',
            name: 'Funke Akindele',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            bio: 'Interior designer, high-end furniture collector, & afrobeat vinyl enthusiast.',
            location: 'Bodija, Ibadan'
        }
    ];

    // NIGERIAN CENTRIC ITEMS & VALUATIONS (IN NAIRA ₦)
    const INITIAL_ITEMS = [
        // --- VINTAGE & FASHION ---
        {
            id: 'item_vintage_1',
            ownerId: 'usr_amina',
            title: 'Nokia 3310 Classic Vintage Cellphone (Original)',
            category: 'Vintage & Fashion',
            condition: 'Good',
            estimatedValue: 25000,
            location: 'Wuse II, Abuja',
            distanceKm: 3.5,
            imageUrl: PRESET_IMAGES[0].url,
            description: 'Original legendary Nokia 3310 in dark navy blue. Working condition with battery and charger. Plays Snake II perfectly!',
            wishlist: 'Looking for mechanical keyboard or vintage audio accessories.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T08:00:00Z'
        },
        {
            id: 'item_vintage_2',
            ownerId: 'usr_tunde',
            title: 'Sony Ericsson Walkman W810i Slider Phone',
            category: 'Vintage & Fashion',
            condition: 'Like New',
            estimatedValue: 30000,
            location: 'Yaba, Lagos',
            distanceKm: 2.0,
            imageUrl: PRESET_IMAGES[1].url,
            description: 'Retro 2006 Walkman music phone with original orange earphones and Memory Stick PRO Duo. Rare collector’s condition.',
            wishlist: 'Looking for noise-cancelling headphones or vintage vinyl turntable.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T08:30:00Z'
        },
        {
            id: 'item_vintage_3',
            ownerId: 'usr_funke',
            title: 'Authentic Handwoven Vintage Aso-Oke Agbada Set',
            category: 'Vintage & Fashion',
            condition: 'Like New',
            estimatedValue: 65000,
            location: 'Bodija, Ibadan',
            distanceKm: 12.0,
            imageUrl: PRESET_IMAGES[11].url,
            description: 'Heavy authentic handwoven vintage Aso-Oke 3-piece Agbada attire with intricate embroidery. Worn once for a high-profile cultural gala.',
            wishlist: 'Looking for dining table set, record player, or generator + cash top up.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T09:00:00Z'
        },
        {
            id: 'item_vintage_4',
            ownerId: 'usr_amina',
            title: 'Canon AE-1 Program 35mm Vintage Film Camera',
            category: 'Vintage & Fashion',
            condition: 'Good',
            estimatedValue: 115000,
            location: 'Wuse II, Abuja',
            distanceKm: 4.2,
            imageUrl: PRESET_IMAGES[6].url,
            description: 'Classic 1980s 35mm SLR film camera with Canon 50mm f/1.8 FD lens. Tested with film, light meter works perfectly.',
            wishlist: 'Looking for wireless noise-cancelling headphones or Nintendo Switch.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T09:15:00Z'
        },

        // --- HOME & TOOLS (INCLUDES FURNITURE & WORKOUT GEAR) ---
        {
            id: 'item_home_1',
            ownerId: 'usr_funke',
            title: 'Royal Teak Wood 6-Seater Dining Table Set',
            category: 'Home & Tools',
            condition: 'Like New',
            estimatedValue: 180000,
            location: 'Bodija, Ibadan',
            distanceKm: 11.5,
            imageUrl: PRESET_IMAGES[2].url,
            description: 'Solid handcrafted teak wood dining table with 6 matching cushioned chairs. Rich mahogany finish, pristine condition.',
            wishlist: 'Looking for double door fridge, electric guitar, or PS4 console + cash top up.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T09:30:00Z'
        },
        {
            id: 'item_home_2',
            ownerId: 'usr_chidi',
            title: 'Century 3.5kVA Key-Start Silent Generator',
            category: 'Home & Tools',
            condition: 'Like New',
            estimatedValue: 140000,
            location: 'Lekki Phase 1, Lagos',
            distanceKm: 6.8,
            imageUrl: PRESET_IMAGES[3].url,
            description: '100% copper coil 3.5kVA generator with automatic key start. Easily powers 1.5HP AC, fridge, TV, and lighting. Low fuel consumption.',
            wishlist: 'Looking for Sony headphones, mechanical keyboards, or gaming console.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T09:45:00Z'
        },
        {
            id: 'item_home_3',
            ownerId: 'usr_chidi',
            title: 'Scanfrost 250L Double Door Refrigerator',
            category: 'Home & Tools',
            condition: 'Good',
            estimatedValue: 165000,
            location: 'Lekki Phase 1, Lagos',
            distanceKm: 7.2,
            imageUrl: PRESET_IMAGES[4].url,
            description: 'Inverter technology double door fridge with fast cooling and deep freezer compartment. Clean interior, low power draw.',
            wishlist: 'Looking for dining set or generator + cash top up.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T10:00:00Z'
        },
        {
            id: 'item_home_4',
            ownerId: 'usr_tunde',
            title: 'Bowflex SelectTech Adjustable Dumbbells Set',
            category: 'Home & Tools',
            condition: 'Good',
            estimatedValue: 95000,
            location: 'Yaba, Lagos',
            distanceKm: 1.5,
            imageUrl: PRESET_IMAGES[8].url,
            description: 'Adjustable dumbbells pair from 5 to 52.5 lbs each. Dial weight selector system. Great home gym equipment.',
            wishlist: 'Looking for generator, mechanical keyboards, or retro phones.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T10:15:00Z'
        },

        // --- ELECTRONICS ---
        {
            id: 'item_elec_1',
            ownerId: 'usr_tunde',
            title: 'Sony WH-1000XM4 Noise Cancelling Headphones',
            category: 'Electronics',
            condition: 'Like New',
            estimatedValue: 185000,
            location: 'Yaba, Lagos',
            distanceKm: 1.8,
            imageUrl: PRESET_IMAGES[5].url,
            description: 'Industry-leading noise cancelling headphones. Complete in carrying case with audio jack and USB-C charger.',
            wishlist: 'Looking for Century generator, mechanical keyboards, or vintage camera.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T10:30:00Z'
        },
        {
            id: 'item_elec_2',
            ownerId: 'usr_tunde',
            title: 'Keychron K2 Wireless RGB Mechanical Keyboard',
            category: 'Electronics',
            condition: 'Brand New',
            estimatedValue: 75000,
            location: 'Yaba, Lagos',
            distanceKm: 2.1,
            imageUrl: PRESET_IMAGES[7].url,
            description: 'Gateron Brown tactile switches with aluminum frame. Bluetooth 5.1 & wired USB-C mode. Sealed in original box.',
            wishlist: 'Looking for Nokia 3310 vintage phone, dumbbells, or Aso-Oke agbada.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T10:45:00Z'
        },

        // --- GAMING & TECH ---
        {
            id: 'item_game_1',
            ownerId: 'usr_tunde',
            title: 'Nintendo Switch OLED Model (White)',
            category: 'Gaming & Tech',
            condition: 'Like New',
            estimatedValue: 260000,
            location: 'Yaba, Lagos',
            distanceKm: 2.4,
            imageUrl: PRESET_IMAGES[10].url,
            description: 'Vibrant 7-inch OLED screen edition. Comes with white Joy-Cons, dock, HDMI, power adapter, and carrying case.',
            wishlist: 'Looking for dining set or double door fridge + cash top up.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T11:00:00Z'
        },
        {
            id: 'item_game_2',
            ownerId: 'usr_chidi',
            title: 'PlayStation 5 Disc Edition + 2 DualSense Controllers',
            category: 'Gaming & Tech',
            condition: 'Like New',
            estimatedValue: 580000,
            location: 'Lekki Phase 1, Lagos',
            distanceKm: 6.5,
            imageUrl: PRESET_IMAGES[12].url,
            description: 'Ultra-fast 825GB SSD PS5 Disc Edition console. Includes 2 Midnight Black DualSense controllers, dual controller charging dock, HDMI 2.1 cable, and God of War Ragnarök.',
            wishlist: 'Looking for Century generator, Scanfrost fridge, or Teak dining table + cash top up.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T11:10:00Z'
        },
        {
            id: 'item_game_3',
            ownerId: 'usr_tunde',
            title: 'PlayStation 4 Slim 1TB + 3 Games (EA FC 24, GTA V, MK11)',
            category: 'Gaming & Tech',
            condition: 'Good',
            estimatedValue: 185000,
            location: 'Yaba, Lagos',
            distanceKm: 2.2,
            imageUrl: PRESET_IMAGES[13].url,
            description: 'Sleek 1TB PS4 Slim console in matte black with 2 DualShock 4 wireless controllers and 3 original disc games (EA FC 24, GTA V, Mortal Kombat 11).',
            wishlist: 'Looking for mechanical keyboard, noise-cancelling headphones, or vintage Nokia phones.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T11:20:00Z'
        },
        {
            id: 'item_game_4',
            ownerId: 'usr_chidi',
            title: 'Logitech G29 Driving Force Racing Wheel & Pedals',
            category: 'Gaming & Tech',
            condition: 'Brand New',
            estimatedValue: 150000,
            location: 'Lekki Phase 1, Lagos',
            distanceKm: 7.0,
            imageUrl: PRESET_IMAGES[14].url,
            description: 'Dual-motor force feedback racing wheel with stainless steel paddle shifters and responsive floor pedals. Compatible with PS5, PS4 & PC.',
            wishlist: 'Looking for Nintendo Switch OLED, Sony headphones, or generator.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T11:30:00Z'
        },
        {
            id: 'item_game_5',
            ownerId: 'usr_tunde',
            title: 'ASUS ROG Ally Z1 Extreme Handheld Gaming PC (512GB SSD)',
            category: 'Gaming & Tech',
            condition: 'Like New',
            estimatedValue: 420000,
            location: 'Yaba, Lagos',
            distanceKm: 1.9,
            imageUrl: PRESET_IMAGES[15].url,
            description: 'Full Windows 11 handheld gaming device with 120Hz FHD screen and AMD Ryzen Z1 Extreme processor. Plays AAA PC games natively on the go.',
            wishlist: 'Looking for PS5 console, high capacity generator, or vintage film camera + cash top up.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T11:40:00Z'
        },

        // --- MUSIC & AUDIO ---
        {
            id: 'item_music_1',
            ownerId: 'usr_funke',
            title: 'Fender Squier Stratocaster Electric Guitar',
            category: 'Music & Audio',
            condition: 'Like New',
            estimatedValue: 135000,
            location: 'Bodija, Ibadan',
            distanceKm: 13.0,
            imageUrl: PRESET_IMAGES[9].url,
            description: 'Sunburst finish with maple neck. Tuned and set up with fresh D’Addario strings. Includes padded gig bag.',
            wishlist: 'Looking for Scanfrost fridge, generator, or vintage turntable.',
            allowTopUp: true,
            status: 'available',
            createdAt: '2026-08-29T11:15:00Z'
        }
    ];

    const INITIAL_OFFERS = [
        {
            id: 'off_sample_1',
            targetItemId: 'item_elec_1', // Tunde's Sony Headphones (₦185,000)
            targetOwnerId: 'usr_tunde',
            offeredByUserId: 'usr_amina',
            offeredItemIds: ['item_vintage_1'], // Amina's Nokia 3310 (₦25,000)
            cashTopUp: 160000, // Amina offers ₦160,000 cash top up!
            cashDirection: 'offer',
            note: 'Hello Tunde! Offering my rare vintage Nokia 3310 plus ₦160,000 cash top-up for your Sony headphones. Can meet at Yaba Tech gate!',
            status: 'pending',
            createdAt: '2026-08-29T11:30:00Z'
        }
    ];

    const INITIAL_MESSAGES = [];

    // APPLICATION STATE
    let state = {
        users: [],
        items: [],
        offers: [],
        messages: [],
        activeUserId: 'usr_tunde',
        theme: 'light', // 'light' (default) | 'dark'
        currentView: 'marketplace', // 'marketplace' | 'closet'
        searchQuery: '',
        activeCategory: 'all',
        maxDistanceKm: 'all', // 'all' | '3' | '5' | '10' | '25'
        topUpFilter: 'all', // 'all' | 'topup' | 'straight'
        sortBy: 'newest', // 'newest' | 'value-desc' | 'value-asc' | 'distance'
        selectedTargetItem: null,
        selectedOfferItemIds: [],
        activeChatOfferId: null
    };

    // DOM ELEMENTS CACHE
    const DOM = {
        appRoot: document.getElementById('app-root'),
        themeToggleBtn: document.getElementById('theme-toggle-btn'),
        themeIcon: document.getElementById('theme-icon'),
        themeText: document.getElementById('theme-text'),
        userPersonaSelect: document.getElementById('user-persona-select'),
        activePersonaAvatar: document.getElementById('active-persona-avatar'),
        activePersonaName: document.getElementById('active-persona-name'),
        searchInput: document.getElementById('search-input'),
        clearSearchBtn: document.getElementById('clear-search'),
        categoryPillsContainer: document.getElementById('category-pills-container'),
        distanceFilterSelect: document.getElementById('distance-filter'),
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
        exportBackupBtn: document.getElementById('export-backup-btn'),
        importBackupFile: document.getElementById('import-backup-file'),
        
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
        applyTheme();
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
            const theme = localStorage.getItem(STORAGE_KEYS.THEME);

            if (theme) state.theme = theme;

            if (usersData && itemsData && offersData) {
                state.users = JSON.parse(usersData);
                state.items = JSON.parse(itemsData);
                state.offers = JSON.parse(offersData);
                state.messages = messagesData ? JSON.parse(messagesData) : [];
                if (activeUser) state.activeUserId = activeUser;
            } else {
                state.users = INITIAL_USERS;
                state.items = INITIAL_ITEMS;
                state.offers = INITIAL_OFFERS;
                state.messages = INITIAL_MESSAGES;
                state.activeUserId = 'usr_tunde';
                saveState();
            }
        } catch (e) {
            console.error('Error loading state from LocalStorage:', e);
            state.users = INITIAL_USERS;
            state.items = INITIAL_ITEMS;
            state.offers = INITIAL_OFFERS;
            state.messages = INITIAL_MESSAGES;
            state.activeUserId = 'usr_tunde';
        }
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(state.users));
            localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(state.items));
            localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(state.offers));
            localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(state.messages));
            localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, state.activeUserId);
            localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
        } catch (e) {
            console.error('Error saving state to LocalStorage:', e);
        }
    }

    function applyTheme() {
        if (state.theme === 'dark') {
            document.body.classList.add('dark-theme');
            DOM.themeIcon.className = 'fa-solid fa-moon';
            DOM.themeText.textContent = 'Dark';
        } else {
            document.body.classList.remove('dark-theme');
            DOM.themeIcon.className = 'fa-solid fa-sun';
            DOM.themeText.textContent = 'Light';
        }
    }

    function toggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        saveState();
        applyTheme();
        showToast(`Switched to ${state.theme.toUpperCase()} mode`, 'info');
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
        state.activeUserId = 'usr_tunde';
        saveState();

        showToast('Demo data restored to Nigerian initial state!', 'success');
        setupUserPersonaDropdown();
        render();
    }

    /* ==========================================================================
       DATA BACKUP & RESTORE MODULE (JSON EXPORT/IMPORT)
       ========================================================================== */
    function exportDataToJson() {
        const backupData = {
            app: 'BuyByBarterNigeria',
            version: '2.0',
            exportedAt: new Date().toISOString(),
            users: state.users,
            items: state.items,
            offers: state.offers,
            messages: state.messages
        };

        const jsonString = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `buy_by_barter_backup_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('Backup JSON downloaded successfully!', 'success');
    }

    function importDataFromJson(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const parsed = JSON.parse(e.target.result);
                if (parsed.items && Array.isArray(parsed.items) && parsed.users && Array.isArray(parsed.users)) {
                    state.users = parsed.users;
                    state.items = parsed.items;
                    state.offers = parsed.offers || [];
                    state.messages = parsed.messages || [];
                    saveState();

                    setupUserPersonaDropdown();
                    render();
                    showToast('Barter database successfully restored from JSON!', 'success');
                } else {
                    alert('Invalid backup file format.');
                }
            } catch (err) {
                alert('Error parsing JSON backup file: ' + err.message);
            }
        };
        reader.readAsText(file);
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
        // Theme Toggle
        DOM.themeToggleBtn.addEventListener('click', toggleTheme);

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
        DOM.distanceFilterSelect.addEventListener('change', (e) => {
            state.maxDistanceKm = e.target.value;
            renderListings();
        });

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
            state.maxDistanceKm = 'all';
            DOM.searchInput.value = '';
            DOM.clearSearchBtn.classList.add('hidden');
            DOM.topUpFilterSelect.value = 'all';
            DOM.distanceFilterSelect.value = 'all';
            DOM.categoryPillsContainer.querySelectorAll('.pill-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.category === 'all');
            });
            renderListings();
        });

        // Backup & Restore
        DOM.exportBackupBtn.addEventListener('click', exportDataToJson);
        DOM.importBackupFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) importDataFromJson(file);
        });

        // Modals Open / Close handlers
        DOM.openAddItemModalBtn.addEventListener('click', () => openModal('add-item-modal'));
        DOM.navInboxBtn.addEventListener('click', () => {
            renderInboxContent();
            openModal('inbox-modal');
        });

        DOM.resetDemoDataBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all demo items, users, and offers to Nigerian baseline?')) {
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
            btn.addEventListener('click', () => {
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

            // Category filter
            if (state.activeCategory !== 'all' && item.category !== state.activeCategory) {
                return false;
            }

            // Proximity filter
            if (state.maxDistanceKm !== 'all') {
                const maxD = parseFloat(state.maxDistanceKm);
                const dist = item.distanceKm || 5.0;
                if (dist > maxD) return false;
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
            if (state.sortBy === 'distance') return (a.distanceKm || 0) - (b.distanceKm || 0);
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
                DOM.emptyStateMsg.textContent = "Your closet is currently empty. Click 'Barter an item' to add items you want to trade!";
            } else {
                DOM.emptyStateMsg.textContent = "No barter listings match your current search, distance, or category filter.";
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
        const formattedVal = '₦' + item.estimatedValue.toLocaleString();
        const distText = item.distanceKm ? `📍 ${item.distanceKm} km away` : '';

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}" class="card-image" loading="lazy">
                <span class="card-value-tag">${formattedVal}</span>
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
                            ${distText ? `<span class="distance-badge">${distText}</span>` : ''}
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

        card.addEventListener('click', (e) => {
            if (e.target.closest('.card-actions')) return;
            openItemDetailModal(item);
        });

        const proposeBtn = card.querySelector('.propose-trade-btn');
        if (proposeBtn) {
            proposeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openTradeBuilderModal(item);
            });
        }

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
        const formattedVal = '₦' + item.estimatedValue.toLocaleString();

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
                    <span class="detail-value">Est. Value: ${formattedVal}</span>
                    <span class="detail-topup-status">${item.allowTopUp ? '💵 Cash Top-Up (₦) Allowed' : '🔄 Straight Swap Only'}</span>
                </div>

                <p class="detail-desc">${escapeHtml(item.description)}</p>

                <div class="detail-wishlist-box">
                    <span class="detail-wishlist-title"><i class="fa-solid fa-gift"></i> Owner's Swap Wishlist:</span>
                    <p style="font-size: 0.9rem; margin-top: 0.2rem;">${escapeHtml(item.wishlist || 'Open to any fair value physical item proposal.')}</p>
                </div>

                <div class="detail-owner-card">
                    <img src="${escapeHtml(owner.avatar)}" alt="${escapeHtml(owner.name)}" class="owner-avatar" style="width: 44px; height: 44px;">
                    <div>
                        <strong style="font-size: 0.95rem;">Listed by ${escapeHtml(owner.name)} ${isOwnedByMe ? '(You)' : ''}</strong>
                        <div style="font-size: 0.8rem; opacity: 0.8;"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(item.location)} • 📍 ${item.distanceKm || 5} km away</div>
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

        const formattedVal = '₦' + targetItem.estimatedValue.toLocaleString();

        DOM.builderTargetCard.innerHTML = `
            <img src="${escapeHtml(targetItem.imageUrl)}" alt="${escapeHtml(targetItem.title)}" class="target-img-thumb">
            <div class="target-item-details">
                <span class="target-item-title">${escapeHtml(targetItem.title)}</span>
                <span style="font-size: 0.75rem; color: #059669;">${escapeHtml(targetItem.category)} • ${escapeHtml(targetItem.condition)}</span>
                <span class="target-item-val">${formattedVal}</span>
            </div>
        `;

        const myClosetItems = state.items.filter(i => i.ownerId === state.activeUserId && i.status === 'available');
        DOM.builderClosetPicker.innerHTML = '';

        if (myClosetItems.length === 0) {
            DOM.builderClosetPicker.innerHTML = `
                <div style="padding: 1rem; text-align: center; color: #64748b; font-size: 0.85rem; background: rgba(0,0,0,0.03); border-radius: 8px;">
                    <i class="fa-solid fa-info-circle"></i> You have no items in your closet. You can offer a <strong>Cash Top-Up (₦)</strong> only or list an item first!
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
                        <span class="closet-pick-val">₦${item.estimatedValue.toLocaleString()}</span>
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
            DOM.topUpHint.textContent = `+₦${topUpVal.toLocaleString()} cash will be paid by you upon meet-up.`;
        } else if (direction === 'request') {
            netOfferedValue -= topUpVal;
            DOM.topUpHint.textContent = `-₦${topUpVal.toLocaleString()} cash requested from item owner upon meet-up.`;
        }

        const delta = targetVal - offeredItemsVal;
        if (delta > 0) {
            DOM.tradeValueDeltaBadge.textContent = `Value Gap: +₦${delta.toLocaleString()} for target item`;
        } else if (delta < 0) {
            DOM.tradeValueDeltaBadge.textContent = `Value Gap: +₦${Math.abs(delta).toLocaleString()} for your offer`;
        } else {
            DOM.tradeValueDeltaBadge.textContent = `Equal Estimated Value (₦${targetVal.toLocaleString()})`;
        }

        if (direction === 'offer' && topUpVal === 0 && delta > 0) {
            DOM.topUpAmountInput.value = delta;
            netOfferedValue = offeredItemsVal + delta;
        }

        DOM.tradeBuilderSummary.innerHTML = `
            Your Total Offer: <strong>₦${netOfferedValue.toLocaleString()}</strong> (${offeredItemsVal ? '₦' + offeredItemsVal.toLocaleString() + ' items' : 'No items'} + ${direction === 'offer' ? '₦' + topUpVal.toLocaleString() + ' cash' : 'no cash'}) vs Target: <strong>₦${targetVal.toLocaleString()}</strong>
        `;
    }

    function handleSubmitTradeProposal() {
        if (!state.selectedTargetItem) return;

        const direction = document.querySelector('input[name="topup-direction"]:checked')?.value || 'none';
        const cashAmount = parseFloat(DOM.topUpAmountInput.value) || 0;

        if (state.selectedOfferItemIds.length === 0 && (direction === 'none' || cashAmount <= 0)) {
            alert('Please select at least 1 item from your closet OR add a Cash Top-Up (₦) amount to make an offer!');
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
            cashPillHtml = `<span class="cash-topup-pill">+ ₦${offer.cashTopUp.toLocaleString()} Cash Top-Up</span>`;
        } else if (offer.cashDirection === 'request' && offer.cashTopUp > 0) {
            cashPillHtml = `<span class="cash-topup-pill">Requests ₦${offer.cashTopUp.toLocaleString()} Cash Top-Up</span>`;
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
                        <strong>${escapeHtml(displayUser.name)}</strong>
                        <span style="font-size: 0.75rem; opacity: 0.7; margin-left: 0.3rem;">(${roleLabel})</span>
                        <div style="font-size: 0.7rem; opacity: 0.6;">${new Date(offer.createdAt).toLocaleDateString()}</div>
                    </div>
                </div>
                <span class="offer-status-badge ${statusClass}">${offer.status}</span>
            </div>

            <div class="offer-comparison-row">
                <div class="offer-side-item">
                    <img src="${escapeHtml(targetItem ? targetItem.imageUrl : '')}" alt="Target">
                    <div class="offer-item-meta">
                        <strong>${escapeHtml(targetItem ? targetItem.title : 'Item')}</strong>
                        <span>Est. ₦${targetItem ? targetItem.estimatedValue.toLocaleString() : 0}</span>
                    </div>
                </div>

                <div style="text-align: center; color: #059669; font-weight: bold;">
                    <i class="fa-solid fa-arrow-right-arrow-left"></i>
                </div>

                <div class="offer-side-item">
                    ${offeredItems.length > 0 ? `
                        <img src="${escapeHtml(offeredItems[0].imageUrl)}" alt="Offered">
                        <div class="offer-item-meta">
                            <strong>${escapeHtml(offeredItems.map(i => i.title).join(', '))}</strong>
                            <span>Est. ₦${offeredItemsVal.toLocaleString()}</span>
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
                <span style="font-size: 0.8rem; opacity: 0.6;">Offer ID: ${offer.id}</span>
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

        const existingMsgs = state.messages.filter(m => m.offerId === offerId);
        if (existingMsgs.length === 0) {
            state.messages.push({
                id: 'msg_' + Date.now(),
                offerId: offerId,
                senderId: state.activeUserId,
                text: `🎉 Trade proposal accepted! Let's arrange a convenient meet-up time and safe public place in town to exchange items.`,
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
            cashText = `+ ₦${offer.cashTopUp.toLocaleString()} Cash Top-Up`;
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
            distanceKm: Math.floor(Math.random() * 8) + 1,
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

    document.addEventListener('DOMContentLoaded', initApp);

})();
