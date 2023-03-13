import translate from '../../locales'
const locales = translate(window)
const displayButtonOpts = {
    title: locales.displayBtnTitle,
    id: 'displayDanmaku',
    innerText: null,
    onclick: () => {
        if (window.ede.loading) {
            console.log(locales.log.loading);
            return;
        }
        console.log('切换弹幕开关');
        window.ede.danmakuSwitch = (window.ede.danmakuSwitch + 1) % 2;
        window.localStorage.setItem('danmakuSwitch', window.ede.danmakuSwitch);
        document.querySelector('#displayDanmaku').children[0].innerText = danmaku_icons[window.ede.danmakuSwitch];
        if (window.ede.danmaku) {
            window.ede.danmakuSwitch == 1 ? window.ede.danmaku.show() : window.ede.danmaku.hide();
        }
    },
};
