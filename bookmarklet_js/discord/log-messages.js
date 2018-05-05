javascript:(function(){
  if (window.location.host !== 'discordapp.com') return alert('this script is used on "discordapp.com"');
	let mo;
	let config = { attributes: true, childList: true };
	let i = 0;

	let url = '';

	function logMsgs(comments){
	  comments.forEach(c => {
	    let msgs = [];
	    c.querySelectorAll('.markup').forEach(m => {msgs.push(m.innerHTML); i++});
	    if (i > 500){
	      console.clear();
	      i = 0;
	    }
	    setTimeout(() => {
	      console.log(
	        `[${c.querySelector('.user-name').innerHTML}] ${c.querySelector('.timestamp').innerHTML}\n`+
	        `-`.repeat(15)+'\n'+ 
	        `${msgs.join('\n')}`+'\n\n'
	      )
	    }, 1000);
	  })
	}

	setInterval(() => {
	  if (url !== window.location.href){
	    url = window.location.href;
	    let msgs = document.querySelector('.messages');
	    logMsgs(msgs.querySelectorAll('.comment'));

	    if (mo) {mo.disconnect();}
	    mo = new MutationObserver(mlist => {
	      let comments = mlist[0].target.querySelectorAll('.comment');
	      logMsgs(comments);
	    });
	    mo.observe(msgs, config);
	  }
	}, 1000);
})()