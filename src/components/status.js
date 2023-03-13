import './constants';
class DDStatus {
    constructor() {
        // 0:当前状态关闭 1:当前状态打开
        this.config = { chConvert: 1, danmakuSwitch: 1 };
        if (window.localStorage.getItem(configName)) {
            this.config = JSON.parse(window.localStorage.getItem(configName));
        }
        this.danmaku = null;
        this.episode_info = null;
        this.ob = null;
        this.loading = false;
    }
    getConfig(k) {
        return this.config[k];
    }
    setConfig(k, v) {
        this.config[k] = v;
        window.localStorage.setItem(configName, JSON.stringify(this.config));
    }
}
