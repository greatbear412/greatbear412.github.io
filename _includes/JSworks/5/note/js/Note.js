$(document).ready(function() {
    (function () {
        var data = store.get('user');
        if (data !== undefined) {
            for (var i = 1; i < data.num; i++) {                //这里从1开始，是因为clear事件已经增加了一条新的item
                $('.divLeft').append('<p>new record</p>');
            }
            render();
        }
    })()

    function render() {
        $('.divLeft>p').each(function (i) {
            $(this).attr('class',store.get('data'+i).cl);
            let content = store.get($(this).attr('class')).title ;
            $(this).text(content)
        })
    }

        //保存
    $('.save').click(function(){
        let num = $('.divLeft>p').length;
        store.set('user',{num:num});
        $('.submit_msg').css('display','inline-block').fadeOut(1500);
        for (let i = 0; i < num; i++) {
            let cl = $('p:eq('+i+')').attr('class');
            store.set('data'+i,{cl:cl});
        }
    });

        // 新建item
    $('.btn_new').click(function(e) {
        let p = $('.divLeft>p:last');
        if (p.length ==0) {
            class_num = 'p0';
        }
        else {
            class_num = p.attr('class');
        }
        let n = parseInt(class_num.replace(/[^0-9]/ig,""))+1,
            cl = 'p'+ n;
        $('.divLeft').append('<p>new record</p>');
        let new_item = $('.divLeft p:last').get(0);
        $('.divLeft p:last').attr('class', cl);
        init(new_item);
        $('.divLeft p:last').on('click',function () {
            focus_attr(new_item);
            item_click(new_item);
        });
    });
        //删除item
    $('.btn_delete').click(function (e) {
        let index = $('p[choosed]').attr('class');
        $('.divLeft>p[choosed]').remove();
    });

        //第一条item点击事件
    $('.divLeft>p').on('click',function () {
        focus_attr(event.target);
        item_click(event.target);
    });
        //提交item
    $('.submit').click(function () {
        let index = $('p[choosed]').attr('class'),
            title = $('.title').val(),
            content = $('.txt').val();
        if (!title) {
            alert('请输入标题。');
            return;
        }
        store.remove(index);
        store.set(index,{content:content,title:title,cl:index});
        $('p[choosed]').text(title);
    })

        //初始化item
    function init(element) {
        let index = $(element).attr('class');
        store.set(index,{content:'',title:'new record',cl:index});
    }
        //初始化第一条
    (function () {
        if (!store.get('p1')) {
            store.set('p1',{content:'',title:'new record',cl:'p1'});
        }
    })()

        //item点击事件
    function item_click(element) {
        let index = $(element).attr('class'),
            item = store.get(index),
            title = item.title,
            content = item.content;
            $('.txt').val(content);
            $('.title').val(title);
    }
        //背景色
    function focus_attr(element) {
        $('.divLeft>p').css('background', 'rgba(216, 108, 108, 0.2)'); //设置背景色
        $(element).css('background', 'grey')
        $('.divLeft>p').removeAttr('choosed'); //为选中项增加属性
        $(element).attr('choosed', 'true');
    }

        //清空，并增加一条空记录
    $('.clear').click(function clear() {
        $('.divLeft>p').remove();
        $('.divLeft').append('<p>new record</p>');
        let new_item = $('.divLeft>p').get(0);
        $('.divLeft p:first').attr('class', 'p1');
        store.clear();
        init(new_item);
        $('.divLeft p:first').on('click',function () {
            focus_attr(new_item);
            item_click(new_item);
        });
    })
});
