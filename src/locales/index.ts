import * as en from './en-US';
import * as sc from './zh-CN';
import * as tc from './zh-TW';
// 声明locals类型
const translate = (w: Window) => {
    const { language } = w.navigator;
    switch (language) {
        case 'zh-CN':
            return sc.default;
        case 'zh-TW':
            return tc.default;
        default:
            return en.default;
    }
};
export default translate as (w: Window) => Locals;