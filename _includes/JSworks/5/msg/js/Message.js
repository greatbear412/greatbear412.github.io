// $(document).ready(function(){
// $('.divLeft>div:first').css('background','grey').attr('choosed','true');
//  选中所选文件夹
// $('.divLeft').on('click','div,p',function(){
//     $('.divLeft>div').css('background','none');//设置背景色
//     $(event.target).css('background','grey')
//
//     $('.divLeft>div').removeAttr('choosed');//为选中项增加属性
//     $(event.target).attr('choosed','true');
// });
//  $('#setDocu').click(function(){
// 左侧新建元素
//    var class_num = $('.div2>p').length+1;
//     $('.div2').append('<p>文档'+class_num+'</p>');
//     $('.div2 p:last').attr('class','p'+class_num);
//
//
//  $(event.target).append('<p>文档'+class_num+'</p>');

//新建文件夹
// $('#setPack').click(function() {
// 新元素的class="父"元素class+‘-’+最后一个兄长元素的最后数字加上1
//   var parentCName = $('.divLeft>div[choosed="true"]').attr('class');
//   var preCName = $("div[class*="+parentCName+"]:last").attr('class');//选择器中加变量
//   console.log(preCName);
// });
// var tCName = tDiv.className;
// tDiv.after("<div>新建文件夹"+"</div>");

// 拉伸动画
//   $('.divLeft>div[class^="div2-"]').slideUp();

// 左侧元素点击事件
//   $('.div3:last').after('<div><h1>文档'+class_num+'</h1></div>')
//   $('.div3:last').next('div').attr({class:'div3',id:'p'+class_num});
//
// });
// $('.div2').on('click','p',function(){
//   $('.div3').hide();
//   var getId = event.target.className;
//   $('#'+getId).show();
// })

// 中部切换按钮
// $('#pbig').on('click',function(){
//   var child_num = $('.div3:visible p').length+1;
//   $('.div3:visible').append('<p>This is No.'+child_num+'</p>')
// })

//焦点背景色--最后做一个全部元素的
// $('.div2').click(function(){
//   $(event.target).css('background','blue');
// });
// $('.div2').focusout(function(){
//   $(event.target).css('background','null');
// });

