# emby-danmaku
Emby danmaku extension

## 安装
任意一种方式安装即可

### 浏览器方式(推荐)
1. [Tampermonkey](https://www.tampermonkey.net/)
2. [添加脚本](https://cdn.jsdelivr.net/gh/RyoLee/emby-danmaku@gh-pages/ede.user.js)
3. ~~修改@match, 将```https://192.168.100.10:8096/web/index.html```改成你的服务器域名或ip~~ 当前版本已不再需要修改

### 服务端方式
路径 /system/dashboard-ui/index.html
在```</body>```前添加如下标签
```
<script src="https://cdn.jsdelivr.net/gh/RyoLee/emby-danmaku@gh-pages/ede.user.js" defer></script>
```

### 客户端方式
类似服务端方式,解包后修改dashboard-ui/index.html再重新打包即可,iOS需要通过类似AltStore方式自签,请自行Google解决

## TODO
- [x] ~~跨域问题: 现阶段通过GM_xmlhttpRequest实现,一些支持js插件的手机浏览器如果不支持插件跨域将无法使用,需等待上游API支持CORS~~ 已通过cloudflare work绕过
- [ ] 重试机制优化
  
## 参考
https://github.com/susundingkai/emby-danmaku
