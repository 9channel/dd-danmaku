import './assets/style/default.css';
import './utils';
import { DanDanDanmaku as DDD } from './components/DanDanDanmaku';
import Danmaku from 'danmaku';

if (isEmby()) {
    (async function () {
        while (!window.require) {
            await new Promise((resolve) => setTimeout(resolve, 200));
        }
        if (!window.ddd) {
            window.ddd = new DDD();
            setInterval(() => {
                initUI();
            }, check_interval);
            while (!(await getEmbyItemInfo())) {
                await new Promise((resolve) => setTimeout(resolve, 200));
            }
            reloadDanmaku('init');
            setInterval(() => {
                initListener();
            }, check_interval);
        }
    })();
}
