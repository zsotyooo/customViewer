(function($){
	$.customViewer.addShowHandler('gridproductinfo', function() {
		this.init = function(cvInstance){
			this.cvInstance = cvInstance;
			this.originalTop = this.cvInstance.content.css('top');
		};
		
		this.destroy = function(){
			this.cvInstance.content.css('top', this.originalTop);
		};

		this.show = function(){
			this.cvInstance.setActive(true);
			this.cvInstance.content.animate({top: '50%'},this.cvInstance.options.animationDuration)
			this.cvInstance.clearHideTimer();
		};

		this.hide = function(){
			var This=this;
			if(!this.cvInstance.disableHide) {
				this.cvInstance.content.stop(true, true)
				.animate({top: '100%'},this.cvInstance.options.animationDuration,function(){
					This.cvInstance.setActive(false);
				});
			}
		};

		this.handlerHandled = this.show;

		this.handlerMouseOut = function(){this.cvInstance.setHideTimer()};

		this.contentMouseOver = function() {
			this.cvInstance.disableHide=true;
			this.cvInstance.clearHideTimer();
		};

	});
})(jQuery)