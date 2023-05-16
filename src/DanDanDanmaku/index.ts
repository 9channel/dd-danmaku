import Danmaku from 'danmaku';
import getClient from '../clients';
import translate, { Locals } from '../locales';
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

type ConfigMap = {
    [key: string]: any;
}

export class DanDanDanmaku {
    configs: ConfigMap;
    locales: Locals;
    danmaku: Danmaku | null;
    episode_info: null;
    ob: ResizeObserver | null;
    loading: boolean;
    timers: {};
    client: any;
    mediaInfo: {
        /* 是否为系列如番剧电视剧 */
        isSeries: boolean;
        /* 系列id */
        seriesId: null;
        /* 唯一id */
        episodeId: null;
    };
    constructor(window: Window, document: Document) {
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
            // 检查是否有旧配置
            if (window.localStorage.getItem(configName)) {
                try {
                    let oldConfig = JSON.parse(window.localStorage.getItem(configName) as string);
                    // 遍历旧配置
                    for (let k in oldConfig) {
                        // configs中有旧配置的key
                        if (this.configs[k] !== undefined) {
                            // 旧配置的值不为undefined
                            if (oldConfig[k] !== undefined) {
                                this.configs[k] = oldConfig[k];
                            }
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            window.localStorage.setItem(configName, JSON.stringify(this.configs));
        }

        this.locales = translate(window);
        this.danmaku = null;
        this.episode_info = null;
        this.ob = null;
        this.loading = false;
        this.timers = {};
        this.client = getClient(document, this);
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
    setConfig(k: string, v: any) {
        this.configs[k] = v;
        window.localStorage.setItem(configName, JSON.stringify(this.configs));
    }
    init() {
        this.client.init();
    }

    async downloadDanmakus() {
        let { chConvert } = this.configs;
        var url = new URL(baseUrl + uriComment + `${this.mediaInfo.episodeId}`);
        url.search = new URLSearchParams({ withRelated: "true", chConvert: chConvert }).toString();

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
            console.log(this.locales.log.danmakuDownloadS, data.comments.length);
            return data.comments;
        } catch (error) {
            console.log(this.locales.log.danmakuDownloadF, error);
            return null;
        }
    }

    createDanmaku(danmakus: any, _container: any, _media: any) {
        let { fontOpacity } = this.configs;
        let { filterGWidth } = this.configs;
        let { filterVWidth } = this.configs;
        let { filterGLimit } = this.configs;
        let { filterVLimit } = this.configs;
        let { danmakuEngine } = this.configs;
        let { fontAutoSize } = this.configs;
        let { fontScale } = this.configs;
        let { fontFixSize } = this.configs;
        let { enableDanmaku } = this.configs;

        if (this.danmaku != null) {
            this.danmaku.clear();
            this.danmaku.destroy();
            this.danmaku = null;
        }
        let fontSize = Math.round((window.screen.height > window.screen.width ? window.screen.width : window.screen.height / 1080) * 18);
        if (fontAutoSize) {
            fontSize = fontSize * fontScale;
        } else {
            fontSize = fontFixSize;
        }
        let _comments = this.danmakuFilter(this.danmakuParser(danmakus, fontOpacity, fontSize), filterGWidth, filterVWidth, filterGLimit, filterVLimit);
        console.log(this.locales.log.danmakuLoaded, _comments.length);
        this.danmaku = new Danmaku({
            container: _container,
            media: _media,
            comments: _comments,
            engine: danmakuEngine,
        });
        if (enableDanmaku) {
            this.danmaku.show();
        } else {
            this.danmaku.hide();
        }
        if (this.ob) {
            this.ob.disconnect();
        }
        this.ob = new ResizeObserver(() => {
            if (this.danmaku) {
                console.log(this.locales.log.resize);
                this.danmaku.resize();
            }
        });
        this.ob.observe(_container);
    }
    danmakuFilter(comments: any[], gWidth: number, vWidth: number, gLimit: number, vLimit: number) {
        let gCount = 0;
        let gCur = 0;
        let vCount = 0;
        let vCur = 0;
        let arr_comments = [];
        for (let index = 0; index < comments.length; index++) {
            let comment = comments[index];
            let iG = Math.ceil(comment.time / gWidth);
            if (iG != gCur) {
                gCount = 0;
                gCur = iG;
            }
            let iV = Math.ceil(comment.time / vWidth);
            if (iV != vCur) {
                vCount = 0;
                vCur = iV;
            }
            /* TODO: 屏蔽过滤 */
            if (vCount < vLimit) {
                vCount++;
            } else {
                /* 若垂直方向密度超限则转为水平弹幕 */
                comment.mode = 'rtl';
            }
            if (gCount < gLimit) {
                arr_comments.push(comment);
                gCount++;
            }
        }
        return arr_comments;
    }

    danmakuParser(comments: { p: string; m: string; }[], opacity: number, fontSize: number) {
        return comments
            .map((comment: { p: string; m: string; }) => {
                const p = comment.p;
                /**
                 * p参数格式为出现时间,模式,颜色,用户ID，各个参数之间使用英文逗号分隔
                 * 弹幕出现时间：格式为 0.00，单位为秒，精确到小数点后两位，例如12.34、445.6、789.01
                 * 弹幕模式：1-普通弹幕，4-底部弹幕，5-顶部弹幕
                 * 颜色：32位整数表示的颜色，算法为 Rx256x256+Gx256+B，R/G/B的范围应是0-255
                 * 用户ID：字符串形式表示的用户ID，通常为数字，不会包含特殊字符
                 */
                const values = p.split(',');
                const mode = { 6: 'ltr', 1: 'rtl', 5: 'top', 4: 'bottom' }[values[1]];
                if (!mode) return null;
                const color = `000000${Number(values[2]).toString(16)}`.slice(-6);
                return {
                    text: comment.m,
                    mode,
                    time: values[0] as unknown as number,
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
            .filter((x) => x != null);
    }
}
