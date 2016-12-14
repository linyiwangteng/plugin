/**
 * Created by wangteng on 2016/12/9.
 */

(function($){

    /*获取本月的天数*/
    function getDaysOfThisMonth(thisYear,thisMonth){
        var days= new Date(thisYear,thisMonth,0);
        return days.getDate();
    }
    /*获取本月第一天是星期几*/
    function week_firstDay_thisMonth(thisYear,thisMonth){
        var firstDay = new Date(thisYear,thisMonth-1,1);
        return firstDay.getDay();
    }
    /*获取本月最后一天是星期几*/
    function week_lastDay_thisMonth(thisYear,thisMonth){
        var firstDay = new Date(thisYear,thisMonth,0);
        return firstDay.getDay();
    }
    /*一周7天*/
    var  week = ['日','一','二','三','四','五','六'];

    /*将每个月的每一天存在二维数组中*/
    function buildCal(thisYear,thisMonth){

        var Month = new Array();
        for(var i=0;i<6;i++){
            Month[i] = new Array(7)
        }
        /*本月第一天是星期几*/
        var first_day = week_firstDay_thisMonth(thisYear,thisMonth);
        /*本月总天数*/
        var days = getDaysOfThisMonth(thisYear,thisMonth);
        /*本月最后一天星期几*/
        var last_day = week_lastDay_thisMonth(thisYear,thisMonth);
        /*获取上月的天数*/
         var prevDays = getDaysOfThisMonth(thisYear,thisMonth-1);

        /*判断本月一个天是否为星期日*/
        /*如果为星期日，换行输入*/
        var VarDate = 1;

        if(first_day !== 0){
            Month = normal(prevDays,first_day,Month,days);
        }else{
            Month = unormal(prevDays,first_day,Month,days);
        }
        /*判断最后一天是否为周六*/
        var next=1;
        //console.log('最后一天星期几：'+last_day);
        if(last_day !==6 &&　!Month[4][last_day+1]){
            for(var l=last_day+1;l<7;l++){
                    Month[4][l] =next;
                    next++;
            }
            for(var ll=0;ll<7;ll++){
                Month[5][ll]=next;
                next++;
            }
        }
        else if(last_day !==6 &&　Month[4][last_day+1]) {
            for(var l=last_day+1;l<7;l++){
                Month[5][l] =next;
                next++;
            }
        }
        else {
            for(var l=0;l<7;l++){
                Month[5][l]=l;
            }
        }
        return Month;
    }

    function normal( prevDays,firstDay,month,days){
        var VarDate = 1;
        var Month = month;
        for(var w=firstDay-1;w>=0;w--){
            Month[0][w] = prevDays;
            prevDays -- ;
        }
        for(var i=firstDay; i<7;i++){
            Month[0][i] = VarDate;
            VarDate ++;
        }
        for(var j=1;j<6;j++){
            for(var k=0;k<7;k++){
                if(VarDate<=days){
                    Month[j][k] = VarDate;
                    VarDate++;
                }
            }
        }
        return Month;
    }
    function unormal(prevDays,firstDay,month,days){
        var VarDate = 1;

        for(var d=6;d>=0;d--){
            month[0][d] = prevDays;
            prevDays--;
        }
        for(var j=1;j<6;j++){
            for(var k=firstDay;k<7;k++){
                if(VarDate<=days){
                    month[j][k]=VarDate;
                    VarDate++
                }
            }
        }
        return month;
    }





    $.lineTickets = function (opts) {
        opts = $.extend({
            box:'', //装载日历的元素
            this_year: null,//年
            this_month:null,//月
            this_day:null, //日
            initVal:true,
            url:'',//链接
            tickets:[
                {
                    dateId:1,
                    price:'￥6789',
                    num:20
                },{
                    dateId:2,
                    price:'￥432',
                    num:40
                },
                {
                    dateId:3,
                    price:'￥232',
                    num:45
                },
                {
                    dateId:18,
                    price:'￥6789',
                    num:20
                },{
                    dateId:23,
                    price:'￥432',
                    num:40
                },{
                    dateId:26,
                    price:'￥432',
                    num:0
                },
                {
                    dateId:31,
                    price:'￥232',
                    num:45
                }
            ]
            },opts);

        init(opts);


    };


    function bindEvent(opts){
        $(".calendar_month_next").on('click', function () {
            var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
            opts.this_month=parseInt(nowMonth)+1;
            if(opts.this_month==13)
            {
                opts.this_month = 1;
                opts.this_year+=1;
            }
            init(opts);
        });
        $(".calendar_month_prev").on('click', function () {
            var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
            opts.this_month=parseInt(nowMonth)-1;
            if(opts.this_month==0)
            {
                opts.this_month = 12;
                opts.this_year-=1;
            }
            init(opts);
        })
    }


    /*初始化插件*/
    function init(opts){
        if(opts.initVal){
            opts.initVal = false;
            var current_Date = new Date();
            opts.this_year = current_Date.getFullYear();
            opts.this_month = current_Date.getMonth()+1;

        }
        /*今天*/
        opts.this_day = new Date().getDate();

        /*获取到票价和票数*/
        opts.tickets = getData(opts);

        // 获取本月的二维数组
        var cal = buildCal(opts.this_year,opts.this_month);


        /*获取拼装好的日历string并插入到指定的元素中*/

        var content = showCal(cal,opts,opts.tickets);
        /*加入到页面中*/
        $(opts.box).html(content);

        /*添加表头*/
        var calendarName = opts.this_year+'年'+opts.this_month+'月';
        $(".calendar_month_span").html(calendarName);

        bindEvent(opts);
    }



    /*拼装成字符串*/
    function  showCal(month,opt,datas){

        var htmls = '',data_index = 0;
        var currentYear =new Date().getFullYear();
        var currentMonth = new Date().getMonth()+1;
        var current = true;
        htmls+="<div class='ticket_main' id='ticket_layer'>";
        htmls+="<div class='ticket_succ_calendar_title'>";
        htmls+="<div class='iconfont calendar_month_next'>&#xe68c;</div>";
        htmls+="<div class='iconfont calendar_month_prev'>&#xe68d;</div>";
        htmls+="<div class='calendar_month_span'></div>";
        htmls+="</div>";
        htmls+="<div class='ticket' id='ticket_cal'>";
        htmls+="<table>";
        htmls+="<tr>";
        for(var i=0; i<week.length;i++){
            htmls+="<th>" + week[i] + "</th>"
        }
        htmls+="</tr>";

        for(var w =0;w<6;w++){
            htmls+='<tr>';
            for(var d = 0;d<7;d++){

                /*到今天为止的过去时间*/
                if(currentYear >= opt.this_year && currentMonth >= opt.this_month && current){
                    htmls+='<td style="background: #efefef;">';

                    current = currentYear == opt.this_year && currentMonth == opt.this_month　&&　month[w][d] == opt.this_day-1 ? false : true;
                }
                /*这一年的这一月的这一天*/
                else if(currentYear == opt.this_year && currentMonth == opt.this_month　&&　month[w][d] == opt.this_day){
                    htmls+='<td>';

                }
                /*未来的日历*/
                else{
                    htmls+='<td>';

                }

                /*每一天的数据*/
                if(datas[data_index]){
                    if(datas[data_index].dateId == month[w][d]){

                        if(datas[data_index]['price'] && datas[data_index]['num'] != 0){
                            htmls+='<div onclick="getCurrentDate(this)">';
                            htmls+=month[w][d];
                            htmls+='<span class="price_ticket">'+ datas[data_index]['price']+'</span>';
                            htmls+='<span class="num_ticket">'+'余'+datas[data_index]['num']+'</span>';
                        }
                        else if(datas[data_index]['price'] && datas[data_index]['num'] == 0){

                            htmls+='<div>';
                            htmls+=month[w][d];

                            htmls+='<span class="price_ticket ticket_end">'+ datas[data_index]['price']+'</span>';
                            htmls+='<span class="num_ticket ticket_end">'+'已售罄'+'</span>';
                        }else{
                            htmls+='<div >';
                            htmls+=month[w][d];
                        }
                        data_index++;

                    }else{
                        /*上个月的在本月的显示*/
                        htmls+=month[w][d];
                    }
                }else{
                    /*下个月的在本月显示*/
                    htmls+=month[w][d];
                }

                htmls+='</div>';
                htmls+='</td>';
            }
            htmls+='</tr>';
        }
        htmls+='</table>';

        htmls+="</div>";
        return htmls;
    }

    /*获取数据*/
    function getData(opts){
        var allData;
        $.ajax({
            type:'GET',
            url:opts.url,
            async:false,
            data:{
                year:opts.this_year,
                month:opts.this_year
            },
            success: function (data) {
                console.log(data);
                 allData =JSON.parse(data);
            }
        });
        return allData;
    }
})(jQuery);

function getCurrentDate(el){
    $(el).parents("table").find(".current").removeClass('current');
    $(el).addClass('current');
    console.log($("#calendar").find(".calendar_month_span").text());
    console.log($(el).text().split("¥")[0]);
    console.log($(el).find(".price_ticket").text().slice(1));
    console.log($(el).find(".num_ticket").text().slice(1));
}