# emby-danmaku
Emby danmaku extension
![截图](https://s1.ax1x.com/2022/08/09/vltmKs.png)

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

## 界面
左下方新增4个按钮,分别为
- 弹幕开关
- 手动匹配
- 简繁转换
- 弹幕信息(触发右下角消息)

## 补充说明
弹幕来源为弹弹play 已开启弹幕聚合(A/B/C 站等弹幕融合)

因播放文件在emby中与上游弹弹play的名称可能存在不同(如"彻夜之歌"<–>“夜曲”),或因为存在多季/剧场版/OVA导致搜索匹配错误,首次播放时请检查当前弹幕信息是否正确匹配,若匹配错误可尝试手动匹配

匹配完成后对应关系会保存在浏览器本地存储中,后续播放(包括同季的其他集)会优先按照保存的匹配记录载入弹幕

## TODO
- [x] ~~跨域问题: 现阶段通过GM_xmlhttpRequest实现,一些支持js插件的手机浏览器如果不支持插件跨域将无法使用,需等待上游API支持CORS~~ 已通过cloudflare work绕过
- [ ] 重试机制优化
  
## 参考
https://github.com/susundingkai/emby-danmaku
