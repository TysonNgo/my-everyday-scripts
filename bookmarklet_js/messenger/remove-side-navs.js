javascript:(function(){
	try{document.getElementById("bm_messenger").remove(); return;}catch(err){}
	var style = document.createElement("style");
	style.id = "bm_messenger";
	var css = document.createTextNode(`
		div[role=main] > div > div > div > div > div div[class="rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t g5gj957u f4tghd1a ifue306u kuivcneq t63ysoy8"]{
			display:none;
                }
                div[role=navigation]{
                        width: 30px !important;
                }                                                
                `);
	style.appendChild(css); document.getElementsByTagName("head")[0].appendChild(style);
})();
