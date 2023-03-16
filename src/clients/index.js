import * as emby from './emby';
import * as jellyfin from './jellyfin';

class Client {
    constructor(window, locales) {
        this.window = window;
        this.locales = locales;
    }
    init() {
        throw locales.exception.notSupportedClient;
    }
}

const client = (document) => {
    const { appName } = document.querySelector('meta[name="application-name"]').content;
    switch (appName) {
        case 'Emby':
            return emby.default;
        case 'Jellyfin':
            return jellyfin.default;
        default:
            return Client;
    }
};
export default client;
