export { };
import * as sc from './zh-CN';
declare global {
    interface Window {
        require: any;
        ddd: DanDanDanmaku;
    }
    type ConfigMap = {
        [key: string]: any;
    }
    type Locals = typeof sc.default;
    enum PluginStatus {
        // 初始化中
        INITIALIZING = 0,
        // 初始化完成
        INITIALIZED = 1,
    }
}