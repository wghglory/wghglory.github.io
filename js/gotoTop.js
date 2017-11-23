{
    //连续点击rocket不会重复增加计时器
    //点击rocket滑动期间可以手动拖动，瞬间消除计时器
    //bug:手动滑动期间点击rocket，计时器不会被绑定。。。
    let rocket = document.querySelector('.gotoTop');
    let isSysScroll = true;
    let timer = null;
    let timerDone = true; //计时器是否在执行的开关，正在滚动期间点击rocket不要重复添加计时器

    // 点击rocket或者人为拖动滚动条都会触发
    window.onscroll = function() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (!isSysScroll) {
            clearInterval(timer);
        }

        isSysScroll = false; //检测用户拖动了滚动条，人为拖动会有false清楚了计时器。

        if (scrollTop === 0) {
            rocket.style.opacity = 0;
            timerDone = true; //只要在最顶端就可以恢复绑定计时器

        } else {
            rocket.style.opacity = 1;
        }
    };

    rocket.onclick = function() {
        if (timerDone) {
            timer = setInterval(function() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let iSpeed = Math.floor(-scrollTop / 8);

                timerDone = false;
                isSysScroll = true; //点击rocket滚动时不断设置系统拖动true，这样window.onscroll不会clear计时器
                document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;

                if (scrollTop === 0) {
                    clearInterval(timer);
                    rocket.style.opacity = 0;
                    timerDone = true;
                }
            }, 30);
        }

    };
}
