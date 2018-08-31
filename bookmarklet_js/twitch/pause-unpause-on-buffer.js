javascript:(function(){
  var button = document.querySelector('button[class="player-button qa-pause-play-button"]');
  var isBuffering = () => {return document.querySelector('.pl-loading-spinner')};
  var hasPlayIcon = () => {return document.querySelector('button[class="player-button player-button-play js-control-play-button"]')};
  setInterval(() => {
    if (isBuffering()){
      new Promise((resolve, reject) => {
        button.click();
        let i = setInterval(() => {
          if (hasPlayIcon()){
            clearInterval(i);
            resolve();
          }
        }, 100);
      })
      .then(() => {
        button.click()
      });
    }
  }, 1000);
})()