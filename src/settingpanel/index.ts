/* 创建设置面板 */

import {DanDanDanmaku} from "../DanDanDanmaku";
import QuickSettings, { QuickSettingsPanel } from 'quicksettings';

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
 * 4. 弹幕大小
 */
class SettingPanel {
    ddd: DanDanDanmaku;
    settings: QuickSettingsPanel;
    constructor(ddd: DanDanDanmaku) {
        this.ddd = ddd;
        this.settings = QuickSettings.create(0, 0, this.ddd.locales.settingPanel.title, undefined);
    }
    destroy() {
        this.settings.destroy();
    }
}
