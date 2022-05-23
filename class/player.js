const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    let room = this.currentRoom;
    let item = room.getItemByName(itemName);
    let index = room.items.indexOf(item);

    room.items.splice(index, 1);
    this.items.push(item);
  }



  dropItem(itemName) {
    let room = this.currentRoom;
    let item = this.getItemByName(itemName);
    let index = this.items.indexOf(item);

    this.items.splice(index, 1);
    room.items.push(item);
  }



  eatItem(itemName) {
    let item = this.getItemByName(itemName)
        let index = this.items.indexOf(item)

        if (item instanceof Food) {
            this.items.splice(index, 1);
        }
  }


  getItemByName(name) {
    for(let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.name === name) {return item}
    }
  }

  hit(name) {
    let enemy = this.currentRoom.getEnemyByName(name);

    enemy.applyDamage(10);
    enemy.attackTarget = this;
    enemy.act();
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
