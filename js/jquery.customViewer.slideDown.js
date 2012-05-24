(function($){
	$customViewer.addShowHandler('slidedown', function() {
		this.init = function(cvInstance) {
			this.cvInstance = cvInstance;
		};

		this.show = function() {
			this.cvInstance.setActive(true);
			this.cvInstance.content.slideDown(this.cvInstance.options.animationDuration)

			this.cvInstance.clearHideTimer();
		};

		this.hide = function() {
			var This = this;
			if(!this.cvInstance.disableHide) {
				this.cvInstance.content.stop(true, true)
				.slideUp(this.cvInstance.options.animationDuration, function() {
					This.cvInstance.setActive(false);
				});
			}
		};

		this.handlerHandled = this.show;

		this.handlerMouseOut = function(){this.cvInstance.setHideTimer();}

		this.contentMouseOut = function(){this.cvInstance.setHideTimer()};

		this.contentMouseOver = function(){
			this.cvInstance.disableHide = true;
			this.cvInstance.clearHideTimer();
		};

	});
})(jQuery)