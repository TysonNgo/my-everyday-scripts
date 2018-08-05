javascript:(function(){
	/* temp bookmarklet to be used until twitch reimplements the toggle for collapsing the side nav again */
	var sideNav = document.querySelector('.side-nav.tw-flex-shrink-0.tw-full-height.tw-relative');
	var button = document.createElement('button');
	button.innerText = '▶';
	button.style.position = 'absolute';
	button.style.right = '-1em';
	button.style.top = 0;
	button.style.zIndex = 1000;
	button.onclick = function(){
		sideNav.style.width = sideNav.style.width ? '' : 0;
		sideNav.focus();
	};
	button.id = 'button-qweasdzxc';
	var style = document.createElement('style');
	style.innerText = '#button-qweasdzxc:focus{outline:0;}';
	sideNav.appendChild(style);
	sideNav.appendChild(button);
})()
