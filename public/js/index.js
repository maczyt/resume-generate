;(function ($) {
    $(function () {
        var page = {
            init: function () {
                var _this = this;
                window.app = new Vue({
                    el: '.page',
                    data: function () {
                        return {
                            baseInfo: {
                                name: { value: '', type: '姓名' },
                                mobile: { value: '', type: '手机' },
                                resumeTitle: { value: '', type: '简历标题' }
                            },
                            language: [
                                { name: '', value: '' }
                            ],
                            skill: [
                                { name: '', value: '' }
                            ],
                            education: [
                                {
                                    name: '', // 学校名
                                    startDate: '', // 起始时间
                                    endDate: '', // 结束时间
                                    summary: '' // 总结
                                }
                            ],
                            work: [
                                {
                                    name: '', // 公司名称
                                    startDate: '', // 起始时间
                                    endDate: '', // 结束时间
                                    summary: '' // 总结
                                }
                            ],
                            aboutMe: ''
                        }
                    },
                    methods: {
                        // 删除字段
                        remove: function (obj, key) {
                            this.$delete(obj, key)
                        },
                        removeArr: function (arr, index) {
                            arr.splice(index, 1);
                        },
                        // 增加基本信息
                        addBaseInfo: function () {
                            var name;
                            try { name = window.prompt('请输入新增字段名: ').trim().replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
                            catch(e) {}
                            if (!name || name.length === 0) return;
                            this.$set(this.baseInfo, 'item' + cuid(), { value: '', type: name });
                        },
                        // 增加语言或技能
                        add: function (obj, name) {
                            obj.push({
                                name: '',
                                value: ''
                            });
                        },
                        // 增加学校或公司
                        add2: function (obj, name) {
                            obj.push({
                                name: '',
                                startDate: '',
                                endDate: '',
                                summary: ''
                            });
                            Vue.nextTick(function () {
                                _this.methods.datepicker();
                            });
                        },
                        // 保存
                        save: function () {
                            this.education = this.education.map(function (item) {
                                item.summary = item.summary.replace(/[\r\n]/g, '<br>');
                                return item;
                            });
                            this.work = this.work.map(function (item) {
                                item.summary = item.summary.replace(/[\r\n]/g, '<br>');
                                return item;
                            });
                            this.aboutMe = this.aboutMe.replace(/[\r\n]/g, '<br>');
                            var data = JSON.stringify(this._data);
                            var html = '<form action="/template/white" method="post">' + 
                                `<input type="hidden" name="data" value='${data}'>` +
                                '</form>';
                            var $html = $(html);
                            $('.page').append($html);
                            $html.submit();
                            $html.remove();
                        }
                    }
                });
                $('.slide-container').slide({
                    btnContainer: $('.status.container'),
                    className: 'waves-effect waves-light btn cyan',
                    prevBtnName: '上一步',
                    nextBtnName: '下一步'
                });
                // $('.textarea').characterCounter();
                this.methods.datepicker();
                this.bindEvents();
            },

            /**
             * jQuery事件绑定
             */
            bindEvents: function () {
            },

            /**
             * 外部方法
             */
            methods: {
                datepicker: function () {
                    $('.datepicker').flatpickr({
                        dateFormat: 'M Y',
                        locale: 'zh'
                    });
                }
            }
        };
        page.init();
    });
})(jQuery);