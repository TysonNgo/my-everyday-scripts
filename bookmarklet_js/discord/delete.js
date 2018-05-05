javascript:(function(){
	if (window.location.host !== 'discordapp.com') return alert('this script is used on "discordapp.com"');
  function request(method, url){
  	let tempIFrame = document.body.appendChild(document.createElement`iframe`);
  	let token = tempIFrame.contentWindow.localStorage.token.replace(/"/g, "");
  	tempIFrame.remove();

  	let xhr = new XMLHttpRequest();
  	xhr.open(method, url, false);
  	xhr.setRequestHeader('Authorization', token);
  	xhr.send();

  	return xhr;
  }

  function fetchMessagesFrom(channelID){
  	let xhr = new XMLHttpRequest();
  	let req = request('get', `https://discordapp.com/api/v6/channels/${channelID}/messages?limit=100`);

  	return JSON.parse(req.response);
  }

  function fetchMessages(){
  	let channelID = /(\d+)$/.exec(window.location.pathname)[1];
  	return fetchMessagesFrom(channelID);
  }

  function deleteMessage(channelID, messageID){
  	let xhr = new XMLHttpRequest();
  	request('delete', `https://discordapp.com/api/v6/channels/${channelID}/messages/${messageID}`);
  }

  function main(){
  	let messages = fetchMessages();

  	if (!messages.length){return;}

  	if (confirm(`Is the channel '${messages[0].channel_id}'' correct?`)){
  		let messageID = prompt('Enter the message id to delete up to');
  		if (messages.findIndex(m => m.id === messageID) === -1){
  			if (!confirm(`${messageID} is not among the 100 most recent messages, do you want to continue?`)){return;}
  		}
  		if (!confirm(`The first message is\n${messages[0].author.username}:${messages[0].content}\n\ncontinue?`)) return;
  		for (let i=0; i<messages.length; i++){
  			setTimeout(() => deleteMessage(messages[i].channel_id, messages[i].id), i*500);
  			if (messages[i].id === messageID) return;
  		}
  	}
  }
  main();
})();