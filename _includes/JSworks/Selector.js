var $ = function selector(element) {
    var sign = element.charAt(0),
        rlt = element.substr(1);
    switch (sign) {
        case '#':
            return document.getElementById(rlt);
            break;
        case '.':
            return document.getElementsByClassName(rlt);
            break;
        case '@':
            return document.getElementsByTagName(rlt);
            break;
        default:alert('无法使用选择器函数');
    }
}
