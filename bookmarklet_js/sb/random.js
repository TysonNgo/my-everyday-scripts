javascript:(function(){
  setInterval(() => {
    let canBet = !document.getElementById('player1').disabled;
    let hasBet = document.getElementById('lastbet').textContent === '✓';
    let player = (Math.floor(Math.random()*2)+1);

    if (!hasBet && canBet){
      if (document.getElementById('balance').classList.contains('purpletext')){
        document.getElementById('wager').value = "1150";
      } else {
        document.getElementById('wager').value = "50";
      }
      document.getElementById('player'+player).click();
    }
  }, 1000);
}())
