
(async function () {
    'use strict';
    if (document.querySelector('meta[name="application-name"]').content == 'Emby') {
        // ------ configs start------
        

        function createButton(opt) {
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

        function initListener() {
            let container = document.querySelector(mediaQueryStr);
            // 页面未加载
            if (!container) {
                if (window.ede.episode_info) {
                    window.ede.episode_info = null;
                }
                return;
            }
            if (!container.getAttribute('ede_listening')) {
                console.log('正在初始化Listener');
                container.setAttribute('ede_listening', true);
                container.addEventListener('play', reloadDanmaku);
                console.log('Listener初始化完成');
            }
        }

        function getElementsByInnerText(tagType, innerStr, excludeChildNode = true) {
            var temp = [];
            var elements = document.getElementsByTagName(tagType);
            if (!elements || 0 == elements.length) {
                return temp;
            }
            for (let index = 0; index < elements.length; index++) {
                var e = elements[index];
                if (e.innerText.includes(innerStr)) {
                    temp.push(e);
                }
            }
            if (!excludeChildNode) {
                return temp;
            }
            var res = [];
            temp.forEach((e) => {
                var e_copy = e.cloneNode(true);
                while (e_copy.firstChild != e_copy.lastChild) {
                    e_copy.removeChild(e_copy.lastChild);
                }
                if (e_copy.innerText.includes(innerStr)) {
                    res.push(e);
                }
            });
            return res;
        }

        function initUI() {
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
            if (!window.ede.episode_info) {
                menubar.style.opacity = 0.5;
            }
            parent.append(menubar);
            // 弹幕开关
            displayButtonOpts.innerText = danmaku_icons[window.ede.danmakuSwitch];
            menubar.appendChild(createButton(displayButtonOpts));
            // 手动匹配
            menubar.appendChild(createButton(searchButtonOpts));
            // 简繁转换
            translateButtonOpts.title = chConverTtitle[window.ede.chConvert];
            menubar.appendChild(createButton(translateButtonOpts));
            // 屏蔽等级
            filterButtonOpts.innerText = filter_icons[parseInt(window.localStorage.getItem('danmakuFilterLevel') ? window.localStorage.getItem('danmakuFilterLevel') : 0)];
            menubar.appendChild(createButton(filterButtonOpts));
            // 弹幕信息
            menubar.appendChild(createButton(infoButtonOpts));
            console.log('UI初始化完成');
        }

        function sendNotification(title, msg) {
            const Notification = window.Notification || window.webkitNotifications;
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

        function getEmbyItemInfo() {
            return window.require(['pluginManager']).then((items) => {
                if (items) {
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        if (item.pluginsList) {
                            for (let j = 0; j < item.pluginsList.length; j++) {
                                const plugin = item.pluginsList[j];
                                if (plugin && plugin.id == 'htmlvideoplayer') {
                                    return plugin._currentPlayOptions ? plugin._currentPlayOptions.item : null;
                                }
                            }
                        }
                    }
                }
                return null;
            });
        }

        async function getEpisodeInfo(is_auto = true) {
            let item = await getEmbyItemInfo();
            if (!item) {
                return null;
            }
            let _id;
            let animeName;
            let anime_id = -1;
            let episode;
            if (item.Type == 'Episode') {
                _id = item.SeasonId;
                animeName = item.SeriesName;
                episode = item.IndexNumber;
                let session = item.ParentIndexNumber;
                if (session != 1) {
                    animeName += ' ' + session;
                }
            } else {
                _id = item.Id;
                animeName = item.Name;
                episode = 'movie';
            }
            let _id_key = '_anime_id_rel_' + _id;
            let _name_key = '_anime_name_rel_' + _id;
            let _episode_key = '_episode_id_rel_' + _id + '_' + episode;
            if (is_auto) {
                if (window.localStorage.getItem(_episode_key)) {
                    return JSON.parse(window.localStorage.getItem(_episode_key));
                }
            }
            if (window.localStorage.getItem(_id_key)) {
                anime_id = window.localStorage.getItem(_id_key);
            }
            if (window.localStorage.getItem(_name_key)) {
                animeName = window.localStorage.getItem(_name_key);
            }
            if (!is_auto) {
                animeName = prompt('确认动画名:', animeName);
            }

            let searchUrl = 'https://api.dandanplay.net/api/v2/search/episodes?anime=' + animeName + '&withRelated=true';
            if (is_auto) {
                searchUrl += '&episode=' + episode;
            }
            let animaInfo = await fetch(searchUrl, {
                method: 'GET',
                headers: {
                    'Accept-Encoding': 'gzip',
                    Accept: 'application/json',
                    'User-Agent': navigator.userAgent,
                },
            })
                .then((response) => response.json())
                .catch((error) => {
                    console.log('查询失败:', error);
                    return null;
                });
            console.log('查询成功');
            console.log(animaInfo);
            let selecAnime_id = 1;
            if (anime_id != -1) {
                for (let index = 0; index < animaInfo.animes.length; index++) {
                    if (animaInfo.animes[index].animeId == anime_id) {
                        selecAnime_id = index + 1;
                    }
                }
            }
            if (!is_auto) {
                let anime_lists_str = list2string(animaInfo);
                console.log(anime_lists_str);
                selecAnime_id = prompt('选择:\n' + anime_lists_str, selecAnime_id);
                selecAnime_id = parseInt(selecAnime_id) - 1;
                window.localStorage.setItem(_id_key, animaInfo.animes[selecAnime_id].animeId);
                window.localStorage.setItem(_name_key, animaInfo.animes[selecAnime_id].animeTitle);
                let episode_lists_str = ep2string(animaInfo.animes[selecAnime_id].episodes);
                episode = prompt('确认集数:\n' + episode_lists_str, parseInt(episode));
                episode = parseInt(episode) - 1;
            } else {
                selecAnime_id = parseInt(selecAnime_id) - 1;
                episode = 0;
            }
            let episodeInfo = {
                episodeId: animaInfo.animes[selecAnime_id].episodes[episode].episodeId,
                animeTitle: animaInfo.animes[selecAnime_id].animeTitle,
                episodeTitle: animaInfo.animes[selecAnime_id].type == 'tvseries' ? animaInfo.animes[selecAnime_id].episodes[episode].episodeTitle : null,
            };
            window.localStorage.setItem(_episode_key, JSON.stringify(episodeInfo));
            return episodeInfo;
        }

        function getComments(episodeId) {
            let url = 'https://api.xn--7ovq92diups1e.com/cors/https://api.dandanplay.net/api/v2/comment/' + episodeId + '?withRelated=true&chConvert=' + window.ede.chConvert;
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

        async function createDanmaku(comments) {
            if (!comments) {
                return;
            }
            if (window.ede.danmaku != null) {
                window.ede.danmaku.clear();
                window.ede.danmaku.destroy();
                window.ede.danmaku = null;
            }
            let _comments = danmakuFilter(danmakuParser(comments));
            console.log('弹幕加载成功: ' + _comments.length);

            while (!document.querySelector(mediaContainerQueryStr)) {
                await new Promise((resolve) => setTimeout(resolve, 200));
            }

            let _container = document.querySelector(mediaContainerQueryStr);
            let _media = document.querySelector(mediaQueryStr);
            window.ede.danmaku = new Danmaku({
                container: _container,
                media: _media,
                comments: _comments,
                engine: 'canvas',
            });
            window.ede.danmakuSwitch == 1 ? window.ede.danmaku.show() : window.ede.danmaku.hide();
            if (window.ede.ob) {
                window.ede.ob.disconnect();
            }
            window.ede.ob = new ResizeObserver(() => {
                if (window.ede.danmaku) {
                    console.log('Resizing');
                    window.ede.danmaku.resize();
                }
            });
            window.ede.ob.observe(_container);
        }

        function reloadDanmaku(type = 'check') {
            if (window.ede.loading) {
                console.log('正在重新加载');
                return;
            }
            window.ede.loading = true;
            getEpisodeInfo(type != 'search')
                .then((info) => {
                    return new Promise((resolve, reject) => {
                        if (!info) {
                            if (type != 'init') {
                                reject('播放器未完成加载');
                            } else {
                                reject(null);
                            }
                        }
                        if (type != 'search' && type != 'reload' && window.ede.danmaku && window.ede.episode_info && window.ede.episode_info.episodeId == info.episodeId) {
                            reject('当前播放视频未变动');
                        } else {
                            window.ede.episode_info = info;
                            resolve(info.episodeId);
                        }
                    });
                })
                .then(
                    (episodeId) =>
                        getComments(episodeId).then((comments) =>
                            createDanmaku(comments).then(() => {
                                console.log('弹幕就位');
                            }),
                        ),
                    (msg) => {
                        if (msg) {
                            console.log(msg);
                        }
                    },
                )
                .then(() => {
                    window.ede.loading = false;
                    if (document.getElementById('danmakuCtr').style.opacity != 1) {
                        document.getElementById('danmakuCtr').style.opacity = 1;
                    }
                });
        }

        function danmakuFilter(comments) {
            let level = parseInt(window.localStorage.getItem('danmakuFilterLevel') ? window.localStorage.getItem('danmakuFilterLevel') : 0);
            if (level == 0) {
                return comments;
            }
            let limit = 9 - level * 2;
            let vertical_limit = 6;
            let arr_comments = [];
            let vertical_comments = [];
            for (let index = 0; index < comments.length; index++) {
                let element = comments[index];
                let i = Math.ceil(element.time);
                let i_v = Math.ceil(element.time / 3);
                if (!arr_comments[i]) {
                    arr_comments[i] = [];
                }
                if (!vertical_comments[i_v]) {
                    vertical_comments[i_v] = [];
                }
                // TODO: 屏蔽过滤
                if (vertical_comments[i_v].length < vertical_limit) {
                    vertical_comments[i_v].push(element);
                } else {
                    element.mode = 'rtl';
                }
                if (arr_comments[i].length < limit) {
                    arr_comments[i].push(element);
                }
            }
            return arr_comments.flat();
        }

        function danmakuParser($obj) {
            //const $xml = new DOMParser().parseFromString(string, 'text/xml')
            return $obj
                .map(($comment) => {
                    const p = $comment.p;
                    //if (p === null || $comment.childNodes[0] === undefined) return null
                    const values = p.split(',');
                    const mode = { 6: 'ltr', 1: 'rtl', 5: 'top', 4: 'bottom' }[values[1]];
                    if (!mode) return null;
                    //const fontSize = Number(values[2]) || 25
                    const fontSize = Math.round((window.screen.height > window.screen.width ? window.screen.width : window.screen.height / 1080) * 18);
                    const color = `000000${Number(values[2]).toString(16)}`.slice(-6);
                    return {
                        text: $comment.m,
                        mode,
                        time: values[0] * 1,
                        style: {
                            fontSize: `${fontSize}px`,
                            color: `#${color}`,
                            textShadow:
                                color === '00000' ? '-1px -1px #fff, -1px 1px #fff, 1px -1px #fff, 1px 1px #fff' : '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',

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
            let anime_lists = $animes.map(($single_anime) => {
                return $single_anime.animeTitle + ' 类型:' + $single_anime.typeDescription;
            });
            let anime_lists_str = '1:' + anime_lists[0];
            for (let i = 1; i < anime_lists.length; i++) {
                anime_lists_str = anime_lists_str + '\n' + (i + 1).toString() + ':' + anime_lists[i];
            }
            return anime_lists_str;
        }

        function ep2string($obj3) {
            const $animes = $obj3;
            let anime_lists = $animes.map(($single_ep) => {
                return $single_ep.episodeTitle;
            });
            let ep_lists_str = '1:' + anime_lists[0];
            for (let i = 1; i < anime_lists.length; i++) {
                ep_lists_str = ep_lists_str + '\n' + (i + 1).toString() + ':' + anime_lists[i];
            }
            return ep_lists_str;
        }

    }
})();
