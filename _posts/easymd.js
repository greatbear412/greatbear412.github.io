const fs = require('fs');
const textract = require('textract');
const fileName = './2019-06-11-Ionic angularjs.markdown'

textract.fromFileWithPath(fileName, function( error, text ) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
})
// 转半角
function ToCDB(str) { 
  var tmp = ""; 
  for(var i=0;i<str.length;i++){ 
      // 去空格
      // if (str.charCodeAt(i) == 12288){
      //     tmp += String.fromCharCode(str.charCodeAt(i)-12256);
      //     continue;
      // }
      if(str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375){ 
          tmp += String.fromCharCode(str.charCodeAt(i)-65248); 
      } 
      else{ 
          tmp += String.fromCharCode(str.charCodeAt(i)); 
      } 
  } 
  return tmp 
}