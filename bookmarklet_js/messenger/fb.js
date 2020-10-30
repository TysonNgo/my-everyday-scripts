javascript:(function(){
	try{document.getElementById("isolate_msg").remove(); return;}catch(err){}
	var style = document.createElement("style");
	style.id = "isolate_msg";
	var css = document.createTextNode(`
		div[data-pagelet=page]{
			display:none;
		}
		div[data-pagelet=ChatTab] > div[data-visualcompletion=ignore-dynamic] > div{
			height: 100vh;
		}`);
	style.appendChild(css); document.getElementsByTagName("head")[0].appendChild(style);
})();
