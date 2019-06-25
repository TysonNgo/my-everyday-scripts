javascript:(function(){
	/* adds hot keys for skipping 5/60 seconds ahead and behind */
	document.querySelectorAll('video').forEach(v => {
		window.addEventListener('keydown', e => {
			skip = e.shiftKey ? 60 : 5;
			switch(e.key){
				case 'ArrowLeft':
					v.currentTime -= skip;
					break;
				case 'ArrowRight':
					v.currentTime += skip;
					break;
			}
		});
	});
})();