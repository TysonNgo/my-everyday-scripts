javascript:(function(){ 
  if (window.location.host !== 'discord.com') return alert('this script is used on "discordapp.com"');
	try{
		document.getElementById("discord_scroll_thumb").remove();
		return;}
	catch(err){}
	/* injected css */
	var style = document.createElement("style");
	style.id = "discord_scroll_thumb";
	/* the container for the guild channels */
	var css = document.createTextNode(`
		*::-webkit-scrollbar-thumb{
			display: none;
		}
		*::-webkit-scrollbar-thumb:hover{
			display: inline;
		}
		`); style.appendChild(css);
	document.getElementsByTagName("head")[0].appendChild(style);
})();
