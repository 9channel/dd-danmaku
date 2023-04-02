import * as emby from './emby';
import * as jellyfin from './jellyfin';
import * as dc from './default';

const client = (window, document, ddd) => {
    const { appName } = document.querySelector('meta[name="application-name"]').content;
    /* 根据appName判断运行环境并返回对应客户端 */
    switch (appName) {
        case 'Emby':
            return new emby.EmbyClient(window, document, ddd);
        case 'Jellyfin':
            return new jellyfin.JellyfinClient(window, document, ddd);
        default:
            return new dc.Client(window, document, ddd);
    }
};
export default client;
