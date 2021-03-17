//global variables:
var ctx; // canvas context
//css values
var font_ls = "2em 'LeagueSpartan', Impact, Charcoal, sans-serif";
var font_guage = "1.5em 'LeagueSpartan', Impact, Charcoal, sans-serif";
var font_large = "4em 'LeagueSpartan', Impact, Charcoal, sans-serif";
var font_small = "1em 'LeagueSpartan', Impact, Charcoal, sans-serif";
var fill_green = "rgba(50, 205, 50, ";
var fill_yellow = "rgba(255, 255, 0, ";
var fill_white = "rgba(255, 255, 255, ";

// all the elements to animate 
var flyBack, gBack;
var t1, t2, t3, t4, t5, t6;
var bottle, fuel;

// bottle image
var img = document.createElement("IMG");
img.setAttribute("src", "powerpack.png");

//phase variables
var transVal, fadeVal, rotateVal;


// these two functions give the canvas x,y coords 
// as if the point-of-orgin (0,0) is at the center
function offsety(y) {
    return y + 150;
}
function offsetx(x) {
    return x + 200;
}

// Objects to be drawn on screen are separeted into their 
// own functions below...

// Text element
function canvasText(txt, font, fill, x, y) {
    var obj = this;

    // constuctor for this javascript object
    (function() {
        obj.x = offsetx(x);
        obj.y = offsety(y);
        obj.txt = txt;
        obj.font = font;
        obj.fill = fill;
        obj.opacity = 1;
        obj.rad = 0;
    })();

    this.draw = function() {
        ctx.font = obj.font; 
        ctx.fillStyle = obj.fill + obj.opacity + ")";
        ctx.fillText(obj.txt, obj.x, obj.y);                         
    };
    
    this.fade = function(new_opacity) {
        obj.opacity = new_opacity;
        this.draw();
    };
    
    this.translate = function(new_x, new_y) {
        obj.x += new_x;
        obj.y += new_y;
        this.draw();
    };

} // end canvasText

// shifting background
function shiftBack(x, y) {
    var obj = this;
    
    // constuctor for this javascript object
    (function() {
        obj.x = offsetx(x);
        obj.y = offsety(y);
    })();
    
    this.draw = function() {
        //move to top left         
        ctx.beginPath();
        ctx.moveTo(obj.x, obj.y);
        //draw line across to the right
        ctx.lineTo(obj.x+1000, obj.y);
        // draw line down 
        ctx.lineTo(obj.x+800, obj.y+300);
        // draw line back left
        ctx.lineTo(obj.x-200, obj.y+300);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    };
    
    this.translate = function(new_x, new_y) {
        obj.x += new_x;
        obj.y += new_y;
        this.draw();
    };
    
}// end shiftBack

