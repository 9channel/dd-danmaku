import './constants';
import Danmaku from 'danmaku';

const baseUrl = 'https://api.xn--7ovq92diups1e.com/cors/https://api.dandanplay.net';
const uriComment = '/api/v2/comment';
class DanDanDanmaku {
    constructor(client,locales) {
        // 0:当前状态关闭 1:当前状态打开
        this.config = { chConvert: 1, danmakuSwitch: 1 };
        if (window.localStorage.getItem(configName)) {
            this.config = JSON.parse(window.localStorage.getItem(configName));
        }
        this.locales = locales;
        this.client = client;
        this.danmaku = null;
        this.episode_info = null;
        this.ob = null;
        this.loading = false;
        this.timers = {};
    }
    getConfig(k) {
        return this.config[k];
    }
    setConfig(k, v) {
        this.config[k] = v;
        window.localStorage.setItem(configName, JSON.stringify(this.config));
    }
    init() {
        if (!window.ddd) {
            // 理论永远不应进入该case
            throw this.locales.exception.not_init;
        }
    }
}
function getComments(episodeId, chConvert) {
    var url = new URL(baseUrl + uriComment + `/${episodeId}`);
    var params = { withRelated: true, chConvert: chConvert };
    url.search = new URLSearchParams(params).toString();

    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept-Encoding': 'gzip',
            Accept: 'application/json',
            'User-Agent': navigator.userAgent,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('弹幕下载成功: ' + data.comments.length);
            return data.comments;
        })
        .catch((error) => {
            console.log('获取弹幕失败:', error);
            return null;
        });
}
