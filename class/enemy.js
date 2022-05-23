const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    let room = this.currentRoom;
    let exitsArr = room.getExits();
    console.log(exitsArr);
    let randomIdx = Math.floor(Math.random() * (exitsArr.length))
    let direction = exitsArr[randomIdx];

    console.log(randomIdx);
    console.log(direction);

    let newRoom = room.getRoomInDirection(direction);
    this.currentRoom = newRoom;

    this.cooldown = 3000;
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    //const resetCooldown = function() {
      this.cooldown = 0;
      //this.act();
    //};
    //setTimeout(resetCooldown, this.cooldown);
  }



  attack() {
    let person = this.attackTarget;
    person.applyDamage(10);
    this.cooldown = 3000;
  }

  //applyDamage(amount) {
    // Fill this in
  //}



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
      return;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      //this.rest();
      this.attack();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
