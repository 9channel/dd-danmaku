/* 默认客户端 */
export class Client {
    constructor(window, locales) {
        this.window = window;
        this.locales = locales;
    }
    init() {
        throw locales.exception.notSupportedClient;
    }
}