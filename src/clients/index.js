import * as emby from './emby';
import * as jellyfin from './jellyfin';

const client = (document,locales) => {
    const { appName } = document.querySelector('meta[name="application-name"]').content;
    switch (appName) {
        case 'Emby':
            return emby.default;
        case 'Jellyfin':
            return jellyfin.default;
        default:
            throw locales.exception.notSupportedClient;
    }
};
export default client;
