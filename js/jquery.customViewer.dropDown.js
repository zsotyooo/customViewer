(function($){
	$customViewer.addShowHandler('dropdown', function(){
		this.init = function(cvInstance){
			this.cvInstance = cvInstance;
			this.originalPlace = this.cvInstance.content.parent();
			this.originalCss = {
				top: this.cvInstance.content.css('top'),
				left: this.cvInstance.content.css('left')
			};

			this.positionOut();
			this.cvInstance.content.detach().appendTo($('body')).show();
			this.isVisible = false;
			this.isHidden = true;
		};

		this.destroy = function(){
			this.cvInstance.content.css(this.originalCss);
			this.cvInstance.content.detach().appendTo(this.originalPlace);
		};

		this.positionOut = function() {
			this.cvInstance.content.css({
				'top': '0',
				'left': '-10000px'
			});
		}

		this.positionIn = function() {
			var offset=this.cvInstance.handler.offset();

			this.cvInstance.content.css({
				'top': (offset.top + this.cvInstance.handler.outerHeight(false)) + 'px',
				'left': offset.left + 'px'
			});
		}

		this.show = function() {
			if(this.isHidden) {
				this.isHidden = false;
				this.isVisible = true;
				this.cvInstance.setActive(true);
				this.positionIn();
				this.cvInstance.clearHideTimer();
			}
		};

		this.hide = function() {
			if(this.isVisible) {
				this.isVisible = false;
				this.isHidden = true;
				this.positionOut();
				this.cvInstance.setActive(false);
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