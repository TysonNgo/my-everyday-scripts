javascript:(function(){
	document.querySelectorAll(".side-nav")[0].remove();
	document.querySelectorAll(".top-nav")[0].remove();
	document.querySelectorAll(".channel-header")[0].remove();
	document.querySelectorAll(".tw-pd-t-2")[0].setAttribute("style", "padding: 0 !important;");
	document.querySelectorAll(".video-chat__input")[0].remove();
	var chat = document.querySelectorAll(".video-chat__message-list-wrapper")[0];
	document.querySelectorAll(".tw-pd-t-2")[0].prepend(chat);
	chat.style.maxHeight = "200px";
	chat.style.minHeight = "200px";
})()