// ==UserScript==
// @name         Emby danmaku extension
// @description  Emby弹幕插件
// @namespace    https://github.com/RyoLee
// @author       RyoLee
// @version      1.3
// @copyright    2022, RyoLee (https://github.com/RyoLee)
// @license      MIT; https://raw.githubusercontent.com/RyoLee/emby-danmaku/master/LICENSE
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @updateURL    https://cdn.jsdelivr.net/gh/RyoLee/emby-danmaku@gh-pages/ede.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/RyoLee/emby-danmaku@gh-pages/ede.user.js
// @grant        none
// @match        */web/index.html
// ==/UserScript==

(async function () {
    'use strict';
    if (
        document
            .querySelector('meta[name="application-name"]')
            .content.toUpperCase() == 'Emby'.toUpperCase()
    ) {
        /* https://cdn.jsdelivr.net/npm/danmaku/dist/danmaku.canvas.min.js */
        // prettier-ignore
        !function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):(t="undefined"!=typeof globalThis?globalThis:t||self).Danmaku=i()}(this,(function(){"use strict";!function(){for(var t=["oTransform","msTransform","mozTransform","webkitTransform","transform"],i=document.createElement("div").style,e=0;e<t.length;e++)if(t[e]in i)return t[e]}();const t=window.devicePixelRatio||1;var i=Object.create(null);function e(e,n){if("function"==typeof e.render){var s=e.render();if(s instanceof HTMLCanvasElement)return e.width=s.width,e.height=s.height,s}var h=document.createElement("canvas"),r=h.getContext("2d"),a=e.style||{};a.font=a.font||"10px sans-serif",a.textBaseline=a.textBaseline||"bottom";var o=1*a.lineWidth;for(var d in o=o>0&&o!==1/0?Math.ceil(o):1*!!a.strokeStyle,r.font=a.font,e.width=e.width||Math.max(1,Math.ceil(r.measureText(e.text).width)+2*o),e.height=e.height||Math.ceil(function(t,e){if(i[t])return i[t];var n=12,s=t.match(/(\d+(?:\.\d+)?)(px|%|em|rem)(?:\s*\/\s*(\d+(?:\.\d+)?)(px|%|em|rem)?)?/);if(s){var h=1*s[1]||10,r=s[2],a=1*s[3]||1.2,o=s[4];"%"===r&&(h*=e.container/100),"em"===r&&(h*=e.container),"rem"===r&&(h*=e.root),"px"===o&&(n=a),"%"===o&&(n=h*a/100),"em"===o&&(n=h*a),"rem"===o&&(n=e.root*a),void 0===o&&(n=h*a)}return i[t]=n,n}(a.font,n))+2*o,h.width=e.width*t,h.height=e.height*t,r.scale(t,t),a)r[d]=a[d];var m=0;switch(a.textBaseline){case"top":case"hanging":m=o;break;case"middle":m=e.height>>1;break;default:m=e.height-o}return a.strokeStyle&&r.strokeText(e.text,o,m),r.fillText(e.text,o,m),h}function n(t){return 1*window.getComputedStyle(t,null).getPropertyValue("font-size").match(/(.+)px/)[1]}var s={name:"canvas",init:function(t){var i=document.createElement("canvas");return i.context=i.getContext("2d"),i._fontSize={root:n(document.getElementsByTagName("html")[0]),container:n(t)},i},clear:function(t,i){t.context.clearRect(0,0,t.width,t.height);for(var e=0;e<i.length;e++)i[e].canvas=null},resize:function(i,e,n){i.width=e*t,i.height=n*t,i.style.width=e+"px",i.style.height=n+"px"},framing:function(t){t.context.clearRect(0,0,t.width,t.height)},setup:function(t,i){for(var n=0;n<i.length;n++){var s=i[n];s.canvas=e(s,t._fontSize)}},render:function(i,e){i.context.drawImage(e.canvas,e.x*t,e.y*t)},remove:function(t,i){i.canvas=null}};function h(t){var i=this,e=this.media?this.media.currentTime:Date.now()/1e3,n=this.media?this.media.playbackRate:1;function s(t,s){if("top"===s.mode||"bottom"===s.mode)return e-t.time<i._.duration;var h=(i._.width+t.width)*(e-t.time)*n/i._.duration;if(t.width>h)return!0;var r=i._.duration+t.time-e,a=i._.width+s.width,o=i.media?s.time:s._utc,d=a*(e-o)*n/i._.duration,m=i._.width-d;return r>i._.duration*m/(i._.width+s.width)}for(var h=this._.space[t.mode],r=0,a=0,o=1;o<h.length;o++){var d=h[o],m=t.height;if("top"!==t.mode&&"bottom"!==t.mode||(m+=d.height),d.range-d.height-h[r].range>=m){a=o;break}s(d,t)&&(r=o)}var u=h[r].range,c={range:u+t.height,time:this.media?t.time:t._utc,width:t.width,height:t.height};return h.splice(r+1,a-r-1,c),"bottom"===t.mode?this._.height-t.height-u%this._.height:u%(this._.height-t.height)}var r=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(t){return setTimeout(t,50/3)},a=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||clearTimeout;function o(t,i,e){for(var n=0,s=0,h=t.length;s<h-1;)e>=t[n=s+h>>1][i]?s=n:h=n;return t[s]&&e<t[s][i]?s:h}function d(t){return/^(ltr|top|bottom)$/i.test(t)?t.toLowerCase():"rtl"}function m(){var t=9007199254740991;return[{range:0,time:-t,width:t,height:0},{range:t,time:t,width:0,height:0}]}function u(t){t.ltr=m(),t.rtl=m(),t.top=m(),t.bottom=m()}function c(){if(!this._.visible||!this._.paused)return this;if(this._.paused=!1,this.media)for(var t=0;t<this._.runningList.length;t++){var i=this._.runningList[t];i._utc=Date.now()/1e3-(this.media.currentTime-i.time)}var e=this,n=function(t,i,e,n){return function(){t(this._.stage);var s=Date.now()/1e3,r=this.media?this.media.currentTime:s,a=this.media?this.media.playbackRate:1,o=null,d=0,m=0;for(m=this._.runningList.length-1;m>=0;m--)o=this._.runningList[m],r-(d=this.media?o.time:o._utc)>this._.duration&&(n(this._.stage,o),this._.runningList.splice(m,1));for(var u=[];this._.position<this.comments.length&&(o=this.comments[this._.position],!((d=this.media?o.time:o._utc)>=r));)r-d>this._.duration||(this.media&&(o._utc=s-(this.media.currentTime-o.time)),u.push(o)),++this._.position;for(i(this._.stage,u),m=0;m<u.length;m++)(o=u[m]).y=h.call(this,o),this._.runningList.push(o);for(m=0;m<this._.runningList.length;m++){o=this._.runningList[m];var c=(this._.width+o.width)*(s-o._utc)*a/this._.duration;"ltr"===o.mode&&(o.x=c-o.width+.5|0),"rtl"===o.mode&&(o.x=this._.width-c+.5|0),"top"!==o.mode&&"bottom"!==o.mode||(o.x=this._.width-o.width>>1),e(this._.stage,o)}}}(this._.engine.framing.bind(this),this._.engine.setup.bind(this),this._.engine.render.bind(this),this._.engine.remove.bind(this));return this._.requestID=r((function t(){n.call(e),e._.requestID=r(t)})),this}function l(){return!this._.visible||this._.paused||(this._.paused=!0,a(this._.requestID),this._.requestID=0),this}function f(){if(!this.media)return this;this.clear(),u(this._.space);var t=o(this.comments,"time",this.media.currentTime);return this._.position=Math.max(0,t-1),this}function _(t){t.play=c.bind(this),t.pause=l.bind(this),t.seeking=f.bind(this),this.media.addEventListener("play",t.play),this.media.addEventListener("pause",t.pause),this.media.addEventListener("playing",t.play),this.media.addEventListener("waiting",t.pause),this.media.addEventListener("seeking",t.seeking)}function g(t){this.media.removeEventListener("play",t.play),this.media.removeEventListener("pause",t.pause),this.media.removeEventListener("playing",t.play),this.media.removeEventListener("waiting",t.pause),this.media.removeEventListener("seeking",t.seeking),t.play=null,t.pause=null,t.seeking=null}function p(t){this._={},this.container=t.container||document.createElement("div"),this.media=t.media,this._.visible=!0,this.engine="canvas",this._.engine=s,this._.requestID=0,this._.speed=Math.max(0,t.speed)||144,this._.duration=4,this.comments=t.comments||[],this.comments.sort((function(t,i){return t.time-i.time}));for(var i=0;i<this.comments.length;i++)this.comments[i].mode=d(this.comments[i].mode);return this._.runningList=[],this._.position=0,this._.paused=!0,this.media&&(this._.listener={},_.call(this,this._.listener)),this._.stage=this._.engine.init(this.container),this._.stage.style.cssText+="position:relative;pointer-events:none;",this.resize(),this.container.appendChild(this._.stage),this._.space={},u(this._.space),this.media&&this.media.paused||(f.call(this),c.call(this)),this}function v(){if(!this.container)return this;for(var t in l.call(this),this.clear(),this.container.removeChild(this._.stage),this.media&&g.call(this,this._.listener),this)Object.prototype.hasOwnProperty.call(this,t)&&(this[t]=null);return this}var w=["mode","time","text","render","style"];function y(t){if(!t||"[object Object]"!==Object.prototype.toString.call(t))return this;for(var i={},e=0;e<w.length;e++)void 0!==t[w[e]]&&(i[w[e]]=t[w[e]]);if(i.text=(i.text||"").toString(),i.mode=d(i.mode),i._utc=Date.now()/1e3,this.media){var n=0;void 0===i.time?(i.time=this.media.currentTime,n=this._.position):(n=o(this.comments,"time",i.time))<this._.position&&(this._.position+=1),this.comments.splice(n,0,i)}else this.comments.push(i);return this}function b(){return this._.visible?this:(this._.visible=!0,this.media&&this.media.paused||(f.call(this),c.call(this)),this)}function x(){return this._.visible?(l.call(this),this.clear(),this._.visible=!1,this):this}function L(){return this._.engine.clear(this._.stage,this._.runningList),this._.runningList=[],this}function T(){return this._.width=this.container.offsetWidth,this._.height=this.container.offsetHeight,this._.engine.resize(this._.stage,this._.width,this._.height),this._.duration=this._.width/this._.speed,this}var k={get:function(){return this._.speed},set:function(t){return"number"!=typeof t||isNaN(t)||!isFinite(t)||t<=0?this._.speed:(this._.speed=t,this._.width&&(this._.duration=this._.width/t),t)}};function E(t){t&&p.call(this,t)}return E.prototype.destroy=function(){return v.call(this)},E.prototype.emit=function(t){return y.call(this,t)},E.prototype.show=function(){return b.call(this)},E.prototype.hide=function(){return x.call(this)},E.prototype.clear=function(){return L.call(this)},E.prototype.resize=function(){return T.call(this)},Object.defineProperty(E.prototype,"speed",k),E}));

        class EDE {
            constructor() {
                this.chConvert = 1;
                if (window.localStorage.getItem('chConvert')) {
                    this.chConvert = window.localStorage.getItem('chConvert');
                }
                this.chConverTtitle = [
                    '当前状态: 未启用',
                    '当前状态: 转换为简体',
                    '当前状态: 转换为繁体',
                ];
                this.danmaku_icon = '<i class="md-icon">&#xE048;</i>';
                this.search_icon = '<i class="md-icon">&#xE881;</i>';
                this.info_icon = '<i class="md-icon">&#xE88E;</i>';
                this.translate_icon = '<i class="md-icon">&#xE8E2;</i>';
                if (window.localStorage.getItem('is_danmaku_show') == null) {
                    this.is_danmaku_show = true;
                } else {
                    this.is_danmaku_show =
                        window.localStorage.getItem('is_danmaku_show') ===
                        'true';
                }
                this.danmaku = null;
                this.episode_info = null;
                this.is_new_video = true;
            }
        }

        function wait(selector) {
            return new Promise((resolve) => {
                if (document.querySelector(selector)) {
                    return resolve(document.querySelector(selector));
                }

                const observer = new MutationObserver((mutations) => {
                    if (document.querySelector(selector)) {
                        resolve(document.querySelector(selector));
                        observer.disconnect();
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
            });
        }

        function initButton() {
            if (document.getElementById('danmakuCtr')) {
                return;
            }
            console.log('正在初始化UI');
            var parent = document.querySelector(
                '.videoOsd-centerButtons'
            ).parentNode;
            var menubar = document.createElement('div');
            menubar.className =
                'flex align-items-center flex-direction-row videoOsd-centerButtons videoOsd-centerButtons-autolayout';
            menubar.id = 'danmakuCtr';
            parent.append(menubar);
            var danmakuDisplay = document.createElement('button', {
                class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
                is: 'paper-icon-button-light',
            });
            danmakuDisplay.setAttribute('is', 'paper-icon-button-light');
            danmakuDisplay.setAttribute(
                'title',
                window.ede.is_danmaku_show ? '隐藏弹幕' : '显示弹幕'
            );
            danmakuDisplay.setAttribute('id', 'displayDanmaku');
            danmakuDisplay.innerHTML = window.ede.danmaku_icon;
            menubar.appendChild(danmakuDisplay);

            var danmakuSearch = document.createElement('button', {
                class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
                is: 'paper-icon-button-light',
            });
            danmakuSearch.setAttribute('is', 'paper-icon-button-light');
            danmakuSearch.setAttribute('title', '搜索弹幕');
            danmakuSearch.setAttribute('id', 'searchDanmaku');
            danmakuSearch.innerHTML = window.ede.search_icon;
            menubar.appendChild(danmakuSearch);

            var danmakuTranslate = document.createElement('button', {
                class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
                is: 'paper-icon-button-light',
            });
            danmakuTranslate.setAttribute('is', 'paper-icon-button-light');
            danmakuTranslate.setAttribute(
                'title',
                window.ede.chConverTtitle[window.ede.chConvert]
            );
            danmakuTranslate.setAttribute('id', 'translateDanmaku');
            danmakuTranslate.innerHTML = window.ede.translate_icon;
            menubar.appendChild(danmakuTranslate);

            var danmakuInfo = document.createElement('button', {
                class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
                is: 'paper-icon-button-light',
            });
            danmakuInfo.setAttribute('is', 'paper-icon-button-light');
            danmakuInfo.setAttribute('title', '查看弹幕信息');
            danmakuInfo.setAttribute('id', 'infoDanmaku');
            danmakuInfo.innerHTML = window.ede.info_icon;
            menubar.appendChild(danmakuInfo);

            document.querySelector('#displayDanmaku').onclick = function () {
                console.log(danmakuDisplay.getAttribute('title'));
                window.ede.is_danmaku_show = !window.ede.is_danmaku_show;
                window.localStorage.setItem(
                    'is_danmaku_show',
                    window.ede.is_danmaku_show
                );
                danmakuDisplay.setAttribute(
                    'title',
                    window.ede.is_danmaku_show ? '隐藏弹幕' : '显示弹幕'
                );
                if (window.ede.danmaku) {
                    window.ede.is_danmaku_show
                        ? window.ede.danmaku.show()
                        : window.ede.danmaku.hide();
                }
            };
            document.querySelector('#searchDanmaku').onclick = function () {
                window.ede.is_new_video = false;
                console.log('手动匹配弹幕');
                initDanmaku(false);
            };
            document.querySelector('#translateDanmaku').onclick = function () {
                console.log('切换简繁转换');
                window.ede.chConvert = (window.ede.chConvert + 1) % 3;
                window.localStorage.setItem('chConvert', window.ede.chConvert);
                danmakuTranslate.setAttribute(
                    'title',
                    window.ede.chConverTtitle[window.ede.chConvert]
                );
                console.log(danmakuTranslate.getAttribute('title'));
            };
            document.querySelector('#infoDanmaku').onclick = function () {
                console.log('显示当前信息');
                if (window.ede.episode_info != null) {
                    sendNotification('当前弹幕匹配', window.ede.episode_info);
                }
            };
            console.log('UI初始化完成');
        }

        function sendNotification(title, msg) {
            const Notification =
                window.Notification || window.webkitNotifications;
            console.log(msg);
            if (Notification.permission === 'granted') {
                return new Notification(title, {
                    body: msg,
                });
            } else {
                Notification.requestPermission((permission) => {
                    if (permission === 'granted') {
                        return new Notification(title, {
                            body: msg,
                        });
                    }
                });
            }
        }

        async function initDanmaku(is_auto = true) {
            console.log('正在初始化弹幕');
            window.require(['pluginManager'], (pluginManager) => {
                pluginManager.pluginsList.forEach((plugin) => {
                    if (plugin.id == 'htmlvideoplayer') {
                        var item = plugin._currentPlayOptions.item;
                        getDanmaku(is_auto, item);
                        console.log('弹幕初始化完成');
                    }
                });
            });
        }

        function getDanmaku(is_auto, item) {
            window.ede.danmaku = null;
            window.ede.episode_info = null;
            var _id;
            var anime;
            var anime_id = 0;
            var episode;
            if (item.Type == 'Episode') {
                _id = item.SeasonId;
                anime = item.SeriesName;
                episode = item.IndexNumber;
                var session = item.ParentIndexNumber;
                if (session != 1) {
                    anime += '第' + session + '季';
                }
            } else {
                _id = item.Id;
                anime = item.Name;
                episode = 'movie';
            }
            var _name_key = '_anime_name_rel_' + _id;
            var _id_key = '_anime_id_rel_' + _id;
            if (window.localStorage.getItem(_id_key)) {
                anime_id = window.localStorage.getItem(_id_key);
            }
            if (window.localStorage.getItem(_name_key)) {
                anime = window.localStorage.getItem(_name_key);
            }
            if (!is_auto) {
                anime = prompt('确认动画名:', anime);
            }

            var searchUrl =
                'https://api.acplay.net/api/v2/search/episodes?anime=' +
                anime +
                '&withRelated=true';
            if (is_auto) {
                searchUrl += '&episode=' + episode;
            }
            fetch(searchUrl)
                .then((response) => response.json())
                .then((data) => {
                    console.log('查询成功');
                    console.log(data);
                    var selecAnime_id = 0;
                    if (anime_id != 0) {
                        for (
                            let index = 0;
                            index < data.animes.length;
                            index++
                        ) {
                            if (data.animes[index].animeId == anime_id) {
                                selecAnime_id = index;
                            }
                        }
                    }
                    if (!is_auto) {
                        var anime_lists_str = list2string(data);
                        console.log(data);
                        console.log(anime_lists_str);
                        selecAnime_id = prompt(
                            '选择:\n' + anime_lists_str,
                            selecAnime_id
                        );
                        window.localStorage.setItem(
                            _id_key,
                            data.animes[selecAnime_id].animeId
                        );
                        window.localStorage.setItem(
                            _name_key,
                            data.animes[selecAnime_id].animeTitle
                        );
                        var episode_lists_str = ep2string(
                            data.animes[selecAnime_id].episodes
                        );
                        episode = prompt(
                            '确认集数:\n' + episode_lists_str,
                            parseInt(episode) - 1
                        );
                        episode = parseInt(episode);
                    } else {
                        episode = 0;
                    }
                    var episodeId =
                        data.animes[selecAnime_id].episodes[episode].episodeId;
                    window.ede.episode_info =
                        '动画名称:' + data.animes[selecAnime_id].animeTitle;
                    if (data.animes[selecAnime_id].type == 'tvseries') {
                        window.ede.episode_info +=
                            '\n分集名称:' +
                            data.animes[selecAnime_id].episodes[episode]
                                .episodeTitle;
                    }
                    var commentsUrl =
                        'https://api.xn--7ovq92diups1e.com/cors/https://api.acplay.net/api/v2/comment/' +
                        episodeId +
                        '?withRelated=true&chConvert=' +
                        window.ede.chConvert;
                    fetch(commentsUrl)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('弹幕加载成功');
                            var _comments = bilibiliParser(data.comments);
                            var _container = document.querySelector(
                                "div[data-type='video-osd']"
                            );
                            var _media = document.querySelector(
                                "video[class='htmlvideoplayer moveUpSubtitles']"
                            );
                            if (window.ede.danmaku != null) {
                                window.ede.danmaku.clear();
                                window.ede.danmaku.destroy();
                                window.ede.danmaku = null;
                                window.ede.episode_info = null;
                                selecAnime_id = 0;
                            }
                            window.ede.danmaku = new Danmaku({
                                container: _container,
                                media: _media,
                                comments: _comments,
                                engine: 'canvas',
                            });
                            window.ede.is_danmaku_show
                                ? window.ede.danmaku.show()
                                : window.ede.danmaku.hide();
                            var player_container = document.querySelector(
                                "div[class='videoPlayerContainer']"
                            );
                            new ResizeObserver(() => {
                                console.log('Resizing');
                                window.ede.danmaku.resize();
                            }).observe(player_container);
                        });
                });
        }

        function bilibiliParser($obj) {
            //const $xml = new DOMParser().parseFromString(string, 'text/xml')
            console.log($obj);
            return $obj
                .map(($comment) => {
                    const p = $comment.p;
                    //if (p === null || $comment.childNodes[0] === undefined) return null
                    const values = p.split(',');
                    const mode = { 6: 'ltr', 1: 'rtl', 5: 'top', 4: 'bottom' }[
                        values[1]
                    ];
                    if (!mode) return null;
                    //const fontSize = Number(values[2]) || 25
                    const fontSize = 25;
                    const color = `000000${Number(values[2]).toString(
                        16
                    )}`.slice(-6);
                    return {
                        text: $comment.m,
                        mode,
                        time: values[0] * 1,
                        style: {
                            fontSize: `${fontSize}px`,
                            color: `#${color}`,
                            textShadow:
                                color === '00000'
                                    ? '-1px -1px #fff, -1px 1px #fff, 1px -1px #fff, 1px 1px #fff'
                                    : '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',

                            font: `${fontSize}px sans-serif`,
                            fillStyle: `#${color}`,
                            strokeStyle: color === '000000' ? '#fff' : '#000',
                            lineWidth: 2.0,
                        },
                    };
                })
                .filter((x) => x);
        }

        function list2string($obj2) {
            const $animes = $obj2.animes;
            var anime_lists = $animes.map(($single_anime) => {
                return (
                    $single_anime.animeTitle +
                    ' 类型:' +
                    $single_anime.typeDescription
                );
            });
            var anime_lists_str = '0:' + anime_lists[0];
            for (var i = 1; i < anime_lists.length; i++) {
                anime_lists_str =
                    anime_lists_str +
                    '\n' +
                    i.toString() +
                    ':' +
                    anime_lists[i];
            }
            return anime_lists_str;
        }

        function ep2string($obj3) {
            const $animes = $obj3;
            var anime_lists = $animes.map(($single_ep) => {
                return $single_ep.episodeTitle;
            });
            var ep_lists_str = '0:' + anime_lists[0];
            for (var i = 1; i < anime_lists.length; i++) {
                ep_lists_str =
                    ep_lists_str + '\n' + i.toString() + ':' + anime_lists[i];
            }
            return ep_lists_str;
        }

        function loadVideo() {
            if (window.ede.danmaku != null) {
                window.ede.danmaku.clear();
                window.ede.danmaku.destroy();
                window.ede.danmaku = null;
                window.ede.episode_info = null;
            }
            window.ede.is_new_video = true;
        }

        function playVideo() {
            if (window.ede.is_new_video) {
                if (window.ede.danmaku != null) {
                    window.ede.danmaku.clear();
                    window.ede.danmaku.destroy();
                    window.ede.danmaku = null;
                    window.ede.episode_info = null;
                }
                window.ede.is_new_video = false;
                initDanmaku();
            }
        }

        function initListener() {
            wait('video').then((ele) => {
                var video_container = document.querySelector('video');
                video_container.removeEventListener('loadstart', loadVideo);
                video_container.removeEventListener('play', playVideo);
                video_container.addEventListener('loadstart', loadVideo);
                video_container.addEventListener('play', playVideo);
            });
        }
        while (!window.require || !window.ConnectionManager) {
            await new Promise((resolve) => setTimeout(resolve, 200));
        }
        if (!window.ede) {
            window.ede = new EDE(window);
            initListener();
            window.addEventListener('hashchange', initListener);
            setInterval(() => {
                wait('.videoOsd-centerButtons').then((ele) => {
                    initButton();
                });
            }, 500);
        }
    }
})();
