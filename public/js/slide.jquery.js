;(function ($) {
    /**
     * 函数节流
     */
    function throttle(fns, ctx) {
        clearTimeout(fns.tId);
        fns.tId = setTimeout(function () {
            fns.call(ctx);
        }, 500);
    }
    var Slide = function (ele, opts) {
        this.$ele = ele;
        var defaults = {
            btnFlag: true, // 上下按钮
            prevBtnName: 'PREV', // 上按钮名
            nextBtnName: 'NEXT', // 下按钮名
            btnContainer: null, // 按钮盒子
            className: ''  // 按钮类名
        };
        this.options = $.extend({}, defaults, opts);
    };
    // 原型对象
    Slide.prototype = {
        init: function () {
            this.render();
            var _this = this;
            this.$ele
                .css({
                    width: _this.$ele.find('.slide-wrap').length * 100 + 'vw'
                })
                .find('.slide-wrap')
                .each(function () {
                    var $this = $(this).css({
                        float: 'left',
                        width: '100vw',
                        height: '100vh'
                    });
                });
            $('.prev-btn').css({ display: 'none', position: 'absolute', bottom: '0', left: '0' })
                .parent().find('.next-btn').css({ position: 'absolute', bottom: '0', right: '0' });
            this.bind();
            return this;
        },

        // 渲染组件
        render: function () {
            // 按钮
            if (this.options.btnFlag) {
                var html = [
                    '<a class="prev-btn ' + (this.options.className || '') + '">' + this.options.prevBtnName + '</a>',
                    '<a class="next-btn ' + (this.options.className || '') + '">' + this.options.nextBtnName + '</a>'
                ].join('');
                if (this.options.btnContainer) {
                    this.options.btnContainer.append($(html))
                } else {
                    this.$ele.append($(html));
                }
            }
            return this;
        },

        // 绑定事件
        bind: function () {
            var _this = this,
                $ele = this.$ele,
                width = $ele.width(),
                len = $ele.find('.slide-wrap').length,
                speed = Math.ceil(width / len)
            $('.prev-btn').click(function () {
                var position = $ele.position();
                if (Math.abs(position.left) > 5) {
                    var left = position.left + speed;
                    $ele.animate({
                        left: left + 'px'
                    }, 500);
                    $('.next-btn').show();  
                } else {
                    $('.prev-btn').hide();
                }
            });
            $('.next-btn').click(function () {
                var position = $ele.position();
                if (Math.abs(position.left) >= width - speed) { $('.next-btn').hide(); return; }
                var left = Math.abs(position.left) + speed;
                $('.prev-btn').show();
                $ele.animate({
                    left: - left + 'px'
                }, 500)
            });
        }
    };

    $.fn.slide = function (opts) {
        return (new Slide(this, opts)).init();
    }
}(jQuery));