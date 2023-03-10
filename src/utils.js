/**
 * 检查是否为 Emby 下运行
 * @returns {boolean} result - 检查结果
 */
function isEmby() {
    return document.querySelector('meta[name="application-name"]').content == 'Emby';
}
