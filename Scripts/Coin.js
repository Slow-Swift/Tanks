class Coin extends WorldItem {

  constructor(object, finishPos, ...args) {
    super(object, new Item("Coin", 1, "Images/Coin.png", {maxStackAmount:1}), finishPos, ...args);
    this.object.FindComponentOfType(Text).SetActive(false);
  }

  OnCollisionEnter(other) {
    let tank = other.object.FindComponentOfType(Tank);
    if(tank) {
      let sound = new Audio("Audio/pickup.wav");
      let volume = gameManager.volume / 100;
      AudioPlayer.playAudio(sound, this.transform.position,
        gameManager.volumeQuietDst, volume);

      let pI = other.object.FindComponentOfType(PlayerInput);
      if(pI)
        playerData.numCoins++;
      this.object.Destroy();
    }
  }
}
