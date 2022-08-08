// ==UserScript==
// @name         Emby danmaku extension
// @description  鼠鼠怕不是要生气嘞!
// @namespace    https://github.com/RyoLee
// @author       RyoLee
// @version      1.0
// @copyright    2022, RyoLee (https://github.com/RyoLee)
// @license      MIT; https://raw.githubusercontent.com/RyoLee/emby-danmaku/master/LICENSE
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @updateURL    https://cdn.jsdelivr.net/gh/RyoLee/emby-danmaku/ede.js
// @downloadURL  https://cdn.jsdelivr.net/gh/RyoLee/emby-danmaku/ede.js
// @require      https://cdn.jsdelivr.net/npm/danmaku/dist/danmaku.canvas.min.js
// @require      https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js
// @match        */web/index.html
// ==/UserScript==
// ------config start------
//中文简繁转换。0-不转换，1-转换为简体，2-转换为繁体。
var chConvert = 1

// ------config end------
// 除非你知道你在做什么,否则不要修改以下部分
var danmaku_icon = '<i class="md-icon">&#xE048;</i>'
var search_icon = '<i class="md-icon">&#xE881;</i>'
var info_icon = '<i class="md-icon">&#xE853;</i>'
var is_danmaku_show = true
var danmaku = null;
var episode_info = null
var video_container
var is_new_video = true

