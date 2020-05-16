class TwoPlayerInput extends Component {
  backgroundScale = 10;
  mines = 10;
  lastPFireTime = 0;
  selectedPIndex = 0;
  selectedSIndex = 1;

  constructor(gameobject, inputs, ...args) {
    super(gameobject, ...args);
    this._RequireComponent(Tank);
    this.tank = this.object.FindComponentOfType(Tank);
    this.tank.selectedPIndex = 0;
    this.tank.selectedSIndex = 1;
    this.inputs = inputs;
    this.object.tank = this.tank;
    this.object.pI = this;
    this.fireSound = new Audio("Audio/fire.wav");
    this.SetupStartItems();
    this.SetupValues();
  }

  SetupValues() {
    this.tank.primaryFireItem = this.tank.items[0];
    this.tank.secondaryFireItem = this.tank.items[1];
    this.tank.health = 250 + playerData.healthAmount * 25;
    this.tank.maxHealth = 250 + playerData.healthAmount * 25;
    this.tank.speed = 250 + playerData.speedAmount * 25;
    this.tank.bulletDamage = 5 + playerData.strengthAmount * 2;
  }

  SetupStartItems() {
    let startItems = [];
    for (var si of playerData.startItems) {
      startItems.push(new Item(si.name, si.quantity, si.imageSrc, si.objectType));
    }
    this.tank.items = startItems;
  }

  Update() {
    //Audio needs to be fixed for two players
    AudioPlayer.listenerLocation = this.transform.position.clone;
    if(gameManager.playingGame) {
      if(!gameManager.inventoryOpen) {
        this.HandleMovement();
        this.HandleFire();
        this.SelectItems();
      }
    }
  }

  HandleFire() {
    if(Input.GetKey(this.inputs.itemSelect))
      return;

    if(Input.GetKeyDown(this.inputs.firePrimary) && this.tank.primaryFireItem) {
      this.elapsedPFireTime = this.tank.primaryFireItem.objectType.shootDelay;
    }
    if(Input.GetKey(this.inputs.firePrimary) && this.tank.primaryFireItem) {
      this.elapsedPFireTime += Time.deltaTime
      let fireDelay = this.tank.primaryFireItem.objectType.shootDelay;
      while(this.elapsedPFireTime > fireDelay) {
        this.elapsedPFireTime -= fireDelay;
        this.tank.FirePrimary();
      }
    } else {
      this.elapsedPFireTime = 0;
    }

    if(Input.GetKeyDown(this.inputs.fireSecondary) && this.tank.secondaryFireItem) {
      this.elapsedSFireTime = this.tank.secondaryFireItem.objectType.shootDelay;
    }
    if(Input.GetKey(this.inputs.fireSecondary) && this.tank.secondaryFireItem) {
      this.elapsedSFireTime += Time.deltaTime
      let fireDelay = this.tank.secondaryFireItem.objectType.shootDelay;
      while(this.elapsedSFireTime > fireDelay) {
        this.elapsedSFireTime -= fireDelay;
        this.tank.FireSecondary();
      }
    } else {
      this.elapsedSFireTime = 0;
    }
  }

  HandleMovement() {
    if(Input.GetKey(this.inputs.itemSelect))
      return;

    if(Input.GetKey(this.inputs.front)) {
      this.transform.Translate(new Vector2(0, -this.tank.speed * Time.deltaTime), "self");
    }

    if(Input.GetKey(this.inputs.back)) {
      let pos = this.transform.LocalVectorToWorld(new Vector2(0, this.tank.speed  / 2 * Time.deltaTime), false);
      this.transform.position = pos;
    }

    if(Input.GetKey(this.inputs.left)) {
      this.transform.rotation -= this.tank.turnSpeed * Time.deltaTime;
    }

    if(Input.GetKey(this.inputs.right)) {
      this.transform.rotation += this.tank.turnSpeed * Time.deltaTime;
    }
  }

  SelectItems() {
    this.tank.primaryFireItem = this.tank.items[this.selectedPIndex];
    this.tank.secondaryFireItem = this.tank.items[this.selectedSIndex];

    if(!Input.GetKey(this.inputs.itemSelect))
      return;

    if(Input.GetKeyDown(this.inputs.front)) {
      this.selectedPIndex--;
      if(this.selectedPIndex == this.selectedSIndex) {
        this.selectedPIndex--;
      }
      if(this.selectedPIndex<0)
        this.selectedPIndex=this.tank.inventorySize-1;
      if(this.selectedPIndex == this.selectedSIndex) {
        this.selectedPIndex--;
      }
    }

    if(Input.GetKeyDown(this.inputs.back)) {
      this.selectedPIndex++;
      if(this.selectedPIndex == this.selectedSIndex) {
        this.selectedPIndex++;
      }
      if(this.selectedPIndex>=this.tank.items.length) {
        this.selectedPIndex = 0;
      }
      if(this.selectedPIndex == this.selectedSIndex) {
        this.selectedPIndex++;
      }
    }

    if(Input.GetKeyDown(this.inputs.left)) {
      this.selectedSIndex--;
      if(this.selectedSIndex == this.selectedPIndex) {
        this.selectedSIndex--;
      }
      if(this.selectedSIndex<0)
        this.selectedSIndex=this.tank.inventorySize - 1;
      if(this.selectedSIndex == this.selectedPIndex) {
        this.selectedSIndex--;
      }
    }

    if(Input.GetKeyDown(this.inputs.right)) {
      this.selectedSIndex++;
      if(this.selectedSIndex == this.selectedPIndex) {
        this.selectedSIndex++;
      }
      if(this.selectedSIndex>=this.tank.items.length) {
        this.selectedSIndex = 0;
      }
      if(this.selectedSIndex == this.selectedPIndex) {
        this.selectedSIndex++;
      }
    }

    this.tank.primaryFireItem = this.tank.items[this.selectedPIndex];
    this.tank.secondaryFireItem = this.tank.items[this.selectedSIndex];
    this.tank.selectedPIndex = this.selectedPIndex;
    this.tank.selectedSIndex = this.selectedSIndex;

    if(Input.GetKeyDown(this.inputs.firePrimary)) {
      this.tank.ThrowOutItem(this.selectedPIndex);
    }

    if(Input.GetKeyDown(this.inputs.fireSecondary)) {
      this.tank.ThrowOutItem(this.selectedSIndex);
    }
  }

  PickUpItem(item) {
    this.tank.PickUpItem(item);
  }

}
