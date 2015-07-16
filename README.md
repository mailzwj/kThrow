## kThrow

* 版本：1.0
* demo：[http://mailzwj.github.io/kThrow/1.0/demo/](http://mailzwj.github.io/kThrow/1.0/demo/)

## 使用方法

本地调试需添加以下配置脚本

```
var S = KISSY;
S.Config.debug = true;
if (S.Config.debug) {
    var srcPath = "../../../";
    S.config({
        packages:[
            {
                name:"gallery",
                path:srcPath,
                charset:"utf-8",
                ignorePackageNameInUri:true
            }
        ]
    });
}
```

组件初始化方法：

```
S.use('gallery/kThrow/1.0/index', function (S, KThrow) {
     var kThrow = new KThrow({
        target: "#J_KThrow",
        decay: 0.65,
        size: {
            w: 200,
            h: 200
        },
        delay: 0.5
     });
});
```

## 参数说明

* param target {String|HtmlNode} 被随意拖动抛出的块
* param decay {float number} 速度衰变因子，取值范围(0,1), 默认值0.75
* param size {Object} target展开的尺寸，例{w: 200, h: 200}
    
    w: {number} 宽度

    h: {number} 高度

* param delay {Number} target展开后显示时长（单位：s），之后自由降落，并绑定抛出事件，默认值 1。

## changelog

2013-07-30 v1.0.0 第一版本。

### V1.0


