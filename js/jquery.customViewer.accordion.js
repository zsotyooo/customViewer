(function($){
	$customViewer.addShowHandler('accordion',function() {
		this.init = function(cvInstance) {
			this.cvInstance = cvInstance;
			this.originalHeight = this.cvInstance.content.height();
			this.cvInstance.content.hide().css('height',0);
			this.isVisible = false;
			this.isHidden = true;
		};
		
		this.destory = function() {
			alert('d'+this.originalHeight);
			this.cvInstance.content.css('height',this.originalHeight);
		};

		this.show = function() {
			var This = this;
			if(This.isHidden) {
				This.isHidden = false;
				this.cvInstance.setActive(true);
				this.cvInstance.content.show().animate({height: This.originalHeight}, this.cvInstance.options.animationDuration, function(){
					This.isVisible = true;
				});
			}
		};

		this.hide = function(){
			var This = this;
			if(this.isVisible) {
				this.isVisible = false;
				this.cvInstance.setActive (false);
				this.cvInstance.content.stop(true, true)
				.animate({height: 0},this.cvInstance.options.animationDuration, function(){
					This.cvInstance.setActive(false);
					This.cvInstance.content.hide();
					This.isHidden = true;
				});
			}
		};

		this.handlerHandled = function(){
			if(this.isHidden) {
				this.show();
				this.cvInstance.hideAllConcurrent();
			}
			else if(this.isVisible) {
				this.hide();
			}
		}

	});
})(jQuery)