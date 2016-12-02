/**
 * Created by 1 on 2016/12/1.
 */

/*
* settingz设置说明：
* width: 显示区域的宽度
* height: 显示区域的高度
* imgEl: 图片的标签
* imgUrl:图片地址
* root:遮罩层
* origin:鼠标滑动区域
* */
(function ($) {
    $.fn.bigImg= function (setting) {
        //获取原始图片的尺寸
        var origin_size = getNaturalSize(setting.imgEl);

        setting = $.extend({
            width: "400",
            height: '400',
            imgEl:'',
            imgUrl:'', //必选
            root:'',    //必选
            origin:''  //必选
        },setting,origin_size);

        var that = $(this),
            origin = that.find(setting.origin),
            shadow = $(setting.root);
        var img = that.find("img").attr('src',setting.imgUrl),
            img_minX = 0,
            img_maxX = setting.original_w-setting.width,
            img_minY = 0,
            img_maxY = setting.original_h-setting.height;
        var marginLeft= img_maxX/2,marginTop=img_maxY/2;
        that.parent().css({
            display:'none',
            position:'fixed',
            top:0,
            left:0,
            width:'100%',
            height:'100%'
        });
        that.css({
            width:setting.width,
            height:setting.height,
            position:'absolute',
            top:'50%',
            left:'50%',
            'margin-top':-(setting.height/2),
            'margin-left':-(setting.width/2),
            overflow:'hidden',
            'cursor':'pointer'
        });
       origin.css({
            position:'absolute',
            left:0,
            top:0,
            width:'100%',
            height:'100%',
            'z-index':'100'
        });
        img.css({
            'margin-left':-marginLeft,
            'margin-top':-marginTop
        });

        //双击关闭事件
        origin.on("dblclick", function () {
            shadow.css('display','none');
        });
    //    按住拖动
        origin.on('mousedown', function (e) {

            var down_x = e.offsetX,down_y = e.offsetY;
                marginLeft = parseInt( img.css('margin-left')) ||0;
                marginTop = parseInt(img.css('margin-top') )|| 0;

            origin.bind('mousemove', function (e) {
                //鼠标滑动的距离
                e.stopPropagation()
                var process_x = e.offsetX-down_x,
                    process_y = e.offsetY-down_y;
                down_x = e.offsetX;
                down_y = e.offsetY;
                marginLeft+=process_x;
                marginTop+=process_y;

                if(marginLeft<= img_minX && marginLeft>=-img_maxX){
                    that.find("img").css({
                        "margin-left": marginLeft
                    })
                }
                if( marginTop <=img_minY && marginTop>= -img_maxY){
                    that.find("img").css({
                        "margin-top": marginTop
                    })
                }
            })
        }).on('mouseup', function () {
            origin.unbind('mousemove');
        }).on('mouseout',function(){
            origin.unbind('mousemove');
        });

        function  getNaturalSize(img){
            var naturalSize ={};
            if(window.naturalWidth && window.naturalHeight){
                naturalSize.original_w = img.width;
                    naturalSize.original_h = img.height;
            }else{
                var image = new Image();
                image.src = img.src;
                naturalSize.original_w = image.width;
                naturalSize.original_h = image.height;
            }
            return naturalSize;
        }
    }
})(jQuery);