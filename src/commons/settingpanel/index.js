/* 创建设置面板 */
/**
 * info 信息展示区结构：
 * 1. 当前匹配状态
 * 2. 当前视频配置
 *
 * search 手动匹配区结构：
 * 1. 名称输入框
 * 2. isSeries勾选框
 * 3. 匹配按钮
 * 4. 匹配结果展示下拉框
 * 5. 匹配结果信息展示区
 * 6. offset输入区
 * 7. 绑定按钮
 *
 * global setting 全局设计区结构：
 * 1. 弹幕过滤等级
 * 2. 弹幕透明度
 * 3. 简繁转换
 * 4. 弹幕字体
 * 5. 弹幕大小
 */
const createSettingPanel = (document, ddd) => {
    /* 设置面板 */
    const settingPanel = document.createElement('div');
    settingPanel.id = 'settingPanel';
    settingPanel.className = 'setting-panel';
    settingPanel.style.display = 'none';
    /* 设置面板-标题 */
    const settingPanelTitle = document.createElement('div');
    settingPanelTitle.className = 'setting-panel-title';
    settingPanelTitle.innerText = 'DanDanDanmaku';
    settingPanel.appendChild(settingPanelTitle);
    /* 设置面板-关闭按钮 */
    const settingPanelClose = document.createElement('div');
    settingPanelClose.className = 'setting-panel-close';
    settingPanelClose.innerText = '×';
    settingPanelClose.onclick = () => {
        settingPanel.style.display = 'none';
    }
    settingPanel.appendChild(settingPanelClose);
    /* 设置面板-info */
    const settingPanelContent = document.createElement('div');
    settingPanelContent.className = 'setting-panel-content';
    settingPanel.appendChild(settingPanelContent);
    /* info-匹配状态 */
    const infoStatus = document.createElement('div');
    infoStatus.className = 'info-status';
    infoStatus.innerText = ddd.locale.settingPanel.info.status;
    settingPanelContent.appendChild(infoStatus);
    /* info-视频配置 */
    const infoConfig = document.createElement('div');
    infoConfig.className = 'info-config';
    infoConfig.innerText = ddd.locale.settingPanel.info.config;
    settingPanelContent.appendChild(infoConfig);
    /* 设置面板-search */
    const settingPanelSearch = document.createElement('div');
    settingPanelSearch.className = 'setting-panel-search';
    settingPanel.appendChild(settingPanelSearch);
    /* search-名称输入框 */
    const searchInput = document.createElement('input');
    searchInput.className = 'search-input';
    searchInput.placeholder = ddd.locale.settingPanel.search.inputPlaceholder;
    settingPanelSearch.appendChild(searchInput);
    /* search-isSeries勾选框 */
    const searchIsSeries = document.createElement('input');
    searchIsSeries.className = 'search-isSeries';
    searchIsSeries.type = 'checkbox';
    settingPanelSearch.appendChild(searchIsSeries);
    /* search-匹配按钮 */
    const searchButton = document.createElement('button');
    searchButton.className = 'search-button';
    searchButton.innerText = ddd.locale.settingPanel.search.button;
    settingPanelSearch.appendChild(searchButton);
    /* search-匹配结果展示下拉框 */
    const searchResult = document.createElement('select');
    searchResult.className = 'search-result';
    settingPanelSearch.appendChild(searchResult);
    /* search-匹配结果信息展示区 */
    const searchResultInfo = document.createElement('div');
    searchResultInfo.className = 'search-result-info';
    settingPanelSearch.appendChild(searchResultInfo);
    /* search-offset输入区 */
    const searchOffset = document.createElement('input');
    searchOffset.className = 'search-offset';
    searchOffset.placeholder = ddd.locale.settingPanel.search.offsetPlaceholder;
    settingPanelSearch.appendChild(searchOffset);
    /* search-绑定按钮 */
    const searchBind = document.createElement('button');
    searchBind.className = 'search-bind';
    searchBind.innerText = ddd.locale.settingPanel.search.bind;
    settingPanelSearch.appendChild(searchBind);
    /* 设置面板-global setting */
    const settingPanelGlobalSetting = document.createElement('div');
    settingPanelGlobalSetting.className = 'setting-panel-global-setting';
    settingPanel.appendChild(settingPanelGlobalSetting);
    /* global setting-弹幕过滤等级 */
    















