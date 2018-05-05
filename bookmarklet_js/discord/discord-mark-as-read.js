javascript:(function(){
	if (window.location.host !== 'discordapp.com') return alert('this script is used on "discordapp.com"');
	/*get token*/
	var guild = prompt("Enter server id of server to mark as read");
	if (!guild){return};

	var tempIFrame = document.body.appendChild(document.createElement`iframe`);
	var token = tempIFrame.contentWindow.localStorage.token.replace(/"/g, "");
	/*var guilds = JSON.parse(tempIFrame.contentWindow.localStorage.UserSettingsStore).guildPositions;
	var guildFrecency = JSON.parse(tempIFrame.contentWindow.localStorage.selectedChannelGuildFrecency);
	*/tempIFrame.remove();
	
	var interval = 10000;
	var url = `https://discordapp.com/api/v6/guilds/${guild}/ack`;

	setInterval(() => { 
		var http = new XMLHttpRequest();
		http.open("POST", url, true);
		http.setRequestHeader("Authorization", token);
		http.send()
	},interval);
	console.log(`Marking as read from ${guild} every ${interval/1000} seconds`);
})();