(function () {
    'use strict';

    if (window.__LAMPA_NO_ADS__) return;
    window.__LAMPA_NO_ADS__ = true;

    var originalFetch = window.fetch;

    if (originalFetch) {
        window.fetch = function (input, init) {
            var url = typeof input === 'string'
                ? input
                : (input && input.url ? input.url : '');

            if (url.indexOf('/api/ad/get/') !== -1) {
                console.log('[NoAds] Blocked:', url);

                return Promise.resolve(
                    new Response(
                        JSON.stringify({
                            success: true,
                            ad: []
                        }),
                        {
                            status: 200,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                );
            }

            return originalFetch.apply(this, arguments);
        };
    }

    console.log('[NoAds] Loaded');
})();
