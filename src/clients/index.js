import * as emby from './emby';
import * as jellyfin from './jellyfin';

function getClient() {
    const appName = document.querySelector('meta[name="application-name"]').content;
    switch (appName) {
        case 'Emby':
            return emby.default;
        case 'Jellyfin':
            return jellyfin.default;
        default:
            throw window.ddd.locales.exception.not_supported_client;
    }
}
