import './assets/style/default.css';
import './utils';
import { DanDanDanmaku as DDD } from './components/DanDanDanmaku';

if (isEmby()) {
    (async function () {
        while (!window.require) {
            await new Promise((resolve) => setTimeout(resolve, 200));
        }
        if (!window.ddd) {
            window.ddd = new DDD();
            window.ddd.init();
        }
    })();
}
