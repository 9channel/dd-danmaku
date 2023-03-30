import './assets/style/default.css';
import DanDanDanmaku from './commons/DanDanDanmaku';
(async function () {
    while (!window.require) {
        await new Promise((resolve) => setTimeout(resolve, 200));
    }
    if (!window.ddd) {
        window.ddd = new DanDanDanmaku(window, document);
        window.ddd.init();
    }
})();
