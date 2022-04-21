javascript:(function(){
	const id = 'chat-event-hider';
	try{
		document.getElementById(id).remove();
		return;
	}
	catch(err){}

	var style = document.createElement('style');
	style.id =  id;

	var css = document.createTextNode(`
		/*div.InjectLayout-sc-588ddc-0.dizzGc > div > div.Layout-sc-nxg1ff-0*/
                section > div > div[class^=InjectLayout-] > div > div[class^=Layout-]{
			display:none;
		}`);
	style.appendChild(css);
	document.getElementsByTagName("head")[0].appendChild(style);
})()
