这是一个关于图片原始尺寸预览的插件，在预览框中可以查看图片的任何部分！

	

	/*
	* settingz设置说明：
	* width: 显示区域的宽度
	* height: 显示区域的高度
	* imgEl: 图片的标签
	* imgUrl:图片地址
	* root:遮罩层
	* origin:鼠标滑动区域
	* */
	
	$(".img_box").bigImg({
                width:600,
                height:600,
                imgEl: e.target,
                imgUrl:src,
                root:'.img_container',
                origin:'.img_shadows'
            });
	 $(".img_container").show();
