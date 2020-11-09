import re
from glob import glob

files = glob('./*.js')

scripts = []

for file in files:
	with open(file) as f:
		scripts.append(f.read())

for i in range(len(scripts)):
	function = '(function(discord){'+re.match('^.*\(function\(\){([\s\S]*)\)\(\).*$', scripts[i]).group(1)+')(discord)'
	#function = function.replace('window', 'discord.window')
	function = function.replace('document', 'discord.document')
	scripts[i] = function

js = """javascript:(function(){
	let discord = window.open('https://discord.com/app', '', 'width=320,height=480');
	setTimeout(()=>{
	window.document.head.innerHTML = '';
	window.document.body.innerHTML = '';
	window.addEventListener('beforeunload', ()=>{discord.close();});
	MINI_LEFT_NAV_FUNCTION();
	}, 5000);
})();""".replace('MINI_LEFT_NAV_FUNCTION()', ';'.join(scripts))

print js
