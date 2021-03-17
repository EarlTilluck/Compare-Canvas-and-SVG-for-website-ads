# Comparing Canvas and SVG for Website Ads
Create two animated Ads using Canvas and SVG for an energy drink company. Compare the two technologies.  
[click here to view the results]()

## Requirements
Since we are creating an online ad, we need to consider the following:
* Ads should load quickly and not hinder the rest of the user experience. Therefore we need to keep the ad as small as possible.
* Performance and Cross platform compatibility.
* Self-Containment: Ads should be easlily linked to any webpage for display. CSS and JS should not conflict with the rest of the website.

## Concept and Design
The concept of the ad involves having the following dialog with the viewer:
1. Are you running on empty?
2. Energize with... 
3. POWER PACK!  

This concept is simple enough to be executed in a few seconds and communicates a relatable idea.  

## Implementation
### Phase 1 
1. Display the fallback image. If JavaScript is not available, this image remains on screen. The fallback image looks the same as the end of phase 4.
 
### Phase 2
Phase 2 involves two animations and begins the dialog with the audience.  
1. "Running on" slides in from the right 
2. "Empty" and the "fuel gauge" fades in.

### Phase 3
1. Text is removed from screen to focus on fuel gauge.
2. The needle rotates 180° from empty to full.
3. The needle vibrates it reaches full
4. "Energize with" fades in

### Phase 4
1. The original elements (title, bottle, website url, background) slide back in.
2. repeat from phase 2


## Code Notes  
SVG files are basically XML files. Like any other XML file, we can link to CSS style sheets using the following code:
```
<?xml-stylesheet href="your_css_file.css" type="text/css"?>
```
We can also link to a JavaScript file by using the following code:
```
<script xlink:href="your_script_file.js" />
```
SMIL animations are not fully supported on all browsers. In some browsers, they are deprecated and will be removed in the future. Instead, JavaScript is used to animate the elements by changing their CSS style or altering attributes of the tags.  
The animation for both versions was done creating functions that act as a phase. These functions would be called using the `requestAnimationFrame` method.  
Basic outline of a phase:
```
function this_phase() {
	/* perform animation code */
	/* increment some variables if needed */
	if (condition_for_next_phase == true) {
		/* perform some cleanup if needed */
		/* prepare for next phase */
		requestAnimationFrame(next_phase);
		return; // do not proceed any further
	}
	// recall this function 
	requestAnimationFrame(this_phase);
}
```
The SVG file was simpler to animate, while the Canvas was a little more complicated. The canvas version needed more phases and more code since we have to redraw the background every time we moved or faded an element.
For the canvas version, objects are created that encapsulate their own animations. We can then animate these objects by calling their relevant methods and supplying the needed arguments.  
The outline of a basic animated object is as follows:
```
 function canvas_object(arguments for constructor) {
    var obj = this;
    // constuctor for this object
    (function() {
        	/* set initial variables here */
    })();

    this.draw = function() {
        	/* calculate location of object */
		/* draw the object on the canvas */
    };
    
    this.fade = function(new_opacity) {
        	/* modify variables with new opacity */
        	this.draw(); // draw the image
    };
    
    this.translate = function(new_x, new_y) {
        	/* calculate new position */      
		this.draw();
    };

    this.rotate = function(new_angle) {
        	/* calculate position of new points */      
		this.draw();
    };
}
```


## Conclusion
My observations:
* SVG has better text rendering capabilities. 
* Performance wise, SVG needs less code but the animations run smoother in Canvas.
*	Canvas absolutely needs JavaScript, however SVG files do not. This makes it easier to implement a fallback.
The choice between Canvas and SVG is not simple. Both of these technologies bring unique advantages and disadvantages to the table. In terms of workflow, I found SVG to be easier to work with and faster to implement. Alternately, Canvas animations perform more smoothly than SVG animations.

## What could have been done better:
As with any project, there is always room for improvement. 
* Reduce the size of the JavaScript code by minifying it.
* Reduce the number of HTTP requests by embedding all code and style directly into the SVG file, or the HTML file with the canvas element. With SVG, you can use <![CDATA[]]> to embed the script and the CSS. 
* Use popular JavaScript libraries to make gain animation effects like ease-in. 
*	Overall visual quality needs to be improved.


## Credits to public domain content
* [League Spartan font](https://www.fontsquirrel.com/fonts/league-spartan)
* [Public domain beer bottle image](https://pixabay.com/en/beer-bottles-drinks-alcohol-1465153/)
* [Public domain barcode image](https://pixabay.com/en/bar-code-information-data-business-24157/)
