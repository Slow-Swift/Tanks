class Enemy extends Component {
  shotTime = 0;
  shootDelay = 1;
  lastFireTime = 0;
  random = new Random();

  constructor(object) {
    super(object);
    this._RequireComponent(Tank);
    this.tank = this.object.FindComponentOfType(Tank);
    this.SetupValues();
  }

  Update() {
    if(gameManager.playingGame) {
      this.ChooseWeapons();
      this.FindTarget();
      this.Move();
      this.Shoot();
    }
  }

  SetupValues() {
    this.tank.speed = this.random.Random(gameManager.enemyTankSpeed * 0.8 - 30, gameManager.enemyTankSpeed * 0.8 + 30);
    this.tank.turnSpeed = this.tank.speed / 58;
    let health = this.random.Random(gameManager.enemyTankHealth / 2 - 20, gameManager.enemyTankHealth / 2 + 20);
    this.tank.health = health;
    this.tank.maxHealth = health;
    this.tank.bulletDamage = this.random.Random(gameManager.enemyTankDamage * 2 - 3, gameManager.enemyTankDamage * 2 + 3);
    this.shootDelay = this.random.Random(gameManager.enemyShootDelay * 10, gameManager.enemyShootDelay * 15);
    let scale = this.random.Random(0.3, 0.5);
    this.transform.scale = new Vector2(scale, scale);
    this.stopRadius = this.random.Random(gameManager.enemyStopRadius * 2 - 50, gameManager.enemyStopRadius + 50 * 2);
  }

  Move() {
    if(!this.target || !this.target.object.active) {
      this.target = null;
      return;
    }

    let turn = this.tank.turnSpeed * Time.deltaTime;
    let turning = !this.transform.TurnTowards(this.target.transform.position, turn, Math.PI / 2);
    let toTarget = Vector2.Subtract(this.target.transform.position, this.transform.position);
    this.canFire = !turning;

    if(toTarget.magnitude > this.stopRadius && !turning) {
      let pos = this.transform.LocalVectorToWorld(new Vector2(0, -this.tank.speed * Time.deltaTime), false);
      this.transform.position = pos;
      this.canFire = false;
    }
  }

  Shoot() {
    if(!this.target)
      return;
      
    let toTargetVector = this.target.transform.position.clone.Subtract(
      this.transform.position);
    if(this.tank.primaryFireItem) {
      if(toTargetVector.magnitude < this.tank.primaryFireItem.objectType.stopRadius) {
        if(Time.time - this.lastFireTime >=
            this.tank.primaryFireItem.objectType.shootDelay * this.shootDelay) {
          this.tank.FirePrimary();
          this.lastFireTime = Time.time;
        }
      }
    }
  }

  GetTanks() {
    let tanks = ObjectManagement.FindObjectsOfType(Tank);
    let res = [];
    for (let tank of tanks) {
      if(tank != this.tank) {
        res.push(tank);
      }
    }
    this.tanks = res;
  }

  FindTarget() {
    if((this.target instanceof Tank) && this.target.object.active) {
      return;
    }

    this.GetTanks();

    let style = random.Random(0,1);
    if(style > 0.3) {
      let shortestDst = Infinity;
      for(let tank of this.tanks) {
        let dst = tank.transform.position.clone.Subtract(this.transform.position)
          .magnitude;
        if(dst < shortestDst) {
          shortestDst = dst;
          this.target = tank;
        }
      }
    } else {
      let targetIndex = random.Random(this.tanks.length, 0, true);
      this.target = this.tanks[targetIndex];
    }
  }

  ChooseWeapons() {
    let tankActive = (this.target instanceof Tank) && this.target.object.active;
    if(tankActive && this.tank.primaryFireItem) {
      return;
    }

    let highestVal = -1;
    for (var i = 0; i < this.tank.items.length; i+=2) {
      let val = random.Random(0, 1);
      if(val > highestVal) {
        highestVal = val;
        this.tank.primaryFireItem = this.tank.items[i];
      }
    }
  }
}

class Targeter extends Enemy {

  SetupValues() {
    let types = ["closest", "random", "first"];
    this.targetingStyle = "closest";
    this.targetingStyle = types[this.random.Random(types.length, 0, true)];
    this.tank.speed = this.random.Random(gameManager.enemyTankSpeed - 30, gameManager.enemyTankSpeed + 30);
    this.tank.turnSpeed = this.tank.speed / 58;
    let health = this.random.Random(gameManager.enemyTankHealth - 20, gameManager.enemyTankHealth + 20);
    this.tank.health = health;
    this.tank.maxHealth = health;
    this.tank.bulletDamage = this.random.Random(gameManager.enemyTankDamage - 3, gameManager.enemyTankDamage + 3);
    this.shootDelay = this.random.Random(gameManager.enemyShootDelay - 0.3, gameManager.enemyShootDelay + 0.3);
    let scale = this.random.Random(0.2, 0.4);
    this.transform.scale = new Vector2(scale, scale);
    this.stopRadius = this.random.Random(gameManager.enemyStopRadius - 50, gameManager.enemyStopRadius + 50);
  }

  FindTarget() {
    if(this.target == null) {
      this.GetTanks();
      switch (this.targetingStyle) {
        case "closest":
          let shortestDst = Infinity;
          for (let tank of this.tanks) {
            let dst = Vector2.Subtract(tank.transform.position, this.transform.position).magnitude;
            if(dst < shortestDst) {
              shortestDst = dst;
              this.target = tank;
            }
          }
          break;
        case "random":
          this.target = this.tanks[this.random.Random(this.tanks.length, 0, true)];
          break;
        case "first":
          this.target = this.tanks[0];
          break;
        default:
          this.target = this.tanks[0];
      }
    }
  }

}

class Sniper extends Enemy {
  stopRadius = 200;

  SetupValues() {
    this.tank.speed = this.random.Random(gameManager.enemyTankSpeed * 0.8 - 30, gameManager.enemyTankSpeed * 0.8 + 30);
    this.tank.turnSpeed = this.tank.speed / 58;
    let health = this.random.Random(gameManager.enemyTankHealth / 2 - 20, gameManager.enemyTankHealth / 2 + 20);
    this.tank.health = health;
    this.tank.maxHealth = health;
    this.tank.bulletDamage = this.random.Random(gameManager.enemyTankDamage * 2 - 3, gameManager.enemyTankDamage * 2 + 3);
    this.shootDelay = this.random.Random(gameManager.enemyShootDelay * 2 - 0.3, gameManager.enemyShootDelay * 2 + 0.3);
    let scale = this.random.Random(0.3, 0.5);
    this.transform.scale = new Vector2(scale, scale);
    this.stopRadius = this.random.Random(gameManager.enemyStopRadius * 2 - 50, gameManager.enemyStopRadius + 50 * 2);
  }

  FindTarget() {
    this.GetTanks();
    let shortestDst = Infinity;
    for (let tank of this.tanks) {
      let dst = Vector2.Subtract(tank.transform.position, this.transform.position).magnitude;
      if(dst < shortestDst) {
        shortestDst = dst;
        this.target = tank;
      }
    }
  }
}
