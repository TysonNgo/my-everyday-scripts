javascript:(function(){
	let url = window.location.href;
	let orig = /s\/(.*)$/.exec(url)[1];
	if (orig){
		orig = 'http://'+orig.replace(/amp/g, '');
		window.location.href = orig;
	}
})();