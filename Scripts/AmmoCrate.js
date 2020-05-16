class AmmoCrate extends Component {

  possibilities = {
    names: ["Bullet", "Mine", "Missile", "Machine Gun", "Shell", "Freeze", "Fire"],
    srcs: ["Images/BulletIcon.png", "Images/MineIcon.png", "Images/MissileIcon.png",
      "Images/MachineGunIcon.png", "Images/ShellIcon.png", "Images/FreezeShellIcon.png", "Images/FireShellIcon.png"],
    objectTypes: [Bullet, Mine, HomingMissile, MachineGun, ExplodingShell, FreezeShell, FireShell],
    weights: [0.9, 0.85, 0.5, 0.6, 0.5, 0.5, 0.5],
    amounts: [400, 120, 80, 800, 200, 40, 80]
  }
  crateIcons = ["Images/AmmoBucket.png","Images/AmmoBucket2.png","Images/AmmoBucket3.png",
    "Images/AmmoBucket4.png","Images/AmmoBucket5.png"];

  items = [];

  destroyedLevel = 0;

  constructor(object, ...args) {
    super(object, ...args);
    this.sprite = new Sprite(this.object, "Images/AmmoBucket.png", false);
    new CircleCollider(this.object, 128, false);
    this.LoadItems();
  }

  LoadItems() {

    for (var i = 0; i < this.possibilities.names.length; i++) {
      let value = random.Random(0, 1);
      if(value < this.possibilities.weights[i]) {
        let percent = 1 - value / this.possibilities.weights[i];
        let quantity = Math.floor(percent * this.possibilities.amounts[i]);
        while(quantity > 0) {
          let maxStackAmount = this.possibilities.objectTypes[i].maxStackAmount
          let amount = quantity > maxStackAmount ? maxStackAmount : quantity;
          this.items.push(new Item(this.possibilities.names[i], maxStackAmount,
            this.possibilities.srcs[i], this.possibilities.objectTypes[i]));
            quantity -= amount;
        }
      }
    }

  }

  OnCollisionEnter(other) {
    if(other.object.FindComponentOfType(Weapon)) {
      this.OnWeaponHit();
      other.object.Destroy();
    }
  }

  OnWeaponHit() {
    this.destroyedLevel++;
    if(this.destroyedLevel >= this.crateIcons.length) {

      for(let item of this.items) {
        let a = random.Random(0, 2 * Math.PI);
        let m = getDispersionRadius(100 * this.transform.scale.x);
        let itemPos = Vector2.VectorFromAngleAndMagnitude(a, m);
        let o = new Object("WorldItem", this.transform.position, 0, new Vector2(0.3, 0.3));
        new WorldItem(o, item, itemPos.Add(this.transform.position));
      }


      this.object.Destroy();
    } else {
      this.sprite.src = this.crateIcons[this.destroyedLevel];
    }
  }
}
