javascript:(function(){
	if (window.location.host !== 'discordapp.com') return alert('this script is used on "discordapp.com"');
	/* injected css */
	var style = document.createElement("style");
	style.id = "discord_block_hider";
	/* the container for the guild channels */
	var css = document.createTextNode(`
		/* hides blocked messages */
			div[class^=messageGroupBlocked], div[class^=divider] > span{
				display: none; padding: 0;
			}
			hr[class^=divider],
			div[class^=divider] > div{
				display: none !important;
				background: none !important;
			}
		`); style.appendChild(css);
	document.getElementsByTagName("head")[0].appendChild(style);

	let getChatNode = function(){
		return document.querySelector('div[class^=scroller-][class*=messages]');
	};
	let flattenChat = function(chatContainer){
		let chat = chatContainer.querySelectorAll('div[class^=containerCozyBounded]');
		/* cozy mode */
		if (chat){
			for (let i = 0; i < chat.length-1; i++){
				let first = chat[i];
				let second = chat[i+1];

				let headerFirst = first.children[0].children[0];
				let headerSecond = second.children[0].children[0];

				let aviFirst = headerFirst.querySelector('div[class^=avatar] img').src;
				let aviSecond = headerSecond.querySelector('div[class^=avatar] img').src;

				let nameFirst = headerFirst.querySelector('span[class^=username]').textContent;
				let nameSecond = headerSecond.querySelector('span[class^=username]').textContent;

				if (aviFirst === aviSecond && nameFirst === nameSecond){
					headerSecond.style.display = 'none';
					first.style.paddingBottom = 0;
					second.style.paddingTop = 0;
				}
			}
		}
		chat = chatContainer.querySelectorAll('div[class^=containerCompactBounded]');
		/* compact mode */
		if (chat){
			for (let i = 0; i < chat.length-1; i++){
				/* TODO */
			}
		}
	};
	const config = { attributes: true, childList: true, subtree: true };
	let appRoot = document.querySelector('#app-mount');

	let urlChange = function(){
		let url = window.location.href;
		return function(mutationsList, observer) {
			for(let mutation of mutationsList) {
				if (window.location.href !== url){
					url = window.location.href;
					chatObserver.disconnect();
					let chat = getChatNode();
					if (chat){
						flattenChat(chat);
						chatObserver.observe(chat, config);
					}
				}
			}
		};
	};

	let chatChange = function(mutationsList, observer){
		let update = null;
		for(let mutation of mutationsList) {
			if (mutation.type == 'childList') {
				if (mutation.removedNodes.length) {continue}
				update = mutation;
			}
		}
		if (update){
			flattenChat(update.target);
		}
	};

	let chatObserver = new MutationObserver(chatChange);
	let chat = getChatNode();
	if (chat){
		flattenChat(chat);
		chatObserver.observe(chat, config);	
	}

	let observer = new MutationObserver(urlChange());
	observer.observe(appRoot, config);
})();
