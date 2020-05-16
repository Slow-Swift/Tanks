class PlayerData {

  availableUpgrades = [
    {
      price: 1,
      owned: 0,
      icon: "Images/BulletIcon.png",
      OnPurchased: function() {
        let item = new Item("Bullet", 1, "Images/BulletIcon.png", Bullet);
        for (let i of this.startItems) {
          i.CombineWithItem(item);
        }
        if(item.quantity > 0) {
          this.startItems.push(item);
        }
        this.price += 0.025;
      }
    },

    {
      price: 1,
      owned: 0,
      icon: "Images/MineIcon.png",
      OnPurchased: function() {
        let item = new Item("Mine", 1, "Images/MineIcon.png", Mine);
        for (let i of this.startItems) {
          i.CombineWithItem(item);
        }
        if(item.quantity > 0) {
          this.startItems.push(item);
        }
        this.price += 0.1;
      }
    },

    {
      price: 1,
      owned: 0,
      icon: "Images/MachineGunIcon.png",
      OnPurchased: function() {
        let item = new Item("Pellets", 8, "Images/MachineGunIcon.png", MachineGun);
        for (let i of this.startItems) {
          i.CombineWithItem(item);
        }
        if(item.quantity > 0) {
          this.startItems.push(item);
        }
        this.price += 0.12;
      }
    },

    {
      price: 1,
      owned: 0,
      icon: "Images/MissileIcon.png",
      OnPurchased: function() {
        let item = new Item("Missile", 1, "Images/MissileIcon.png", HomingMissile);
        for (let i of this.startItems) {
          i.CombineWithItem(item);
        }
        if(item.quantity > 0) {
          this.startItems.push(item);
        }
        this.price += 0.2;
      }
    },

    {
      price: 1,
      owned: 0,
      icon: "Images/ShellIcon.png",
      OnPurchased: function() {
        let item = new Item("Shell", 1, "Images/ShellIcon.png", ExplodingShell);
        for (let i of this.startItems) {
          i.CombineWithItem(item);
        }
        if(item.quantity > 0) {
          this.startItems.push(item);
        }
        this.price += 0.15;
      }
    },

    {
      price: 1,
      owned: 0,
      icon: "Images/FreezeShellIcon.png",
      OnPurchased: function() {
        let item = new Item("Freeze", 1, "Images/FreezeShellIcon.png", FreezeShell);
        for (let i of this.startItems) {
          i.CombineWithItem(item);
        }
        if(item.quantity > 0) {
          this.startItems.push(item);
        }
        this.price += 0.2;
      }
    },

    {
      price: 1,
      owned: 0,
      icon: "Images/FireShellIcon.png",
      OnPurchased: function() {
        let item = new Item("Fire", 1, "Images/FireShellIcon.png", FireShell);
        for (let i of this.startItems) {
          i.CombineWithItem(item);
        }
        if(item.quantity > 0) {
          this.startItems.push(item);
        }
        this.price += 0.2;
      }
    },

    {
      price: 1,
      owned: 0,
      icon: "Images/HealPowerup.png",
      OnPurchased: function() {
        this.price += 0.6;
        this.playerData.healthAmount++;
      }
    },

    {
      price: 1,
      owned: 0,
      icon: "Images/StrengthPowerup.png",
      OnPurchased: function() {
        this.price += 0.6;
        this.playerData.strengthAmount++;
      }
    },

    {
      price: 1,
      owned: 0,
      icon: "Images/SpeedPowerup.png",
      OnPurchased: function() {
        this.price += 0.6;
        this.playerData.speedAmount++;
      }
    },

  ]

  numCoins = 0;
  healthAmount = 0;
  strengthAmount = 0;
  speedAmount = 0;
  priceStartOffsets = [1,0.5,0,-1,0,-1,-1,0,0,0];

  constructor() {
    this.startItems = [];

    for (var o of this.availableUpgrades) {
      o.startItems = this.startItems;
      o.playerData = this;
    }

    this.SetupImages();
  }

  SetupImages() {
    for (var au of this.availableUpgrades) {
      let img = new Image();
      img.src = au.icon;
      au.icon = img;
    }
  }

  Save() {
    let a = [];
    let t = this;
    for (var au of this.availableUpgrades) {
      a.push(au.owned);
    }

    let purchases = {
      amounts: a,
      numCoins: t.numCoins
    }

    let json = JSON.stringify(purchases);
    localStorage.setItem(gameManager.savedDataPrefix + "Purchases", json);
  }

  Load() {
    let json = localStorage.getItem(gameManager.savedDataPrefix + "Purchases");
    let purchases;
    if(json) {
      purchases = JSON.parse(json);
    } else {
      purchases = {
        amounts: [50, 5, 0,0,0,0,0,0,0,0,],
        numCoins: 0,
      }
    }

    for (var i = 0; i < purchases.amounts.length; i++) {
      let owned = purchases.amounts[i];
      for (var j = 0; j < owned; j++) {
        this.availableUpgrades[i].owned++;
        this.availableUpgrades[i].OnPurchased();
      }
      this.availableUpgrades[i].price -= this.priceStartOffsets[i];
    }

    this.numCoins = purchases.numCoins;
  }

}
