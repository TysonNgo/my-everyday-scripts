javascript:(function(){
	var tempIFrame = document.body.appendChild(document.createElement`iframe`);
	var token = tempIFrame.contentWindow.localStorage.token.replace(/"/g, "");
	tempIFrame.remove();

	var msg = {
		embed: {
			color: parseInt(Math.random().toString(16).substr(2, 6), 16),
			description: prompt('Message: '),
		    footer: {
		      icon_url: "https://cdn.discordapp.com/emojis/422822753268400128.gif?v=1",
		      text: "\u200B"
		    },
		    author: {
		      name: "\u200B",
		      icon_url: "https://cdn.discordapp.com/emojis/422822753268400128.gif?v=1"
		    },
		    thumbnail: {
		      url: "https://cdn.discordapp.com/emojis/422822753268400128.gif?v=1"
		    }
		}
	};

	if (!msg.embed.description) return;

	var xhr = new XMLHttpRequest();
	xhr.open('POST', `https://discordapp.com/api/v6/channels/${window.location.pathname.split('/').pop()}/messages`);
	xhr.setRequestHeader("content-type", "application/json");
	xhr.setRequestHeader("authorization", token);
	xhr.send(JSON.stringify(msg));
})()