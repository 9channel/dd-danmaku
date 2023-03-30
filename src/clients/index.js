import * as emby from './emby';
import * as jellyfin from './jellyfin';
import * as dc from './default';

const client = (document) => {
    const { appName } = document.querySelector('meta[name="application-name"]').content;
    /* 根据appName判断运行环境并返回对应客户端 */
    switch (appName) {
        case 'Emby':
            return new emby.EmbyClient(document);
        case 'Jellyfin':
            return new jellyfin.JellyfinClient(document);
        default:
            return new dc.Client(document);
    }
};
export default client;