function initButton() {
    var parent = document.querySelector("div[class='videoOsd-endsAtText']").parentNode
    var menubar = document.createElement("div");//创建父div
    menubar.className = "flex align-items-center flex-direction-row videoOsd-centerButtons videoOsd-centerButtons-autolayout"
    menubar.id = "danmakuCtr"
    parent.appendChild(menubar)
    var danmakuDisplay = document.createElement('button', {
        class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
        is: 'paper-icon-button-light'
    })
    danmakuDisplay.setAttribute("is", "paper-icon-button-light")
    danmakuDisplay.setAttribute("title", "显示/隐藏弹幕")
    danmakuDisplay.setAttribute("id", "displayDanmaku")
    danmakuDisplay.innerHTML = danmaku_icon
    menubar.appendChild(danmakuDisplay)

    var danmakuSearch = document.createElement('button', {
        class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
        is: 'paper-icon-button-light'
    })
    danmakuSearch.setAttribute("is", "paper-icon-button-light")
    danmakuSearch.setAttribute("title", "搜索弹幕")
    danmakuSearch.setAttribute("id", "searchDanmaku")
    danmakuSearch.innerHTML = search_icon
    menubar.appendChild(danmakuSearch)

    var danmakuInfo = document.createElement('button', {
        class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
        is: 'paper-icon-button-light'
    })
    danmakuInfo.setAttribute("is", "paper-icon-button-light")
    danmakuInfo.setAttribute("title", "查看弹幕信息")
    danmakuInfo.setAttribute("id", "infoDanmaku")
    danmakuInfo.innerHTML = info_icon
    menubar.appendChild(danmakuInfo)
    $("#displayDanmaku").click(function () {
        if (is_danmaku_show) {
            console.log("隐藏弹幕")
            danmaku.hide();
            is_danmaku_show = false
        } else {
            console.log("显示弹幕")
            danmaku.show();
            is_danmaku_show = true
        }
    })
    $("#searchDanmaku").click(function () {
        is_new_video = false
        console.log("手动匹配弹幕")
        initDanmaku(false)
    })
    $("#infoDanmaku").click(function () {
        console.log("显示当前信息")
        if (episode_info != null) {
            alert(episode_info)
        }
    })
}
function initDanmaku(is_auto = true) {
    var _url = new URL(video_container.src)
    var iteam_id = /videos\/([0-9]*)/gi.exec(_url.pathname)[1]
    var api_key = new URLSearchParams(_url.search).get('api_key')
    var q_item_url = _url.origin + '/emby/Items?Ids=' + iteam_id + '&api_key=' + api_key
    $.getJSON(q_item_url, function (data) {
        getDanmaku(is_auto, data)
    })

}
function getDanmaku(is_auto, data) {
    danmaku = null
    episode_info = null
    var _id
    var anime
    var anime_id = 0
    var episode
    if (data['Items'][0]['Type'] == 'Episode') {
        _id = data['Items'][0]['SeasonId']
        anime = data['Items'][0]['SeriesName']
        episode = data['Items'][0]['IndexNumber']
        var session = data['Items'][0]['ParentIndexNumber']
        if (session != 1) {
            anime += '第' + session + '季'
        }
    } else {
        _id = data['Items'][0]['Id']
        anime = data['Items'][0]['Name']
        episode = 'movie'
    }
    var _name_key = '_anime_name_rel_' + _id
    var _id_key = '_anime_id_rel_' + _id
    if (window.localStorage.getItem(_id_key)) {
        anime_id = window.localStorage.getItem(_id_key)
    }
    if (window.localStorage.getItem(_name_key)) {
        anime = window.localStorage.getItem(_name_key)
    }
    if (!is_auto) {
        anime = prompt("确认动画名:", anime)
    }

    var searchUrl;
    if (!is_auto) {
        searchUrl = "https://api.acplay.net/api/v2/search/episodes?anime=" + anime + "&withRelated=true" //+"&episode="+episode,
    } else {
        searchUrl = "https://api.acplay.net/api/v2/search/episodes?anime=" + anime + "&withRelated=true&episode=" + episode
    }
    $.getJSON(searchUrl, function (data) {
        console.log("查询成功");
        var selecAnime_id = 0
        if (anime_id != 0) {
            for (let index = 0; index < data.animes.length; index++) {
                if (data.animes[index].animeId == anime_id) {
                    selecAnime_id = index
                }
            }
        }
        if (!is_auto) {
            var anime_lists_str = list2string(data)
            console.log(data)
            console.log(anime_lists_str);
            selecAnime_id = prompt("选择:\n" + anime_lists_str, selecAnime_id)
            window.localStorage.setItem(_id_key, data.animes[selecAnime_id].animeId)
            window.localStorage.setItem(_name_key, data.animes[selecAnime_id].animeTitle)
            var episode_lists_str = ep2string(data.animes[selecAnime_id].episodes)
            episode = prompt("确认集数:\n" + episode_lists_str, parseInt(episode) - 1);
            episode = parseInt(episode)
        } else {
            episode = 0
        }
        var episodeId = data.animes[selecAnime_id].episodes[episode].episodeId
        if (data.animes[selecAnime_id].type == "tvseries") {
            episode_info = "动画名称:" + data.animes[selecAnime_id].animeTitle + "\n分集名称:" + data.animes[selecAnime_id].episodes[episode].episodeTitle
        } else {
            episode_info = "动画名称:" + data.animes[selecAnime_id].animeTitle
        }

        $.getJSON("https://api.xn--7ovq92diups1e.com/cors/https://api.acplay.net/api/v2/comment/" + episodeId + "?withRelated=true&chConvert=" + chConvert, function (data) {
            console.log("弹幕加载成功");
            var _comments = bilibiliParser(data.comments)
            var _container = document.querySelector("div[data-type='video-osd']")
            var _media = document.querySelector("video[class='htmlvideoplayer moveUpSubtitles']")
            if (danmaku != null) {
                danmaku.clear();
                danmaku.destroy()
                danmaku = null
                episode_info = null
                selecAnime_id = 0
            }
            danmaku = new Danmaku({
                container: _container,
                media: _media,
                comments: _comments,
                engine: 'canvas'
            })

            var player_container = document.querySelector("div[class='videoPlayerContainer']");
            new ResizeObserver(() => {
                console.log("Resizing")
                danmaku.resize()
            }).observe(player_container)
        })
    })
}

