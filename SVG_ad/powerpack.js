// global variables ...

// handle used when requesting animation frames
var animationFrame; 

// all the elements to animate in SVG
var flyBack;
var t1, t2, t3, t4, t5, t6;
var needle, bottle, fuel;

//phase1 variables
var p1x1, p1op1;
//phase2 variables
var p2op1, deg, randDeg;
//phase3 variables
var p3x1,p3x2, p3y1;

function phase1() {
    //shift flyback across screen
    if(p1x1 != 0){
        flyBack.setAttribute("transform", "translate(" + p1x1 + ", 0)");
        // shift the "running on" text as well
        t1.setAttribute("transform", "translate(" + p1x1 + ", 0)");
        p1x1 += -30;
        if(p1x1 <= -700) {
            p1x1 = 0;
        }
    } else {
        // increase opacity of text and fuel gauge after slide in
        if(p1op1 < 1) {
            t2.style.opacity = p1op1;
            fuel.style.opacity = p1op1;
            p1op1 += 0.01
        } else {
            //after a second, move on to next phase
            setTimeout(function(){
                // reset these elements
                t1.setAttribute("transform", "translate(0,0)");
                t2.style.opacity = 0;
                // set phase2 variables back to default
                p2op1 = 0;
                deg = 0;
                // move on to next animation phase
                animationFrame = requestAnimationFrame(phase2);
            }, 1000);
            //break, do not repeat this phase.
            return;
        }
    }
 
    // repeat the animation
    animationFrame = requestAnimationFrame(phase1); 
}

function phase2() {
    // rotate the needle in gauge
    if (deg <= 180 ) {
        deg += 3;
        needle.setAttribute("transform", "rotate("+ deg +")");
    } else if(p2op1 < 1) {
        // make needle shake using to random deg near 180
        randDeg = Math.round((Math.random() * 5) + 175);
        needle.setAttribute("transform", "rotate(" + randDeg + ")");
        // increase the opacity of text
        p2op1 += 0.05
        t3.style.opacity =  p2op1;
    } else {
        //move fallback graphic elements to offscreen
        bottle.setAttribute("transform", "translate(0, 300)");
        t4.setAttribute("transform", "translate(-300, 0)");
        t5.setAttribute("transform", "translate(-300, 0)");
        t6.setAttribute("transform", "translate(0, 300)");
        // move needle to the end
        needle.setAttribute("transform", "rotate(180)");
        //after half a second, move on to next phase
        setTimeout(function(){
            // set phase3 variables back to default
            p3x1 = -700;
            p3x2 = -300;
            p3y1 = 300;

            // move on to next animation phase
            animationFrame = requestAnimationFrame(phase3);
        }, 500);
        //break, do not repeat this phase.
        return;
    }
    // repeat the animation
    animationFrame = requestAnimationFrame(phase2); 
}

function phase3() {
    //shift flyback across screen
    if(p3x1 != 0){
        flyBack.setAttribute("transform", "translate(" + p3x1 + ", 0)");
        // and fuel gauge with text
        t3.setAttribute("transform", "translate(" + (p3x1+700) + ", 0)");
        fuel.setAttribute("transform", "translate(" + (p3x1+700) + ", 0)");
        p3x1 += -30;
        if(p3x1 <= -1500) {
            p3x1 = 0;
        }
    } else {
        //move text and bottle back onto the screen
        if (p3x2 <= 0) {
            t4.setAttribute("transform", "translate(" + p3x2 + ", 0)");
            t5.setAttribute("transform", "translate(" + p3x2 + ", 0)");
            p3x2 += 10; 
        }
        if (p3y1 >= 0) {
            bottle.setAttribute("transform", "translate(0, " + p3y1 +")");
            t6.setAttribute("transform", "translate(0, " + p3y1 +")");
            p3y1 -= 10;
        } else {
            //after 2 seconds, move on to next phase
            setTimeout(function(){
                // reset gauge and and text 
                t3.setAttribute("transform", "translate(0,0)");
                fuel.setAttribute("transform", "translate(0,0)");
                needle.setAttribute("transform", "rotate(0)")
                t3.style.opacity = 0;
                fuel.style.opacity = 0;
                // set phase1 variables back to default
                p1x1 = -30;
                p1op1 = 0;
                // move back to phase one - cycle will repeat infinite times
                animationFrame = requestAnimationFrame(phase1);
            }, 2000);
            //break, do not repeat this phase.
            return; 
        }    
    }

    // repeat the animation
    animationFrame = requestAnimationFrame(phase3);
}

function start() {
    // load up the elements we will be animating in the svg file
    flyBack = document.getElementById("flyBack");
    t1 = document.getElementById("t1");
    t2 = document.getElementById("t2");
    t3 = document.getElementById("t3");
    t4 = document.getElementById("t4");
    t5 = document.getElementById("t5");
    t6 = document.getElementById("t6");
    needle = document.getElementById("needle");
    bottle = document.getElementById("bottle");
    fuel = document.getElementById("fuel");
    
    //initialize variables used in phase1 
    p1x1 = -30;
    p1op1 = 0;
    
    //start the animation after 1 second, 
    setTimeout(function(){
        // this is used to invoke a function on the next available 
        // time frame (it runs approx. 60 times per second)
        animationFrame = requestAnimationFrame(phase1);
    }, 1000);
    
}

window.onload = function() { 
    //start the animation
    start(); 
};