// 下方留言板
window.onload = function() {
    var imgs = document.querySelectorAll('.top-tools img'),
        txt = document.getElementsByClassName('textbox')[0].firstElementChild,
        txtpre = document.getElementsByClassName('textpre')[0];

    function getClass(a) {
        return document.getElementsByClassName(a);
    }

    (function() {
        txt.style.height = txt.scrollHeight + 'px';
    })()

    // 留言框：最小大小和自适应高度 ； 预览框：实时更新
    function makeExpandingArea(el) {
        var setStyle = function(el) {
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + 'px';
            txtpre.style.height = el.scrollHeight + 'px';//更新预览框高度
            txtpre.value = txt.value;
            // console.log(el.scrollHeight);
        }
        setStyle(el);
        if (el.addEventListener) {
            el.addEventListener('input', function() {
                setStyle(el)
            }, false); //自适应高度
        }
        el.addEventListener("oncut", function() {
            setStyle(el);
        }); //处理粘贴
    };
    makeExpandingArea(txt);
    // 按钮们
    //加粗等一系列插入字符串的事件
    imgs[0].addEventListener('click', function() {
        var selectionStart = txt.selectionStart,
            selectionEnd = txt.selectionEnd;
        if (txt.value.substring(selectionStart - 3, selectionStart) === '<b>') {
            txt.value = txt.value.substring(0, selectionStart - 3) + txt.value.substring(selectionStart, selectionEnd) + txt.value.substring(selectionEnd + 4);
            txt.selectionStart = selectionStart - 3; //失焦后重新选择之前的选区
            txt.selectionEnd = selectionEnd - 3;
        } else {
            txt.value = txt.value.substring(0, selectionStart) + '<b>' + txt.value.substring(selectionStart, selectionEnd) + '</b>' + txt.value.substring(selectionEnd);
            txt.selectionStart = selectionStart + 3;
            txt.selectionEnd = selectionEnd + 3;
        };
    })

    //添加列表符号
    imgs[5].addEventListener('click', function() {
        var k = 1,
            ks = 0,
            ke = 0; //ks:列表起始行  ke:列表结束行
        selectionStart = txt.selectionStart,
        selectionEnd = txt.selectionEnd;
        txt.value = txt.value.substring(0, selectionStart) + "\n"
        + ' 1.' + txt.value.substring(selectionStart); //先添加一行初始项  pS:\n：将光标移动到下一行（此时光标的纵坐标没有变）  \r：将光标移动到屏幕最左边（此时光标的横坐标没有变） 两者结合起来就实现了回车(省略说法)效果。（有时候只用一个也可以）

        txt.setSelectionRange(selectionStart + 4, selectionEnd + 4);
        txt.focus();
        selectionStart = txt.selectionStart,
        selectionEnd = txt.selectionEnd; //重新定位光标

        for (var i = 0; i < selectionEnd; i++) {
            var isEnter = txt.value.substring(selectionStart - i - 1, selectionStart - i)
            if (isEnter.indexOf('\n') == 0) {
                k++;
            }
        } //得到光标所在为第几行(k)(即新添加的初始项在第几行，下面的思路是：以此行为出发点，上下寻找)

        ks = ke = k; //初始化ks和ke，如果下面的查找没找到，说明列表的上或下不存在非列表内容了，那么ks和ke就等于k了

        var myReg = /^\s{1,3}\d+.[^'.']*/,
            text = txt.value.split('\n');
        for (var i = 0; i < k - 1; i++) {
            if (!myReg.exec(text[k - 2 - i])) {
                ks = k - i; //得到ks
                break;
            } else {
                ks = 1;
            }
        };

        for (var i = 0; i < text.length - k; i++) {
            if (!myReg.exec(text[k + i])) {
                ke = k + i; //得到ke
                break;
            } else {
                ke = text.length;
            }
        };
        // console.log('k:'+k);
        // console.log('ks:'+ks);
        // console.log('ke:'+ke);
        var replaceReg = /^\s{1,3}\d+./
        for (var i = 0; i < ke - ks + 1; i++) {
            // console.log(text[ks + i - 1]);
            text[ks + i - 1] = text[ks + i - 1].replace(/^\s{1,3}\d+./, ' ' + (
            i + 1) + '.'); //更新列表
        };

        var count = 0;
        for (var i = 0; i < k; i++) {
            count += text[i].toString().length;
        } //得到最终的鼠标位置

        txt.value = txtpre.value = text.join('\n');


        txt.selectionStart = count + k - 1;
        txt.selectionEnd = count + k - 1; //更新鼠标位置

        txt.style.height = 'auto';
        txt.style.height = txt.scrollHeight + 'px'; //更新文本框高度
        txtpre.style.height = txt.scrollHeight + 'px';//更新预览框高度
        txt.focus();
    });

    // var textbox = document.getElementsByClassName('textbox')[0],
    var txthid = document.getElementsByClassName('texthid')[0],
        toFull = document.getElementsByTagName('body')[0],
        originHeight = parseInt(txt.style.height);

    imgs[6].addEventListener('click', function() {
        switch (toFull.className) {
            case 'qa':
                toFull.className = 'no-qa';
                txthid.innerText = txt.value;
                    if (txthid.clientHeight <= originHeight) {
                        txt.style.height = originHeight + 'px';
                        makeExpandingArea(txt);
                    }
                    else {
                        txt.style.height = txthid.clientHeight + 'px';
                        makeExpandingArea(txt);
                    }
                break;
            case 'no-qa':
                toFull.className = 'qa';
                break;
            default:
                alert('body的class有误')
        }
        if (toFull.className ==='no-qa') {
            txthid.value = txt.value;
            txt.style.height = txt.scrollHeightheight;
        }
        });
    imgs[1].addEventListener('click', function() {
        console.log('txt.height:'+txt.style.height);
        console.log('txthid.height:'+txthid.style.height);
        console.log('txt.scroll height:'+txt.scrollHeight);
        console.log('txthid.c height:'+txthid.clientHeight);
        console.log('originHeight:'+originHeight);

    });
}
