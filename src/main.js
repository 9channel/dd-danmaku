import './assets/style/default.css';
import Client from './clients';
import DanDanDanmaku from './commons/DanDanDanmaku';
import translate from './locales';

(async function () {
    while (!window.require) {
        await new Promise((resolve) => setTimeout(resolve, 200));
    }
    if (!window.ddd) {
        const _locales = translate(window);
        const _client = new (Client(document))(window, _locales);
        window.ddd = new DanDanDanmaku(_client, _locales);
        window.ddd.client.init();
    }
})();
