// Get angle from CSS property
// Source: http://stackoverflow.com/a/11840120
function getRotationDegrees(obj) {
    let matrix = getComputedStyle(obj).transform,
        angle = 0;
    if(matrix !== 'none') {
        let values = matrix.split('(')[1].split(')')[0].split(',');
        let a = values[0];
        let b = values[1];
        angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    }
    return (angle < 0) ? angle + 360 : angle;
}

// Taken from http://stackoverflow.com/a/8797106
function addListenerMulti(el, s, fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn, false));
}

let interval, awoo = 0;
function animateStep(side, angle) {
    let step,
        i = 0;

    if(typeof side !== "string")
        throw new SyntaxError("No argument or not string.");

    switch (side) {
        case 'left':
            step = angle / 60;
            break;
        case 'right':
            if(angle < 270)
                step = (180 - angle) / 60;
            else
                step = (360 - angle) / 60;
            break;
    }

    interval = setInterval(() => {
        if(i === 60){
            clearInterval(interval);
            if(178 <= angle && angle <= 182){
                mediaController(0);
            }
            toggleWolf(angle);
        }
        let nStep;
        switch (side) {
            case 'left':
                nStep = angle - step;
                break;
            case 'right':
                nStep = angle + step;
                break;
        }
        document.getElementById('bg_rotate').style.transform = 'translate(-50%, -40%) rotate(' + nStep + 'deg)';
        fieldBrightness(angle);
        angle = nStep;
        i++
    }, 16);
}

function mediaController(state) {
    let mElement = document.getElementById("soundfx");

    switch(state){
        case 0:
            if(!mElement.paused)
                break;
            mElement.load();
            mElement.play();
            awoo++;
            document.getElementById("howl").innerHTML = awoo;
            break;
        case 1:
            mElement.pause();
            break;
        case -1:
            mElement.pause();
            mElement.load();
            break;
    }
}

function toggleWolf(angle, forceVal) {
    let el = document.getElementById('wolf');

    if(forceVal !== undefined) {
        if(forceVal) {
            el.className = 'active'
        } else {
            el.className = ''
        }
    } else {
        if (178 <= angle && angle <= 182 || forceVal) {
            if(el.className === '')
                el.className = 'active'
        } else {
            if(el.className === 'active')
                el.className = ''
        }
    }
}

function fieldBrightness(angle){
    if(angle < 180)
        angle = Math.abs(180 - angle);
    else
        angle = Math.abs(180 - (360 - angle));
    let el = document.getElementById("field"),
        percent = (angle / 180) * 100;
    el.style.filter = 'brightness('+percent+'%)';
}