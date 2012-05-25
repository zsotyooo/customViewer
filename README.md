customViewer
============

jQuery plugin for typical show/hide cases. You can write handlers easily, and switch them any time. This repository contains accordion, slideDown, dropDown functionalities too.

## Usage: 
### Applying to HTML elements:
$(".accordion > li").customViewer({
	timeoutTime: 1000,
	hideAll: true,
	contentSelector: 'ol',
	handlerSelector: 'span',
	showHandler: 'accordion'
});

Options:
{
	timeoutTime: 1000, //automatic hiding time in milliseconds
	animationDuration: 'fast', //the animation's speed
	activeClassName: 'active', //classname to be added to the element when showed
	hoverClassName: 'over', //classname to be added to the element when the mouse is over
	hideAll: true, //wheter or not to hide every other shown content
	handlerEvent: 'click', //which event on the handler element shows the content
	showHandler: 'slidedown', //the most important part. This specifies the showHandler. possible values: null/accordion/dropdown/slidedown
	handlerSelector: '.cv-handle', //selector for the handler element relative to the parent.
	contentSelector: '.cv-content' //selector for the content element relative to the parent.
}

### Changing the show handler runtime:
$(".accordion > li").customViewer('setShowHandler',['newhandler']);

### Changing the options runtime:
$(".accordion > li").customViewer('setOptions',[{option1: 'fdsfd', option2: 'fsdfds'}]);

### Writing your own handler:
$.customViewer.addShowHandler('accordion',function() {
	this.init = function(contentViewerInstance) {
		//mandatory function
		//called when the showHandler is set to the customViewer
		//contentViewerInstance: The main plugin, which controls the handler
		//contentViewerInstance.element -> the HTML element the plugin is applied to
		//contentViewerInstance.handler -> the handler HTML element
		//contentViewerInstance.content -> the content HTML element
		//contentViewerInstance.setActive(bool) -> sets the activeClassName and fire events
		//contentViewerInstance.hideAllConcurrent() -> hides the other instances if hidAll option is true
		//contentViewerInstance.setHideTimer() -> calls this showhandlers hide() function after options.timeoutTime
		//contentViewerInstance.clearHideTimer() -> cancels the hide timer.
		//contentViewerInstance.disableHide -> if set to true hiding is disabled (you must handle it in your showHandler)
		
	};

	this.hide = function() {
		//mandatory function
		//This function is called to show the content when hideAll is set to true
	};

	this.handlerHandled = function(){
		//mandatory function
		//This function is called when the handler element is handled
	}

	this.destory = function() {
		//called when the showHandler this is changed to an other one
		//you can change back everything here to the original state
	};

	//You can write also eventhandlers here for events on the handler or the content element
	//function name format: handler or content + mammal case event
	//e.g: this.handlerClick, this.handlerMouseOver, this.contentMouseOut...

});

### Custom events triggered on the plugin's target element
cutomviewer-handlerchanged: when the handler has been changed
cutomviewer-show: when the content is shown
cutomviewer-hide: when the content is hidden

