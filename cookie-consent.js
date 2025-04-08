class CookieConsent {
    constructor() {
        this.cookieName = 'cookie_consent';
        this.showBanner();
        this.checkConsent();
    }

    showBanner() {
        if (this.getCookie(this.cookieName)) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Alcuni sono necessari per il funzionamento, altri ci aiutano a offrirti contenuti personalizzati e annunci pertinenti.</p>
                <div class="cookie-buttons">
                    <button id="accept-all">Accetta tutti</button>
                    <button id="accept-necessary">Solo necessari</button>
                    <a href="/privacy-policy.html">Privacy Policy</a>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        document.getElementById('accept-all').addEventListener('click', () => {
            this.setConsent(true);
            this.hideBanner();
        });

        document.getElementById('accept-necessary').addEventListener('click', () => {
            this.setConsent(false);
            this.hideBanner();
        });
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.remove();
    }

    setConsent(fullConsent) {
        const consent = {
            necessary: true,
            analytics: fullConsent,
            advertising: fullConsent,
            timestamp: new Date().toISOString()
        };
        
        this.setCookie(this.cookieName, JSON.stringify(consent), 365);
        
        if (fullConsent) {
            this.initializeAdvertising();
        }
    }

    checkConsent() {
        const consent = this.getCookie(this.cookieName);
        if (consent) {
            const parsedConsent = JSON.parse(consent);
            if (parsedConsent.advertising) {
                this.initializeAdvertising();
            }
        }
    }

    initializeAdvertising() {
        // Inizializza Google AdSense
        (adsbygoogle = window.adsbygoogle || []).push({});
    }

    getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
    }

    setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
    }
}

// Inizializza il banner dei cookie quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
}); 