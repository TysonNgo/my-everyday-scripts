javascript:(function(){
	try{document.getElementById("bm_messenger").remove(); return;}catch(err){}
	var style = document.createElement("style");
	style.id = "bm_messenger";
	var css = document.createTextNode(`
		._4sp8{
			min-width:0;
		}
		._1enh, ._4_j5{
			display:none;
		}`);
	style.appendChild(css); document.getElementsByTagName("head")[0].appendChild(style);
})();