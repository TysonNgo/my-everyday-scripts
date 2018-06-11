javascript:(function(){ 
  if (window.location.host !== 'discordapp.com') return alert('this script is used on "discordapp.com"');
	try{
		document.getElementById("discord_left_nav").remove();
		document.getElementById("discord_left_nav_toggle").remove();
		return;}
	catch(err){}
	/* injected css */
	var style = document.createElement("style");
	style.id = "discord_left_nav";
	var channelClass = document.querySelectorAll("div[class^=channel]")[0].classList[0];
	var css = document.createTextNode(`
		.${channelClass}, .guilds-wrapper,
		.avatar-small, .guild, .guilds{ 
			transition: width 0.5s, height 0.5s, padding 0.5s, background-size 0.5s;
			transition-timing-function: ease-out;
		}
		.guild.unread .guild-inner{
			background:#8a8e94 !important;
		}
		.guild.unread .avatar-small{
			opacity: 0.5;
		}
		.guilds-wrapper .guilds{
			padding-left: 5px;
		}
		.guilds-wrapper:hover .guilds{
			padding-left: 10px;
		}
		.guilds-wrapper .guilds .guild .guild-inner a, .guilds-wrapper .guilds .guild{
			width: 20px; height: 20px;
		}
		.guilds-wrapper:hover .guilds .guild .guild-inner a, .guilds-wrapper:hover .guilds .guild{
			width: 50px; height: 50px;
		}
		.guilds-wrapper .guilds .guild .avatar-small{
			background-size: 100%;
		}
		.guilds-wrapper{
			width: 30px;
		}
		.guilds-wrapper:hover{
			width: 70px;
		}
		.${channelClass}{
			width: 30px;
		}
		.${channelClass}:hover{
			width: 240px;
		}
		.message-group-blocked, .divider > span{
			display: none; padding: 0;
		}
		.message-group{
			border: 0;
		}
		.chat .divider.divider-red > div{
			background: none;
		}
		.chat .new-messages-bar{
			display:none;
		}
		.message-group .image {
			max-width: 100%;
			height: auto;
		}`); style.appendChild(css);
	document.getElementsByTagName("head")[0].appendChild(style);
	/* button to toggle style */
	var toggle = document.createElement("button");
	toggle.onclick = function(){
		var s = document.getElementById(style.id);
		if (s){
			s.remove();
		} else {
			document.getElementsByTagName("head")[0].appendChild(style);
		}
	};
	toggle.onmouseover = function(){ this.style.opacity = 1; };
	toggle.onmouseout = function(){ this.style.opacity = 0; };
	toggle.id = "discord_left_nav_toggle";
	toggle.textContent = "⬅";
	toggle.style.position = "fixed";
	toggle.style.width = "35px";
	toggle.style.height = "35px";
	toggle.style.top = 0;
	toggle.style.left = 0;
	toggle.style.opacity = 0;
	toggle.style.zIndex = 100;
	document.body.insertBefore(toggle, document.body.childNodes[0]);
})();