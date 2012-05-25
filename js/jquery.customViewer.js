/*
 *	@author: Zsolt Molnar
 *	@description:
 *
 */

(function($){
	$.fn.customViewer=function(options, params)
	{
		var ret = [];
		$(this).each(
			function(elementIndex)
			{
				if(typeof options == 'string') {
					var func = options;
					var inst = $customViewer.instances[parseInt($(this).attr('data-customviewerinstance'))];
					inst[func].apply(inst, params);
				} else {
					new $customViewer(elementIndex,this,options);
				}
			}
		);
		return ret ? ret : $(this);
	}

	$.customViewer=function(elementIndex,element,options)
	{
		this.instanceID=$customViewer.instanceCnt;
		$customViewer.instances.push(this);
		$customViewer.instanceCnt++;

		this.element=$(element);
		this.element.attr('data-customviewerinstance', this.instanceID);

		if(options == undefined)options={};
		this.options={};
		$.extend(
			this.options,
			$customViewer.defaultOptions,
			options
		);
		this.content = $(this.options.contentSelector, this.element);
		
		this.handler = this.options.handlerSelector ? $(this.options.handlerSelector, this.element) : this.element;
		
		var This=this;
		
		if(this.content.length>0)
		{
			this.content.bind('mouseover', function(){
				This.element.addClass(This.options.hoverClassName);
			}).bind('mouseout', function(){
				This.element.removeClass(This.options.hoverClassName);
			});

			this.disableHide=false;
			this.hideTimer=null;
			this.setShowHandler(this.options.showHandler);

			this.addEvents();
		}
	}


	$customViewer=$.customViewer;
	$customViewer.fn = $customViewer.prototype={};

	$customViewer.fn.extend = $customViewer.extend = $.extend;

	$customViewer.extend(
	{
		defaultOptions: {
			timeoutTime: 1000,
			animationDuration: 'fast',
			activeClassName: 'active',
			hoverClassName: 'over',
			hideAll: true,
			handlerEvent: 'click',
			showHandler: 'slidedown',
			handlerSelector: '.cv-handle',
			contentSelector: '.cv-content'
		},
		instances:[],
		instanceCnt: 0,
		customViewerShowHandlers:[],

		addShowHandler: function(name, func) {
			$customViewer.customViewerShowHandlers[name] = func;
		}
	});
	
	$customViewer.fn.extend({
		setOptions: function(options){
			$.extend(this.options, options || {});
		},
		
		addEvents: function() {
			var This=this;
			
			$(this.handler)
			.bind(this.options.handlerEvent, function(e){
				if(typeof This.showHandler.handlerHandled != 'undefined')This.showHandler.handlerHandled(e);
			});
			
			$.each(['Click','MouseOver','MouseOut','MouseLeave','MouseMove'],function(i, val){
				$(This.handler).bind(val.toLowerCase(), function(e) {
					if(typeof This.showHandler['handler'+val] != 'undefined'){
						This.showHandler['handler'+val](e);
					}
				});
				$(This.content).bind(val.toLowerCase(), function(e) {
					if(typeof This.showHandler['content'+val] != 'undefined'){
						This.showHandler['content'+val](e);
					}
				});
			});

		},
		
		setShowHandler: function(method){
			if(this.showHandler && typeof this.showHandler.destroy != 'undefined'){
				this.showHandler.destroy();
			}
			this.showHandler = new $customViewer.customViewerShowHandlers[method];
			this.showHandler.init(this);
			this.element.trigger('cutomviewer-handlerchanged');
		},
		
		getShowHandler: function() {
			return this.showHandler;
		},
		
		hideAllConcurrent: function() {
			var This=this;
			if(This.options.hideAll) {
				$.each($customViewer.instances,function(i)
				{
					if(This.instanceID!=i)
					{
						$customViewer.instances[i].disableHide=false;
						$customViewer.instances[i].showHandler.hide();
					}
				});
			}
		},
		
		setHideTimer: function() {
			var This = this;
			this.disableHide=false;
			this.hideTimer = setTimeout(function(){
				This.hideAllConcurrent();
				This.showHandler.hide();
			},this.options.timeoutTime);
		},
		
		clearHideTimer: function() {
			if(this.hideTimer)clearTimeout(this.hideTimer);
		},
		
		setActive: function(setTo) {
			if(setTo){
				this.element.addClass(this.options.activeClassName);
				this.element.trigger('cutomviewer-show');
			} else {
				this.element.removeClass(this.options.activeClassName);
				this.element.trigger('cutomviewer-hide');
			}
		}

	});
	
	//Adding default showhandler
	
	$customViewer.addShowHandler('null', function(){
		this.init = function(cvInstance){
		};
	
		this.show = function(){
		};
		
		this.hide = function(){
		};
		
	});
	

	
})(jQuery)
