# emby-danmaku
Emby danmaku extension

## 安装
1. [Tampermonkey](https://www.tampermonkey.net/)
2. [添加脚本](https://raw.githubusercontent.com/RyoLee/emby-danmaku/master/ede.js)
3. 修改@match, 将```https://192.168.100.10:8096/web/index.html```改成你的服务器域名或ip

## TODO
- [X] 跨域问题: 现阶段通过GM_xmlhttpRequest实现,一些支持js插件的手机浏览器如果不支持插件跨域将无法使用,需等待上游API支持CORS
- [ ] 重试机制优化
## 参考
https://github.com/susundingkai/emby-danmaku
