javascript:(function(){
	let iframes = document.querySelectorAll('iframe');
	
	for (let i = 0; i < iframes.length; i++){
		if (confirm(`Use this iframe? src="${iframes[i].src}"`)){
			src = iframes[i].src;
			window.open(src, '_blank');
			break;
		}
	}
})()
