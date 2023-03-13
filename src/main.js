import './assets/style/default.css';
import './utils';
import './components/status';
import Danmaku from 'danmaku';

if (isEmby()) {
    (async function () {
        while (!window.require) {
            await new Promise((resolve) => setTimeout(resolve, 200));
        }
        if (!window.ede) {
            window.ede = new EDE();
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
