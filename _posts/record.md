# simpleJD

1.命名：语义化非常重要，修改时使用（父级 子级）选择器的方式会很难阅读。相似度足够高的部分再用同样的类名，免得修改CSS时“误伤”。即使重用度很高的，最好也各自给一个单独的、可辨认的类名，以备单独修改时使用。

2.尽量少用relative等具体值来定位，这对于响应式来说是不友好的。居中就是text-align，margin：auto等。

3.框架利用的不充分，理解不是很到位。要用尽量少的代码来达到响应式的目的。