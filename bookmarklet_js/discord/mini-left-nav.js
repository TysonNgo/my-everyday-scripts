javascript:(function(){ 
  if (window.location.host !== 'discord.com') return alert('this script is used on "discordapp.com"');
	try{
		document.getElementById("discord_left_nav").remove();
		document.getElementById("discord_left_nav_toggle").remove();
		return;}
	catch(err){}
	/* injected css */
	var style = document.createElement("style");
	style.id = "discord_left_nav";
	/* the container for the guild channels */
	var css = document.createTextNode(`
		/*
		  shrinking/growing animation for left nav elements
		  - channel container
		  - guild container
		  - guild images
		*/
			/* channels */
			div[class^=channels-],
			/* guilds */
			div[class^=directionColumn] > div > div[class^=flex] > nav[class^=wrapper-],
			nav[class^=wrapper-][class^=guilds],
			nav[class^=wrapper-] > div[class^=scrollerWrap-],
			nav[class^=wrapper-] > div[class^=scrollerWrap-] > div > div[class^=container-],
			nav[class^=wrapper-] > div[class^=scrollerWrap-] > div > div[class^=container-] a,
			div[class^=icon],
			div[class^=sidebar],
			div[class^=base],
			div[class^=guild]{
				transition: left 0.5s, width 0.5s, height 0.5s, padding 0.5s, margin 0.5s, background-size 0.5s;
				transition-timing-function: ease-out;
			}

		/* change guild container padding */
			nav[class^=wrapper-] > div[class^=scrollerWrap-] > div[class^=scroller-]{
				padding-left: 5px;
			}
			nav[class^=wrapper-] > div[class^=scrollerWrap-] > div[class^=scroller-]:hover{
				padding-left: 10px;
			}

		/* changes guild icon size */
			/* unread guild icon becomes white so it is more visible when the nav is small */
			nav[class^=wrapper-] > div[class^=scrollerWrap-] div[class^=listItem] div[class^=pill] span[style*="opacity: 0.7;"]{
				background:#8a8e94 !important;
				opcaity: 0.5 !important;
			}
			nav[class^=wrapper-] > div[class^=scrollerWrap-] div[class^=listItem] div[class^=pill],
			nav[class^=wrapper-] > div[class^=scrollerWrap-] div[class^=listItem] div[class^=pill] span[style*="opacity: 0.7;"]{
				width:100%;
				height:100% !important;
				z-index: 1;
				padding-left: 1px;
				border-radius: 50%;
			}
			nav[class^=wrapper-] > div[class^=scrollerWrap-] div[class^=listItem]:hover div[class^=pill]{
				z-index:-1;
				width:0;
				height:0;
				pointer-events:none;
			}

			span[class^=expandedFolderBackground] + div div[class^=wrapper],
			nav[class^=wrapper-] > div[class^=scrollerWrap-] div[class^=listItem]:not(:nth-child(2)),
			nav[class^=wrapper-] > div[class^=scrollerWrap-] div[class^=listItem] > div[class^=blob] > div[class^=wrapper],
			nav[class^=wrapper-] > div[class^=scrollerWrap-] div[class^=listItem] > div[class^=blob] svg{
				width: 20px !important;
				height: 20px !important;
			}

			nav[class^=wrapper-] > div[class^=scrollerWrap-]:hover span[class^=expandedFolderBackground] + div div[class^=wrapper],
			nav[class^=wrapper-] > div[class^=scrollerWrap-]:hover div[class^=listItem]:not(:nth-child(2)),
			nav[class^=wrapper-] > div[class^=scrollerWrap-]:hover div[class^=listItem] > div[class^=blob] > div[class^=wrapper],
			nav[class^=wrapper-] > div[class^=scrollerWrap-]:hover div[class^=listItem] > div[class^=blob] svg{
				width: 48px !important;
				height: 48px !important;
			}

			/* ping number */
			nav[class^=wrapper-] > div[class^=scrollerWrap-] div[class^=listItem] div[class^=lowerBadge]{
				position: relative;
			}
			nav[class^=wrapper-] > div[class^=scrollerWrap-]:hover div[class^=listItem] div[class^=lowerBadge]{
				position: absolute;
			}

		/* left nav resizers */
			/* guilds container */
				div > div[class^=flex] > nav[class^=wrapper-],
				nav[class^=wrapper-] > div[class^=scrollerWrap-],
				nav[class^=wrapper-]{
					width: 30px;
					z-index: 1001;
				}
				div > div[class^=flex] > nav[class^=wrapper-]:hover,
				nav[class^=wrapper-] > div[class^=scrollerWrap-]:hover,
				nav[class^=wrapper-]:hover{
					width: 70px;
					margin-right: -40px;
				}
			/* channels container */
				nav[class^=wrapper-][class^=guilds],
				div[class^=base]{
					left: 30px;
				}
				nav[class^=wrapper-][class^=guilds]:hover,
				div[class^=wrapper]:hover + div[class^=base]{
					left: 70px;
				}
				div[class^=sidebar]{
					width: 30px;
					opacity: 0.93;
					z-index: 1000;
				}
				div[class^=sidebar]:hover{
					width: 240px;
					margin-right: -210px;
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
	toggle.style.zIndex = 10000;
	document.body.insertBefore(toggle, document.body.childNodes[0]);
})();
