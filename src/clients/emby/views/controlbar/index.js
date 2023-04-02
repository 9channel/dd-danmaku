const displayButtonOpts = (ddd) => {
    return {
        title: ddd.locales.displayBtnTitle,
        id: 'displayDanmaku',
        innerText: null,
        onclick: () => {
            if (ddd.loading) {
                console.log(ddd.locales.log.loading);
                return;
            }
            console.log('切换弹幕开关');
            ddd.danmakuSwitch = (ddd.danmakuSwitch + 1) % 2;
            ddd.setConfig('danmakuSwitch', ddd.danmakuSwitch);
            document.querySelector('#displayDanmaku').children[0].innerText = danmaku_icons[ddd.danmakuSwitch];
            if (ddd.danmaku) {
                ddd.danmakuSwitch == 1 ? ddd.danmaku.show() : ddd.danmaku.hide();
            }
        },
    };
};