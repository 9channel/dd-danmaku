/* 默认客户端 */
export class Client {
    constructor(window, locales, ddd) {
        this.window = window;
        this.locales = locales;
        this.ddd = ddd;
    }
    init() {
        throw locales.exception.notSupportedClient;
    }
}
