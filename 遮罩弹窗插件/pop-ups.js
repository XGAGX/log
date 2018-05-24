;
(function($) {
    // 生成DOM结构,显示窗口
    $.fn.pop_ups_show = function(obj) {
            // obj.title//标题
            // obj.windowsClass//窗口的类名
            // obj.titleClass,//标题的类名
            // obj.content,//内容HTML
            // obj.buttonName,//按钮名称,数组['xxx','000']
            // obj.buttonClass//按钮的类名
            // obj.buttonFn//按钮的方法fn(e,'xxx')
            // obj.endClass//关闭按钮类名
//////////////////////////////////////////////////////
            //生成结构
            $(this).append(`
            <div class="pop-ups"></div>
            <div class="pop-ups-windows">
                <p class="pop-ups-p">
                    <span class="pop-ups-title"></span><a href="javascript:;" class='pop-ups-end'></a>
                </p>
                <div class="pop-ups-content"></div>
                <p class="pop-ups-button"></p>
            </div>`);
            // 黑色遮罩
            $('.pop-ups').css({
                width: window.innerWidth,
                height: window.innerHeight,
                background: ' #000',
                opacity: '0.3',
                top: '0',
                left: '0',
                position: 'fixed'
            });
            // 标题
            $('.pop-ups-p').addClass(obj.titleClass)
            $('.pop-ups-title').html(obj.title)
                //关闭按钮事件
            $('.pop-ups-end').html('&times;').on('click', () => {
                    this.pop_ups_hide()
                }).addClass(obj.endClass)
                // 内容
            $('.pop-ups-content').html(obj.content);
            // 按钮
            if (obj.buttonName) {
                var btn = $()
                    //有个几个数组生成几个按钮,并且绑定上事件
                for (var i = 0; i < obj.buttonName.length; i++) {
                    btn.push($('<button>').text(obj.buttonName[i]).on('click', {
                        'index': obj.buttonName[i]
                    }, function(e) {
                        obj.buttonFn(e, e.data.index)
                    })[0])
                }
                $('.pop-ups-button').css({
                    'position': 'relative',
                    'text-align': 'center'
                }).append(btn.addClass(obj.buttonClass))
            }
            // 弹窗 
            // //先要给予个定位才能在下一步获取到正确的高宽,定位一定要写在前面才行
            $('.pop-ups-windows').css({
                    position: 'fixed',
                    left: function() {
                        return window.innerWidth / 2 - $('.pop-ups-windows').width() / 2;
                    },
                    top: function(i, val) {
                        return window.innerHeight / 2 - $('.pop-ups-windows').height() / 2;
                    },
                    width: function(i, val) {
                        return $('.pop-ups-windows').width() < 100 ? 100 : '';
                    },
                    height: function(i, val) {
                        return $('.pop-ups-windows').height() < 100 ? 100 : '';
                    }
                })
                .addClass(obj.windowsClass);
        },
        //关闭弹窗.清除DOM结构
        $.fn.pop_ups_hide = function() {
            $('.pop-ups').remove();
            $('.pop-ups-windows').remove();
            return this;
        }
})(jQuery)