import '../clients/emby/constants';
import Danmaku from 'danmaku';
import Client from '../clients';
import translate from '../locales';
/* 配置名称 */
const configName = 'ddconfig';
/* 跨域前缀 */
const corsUrl = 'https://api.xn--7ovq92diups1e.com/cors/';
/* 弹弹play api */
const baseUrl = 'https://api.dandanplay.net';
/* 搜索api */
const uriSearch = '/api/v2/search/';
/* 弹幕api */
const uriComment = '/api/v2/comment/';

class DanDanDanmaku {
    constructor(window, document) {
        /* 默认配置 */
        this.configs = {
            fontAutoSize: true,
            fontSize: 18,
            fontScale: 1.0,
            fontOpacity: 1.0,
            filterGWidth: 1,
            filterVWidth: 3,
            filterGLimit: 3,
            filterVLimit: 6,
            /* 0:当前状态关闭 1:当前状态打开 */
            chConvert: 1,
            enableDanmaku: true,
            /* DOM or canvas */
            danmakuEngine: 'canvas',
        };
        if (window.localStorage.getItem(configName)) {
            let oldConfig = JSON.parse(window.localStorage.getItem(configName));
            for (let item in oldConfig) {
                /* 版本更新导致配置变化时舍弃旧配置 */
                if (item in this.configs) {
                    this.config[item] = oldConfig[item];
                }
            }
            window.localStorage.setItem(configName, JSON.stringify(this.config));
        }

        this.locales = translate(window);
        this.danmaku = null;
        this.episode_info = null;
        this.ob = null;
        this.loading = false;
        this.timers = {};
        this.client = new (Client(window, document, this))(window, _locales);
        /* 当前播放信息 */
        this.mediaInfo = {
            /* 是否为系列如番剧电视剧 */
            isSeries: false,
            /* 系列id */
            seriesId: null,
            /* 唯一id */
            episodeId: null,
        };
    }
    setConfig(k, v) {
        this.config[k] = v;
        window.localStorage.setItem(configName, JSON.stringify(this.config));
    }
    init() {
        this.client.init();
    }

    async downloadDanmakus(episodeId) {
        let { ddd } = window;
        let { locales } = ddd;
        let { configs } = ddd;
        let { chConvert } = configs;
        var url = new URL(baseUrl + uriComment + `${episodeId}`);
        var params = { withRelated: true, chConvert: chConvert };
        url.search = new URLSearchParams(params).toString();

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept-Encoding': 'gzip',
                    Accept: 'application/json',
                    'User-Agent': navigator.userAgent,
                },
            });
            const data = await response.json();
            console.log(locales.log.danmakuDownloadS, data.comments.length);
            return data.comments;
        } catch (error) {
            console.log(locales.log.danmakuDownloadF, error);
            return null;
        }
    }

    createDanmaku(danmakus, _container, _media) {
        let { ddd } = window;
        let { locales } = ddd;
        let { configs } = ddd;
        let { fontOpacity } = configs;
        let { filterGWidth } = configs;
        let { filterVWidth } = configs;
        let { filterGLimit } = configs;
        let { filterVLimit } = configs;
        let { danmakuEngine } = configs;
        let { fontAutoSize } = configs;
        let { fontScale } = configs;
        let { fontFixSize } = configs;
        let { enableDanmaku } = configs;

        if (ddd.danmaku != null) {
            ddd.danmaku.clear();
            ddd.danmaku.destroy();
            ddd.danmaku = null;
        }
        let fontSize = Math.round((window.screen.height > window.screen.width ? window.screen.width : window.screen.height / 1080) * 18);
        if (fontAutoSize) {
            fontSize = fontSize * fontScale;
        } else {
            fontSize = fontFixSize;
        }
        let _comments = danmakuParser(danmakus, fontOpacity, fontSize);
        _comments = danmakuFilter(_comments, filterGWidth, filterVWidth, filterGLimit, filterVLimit);
        console.log(ddd.translate.log.danmakuLoaded, _comments.length);
        ddd.danmaku = new Danmaku({
            container: _container,
            media: _media,
            comments: _comments,
            engine: danmakuEngine,
        });
        if (enableDanmaku) {
            ddd.danmaku.show();
        } else {
            ddd.danmaku.hide();
        }
        if (ddd.ob) {
            ddd.ob.disconnect();
        }
        ddd.ob = new ResizeObserver(() => {
            if (ddd.danmaku) {
                console.log(locales.log.resize);
                ddd.danmaku.resize();
            }
        });
        ddd.ob.observe(_container);
    }

    danmakuFilter(comments, gWidth, vWidth, gLimit, vLimit) {
        let arr_comments = [];
        let vertical_comments = [];
        for (let index = 0; index < comments.length; index++) {
            let comment = comments[index];
            let i_g = Math.ceil(comment.time / gWidth);
            let i_v = Math.ceil(comment.time / vWidth);
            if (!arr_comments[i_g]) {
                arr_comments[i_g] = [];
            }
            if (!vertical_comments[i_v]) {
                vertical_comments[i_v] = [];
            }
            /* TODO: 屏蔽过滤 */

            if (vertical_comments[i_v].length < vLimit) {
                vertical_comments[i_v].push(comment);
            } else {
                /* 若垂直方向密度超限则转为水平弹幕 */
                comment.mode = 'rtl';
            }
            if (arr_comments[i_g].length < gLimit) {
                arr_comments[i_g].push(comment);
            }
        }
        return arr_comments.flat();
    }

    danmakuParser($comments, opacity, fontSize) {
        return $comments
            .map(($comment) => {
                const p = $comment.p;
                const values = p.split(',');
                const mode = { 6: 'ltr', 1: 'rtl', 5: 'top', 4: 'bottom' }[values[1]];
                if (!mode) return null;
                const color = `000000${Number(values[2]).toString(16)}`.slice(-6);
                return {
                    text: $comment.m,
                    mode,
                    time: values[0] * 1,
                    style: {
                        fontSize: `${fontSize}px`,
                        font: `${fontSize}px sans-serif`,
                        color: `#${color}`,
                        fillStyle: `#${color}`,
                        textShadow: color === '00000' ? '-1px -1px #fff, -1px 1px #fff, 1px -1px #fff, 1px 1px #fff' : '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',
                        strokeStyle: color === '000000' ? '#fff' : '#000',
                        opacity: opacity,
                        globalAlpha: opacity,
                        lineWidth: 2.0,
                    },
                };
            })
            .filter((x) => x);
    }
}

export default DanDanDanmaku;