// fuel gauge
function fuelGuage(x, y) {
    var obj = this;
    
    // constuctor for this javascript object
    (function() {
        // x and y are the center for this
        obj.x = offsetx(x);
        obj.y = offsety(y);
        obj.angle = 0;
        obj.rad = 0;
        obj.opacity = 1;
    })();
    
    this.draw = function() {
        ctx.fillStyle = "#000000";
        ctx.fillRect(obj.x-130, obj.y-100, 260, 120);
        //draw halfcircle
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 80, 0, Math.PI, true);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "rgba(255, 255, 255, " + obj.opacity + ")";
        ctx.stroke();
        ctx.closePath();
        // rectangle to top of gauge
        ctx.fillStyle = "rgba(255, 255, 255, " + obj.opacity + ")";
        ctx.fillRect(obj.x-4, obj.y-75, 8, 16);
        //plug stuff
        ctx.fillRect(obj.x, obj.y-45, 12, 10);
        ctx.fillRect(obj.x+14, obj.y-43, 4, 1);
        ctx.fillRect(obj.x+14, obj.y-38, 4, 1);
        ctx.beginPath();
        ctx.arc(obj.x, obj.y-40, 4, (270*Math.PI /180), (90*Math.PI /180), true);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(obj.x-5, obj.y-45, 5, 0, Math.PI);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(obj.x-15, obj.y-45, 5, 0, Math.PI, true);
        ctx.stroke();
        ctx.closePath();
        //two endpoints
        ctx.fillStyle = "rgba(255, 0, 0, " + obj.opacity + ")";
        ctx.fillRect(obj.x-90, obj.y-3, 20, 6);
        ctx.fillStyle = "rgba(0, 255, 0, " + obj.opacity + ")";
        ctx.fillRect(obj.x+70, obj.y-3, 20, 6);
        // E and F
        ctx.fillStyle = "rgba(255, 255, 255, " + obj.opacity + ")";
        ctx.font = font_guage;
        ctx.fillText("E", obj.x-110, obj.y+10);
        ctx.fillText("F", obj.x+95, obj.y+10);
        // red needle
        obj.rad = obj.angle * Math.PI / 180;
        var x1 = this.new_x(obj.x-80, obj.y);
        var y1 = this.new_y(obj.x-80, obj.y);
        var x2 = this.new_x(obj.x, obj.y-5);
        var y2 = this.new_y(obj.x, obj.y-5);
        var x3 = this.new_x(obj.x, obj.y+5);
        var y3 = this.new_y(obj.x, obj.y+5);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.fillStyle = "rgba(255, 0, 0, " + obj.opacity + ")";
        ctx.fill();
        ctx.closePath();
        // circle at center of gauge
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 12.162, 0, 2*Math.PI);
        ctx.lineWidth = 5;
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    };
    // points for the needle are calculated based on the degree of rotation
    this.new_x = function(x, y) {
        //x*cos*rad?y*sin*rad
        return (Math.cos(obj.rad) * (x - obj.x)) + (Math.sin(obj.rad) * (y - obj.y)) + obj.x; 
    };
    this.new_y = function(x, y) {
        //y*cos*rad+x*sin*rad
        return (Math.cos(obj.rad) * (y - obj.y)) - (Math.sin(obj.rad) * (x - obj.x)) + obj.y;
    };
    
    this.rotate = function(newAngle) {
        obj.angle = newAngle;
        this.draw();
    };
    
    this.translate = function(new_x, new_y) {
        obj.x += new_x;
        obj.y += new_y;
        this.draw();
    };
    
    this.fade = function(op) {
        obj.opacity = op;
        this.draw();
    };
    
}// end fuelguage

// background with gradient
function gradBack() {
    var obj = this;
    
    // constuctor for this javascript object
    (function() {
        var grad = ctx.createLinearGradient(0,200,200,0);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(0.5, 'rgba(0,128,0,1)');
        grad.addColorStop(1, 'rgba(0,0,0,1)');
        obj.grd = grad;
    })();
    
    this.draw = function() {
        ctx.fillStyle = obj.grd;
        ctx.fillRect(0, 0, 400, 300);
    };
    
}// end gradBack

// image of the power pack bottle
function bottleImage(x, y) {
    var obj = this;
    
    // constuctor for this javascript object
    (function() {
        obj.x = offsetx(x);
        obj.y = offsety(y);
    })();
    
    this.draw = function() {
        ctx.drawImage(img, obj.x, obj.y);
    };
    
    this.translate = function(new_x, new_y) {
        obj.x += new_x;
        obj.y += new_y;
        this.draw();
    };
    
}// end bottleImage

// Animation is done in phases as specified below

function phase1() {
    ctx.clearRect(0,0,400,300);
    // draw gradient background
    gBack.draw();
    // draw begining image;
    t4.draw();
    t5.draw();
    t6.draw();
    bottle.draw();
    // wait a second and move to phase 2
    flyBack.translate(400, 0);
    transVal = 0;
    setTimeout(phase2, 1000);
}

