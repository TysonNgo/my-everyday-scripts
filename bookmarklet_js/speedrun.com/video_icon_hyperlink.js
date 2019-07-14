javascript:(function(){
	document.querySelectorAll('tr').forEach(tr => {
		let src = tr.dataset.target;
		let icon = tr.querySelector('i[class*=fa-video]');
		if (icon){
			icon.outerHTML = `<a href="${src}">${icon.outerHTML}</a>`;
		}
	})
})();