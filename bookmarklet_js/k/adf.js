javascript:(function(){
	document.querySelectorAll('a').forEach(a => {
		let re = /url=(.*)/;
		if (re.test(a.href)){
			try{
				a.href = atob(re.exec(a.href)[1]);
			}catch(e){}
		}
	});
})()