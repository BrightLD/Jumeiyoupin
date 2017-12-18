// 上拉加载
export function upMore(element,callback) {
    let timerId ;
    element.addEventListener('scroll',function () {
        if(timerId) clearTimeout(timerId);
        timerId = setTimeout(function () {
            let scrollTop  = element.scrollTop,
                scrollHeight = element.scrollHeight,
                clientHeight = element.clientHeight;
            if(scrollTop+clientHeight+50>scrollHeight){
                callback();
            }
        },100)
    })
}

export function downRefresh(element,callback) {
    element.addEventListener('touchstart',touchStart);
    let startY ,
        distance,
        initTop = element.offsetTop;
    function touchStart(event) {
        if(element.offsetTop == initTop && element.scrollTop == 0){
            startY = event.targetTouches[0].pageY;
            element.addEventListener('touchmove',touchMove);
            element.addEventListener('touchend',touchEnd);
            function touchMove(e) {
                let pageY = e.targetTouches[0].pageY;
                if(pageY > startY){
                    distance = pageY - startY;
                    element.style.top = initTop+distance+'px';
                }else{
                    element.removeEventListener('touchmove',touchMove);
                    element.removeEventListener('touchend',touchEnd);
                }
            }
            function touchEnd(e) {
                element.removeEventListener('touchmove',touchMove);
                element.removeEventListener('touchend',touchEnd);
                let timerId = setInterval(function () {
                    if(element.offsetTop <= initTop ){
                        element.style.top = initTop + 'px';
                        clearInterval(timerId)
                    }else{
                        element.style.top = element.offsetTop - 5 + 'px';
                    }
                },1);
                if(distance > 81){
                    callback()
                }
            }
        }
    }
}