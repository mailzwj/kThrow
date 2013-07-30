/**
 * @fileoverview 请修改组件描述
 * @author Letao<mailzwj@126.com>
 * @module kThrow
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all, D = S.DOM;
    /**
     * 请修改组件描述
     * @class KThrow
     * @constructor
     * @extends Base
     */
    function KThrow(cfg) {
        var self = this;
        //调用父类构造函数
        // KThrow.superclass.constructor.call(self, cfg);
        /**
         * 参数说明
         * @param target {String|HtmlNode} 被拖动的块元素
         * @param decay {float number} 速度衰变因子，取值范围(0,1)
         * @param size {Object} 块的放大目标尺寸，{w: 200, h: 200}
                w: {number} 宽度
                h: {number} 高度
         * @param delay {number} 块展开后的停顿时长，单位秒(s)
         */
        if (!(self instanceof KThrow) ){
            return new KThrow(cfg);
        }
        self.target = S.one(cfg.target);
        self.decay = (cfg.decay && (cfg.decay > 0 && cfg.delay < 1)) ? cfg.decay : 0.75;
        self.size = cfg.size || {w: 200, h: 200};
        self.timer = null;
        self.speedX = 0;
        self.speedY = 0;
        self.delay = cfg.delay || 1;
        self.init();
    }
    S.extend(KThrow, Base, /** @lends KThrow.prototype*/{
        init: function() {
            var self = this;
            self._expandTarget(function() {
                self._startMove();
                self._bindEvent();
            });
        },
        _expandTarget: function (callback) {
            var self = this,
                vw = D.viewportWidth(),
                vh = D.viewportHeight(),
                tarL = (vw - self.size.w) / 2,
                tarT = (vh - self.size.h) / 2;

            self.target.css({"position": "absolute", "width": 0, "height": 0, "left": "50%", "top": "50%"});
            self.target.animate({"width": self.size.w, "height": self.size.h, "left": tarL, "top": tarT}, 0.3, "easeOutStrong", function() {
                setTimeout(function() {
                    callback && callback();
                }, self.delay * 1000);
            });
        },
        _startMove: function() {
            var self = this;
            clearInterval(self.timer);
            self.timer = setInterval(function() {
                self.speedY += 3;
                var nT = self.target.offset().top + self.speedY;
                var nL = self.target.offset().left + self.speedX;
                var vw = D.viewportWidth();
                var vh = D.viewportHeight();
                var bw = self.target.width();
                var bh = self.target.height();

                if (nT < 0) {
                    nT = 0;
                    self.speedY *= -1;
                    self.speedY = self.speedY * self.decay;
                    self.speedY = self.speedY < 0 ? Math.ceil(self.speedY) : Math.floor(self.speedY);
                    self.speedX = self.speedX * self.decay;
                    self.speedX = self.speedX < 0 ? Math.ceil(self.speedX) : Math.floor(self.speedX);
                } else if (nT > vh - bh) {
                    nT = vh - bh;
                    self.speedY *= -1;
                    self.speedY = self.speedY * self.decay;
                    self.speedY = self.speedY < 0 ? Math.ceil(self.speedY) : Math.floor(self.speedY);
                    self.speedX = self.speedX * self.decay;
                    self.speedX = self.speedX < 0 ? Math.ceil(self.speedX) : Math.floor(self.speedX);
                }

                if (nL < 0) {
                    nL = 0;
                    self.speedX *= -1;
                    self.speedX = self.speedX * self.decay;
                    self.speedX = self.speedX < 0 ? Math.ceil(self.speedX) : Math.floor(self.speedX);
                } else if (nL > vw - bw) {
                    nL = vw - bw;
                    self.speedX *= -1;
                    self.speedX = self.speedX * self.decay;
                    self.speedX = self.speedX < 0 ? Math.ceil(self.speedX) : Math.floor(self.speedX);
                }

                self.target.css({"left": nL, "top": nT});
            }, 25);
        },
        _bindEvent: function() {
            var self = this,
                sSpeedX = 0,
                sSpeedY = 0,
                bw = self.target.width(),
                bh = self.target.height(),
                disX = 0,
                disY = 0;

            self.target.on("mousedown", function(e) {

                clearInterval(self.timer);

                var vw = D.viewportWidth();
                var vh = D.viewportHeight();

                sSpeedX = e.clientX;
                sSpeedY = e.clientY;

                disX = e.clientX - self.target.offset().left;
                disY = e.clientY - self.target.offset().top;

                S.one(document).on("mousemove", function(e) {
                    self.speedX = e.clientX - sSpeedX;
                    self.speedY = e.clientY - sSpeedY;

                    sSpeedX = e.clientX;
                    sSpeedY = e.clientY;

                    var dL = e.clientX - disX;
                    var dT = e.clientY - disY;

                    if (dL < 0) {
                        dL = 0;
                    } else if (dL > vw - bw) {
                        dL = vw - bw;
                    }

                    if (dT < 0) {
                        dT = 0;
                    } else if (dT > vh - bh) {
                        dT = vh - bh;
                    }

                    self.target.css({"left": dL, "top": dT});

                }).on("mouseup", function(e){
                    S.one(document).detach("mousemove mouseup");
                    self._startMove();
                }).on("selectstart", function() {
                    return false;
                });
            });
        }
    }, {ATTRS : /** @lends KThrow*/{

    }});
    return KThrow;
}, {requires:['node', 'base']});



