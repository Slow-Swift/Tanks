class Tank extends Component {

  health = 200;
  speed = 240;
  turnSpeed = 3;
  bulletDamage = 5;

  maxHealth = this.health;
  lifeBarLength = 200;
  lifeBarThickness = 20;
  facing = new Vector2(0, 1);
  oldPosition = Vector2.Zero;
  inventorySize = 40;
  items = [];
  name = "";
  font = "sans-serif";

  constructor(object) {
    super(object, .4);
    this._RequireComponent(CircleCollider, 70);
    this._RequireComponent(RigidBody2D);
    this.items[0] = new Item("Bullet", 80, "Images/BulletIcon.png",
      Bullet);
    this.items[1] = new Item("Mine", 20, "Images/MineIcon.png",
      Mine);
    this.items[2] = new Item("Missile", 10, "Images/MissileIcon.png",
      HomingMissile);
    this.items[3] = new Item("Pellets", 200, "Images/MachineGunIcon.png",
      MachineGun);
    this.items[4] = new Item("Shell", 30, "Images/ShellIcon.png",
      ExplodingShell);
    this.items[5] = new Item("Freeze", 5, "Images/FreezeShellIcon.png",
      FreezeShell);
    this.items[6] = new Item("Fire", 10, "Images/FireShellIcon.png",
      FireShell);

    this.primaryFireItem = this.items[0];
    this.secondaryFireItem = this.items[1];
  }

  DealDamage(amount) {
    if(this.shieldActive)
      return;

    this.health -= amount;
    if(this.health <= 0) {
      this.Die();
    }
  }

  Die() {
    let a = random.Random(0, 2 * Math.PI);
    let m = getDispersionRadius(100 * this.transform.scale.x);
    let itemPos = Vector2.VectorFromAngleAndMagnitude(a, m);
    let o = new Object("Mines", this.transform.position.clone, 0, new Vector2(0.3, 0.3));
    let item = this.items[random.Random(0, this.items.length, true)]//new Item("Mine", 5, "Images/MineIcon.png", Mine);
    let wo = new WorldItem(o, item, itemPos.Add(this.transform.position));
    let numCoins = random.Random(1, 4, true);
    if(gameManager.twoPlayer)
      numCoins = 0;

    for (var i = 0; i < numCoins; i++) {
      a = random.Random(0, 2 * Math.PI);
      m = getDispersionRadius(100 * this.transform.scale.x);
      itemPos = Vector2.VectorFromAngleAndMagnitude(a, m);
      o = new Object("Coin", this.transform.position.clone, 0, new Vector2(0.3, 0.3));
      new Coin(o, itemPos.Add(this.transform.position));
    }

    this.object.Destroy();
  }

  Update() {
    this.DrawHealth();
    this.DrawName();
    if(!this.oldPosition.Equals(this.transform.position))
      new Tracks(new Object("Tracks", this.transform.position, this.transform.rotation, this.transform.scale));
    this.oldPosition = this.transform.position.clone;
    this.CropInventory();
    this.TrapInWorld();
  }

  DrawHealth() {
    CtxHelp.TransformCtx(this.transform);
    let shadowColor = ctx.shadowColor;
    ctx.shadowColor = "rgba(0,0,0,0.2)"

    let healthPercent = this.health / this.maxHealth;
    let fullColor = new Vector4(0, 256, 0, 1);
    let emptyColor = new Vector4(256, 0, 0, 1);
    let currentColor = emptyColor.Interpolate(fullColor, healthPercent);
    ctx.rotate(-this.transform.rotation)
    ctx.fillStyle = "rgba" + currentColor.toString(true);
    ctx.beginPath();
    ctx.arc(0, 0, 120, 0, Math.PI * 2 * healthPercent);
    ctx.arc(0, 0, 100, Math.PI * 2 * healthPercent, 0, true);
    ctx.fill();

    ctx.shadowColor = shadowColor;
    ctx.restore();
  }

  DrawName() {
    CtxHelp.TransformCtx(this.transform);
    ctx.rotate(-this.transform.rotation);
    ctx.fillStyle = "white";
    ctx.font = canvas.height * 0.05;
    ctx.textAlign = "center";
    ctx.fillText(this.name, 0, -120);
    ctx.textAlign = "start";
    ctx.restore();
  }

//To be removed. Update Ais before tho.
  Shoot() {
    this.FirePrimary();
  }

  PlaceMine() {
    let v = this.transform.position;
    let o = new Object("Mine", this.transform.position, 0, this.transform.scale);
    new Mine(o);
  }

  FirePrimary() {
    if(!this.primaryFireItem)
      return;

    this.primaryFireItem.quantity--;

    new this.primaryFireItem.objectType(this, this.bulletDamage, 0.6);

    if(this.primaryFireItem.quantity <= 0) {
      ArrayTools.RemoveItem(this.items, this.items.indexOf(
        this.primaryFireItem));
      this.primaryFireItem = null;
    }
  }

  FireSecondary() {
    if(!this.secondaryFireItem)
      return;

    this.secondaryFireItem.quantity--;
    new this.secondaryFireItem.objectType(this, this.bulletDamage, 0.6);

    if(this.secondaryFireItem.quantity <= 0) {
      ArrayTools.RemoveItem(this.items, this.items.indexOf(
        this.secondaryFireItem));
      this.secondaryFireItem = null;
    }
  }

  PickUpItem(item) {
    let successfullyCollected = false;
    for (let i of this.items) {
      i.CombineWithItem(item);
    }

    if(item.quantity > 0 && this.items.length < this.inventorySize) {
      this.items.push(item);

      if(!this.primaryFireItem) {
        this.primaryFireItem = item;
      } else if(!this.secondaryFireItem) {
        this.secondaryFireItem = item;
      }
    } else if(item.quantity > 0) {
      return false;
    }
    return true;
  }

  CropInventory() {
    while (this.items.length > this.inventorySize) {
      let a = random.Random(0, 2 * Math.PI);
      let m = getDispersionRadius(100 * this.transform.scale.x);
      let itemPos = Vector2.VectorFromAngleAndMagnitude(a, m);
      let o = new Object("Item", this.transform.position.clone, 0, new Vector2(0.3, 0.3));
      let item = this.items.pop();
      new WorldItem(o, item, itemPos.Add(this.transform.position));
    }
  }

  TrapInWorld() {
    if(this.transform.position.magnitude > gameManager.worldRadius) {
      this.transform.position.magnitude = gameManager.worldRadius;
    }
  }

  ThrowOutItem(index) {
    let a = random.Random(0, 2 * Math.PI);
    let mag = getDispersionRadius(100 * this.transform.scale.x);
    let itemPos= Vector2.VectorFromAngleAndMagnitude(a, mag);
    let o = new Object("Item", this.transform.position.clone, 0, new Vector2(0.3, 0.3));
    let wi = new WorldItem(o, this.items[index], itemPos.Add(this.transform.position));
    if(this.items[index] == this.primaryFireItem) {
      this.primaryFireItem = null;
    } else if(this.items[index] == this.secondaryFireItem) {
      this.secondaryFireItem = null;
    }
    ArrayTools.RemoveItem(this.items, index);
    wi.waitTime = 2;
  }
}
