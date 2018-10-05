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
	/* the container for the guild channels */
	var channelClass = document.querySelector("div[class^=channel]").classList[0];
	var guildsWrapper = document.querySelector("div[class^=guildsWrapper]").classList[0];
	var guildInner = document.querySelector("div[class^=guildInner]").classList[0];
	var css = document.createTextNode(`
		/*
		  shrinking/growing animation for left nav elements
		  - channel container
		  - guild container
		  - guild images
		*/
			.${channelClass},
			.${guildsWrapper},
			.${guildInner} a,
			div[class^=icon],
			div[class^=guild]{
				transition: width 0.5s, height 0.5s, padding 0.5s, margin 0.5s, background-size 0.5s;
				transition-timing-function: ease-out;
			}

		/* unread guild icon becomes white so it is more visible when the nav is small */
			div[class*=unread] .${guildInner}{
				background:#8a8e94 !important;
			}
			div[class*=unread] a{
				opacity: 0.5;
			}

		/* change guild container padding */
			.${guildsWrapper} div[class^=guilds]{
				padding-left: 5px;
			}
			.${guildsWrapper}:hover div[class^=guilds]{
				padding-left: 10px;
			}

		/* changes guild icon size */
			div[class^=guild-] .${guildInner} a,
			.${guildInner} a div[class^=icon],
			div[class^=guild-]{
				width: 20px; height: 20px;
			}
			.${guildsWrapper}:hover .${guildInner} a,
			.${guildsWrapper}:hover .${guildInner} a div[class^=icon],
			.${guildsWrapper}:hover div[class^=guild-]{
				width: 50px; height: 50px;
			}

		/* fits guild icon image */
			.guilds-wrapper .guilds .guild .guild-icon{
				background-size: 100%;
			}

		/* left nav resizers */
			/* guilds container */
				.${guildsWrapper}{
					width: 30px;
				}
				.${guildsWrapper}:hover{
					width: 70px;
				}
			/* channels container */
				.${channelClass}{
					width: 30px;
					opacity: 0.93;
					z-index: 1000;
				}
				.${channelClass}:hover{
					width: 240px;
					margin-right: -210px;
				}

		/* hides blocked messages */
			div[class^=messageGroupBlocked], div[class^=divider] > span{
				display: none; padding: 0;
			}
			.message-group{
				border: 0;
			}
			div[class^=divider] > div{
				background: none !important;
			}

		/* removes N messages unread notif */
			div[class^=newMessagesBar]{
				display:none;
			}

		/* more responsive image embed */
			a[class^=imageWrapper],
			a[class^=imageWrapper] img,
			div[class^=containerCozy] div[class^=embed]{
				max-width: 100% !important;
			}
			a[class^=imageWrapper] img{
				height: auto !important;
			}

		`); style.appendChild(css);
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
