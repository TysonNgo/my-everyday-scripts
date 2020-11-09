javascript:(function(){ 
  if (window.location.host !== 'discord.com') return alert('this script is used on "discord.com"');
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

		/* changes guild icon size */
			/* adjust divider spacing */
			nav[class^=wrapper-] div[class^=scroller-] div[class^=tutorialContainer-] + div[class^=listItem-]{
				margin: -10px;
			}
			nav[class^=wrapper-] div[class^=scroller-]:hover div[class^=tutorialContainer-] + div[class^=listItem-]{
				margin: auto;
			}

			/* adjust server icon size */
			nav[class^=wrapper-] div[class^=scroller-] div[class^=listItem-]{
				height: 20px !important;
			}
			nav[class^=wrapper-] div[class^=scroller-]:hover div[class^=listItem-]{
				height: auto !important;
			}
			nav[class^=wrapper-] div[class^=scroller-] div[class^=listItem-] svg[class=svg-1X37T1]{
				width: 20px !important;
			}
			nav[class^=wrapper-] div[class^=scroller-]:hover div[class^=listItem-] svg[class=svg-1X37T1]{
				width: 48px !important;
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
