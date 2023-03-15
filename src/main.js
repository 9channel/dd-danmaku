import './assets/style/default.css';
import client from './clients';
import DanDanDanmaku from './commons/DanDanDanmaku';
import translate from './locales';
import initAllTimer from './timers';

const _locales = translate(window);
const _client = client(document, _locales);
(async function () {
    while (!window.require) {
        await new Promise((resolve) => setTimeout(resolve, 200));
    }
    if (!window.ddd) {
        window.ddd = new DanDanDanmaku(_client, _locales);
        initAllTimer();
    }
})();
