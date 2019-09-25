javascript:(function(){ 
  if (window.location.host !== 'discordapp.com') return alert('this script is used on "discordapp.com"');
	try{
		document.getElementById("discord_old_light_theme").remove();
		return;}
	catch(err){}
	/* injected css */
	var style = document.createElement("style");
	style.id = "discord_old_light_theme";
	/* the container for the guild channels */
	var css = document.createTextNode(`
		/* body username text weight */
		h2[class^=headerCozyMeta] span[class^=username]{
			font-weight: 500;
		}
		/* body text */
		div[class^=markup]{
			color: #747f8d;
			font-size: .9375rem;
			line-height: 1.3;
		}
		/* body text weight */
		div[class^=markup] *{
		    font-weight: 400;
		}

		/* channel nav background color */
		div[class^=base] > div > div[class^=sidebar],
		div[class^=base] > div > div[class^=sidebar] > div[class^=container],
		div[class^=privateChannels]{
		    background: #2f3136;
		}

		/* default icon color */
		div[class^=sidebar] svg > g,
		div[class^=sidebar] svg > path:not([class^=strikethrough]){
			color: #8e9297;
		}

		/* channel text */
			/* read channel text color */
			div[class^=iconVisibility] div[class^=name]{
				color: #8e9297;
			}
			/* channel hover text color */
			div[class^=containerDefault]:not([class*=selected]) div[class^=iconVisibility]:not([class*=modeUnread]):hover div[class^=name]{
				color: #dcddde;
			}
			/* unread channel text color */
			div[class*=modeUnread] > div > div[class^=name],
			/* unread channel hover text color */
			div[class*=modeUnread]:hover div[class^=name]{
				color: #fff;
			}
			/* muted channel text color */
			div[class*=modeMuted] > div > div[class^=name],
			/* muted channel # symbol color */
			div[class*=modeMuted] > div > svg > path{
				color: #4f545c;
				fill: #4f545c !important;
			}
			/* selected channel text color */
			div[class*=modeSelected] > div > div[class^=name],
			div[class*=modeSelected]:hover div[class^=name],
			/* server name text color */
			header > h1[class^=name],
			header > svg > g{
			    color: #fff;
			}

		/* server nav background color */
		div[class^=wrapper][class^=guilds],
		div[class^=wrapper] > div[class^=scrollerWrap],
		/* search bar background color in /activity */
		div[class^=privateChannels] div[class^=searchBarComponent]{
		    background: #202225;
		}
		/* search bar text color in /activity */
		div[class^=privateChannels] input{
			color: #b9bbbe;
		}

		/* panel at the bottom of the channel nav */
			/* background color */
			div[class^=sidebar] > div[class^=panels]{
			    background: rgba(32,34,37,.3);
			}
			/* username discriminator number color */
			div[class^=sidebar] > div[class^=panels] div[class^=container] div[class*=subtext]{
				color: #8e9297;
				fill: #8e9297 !important;
			}
			/* username text color */
			div[class^=sidebar] > div[class^=panels] div[class^=container] div[class*=usernameContainer] > div{
				color: #fff;
			}

		/* default server icon color */
		div[class^=blobContainer] > div > svg > foreignObject > a > div,
		/* folder icon color */
		div > svg > foreignObject > div[class^=folder],
		span[class^=expandedFolderBackground]{
			color: #b9bbbe;
		    background: #2f3136;
		}
		/* add server, server discovery, download apps button color*/
		div[class^=circleButtonMask]:not(:hover) > svg > foreignObject > div[class^=circleIconButton]{
		    background: #2f3136;
		}

		/* folder icon hover color */
		div[class^=wrapper]:hover > svg > foreignObject > div[class^=folder],
		div[class^=wrapper]:hover > span[class^=expandedFolderBackground]{
			background: #40444b;
		}

		/* unread markers */
		div[class^=listItem] > div[class^=pill] > span,
		div[class^=sidebar] > div[class^=container] > div[class^=scrollerWrap] div[class^=unread]{
			background: #fff;
		}

		/* Discord icon on top-left color */
		foreignObject > a[aria-label=Home] > div[class^=childWrapper],
		svg[name="Nova_Discord"] path{
		    background: #2f3136;
			color: #fff;
			fill: #fff;
		}

		/* /activity selected text color */
		div[class^=privateChannels] a[class*=selected] div[class^=name],
		div[class^=privateChannels] a[class^=channel]:hover div[class^=name]{
			color: #fff;
		}

		/* /activity hover highlighting */
		div[class^=privateChannels] a[class^=channel]:not([class*=selected]):hover div[class^=layout],
		/* channel hover highlighting */
		div[class^=containerDefault]:not([class*=selected]) div[class^=iconVisibility]:hover div[class^=content]{
			background: #292b2f;
		}
		`); style.appendChild(css);
	document.getElementsByTagName("head")[0].appendChild(style);
})();
