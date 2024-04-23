#! /urs/bin/env node

import inquirer from "inquirer";

class Player {
  name: string;
  fuel: number = 100;
  constructor(name: string) {
    this.name = name;
  }
  fuelDecrease() {
    this.fuel -= 25;
  }
  fuelIncrease() {
    this.fuel = 100;
  }
}

class Opponent {
  name: string;
  fuel: number = 100;
  constructor(name: string) {
    this.name = name;
  }
  fuelDecrease() {
    this.fuel -= 25;
  }
}

(async () => {
  let player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Please Enter Your Name:",
  });

  let opponent = await inquirer.prompt({
    type: "list",
    name: "select",
    message: "Select Your Opponent",
    choices: ["Skeleton", "Assassin", "Zombie"],
  });

  let p1 = new Player(player.name);
  let o1 = new Opponent(opponent.select);

  console.log(`${p1.name} VS ${o1.name}`);

  do {
    let ask = await inquirer.prompt({
      type: "list",
      name: "option",
      message: "Select Your Action",
      choices: ["Attack", "Drink Portion", "Run For Your Life..."],
    });

    if (ask.option === "Attack") {
      let num = Math.floor(Math.random() * 2);
      if (num > 0) {
        p1.fuelDecrease();
        console.log(`${p1.name} fuel is ${p1.fuel}`);
        console.log(`${o1.name} fuel is ${o1.fuel}`);
        if (p1.fuel <= 0) {
          console.log("You Lose, Better Luck Next Time");
          break;
        }
      } else {
        o1.fuelDecrease();
        console.log(`${o1.name} fuel is ${o1.fuel}`);
        console.log(`${p1.name} fuel is ${p1.fuel}`);
        if (o1.fuel <= 0) {
          console.log("You Win");
          break;
        }
      }
    }

    if (ask.option === "Drink Portion") {
      p1.fuelIncrease();
      console.log(`You drink a health potion. Your fuel is now ${p1.fuel}.`);
    }

    if (ask.option === "Run For Your Life...") {
      console.log("You Lose, Better Luck Next Time");
      break;
    }
  } while (true);
})();
