import './assets/style/default.css';
import tryClient from './clients';
import DanDanDanmaku from './components/DanDanDanmaku';
import translate from './locales';

const locales = translate(window);
const client = tryClient(document, locales);
(async function () {
    while (!window.require) {
        await new Promise((resolve) => setTimeout(resolve, 200));
    }
    if (!window.ddd) {
        window.ddd = new DanDanDanmaku(client, locales);
        window.ddd.init();
    }
})();
