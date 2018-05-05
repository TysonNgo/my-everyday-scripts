javascript:(function(){
	if (window.location.host !== 'discordapp.com') return alert('this script is used on "discordapp.com"');
	try{document.getElementById("perma-icon").remove(); return;}catch(err){}
    var link = document.createElement("link");
    link.id = "perma-icon";
    link.rel = "icon";
    link.href= "https://discordapp.com/assets/07dca80a102d4149e9736d4b162cff6f.ico";
    link.type = "image/png";
    document.getElementsByTagName("head")[0].appendChild(link);
})();
