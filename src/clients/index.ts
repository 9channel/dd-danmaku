import * as emby from './emby';
import * as jellyfin from './jellyfin';
import { DanDanDanmaku } from '../ddanmaku';

const client = (document: Document, ddd: DanDanDanmaku) => {
    const appName = (document.querySelector('meta[name="application-name"]') as HTMLMetaElement)?.content ?? '';
    /* 根据appName判断运行环境并返回对应客户端 */
    switch (appName) {
        case 'Emby':
            return new emby.EmbyClient(ddd);
        case 'Jellyfin':
            return new jellyfin.JellyfinClient(ddd);
        default:
            return new Client(ddd);
    }
};
export class Client {
    ddd: DanDanDanmaku;
    constructor(ddd: DanDanDanmaku) {
        this.ddd = ddd;
    }
    init() {
        throw this.ddd.locales.exception.notSupportedClient;
    }
}
export default client;
