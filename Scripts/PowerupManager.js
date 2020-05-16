class PowerupManager extends Component {

  availablePowerups = [ShieldPowerup, HealPowerup, StrengthPowerup, SpeedPowerup];
  powerupSpawnDelay = 10;

  nextPowerupSpawnTime;

  constructor(...args) {
    super(...args);
    this.nextPowerupSpawnTime = Time.time + this.powerupSpawnDelay;
  }

  Update() {

    if(this.nextPowerupSpawnTime < Time.time) {
      this.CreateNewPowerup();
      this.nextPowerupSpawnTime = Time.time + this.powerupSpawnDelay;
    }

  }

  CreateNewPowerup() {
    if(gameManager.twoPlayer)
      return;
      
    let spawnDst = random.Random(300, 2000);
    let spawnAngle = random.Random(0, Math.PI * 2);
    let spawnPosition = Vector2.VectorFromAngleAndMagnitude(spawnAngle, spawnDst).
      Add(player.transform.position);
    let powerupType = this.availablePowerups[random.Random(0,
      this.availablePowerups.length, true)];
    let powerupObject = new Object("Powerup", spawnPosition, 0,
      new Vector2(0.3, 0.3));
    new powerupType(powerupObject, 1);
  }

}
