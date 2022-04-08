javascript:(function(){
	var username = prompt('Enter Twitch Username: ');
	if (username){
		var url = `https://player.twitch.tv/?channel=${username}&parent=twitch.tv&player=popout&quality=360p30`;
		location.href = url;
	}
})()