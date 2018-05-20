javascript:(function(){
  if (window.location.host !== 'www.messenger.com') return alert('this script is used on "www.messenger.com"');

  function addA(node){
  	if (node.querySelector('a')) return;
  	let re = /https?:\/\/[^\s]*/g;
  	node.innerHTML = node.innerHTML.replace(re, `<a href="$&" target="_blank" rel="noreferrer noopener">$&</a>`);
  }

  function addAs(){
    let http = document.querySelectorAll('div[aria-label="Messages"] div[id*=js_] div[aria-label*="http://"] span span');
    let https = document.querySelectorAll('div[aria-label="Messages"] div[id*=js_] div[aria-label*="https://"] span span');
    http.forEach(n => { addA(n); });
    https.forEach(n => { addA(n); });
  }

  setInterval(()=>{addAs()}, 1000);
})()