function getStyle (obj, name) {  
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false) [name];
    }
}

//function move(obj, attr, target)
//加入json，把mover变成   move (oDiv, {width: 100, height: 100})
function move(obj, json, fnEnd) {    //obj: 那个对象/当前要被操作的对象 attr：具体属性 target:具体目标，如透明度：1；

clearInterval(obj.timer);

obj.timer = setInterval(function () {          // 直接存一个attr，以便在调用的时候，可以随意改写样式
    //var cur = parseInt(getStyle(obj, attr));   //申明cur存getStyle函数取获取html里的元素
    var bStop = true;   //当开启定时器时，假设所有值都已经到了
    
    for (var attr in json) {
    var cur = 0;                    //如果传进来的是opacity
    if (attr == 'opacity') {   //opacity不能用parseint，会把小数点弄没
        cur = Math.round(parseFloat(getStyle(obj, attr))*100);  //math.round四舍五入
    } else {
        cur = parseInt(getStyle(obj, attr));
    }
    var speed = (json[attr] - cur)/10;     
    speed = speed > 0? Math.ceil(speed): Math.floor(speed);

    if(attr == 'opacity') {
        obj.style.opacity = (cur + speed)/100;
    } else {
        obj.style[attr] = cur+speed+'px';  
    }
    }

    if (cur != json[attr]){   //如果发现有一个值不等于目标点，说明假设是不成立的
        bStop = false;
    }

    if (bStop == true) {     //如果程序执行过程中，bstop是true的，说明这时候所有的值都到达目标点，可以关掉定时器了
        clearInterval(obj.timer);
        if(fnEnd)fnEnd();
    }
}, 30);
}



//     if (cur == json[attr]) {                          //设置
//         clearInterval(obj.timer);
//        // if (fnEnd)fnEnd();
//     } else {
//         if (attr == 'opacity') {
//             obj.style.opacity = (cur + speed)/100;
//         } else {
//         obj.style[attr] = cur+speed+'px';
//         }
//     }
// }
    
// }, 30);
// }


