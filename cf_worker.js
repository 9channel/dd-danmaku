const hostlist = { 'api.dandanplay.net': null };

async function handleRequest(request) {
    const urlObj = new URL(request.url);
    let url = urlObj.href.replace(urlObj.origin + '/cors/', '').trim();
    if (0 !== url.indexOf('https://') && 0 === url.indexOf('https:')) {
        url = url.replace('https:/', 'https://');
    } else if (0 !== url.indexOf('http://') && 0 === url.indexOf('http:')) {
        url = url.replace('http:/', 'http://');
    }
    let tUrlObj = new URL(url);
    if (!(tUrlObj.hostname in hostlist)) {
        return Forbidden(tUrlObj);
    }
    let response = await fetch(url, {
        headers: request.headers,
        body: request.body,
        method: request.method,
    });
    response = new Response(await response.body, response);
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
}

function Forbidden(url) {
    return new Response(`Hostname ${url.hostname} not allowed.`, {
        status: 403,
    });
}

addEventListener('fetch', (event) => {
    return event.respondWith(handleRequest(event.request));
});
