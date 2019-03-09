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
			div[class^=directionColumn] > div > div[class^=flex] > div[class^=wrapper-],
			div[class^=wrapper-] > div[class^=scrollerWrap-],
			div[class^=wrapper-] > div[class^=scrollerWrap-] > div > div[class^=container-],
			div[class^=wrapper-] > div[class^=scrollerWrap-] > div > div[class^=container-] a,
			div[class^=icon],
			div[class^=guild]{
				transition: width 0.5s, height 0.5s, padding 0.5s, margin 0.5s, background-size 0.5s;
				transition-timing-function: ease-out;
			}

		/* unread guild icon becomes white so it is more visible when the nav is small */
			div[class*=unread] div[class^=wrapper-]:first-child{
				background:#8a8e94 !important;
			}
			div[class*=unread] a{
				opacity: 0.5;
			}
		/* change guild container padding */
			div[class^=wrapper-] > div[class^=scrollerWrap-] > div[class^=scroller-]{
				padding-left: 5px;
			}
			div[class^=wrapper-] > div[class^=scrollerWrap-] > div[class^=scroller-]:hover{
				padding-left: 10px;
			}

		/* changes guild icon size */
			div[class^=wrapper-] > div[class^=scrollerWrap-] > div[class^=scroller-] div[class^=container],
			div[class^=wrapper-] > div[class^=scrollerWrap-] > div[class^=scroller-] div[class^=container] a,
			div[class^=wrapper-] > div[class^=scrollerWrap-] > div[class^=scroller-] div[class^=container] a div[class^=icon],
			div[class^=wrapper-] > div[class^=scrollerWrap-] > div[class^=scroller-] div[class^=container] div[class*=homeButton]{
				width: 20px; height: 20px;
			}

			div[class^=wrapper-] > div[class^=scrollerWrap-]:hover > div[class^=scroller-] div[class^=container],
			div[class^=wrapper-] > div[class^=scrollerWrap-]:hover > div[class^=scroller-] div[class^=container] a,
			div[class^=wrapper-] > div[class^=scrollerWrap-]:hover > div[class^=scroller-] div[class^=container] a div[class^=icon],
			div[class^=wrapper-] > div[class^=scrollerWrap-]:hover > div[class^=scroller-] div[class^=container] div[class*=homeButton]{
				width: 50px; height: 50px;
			}

		/* fits guild icon image */
			.guilds-wrapper .guilds .guild .guild-icon{
				background-size: 100%;
			}

		/* left nav resizers */
			/* guilds container */
				div > div[class^=flex] > div[class^=wrapper-],
				div[class^=wrapper-] > div[class^=scrollerWrap-]{
					width: 30px;
					z-index: 1001;
				}
				div > div[class^=flex] > div[class^=wrapper-]:hover,
				div[class^=wrapper-] > div[class^=scrollerWrap-]:hover{
					width: 70px;
					margin-right: -40px;
				}
			/* channels container */
				div[class^=channels-]{
					width: 30px;
					opacity: 0.93;
					z-index: 1000;
				}
				div[class^=channels-]:hover{
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
			hr[class^=divider],
			div[class^=divider] > div{
				display: none !important;
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
	toggle.style.zIndex = 10000;
	document.body.insertBefore(toggle, document.body.childNodes[0]);
})();
