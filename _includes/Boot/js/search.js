let $li = $('.nav').find('ul:eq(1)').children('li');
$li.on('click',function () {
    let site = $(this).text(),
        text = $('.searchtext').val();
    switch (site) {
        case '百度':
            window.open('https://www.baidu.com/baidu?word='+text)
            break;
        case 'google':
            window.open('https://www.google.com.hk/search?q='+text)
            break;
        case 'Bing':
            window.open('http://cn.bing.com/search?q='+text)
            break;
        case 'DuckGo':
                window.open('https://duckduckgo.com/?q='+text)
                break;
        default:null;
    }
})

$('.smtbtn').on('click',function(){
    alert('Succeed!')
})

$('.gender input').on('click',function () {
    console.log(1);
    $('.gender input').prop('checked',false);
    $(this).prop('checked',true);
})
