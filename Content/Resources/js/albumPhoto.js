$(function() {
// if the function argument is given to overlay, it is assumed to be the onBeforeLoad event listener
	$("a.btnAlbumPhoto[rel]").overlay({
		mask: '#999',	
		effect: 'apple', 
		onBeforeLoad: function() {
		// grab wrapper element inside content
			var wrap = this.getOverlay().find(".contentWrap");
		// load the page specified in the trigger
			wrap.load(this.getTrigger().attr("href"), function(){
				$("div.scrollable").scrollable();
				$("div.items img").click(function() {
					// see if same thumb is being clicked
					if ($(this).hasClass("active")) { return; }
					// calclulate large image's path based on the thumbnail path
					var path = $(this).attr("src").replace("_t", "");
					// get handle to element that wraps the image and make it semi-transparent
					var wrap = $("div.image_wrap").fadeTo("fast", 0.5);
					//Create the large image
					var img = new Image();
					// call this function after it's loaded
					img.onload = function() {
						// make wrapper fully visible
						wrap.fadeTo("fast", 1);
						// change the image
						wrap.find("img").attr("src", path);
					};
					img.src = path;
					// activate item
					$("div.items img").removeClass("active");
					$(this).addClass("active");
					// when page loads simulate a "click" on the first image
				}).filter(":first").click();		
			});
		}
	});
});