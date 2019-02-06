javascript:(function(){
	if (window.location.host !== 'discordapp.com') return alert('this script is used on "discordapp.com"');
	let getChatNode = function(){
		return document.querySelector('#app-mount > div.app-19_DXt.platform-web > div > div.layers-3iHuyZ.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.spacer-1fA9zc > div > div > div.flex-1xMQg5.flex-1O1GKY.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.base-3dtUhz > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.spacer-29U_x8.firefoxFixScrollFlex-cnI2ix > div.chat-3bRxxu.firefoxFixScrollFlex-cnI2ix > div.content-yTz4x3.firefoxFixScrollFlex-cnI2ix > div > div > div > div');
	};
	let flattenChat = function(chatContainer){
		let chat = chatContainer.querySelectorAll('div[class^=containerCozyBounded]');
		for (let i = 0; i < chat.length-1; i++){
			let first = chat[i];
			let second = chat[i+1];

			let headerFirst = first.children[0].children[0];
			let headerSecond = second.children[0].children[0];

			let aviFirst = headerFirst.querySelector('div[class^=image]').style.backgroundImage;
			let aviSecond = headerSecond.querySelector('div[class^=image]').style.backgroundImage;

			let nameFirst = headerFirst.querySelector('span[class^=username]').textContent;
			let nameSecond = headerSecond.querySelector('span[class^=username]').textContent;

			if (aviFirst === aviSecond && nameFirst === nameSecond){
				headerSecond.style.display = 'none';
				first.style.paddingBottom = 0;
				second.style.paddingTop = 0;
			}
		}
	};
	const config = { attributes: true, childList: true, subtree: true };
	let serverList = document.querySelector('#app-mount > div.app-19_DXt.platform-web > div > div.layers-3iHuyZ.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.spacer-1fA9zc > div > div > div.flex-1xMQg5.flex-1O1GKY.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.base-3dtUhz > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.spacer-29U_x8.firefoxFixScrollFlex-cnI2ix > div.channels-Ie2l6A.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr > div.flex-1xMQg5.flex-1O1GKY.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.container-PNkimc.firefoxFixScrollFlex-cnI2ix > div.scrollerWrap-2lJEkd.firefoxFixScrollFlex-cnI2ix.scrollerThemed-2oenus.themeGhostHairlineChannels-3G0x9_.scrollerFade-1Ijw5y > div');

	let urlChange = function(){
		let url = window.location.href;
		return function(mutationsList, observer) {
			for(let mutation of mutationsList) {
				if (window.location.href !== url){
					url = window.location.href;
					chatObserver.disconnect();
					let chat = getChatNode();
					flattenChat(chat);
					chatObserver.observe(chat, config);
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

	let chat = getChatNode();
	flattenChat(chat);
	let chatObserver = new MutationObserver(chatChange);
	chatObserver.observe(chat, config);

	let observer = new MutationObserver(urlChange());
	observer.observe(serverList, config);
})()
