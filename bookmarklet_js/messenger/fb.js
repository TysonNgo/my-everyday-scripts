javascript:(function(){
	try{document.getElementById("isolate_msg").remove(); return;}catch(err){}
	var style = document.createElement("style");
	style.id = "isolate_msg";
	var css = document.createTextNode(`
		#globalContainer, #pagelet_bluebar{
			display:none;
		}
		#js_h2, ._1ia._2sz2{
			height: 100vh;
		}`);
	style.appendChild(css); document.getElementsByTagName("head")[0].appendChild(style);
})();