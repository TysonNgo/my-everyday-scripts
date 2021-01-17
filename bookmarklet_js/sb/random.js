javascript:(function(){
  setInterval(() => {
    let canBet = !document.getElementById('player1').disabled;
    let hasBet = document.getElementById('lastbet').textContent === '✓';
    let player = (Math.floor(Math.random()*2)+1);

    if (!hasBet && canBet){
      if (document.getElementById('balance').classList.contains('purpletext')){
        let tourneyBalance = 1300;
        let currentBalance = parseInt(document.getElementById('balance').textContent.replace(',',''));
        let wager = currentBalance < tourneyBalance * 2 ? currentBalance : tourneyBalance;
        document.getElementById('wager').value = wager;
      } else {
        document.getElementById('wager').value = "50";
      }
      document.getElementById('player'+player).click();
    }
  }, 1000);
}())
