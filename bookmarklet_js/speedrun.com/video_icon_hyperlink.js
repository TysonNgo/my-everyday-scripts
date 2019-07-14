javascript:(function(){
	document.querySelectorAll('tr[class^=linked]').forEach(tr => {
		let src = tr.dataset.target;
		let icon = tr.querySelector('i[class*=fa-video]');
		icon.outerHTML = `<a href="${src}">${icon.outerHTML}</a>`;
	})
})();