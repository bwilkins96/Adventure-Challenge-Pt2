class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items =[];
    this.health = 100;
    this.strength = 10;
  }

  applyDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {this.die()}
    else (console.log(`${this.name}'s health: ${this.health} `))
  }

  die() {
    console.log(`${this.name} has died :(`)

    let room = this.currentRoom;

    this.items.forEach( item => {
      room.items.push(item);
    });

    this.items = [];
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
