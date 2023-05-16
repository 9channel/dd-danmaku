import './assets/styles/global.module.css'
import { DanDanDanmaku } from './ddanmaku';

const intervalId = setInterval(() => {
    if (window.require !== undefined) {
        clearInterval(intervalId);
        if (!window.ddd) {
            window.ddd = new DanDanDanmaku(window, document);
            window.ddd.init();
        }
    }
}, 200);