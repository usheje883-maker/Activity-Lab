// Mock Yandex Games SDK - Compatible with Tank Stars index.html
window.YaGames = {
    init: function() {
        return Promise.resolve({
            deviceInfo: {
                type: 'desktop',
                isMobile: () => false,
                isDesktop: () => true,
                isTablet: () => false,
                isTV: () => false,
            },
            environment: {
                i18n: { lang: 'en', tld: 'com' },
                app: { id: '000000' },
                browser: { lang: 'en' },
                payload: null,
            },
            screen: {
                fullscreen: {
                    status: 'off',
                    request: () => Promise.resolve(),
                }
            },
            features: {
                LoadingAPI: {
                    ready: function() {}
                },
                GameplayAPI: {
                    start: function() {},
                    stop: function() {}
                }
            },
            ready: function() { return Promise.resolve(); },
            gameplayStart: function() { return Promise.resolve(); },
            gameplayStop: function() { return Promise.resolve(); },
            adv: {
                showFullscreenAdv: function({ callbacks } = {}) {
                    if (callbacks && callbacks.onClose) callbacks.onClose(false);
                },
                showRewardedVideo: function({ callbacks } = {}) {
                    if (callbacks) {
                        if (callbacks.onOpen) callbacks.onOpen();
                        setTimeout(() => {
                            if (callbacks.onRewarded) callbacks.onRewarded();
                            setTimeout(() => {
                                if (callbacks.onClose) callbacks.onClose();
                            }, 100);
                        }, 500);
                    }
                },
                getBannerAdvStatus: function() {
                    return Promise.resolve({ stickyAdvIsShowing: false, reason: 'mock' });
                },
                showBannerAdv: function() { return Promise.resolve(); },
                hideBannerAdv: function() { return Promise.resolve(); },
            },
            auth: {
                openAuthDialog: function() { return Promise.resolve(); }
            },
            feedback: {
                canReview: function() {
                    return Promise.resolve({ value: false, reason: 'mock' });
                },
                requestReview: function() {
                    return Promise.resolve({ feedbackSent: false });
                }
            },
            shortcut: {
                canShowPrompt: function() {
                    return Promise.resolve({ canShow: false });
                },
                showPrompt: function() {
                    return Promise.resolve({ outcome: 'rejected' });
                }
            },
            getPlayer: function(opts) {
                return Promise.resolve({
                    getMode: () => 'lite',
                    getName: () => 'Player',
                    getPhoto: () => '',
                    getUniqueID: () => 'mock-id-123',
                    getPayingStatus: () => 'none',
                    getData: (keys) => Promise.resolve({}),
                    setData: (data, flush) => Promise.resolve(),
                });
            },
            // FIX: getPayments now resolves so the IAP block in index.html runs fully
            getPayments: function(opts) {
                return Promise.resolve({
                    getCatalog: function() {
                        console.log('[MockSDK] getCatalog called - returning empty catalog');
                        return Promise.resolve([]);
                    },
                    getPurchases: function() {
                        console.log('[MockSDK] getPurchases called - returning empty purchases');
                        return Promise.resolve([]);
                    },
                    purchase: function(productParams) {
                        console.log('[MockSDK] purchase called with:', productParams);
                        return Promise.reject(new Error('Payments not available in mock'));
                    },
                    consumePurchase: function(purchaseToken) {
                        console.log('[MockSDK] consumePurchase called with:', purchaseToken);
                        return Promise.resolve();
                    },
                });
            },
            getLeaderboards: function() {
                return Promise.resolve({
                    getLeaderboardDescription: (name) => Promise.resolve({
                        default: false,
                        description: {
                            invert_sort_order: false,
                            score_format: { options: { decimal_offset: 0 } },
                            type: 'numeric'
                        }
                    }),
                    getLeaderboardEntries: (name, opts) => Promise.resolve({ entries: [] }),
                    setLeaderboardScore: (name, score) => Promise.resolve(),
                });
            },
            leaderboards: {
                getLeaderboardDescription: (name) => Promise.resolve({
                    default: false,
                    description: {
                        invert_sort_order: false,
                        score_format: { options: { decimal_offset: 0 } },
                        type: 'numeric'
                    }
                }),
                getLeaderboardEntries: (name, opts) => Promise.resolve({ entries: [] }),
                setLeaderboardScore: (name, score) => Promise.resolve(),
            }
        });
    }
};

console.log('[MockSDK] Loaded - ads disabled, payments mocked');
