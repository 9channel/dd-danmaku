import Danmaku from 'danmaku';
const baseUrl = 'https://api.xn--7ovq92diups1e.com/cors/https://api.dandanplay.net';
const uriComment = '/api/v2/comment';
function getComments(episodeId, chConvert) {
    //let url = '/api/v2/comment/' + episodeId + '?withRelated=true&chConvert=' + chConvert;
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
