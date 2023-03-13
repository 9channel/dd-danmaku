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
