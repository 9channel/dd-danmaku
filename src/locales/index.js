import * as en from './en-US';
import * as sc from './zh-CN';
import * as tc from './zh-TW';
const translate = (window) => {
    const { language } = window.navigator;
    switch (language) {
        case 'zh-CN':
            return sc.default;
        case 'zh-TW':
            return tc.default;
        default:
            return en.default;
    }
};
export default translate;