function phase2() {
	// move background and text into place
    flyBack.translate(-30, 0);
    t1.translate(-30, 0);
    transVal += 30;
    if (transVal >= 600) {
        // move to next phase
        fadeVal = 0;
        phase3();
        return;
    }
    requestAnimationFrame(phase2);
}

function phase3() { 
    if (fadeVal < 1) {
        // clear text area
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 220, 400, 40);
		// fade in "empty" and fuel gauge
        t2.fade(fadeVal);
        fuel.fade(fadeVal); 
        fadeVal += 0.01;
    } else {
		// wait a while and move on
        setTimeout(phase4, 1000);
        rotateVal = 0;
        return
    }
    requestAnimationFrame(phase3);
}

function phase4() { 
    // clear running on empty text on first entry
    if (rotateVal == 0) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 150, 400, 150);
    }
	// rotate the fuel gauge needle 180deg
    if (rotateVal <= 180) {
        fuel.rotate(-rotateVal);
        rotateVal += 3;
    } else {
		// prepare for next phase
        fadeVal = 0;
        flyBack.translate(100, 0);
		// move on
        requestAnimationFrame(phase5);       
        return
    }
    requestAnimationFrame(phase4);
}

function phase5() {
    if (fadeVal <= 1) {
		// vibrate the needle 
        var randDeg = Math.round((Math.random() * 5) + 175);
        fuel.rotate(-randDeg);
        //clear the bottom of the screen
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 170, 400, 100);
        //fade in text
        t3.fade(fadeVal);
        fadeVal += 0.05;
    } else {
		// wait a while, then move on
        fuel.rotate(-180);
        transVal = 0;
        setTimeout(phase6, 500);
        return;
    }
    requestAnimationFrame(phase5);
}

function phase6() {
    // draw the background gradient
    gBack.draw();
    // black out left half of canvas in early stage
    if (transVal <= 120) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 400, 200);
    } 
    //move elements off screen
    flyBack.translate(-30, 0);
    fuel.translate(-30, 0);
    t3.translate(-30, 0);
    transVal += 30;                             
    if (transVal >= 1200) {
        // prepare for next phase
        transVal = 0;
        bottle.translate(0, 300);
        t6.translate(0, 300);
        t4.translate(-300, 0);
        t5.translate(-300, 0);
		// move on
        phase7();
        return;
    }
    requestAnimationFrame(phase6);
}

function phase7() {
    // draw the background gradient
    gBack.draw();
    // move bottle and text into place
    bottle.translate(0, -20);
    t6.translate(0, -20);
    t4.translate(20, 0);
    t5.translate(20, 0);
    transVal += 20;                             
    if (transVal >= 300) {
        // repeat the entire process 
        setTimeout( function() {
            // move elements back to starting positions
            flyBack.translate(1300, 0);
            t1.translate(600, 0); 
            t1.fade(1);
            fuel.rotate(0);
            fuel.translate(1200, 0);
            t3.translate(1200, 0);
			// repeat
            phase1();   
        }, 1000);
        return;
    }
    requestAnimationFrame(phase7);
}


window.onload = function() {
	// get the Canvas context
	ctx = document.getElementById("canvas").getContext("2d");

    // create elements to animate 
    t1 = new canvasText("Running on", font_ls, fill_green, 450, 55);
    t2 = new canvasText("Empty?", font_ls, fill_green, 0, 100);
    t3 = new canvasText("energize with", font_ls, fill_green, -120, 65);
    t4 = new canvasText("Power", font_large, fill_yellow, -170, -60);
    t5 = new canvasText("Pack", font_large, fill_yellow, -170, 40);
    t6 = new canvasText("www.powerpack.com", font_small, fill_white, -180, 100);
    flyBack = new shiftBack(0, -150);
    gBack = new gradBack();
    bottle = new bottleImage(20, -140);
    fuel = new fuelGuage(0,0);
    
    // start animation, animation will procede from phase 1 - 7, then repeat
    phase1(); 
    
};