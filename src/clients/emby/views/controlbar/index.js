const displayButtonOpts = {
    title: window.ddd.locales.displayBtnTitle,
    id: 'displayDanmaku',
    innerText: null,
    onclick: () => {
        if (window.ddd.loading) {
            console.log(window.ddd.locales.log.loading);
            return;
        }
        console.log('切换弹幕开关');
        window.ddd.danmakuSwitch = (window.ddd.danmakuSwitch + 1) % 2;
        window.localStorage.setItem('danmakuSwitch', window.ddd.danmakuSwitch);
        document.querySelector('#displayDanmaku').children[0].innerText = danmaku_icons[window.ddd.danmakuSwitch];
        if (window.ddd.danmaku) {
            window.ddd.danmakuSwitch == 1 ? window.ddd.danmaku.show() : window.ddd.danmaku.hide();
        }
    },
};
