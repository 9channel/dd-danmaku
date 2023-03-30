# dd-danmaku

## A danmaku extension

![截图](https://raw.githubusercontent.com/RyoLee/dd-danmaku/master/S0.png)

## 安装

任选以下一种方式安装即可

### 浏览器插件(推荐)

1. [Tampermonkey](https://www.tampermonkey.net/)
2. [添加脚本](https://cdn.jsdelivr.net/gh/RyoLee/dd-danmaku@gh-pages/ddd.user.js)

### 修改服务端

修改文件 /system/dashboard-ui/index.html (Docker 版,其他类似),在`</body>`前添加如下标签

```
<script src="https://cdn.jsdelivr.net/gh/RyoLee/dd-danmaku@gh-pages/ddd.user.js" defer></script>
```

该方式安装与浏览器插件安装**可同时使用不冲突**

### 修改客户端

~~类似服务端方式,解包后修改 dashboard-ui/index.html 再重新打包即可,iOS 需要通过类似 AltStore 方式自签,请自行 Google 解决~~

**目前版本对于使用非 html 内核播放的客户端无法生效,重构中,后续会进行修复**

## 界面

**请注意 Readme 上方截图可能与最新版存在差异,请以实际版本与说明为准**

左下方新增如下按钮,若按钮透明度与"暂停"等其他原始按钮存在差异,说明插件正在进行加载

-   弹幕开关: 切换弹幕显示/隐藏状态
-   弹幕设置: 弹出弹幕配置面板

    

## 弹幕

弹幕来源为 [弹弹 play](https://www.dandanplay.com/) ,已开启弹幕聚合(A/B/C 站等网站弹幕融合)

## 数据

匹配完成后对应关系会保存在**浏览器(或客户端)本地存储**中,后续播放(包括同季的其他集)会优先按照保存的匹配记录载入弹幕

## 常见弹幕加载错误/失败原因

1. 译名导致的异常: 如『よふかしのうた』 Emby 识别为《彻夜之歌》后因为弹弹 play 中为《夜曲》导致无法匹配
2. 存在多季/剧场版/OVA 等导致的异常: 如『OVERLORD』第四季若使用 S[N]格式归档(如 OVERLORD/S4E1.mkv 或 OVERLORD/S4/E1.mkv),可能出现匹配失败/错误等现象
3. 其他加载 BUG: ~~鉴定为后端程序猿不会前端还要硬写 JS~~,有 BUG 麻烦 [开个 issue](https://github.com/RyoLee/dd-danmaku/issues/new/choose) THX

**首次播放时请检查当前弹幕信息是否正确匹配,若匹配错误请尝试手动匹配**

## 鸣谢

| | |
| :--- | :--- |
| [susundingkai/emby-danmaku](https://github.com/susundingkai/emby-danmaku) | 最初的参考 |
| [弹弹 play](https://www.dandanplay.com) | 对众多弹幕源进行了整合，使得本项目成为可能 |
| [weizhenye/Danmaku](https://github.com/weizhenye/Danmaku) | 高性能弹幕渲染引擎 |
| [Copilot](https://copilot.github.com/) | 极大减轻了开发中的心智负担 |

## Thanks for your STARS!

[![Stargazers over time](https://starchart.cc/RyoLee/dd-danmaku.svg)](https://starchart.cc/RyoLee/dd-danmaku)
