    class barrage {
        constructor(time, content, post_time) {
            this.time = time;
            this.content = content;
            this.post_time = post_time;
        }
    }
    var barrage_list = [
        new barrage('00:08', '2333', '01-10 20:00'),
        new barrage('00:10', '有人吗', '01-10 20:50'),
        new barrage('00:35', '你好鸭', '01-10 21:15'),
        new barrage('01:08', '前排', '01-10 21:36'),
        new barrage('03:26', '第一', '01-10 21:40'),
    ];

    $(document).ready(function() {// 初始化内容
        for(item of barrage_list) {
            console.log(item);
            $('tbody').append('<tr><td>'+item.time+'</td><td>'+item.content+'</td><td>'+item.post_time+'</td></tr>');
            setTimeout("addInterval(createScreenbullet('"+item.content+"'))", Math.random()*3000);
        }
        $('span#post_num').text(barrage_list.length);
        timeCount();
    });  
    // 弹幕定时器
    var timers = [];
    // 控制弹幕显隐变量
    var isShow = true;
    // 监听发送按钮
    $(".send").on("click", function () {
        var bullet = $("#screenBulletText").val();
        if (bullet.trim() == '')
            return
        // 创建弹幕
        var jqueryDom = createScreenbullet(bullet);
        // 添加定时任务
        addInterval(jqueryDom);
        $("#screenBulletText").val(""); // 清空输入框
        $('tbody').append('<tr><td>'+numToTime(c)+'</td><td>'+bullet+'</td><td>'+new Date().Format('MM-dd HH:mm')+'</td></tr>');
        var post_num = parseInt($('span#post_num').text());
        $('span#post_num').text(post_num + 1);
    });
    // 监听关闭弹幕按钮
    $(".clear").on("click", function () {
        if (isShow) {
            $(".bullet").css("opacity", 0);
            $(".clear").text('打开弹幕');
            isShow = false;
        } else {
            $(".bullet").css("opacity", 1);
            $(".clear").text('关闭弹幕');
            isShow = true;
        }   
    });
    // 新建一个弹幕
    function createScreenbullet(text) {
        var jqueryDom = $("<div class='bullet'>" + text + "</div>");
        var fontColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random()) + ")";
        // var fontSize = Math.floor((Math.random() + 1) * 24) + "px";
        var fontSize = "25px";
        var left = $(".screen_container").width() + "px";
        var top = Math.floor(Math.random() * 200) + "px";
        top = parseInt(top) > 352 ? "352px" : top;
        jqueryDom.css({
            "position": 'absolute',
            "color": fontColor,
            "font-size": fontSize,
            "left": left,
            "top": top
        });
        $(".screen_container").append(jqueryDom);
        return jqueryDom;
    }
    // 为弹幕添加定时任务
    function addInterval(jqueryDom) {
        var left = jqueryDom.offset().left - $(".screen_container").offset().left;
        var timer = setInterval(function () {
            left--;
            jqueryDom.css("left", left + "px");
            if (jqueryDom.offset().left + jqueryDom.width() < $(".screen_container").offset().left) {
                jqueryDom.remove();
                clearInterval(timer);
            }
        }, 10);
        timers.push(timer);
    }

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "H+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    var c = 0;

    function timeCount() {
        c += 1;
        setTimeout('timeCount()', 1000);
    }

    function numToTime(t) {
        minus = parseInt(t / 60);
        if (minus < 10)
            minus = '0' + minus;
        second = t % 60;
        if (second < 10)
            second = '0' + second;
        t = minus + ':' + second;
        return t;
    }

    $('#postsList').on('show.bs.collapse', function() {
        $('#open_posts').text('收起');
    })

    $('#postsList').on('hide.bs.collapse', function() {
        $('#open_posts').text('展开');
    })