import * as dc from '../default';

export class EmbyClient extends dc.Client {
    /* 初始化入口 */
    init() {
        this.initWatcher();
    }
    initUI() {
        // 页面未加载
        let uiAnchor = getElementsByInnerText('i', uiAnchorStr);
        if (!uiAnchor || !uiAnchor[0]) {
            return;
        }
        // 已初始化
        if (document.getElementById('danmakuCtr')) {
            return;
        }
        console.log('正在初始化UI');
        // 弹幕按钮容器div
        let parent = uiAnchor[0].parentNode.parentNode.parentNode;
        let menubar = document.createElement('div');
        menubar.id = 'danmakuCtr';
        if (!window.ddd.episode_info) {
            menubar.style.opacity = 0.5;
        }
        parent.append(menubar);
        // 弹幕开关
        displayButtonOpts.innerText = danmaku_icons[window.ddd.danmakuSwitch];
        menubar.appendChild(createButton(displayButtonOpts));
        // 手动匹配
        menubar.appendChild(createButton(searchButtonOpts));
        // 简繁转换
        translateButtonOpts.title = chConverTtitle[window.ddd.chConvert];
        menubar.appendChild(createButton(translateButtonOpts));
        // 屏蔽等级
        filterButtonOpts.innerText = filter_icons[parseInt(window.localStorage.getItem('danmakuFilterLevel') ? window.localStorage.getItem('danmakuFilterLevel') : 0)];
        menubar.appendChild(createButton(filterButtonOpts));
        // 弹幕信息
        menubar.appendChild(createButton(infoButtonOpts));
        console.log('UI初始化完成');
    }
    createButton(opt) {
        let button = document.createElement('button', buttonOptions);
        button.setAttribute('title', opt.title);
        button.setAttribute('id', opt.id);
        let icon = document.createElement('span');
        icon.className = 'md-icon';
        icon.innerText = opt.innerText;
        button.appendChild(icon);
        button.onclick = opt.onclick;
        return button;
    }
}