function bilibiliParser($obj) {
    //const $xml = new DOMParser().parseFromString(string, 'text/xml');
    console.log($obj)
    return $obj.map(($comment) => {
        const p = $comment.p
        //if (p === null || $comment.childNodes[0] === undefined) return null;
        const values = p.split(',');
        const mode = ({ 6: 'ltr', 1: 'rtl', 5: 'top', 4: 'bottom' })[values[1]];
        if (!mode) return null;
        //const fontSize = Number(values[2]) || 25;
        const fontSize = 25
        const color = `000000${Number(values[2]).toString(16)}`.slice(-6);
        return {
            text: $comment.m,
            mode,
            time: values[0] * 1,
            style: {
                fontSize: `${fontSize}px`,
                color: `#${color}`,
                textShadow: color === '00000'
                    ? '-1px -1px #fff, -1px 1px #fff, 1px -1px #fff, 1px 1px #fff'
                    : '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',

                font: `${fontSize}px sans-serif`,
                fillStyle: `#${color}`,
                strokeStyle: color === '000000' ? '#fff' : '#000',
                lineWidth: 2.0,
            },
        };
    }).filter((x) => x);
}

function list2string($obj2) {
    const $animes = $obj2.animes
    var anime_lists = $animes.map(($single_anime) => {
        return $single_anime.animeTitle + " 类型:" + $single_anime.typeDescription
    })
    var anime_lists_str = '0:' + anime_lists[0];
    for (var i = 1; i < anime_lists.length; i++) {
        anime_lists_str = anime_lists_str + "\n" + (i).toString() + ":" + anime_lists[i]
    }
    return anime_lists_str
}

function ep2string($obj3) {
    const $animes = $obj3
    var anime_lists = $animes.map(($single_ep) => {
        return $single_ep.episodeTitle
    })
    var ep_lists_str = '0:' + anime_lists[0];
    for (var i = 1; i < anime_lists.length; i++) {
        ep_lists_str = ep_lists_str + "\n" + (i).toString() + ":" + anime_lists[i]
    }
    return ep_lists_str
}

function loadVideo() {
    if (danmaku != null) {
        danmaku.clear();
        danmaku.destroy()
        danmaku = null
        episode_info = null
    }
    is_new_video = true
}

function playVideo() {
    if (is_new_video) {
        if (danmaku != null) {
            danmaku.clear();
            danmaku.destroy()
            danmaku = null
            episode_info = null
        }
        is_new_video = false
        initDanmaku()
    }
}

function waitForKeyElements(selectorOrFunction, callback, waitOnce, interval, maxIntervals) {
    if (typeof waitOnce === "undefined") {
        waitOnce = true;
    }
    if (typeof interval === "undefined") {
        interval = 300;
    }
    if (typeof maxIntervals === "undefined") {
        maxIntervals = -1;
    }
    var targetNodes = (typeof selectorOrFunction === "function")
        ? selectorOrFunction()
        : document.querySelectorAll(selectorOrFunction);

    var targetsFound = targetNodes && targetNodes.length > 0;
    if (targetsFound) {
        targetNodes.forEach(function (targetNode) {
            var attrAlreadyFound = "data-userscript-alreadyFound";
            var alreadyFound = targetNode.getAttribute(attrAlreadyFound) || false;
            if (!alreadyFound) {
                var cancelFound = callback(targetNode);
                if (cancelFound) {
                    targetsFound = false;
                }
                else {
                    targetNode.setAttribute(attrAlreadyFound, true);
                }
            }
        });
    }

    if (maxIntervals !== 0 && !(targetsFound && waitOnce)) {
        maxIntervals -= 1;
        setTimeout(function () {
            waitForKeyElements(selectorOrFunction, callback, waitOnce, interval, maxIntervals);
        }, interval);
    }
}

(function () {
    'use strict';
    if (document.querySelector('meta[name="application-name"]').content.toUpperCase() == 'Emby'.toUpperCase()) {
        waitForKeyElements("div[class='videoOsd-endsAtText']", initButton)
        waitForKeyElements("video[class='htmlvideoplayer moveUpSubtitles']", function () {
            video_container = document.querySelector("video[class='htmlvideoplayer moveUpSubtitles']");
            video_container.addEventListener('loadstart', loadVideo)
            video_container.addEventListener('play', playVideo)
        })
    }
})();
