import '../components/constants';
/**
 * 检查是否为 Emby 下运行
 * @returns {boolean} result - 检查结果
 */
function isEmby() {
    return document.querySelector('meta[name="application-name"]').content == 'Emby';
}
/**
 *
 * @param {title: 标题, id: 按钮id, innerText: 显示内容, onclick: 点击事件} opt
 * @returns {button} 按钮对象
 */
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
