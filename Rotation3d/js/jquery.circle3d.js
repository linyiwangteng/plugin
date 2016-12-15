/**
 * Created by wangteng on 2016/12/15.
 */

/**
 *   width:图片的宽度
 *   number:每一行的数量
 *   all:总数量
 *   animationIndex:选择第几个动画(共计三种)
 * */

(function ($) {
    $.circle3d = function (opt) {
       opt = $.extend({
           width:120,
           number:10,
           all:60,
           animationIndex:3
       },opt);

        var allNum = opt.all;
       var imagesUrl= getImgData(allNum);
        /*图片插入到circle中*/
        for(var i = 0,l = imagesUrl.length;i<l;i++){
            var img = $("<img />").attr("src",imagesUrl[i]).css("width","100%");
            var div = $("<div/>").addClass('slide');
            img.appendTo(div);
            $(".circle").append(div);
        }


        //        求半径、角度
        var R = caLTranslateZ(opt);
        var angle =  360/opt.number;
        /*计算有多少行*/
        opt.row = opt.all/opt.number - 1;
        var account = 0;
        $(".slide").each(function(index,val){
            /*索引以及当前元素*/
            var rank = index,that = $(this);
            /*换行问题*/

            if(opt.animationIndex !== 3){
                if(rank%opt.number == 0 && index!= 0){ opt.row --;}
            }　
            else{

                if(account == opt.number && index!= 0){
                    opt.row -- ;
                    opt.number --;
                    account = 0;
                }
                account++;
            }

            switch (opt.animationIndex){
                case 1: animation_1(rank,that,opt); break;
                case 2: animation_2(rank,that,opt); break;
                case 3: animation_3(rank,that,opt); break;
            }
            //animation_2(rank,that);


        });




        //        多边形内切圆的半径
        /*内切圆的半径与‘边数’和‘边的长短’有关*/
        function caLTranslateZ(opts){
            return Math.round(opts.width / (2*Math.tan(Math.PI/opts.number)));
        }


        /*计算每一块的中心在半径上的二维坐标轴*/
        function axis(index,opts,cal){
            var R = 0;
            if(typeof  cal === 'function'){
                R =cal(opts);
            }else{
                alert('cal必须是一个回调函数')
            }

            var a =2*Math.PI/opts.number;
            return {
                x:Math.cos(a*index)*R,
                y:opts.width,
                z:Math.sin(a*index)*R
            }
        }



        //        绕着地球的赤道转动
        function  animation_1(index,el,opt){
            opt.number = opt.all;
            var biao = axis(index,opt,caLTranslateZ);
            var angle =  360/opt.number;
//            图片自转
            var rotate_angle = 90 - angle*index;
            el.css({
                'transform':'translate3d('+biao.x+'px,'+biao.y+'px,'+biao.z+'px) rotateY('+rotate_angle+'deg)',
                "backgroundColor":'transparent'
            })
        }

        /*柱体动画*/
        function animation_2(index,el,opt){
            if(!index && !opt) return false;
            var biao = axis(index,opt,caLTranslateZ);
            var angle =  360/opt.number;
//            图片自转
            var rotate_angle = 90 - angle*(index%opt.number);
            el.css({
                'transform':'translate3d('+biao.x+'px,'+(biao.y*opt.row)+'px,'+biao.z+'px) rotateY('+rotate_angle+'deg)',
                "backgroundColor":'transparent'
            })
        }


        function animation_3(index,el){

            var biao = axis(index,opt,caLTranslateZ);
            var angle =  360/opt.number;

            var angle_z =360/opt.row;
//            图片自转
            var rotate_angle = 90 - angle*(index);
            //var rotate_angle_z = 90 - angle_z*(index*opts.number);
            el.css({
                'transform':'translate3d('+biao.x+'px,'+(biao.y*opt.row)+'px,'+biao.z+'px) rotateY('+rotate_angle+'deg)',
                "backgroundColor":'transparent'
            })
        }




        /*获取的img地址*/
        function  getImgData(nums){
            var data=[];
            for(var i = 0;i<nums;i++){
                var random = Math.floor(Math.random()*20);
                data.push('./images/sc/'+(random+1)+'.jpg');
            }
            return data;
        }


    }
})(jQuery);