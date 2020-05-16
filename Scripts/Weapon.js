class Weapon extends Component {
  name = "Weapon";

  static primary = true;
  static maxStackAmount = 30;
  static shootDelay = 0.2;
  static stopRadius = 500;

  constructor(tank, damageModifier, ...args) {
    super("Obj", ...args);
    this.object.name = this.name;
    this.damageModifier = damageModifier;
    this.startTime = Time.time;
    this.startTank = tank;
    this.PlaceAtTank();
    this.PlaySound();
  }

  PlaySound() {}

  PlaceAtTank() {}

  OnCollidingWithWeapon(other) {}
}
