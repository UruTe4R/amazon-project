/*
class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

    console.log(`${this.#brand} ${this.#model} Speed: ${this.speed} km/h Trunk: ${trunkStatus}`)
  }

  go() {
    if (this.speed >= 200) {
      return;
    }
    if (this.isTrunkOpen === true) {
      return;
    }
    return this.speed += 5;
  }

  brake() {
    if (this.speed <= 0) {
      return;
    }
    return this.speed -= 5;
  }

  openTrunk() {
    if (this.speed > 0) {
      return
    }
    this.isTrunkOpen = true;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }
  go() {
    if (this.speed >= 300) {
      return;
    }
    if (this.isTrunkOpen === true) {
      return;
    }
    return this.speed += this.acceleration;
  }
  openTrunk() {
    return;
  }
  closeTrunk() {
    return;
  }
}

const raceCar1 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
});

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla',
});
const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3',
})

console.log(car1);
console.log(car2);
console.log(raceCar1)

car1.brake();
car1.brake();
car2.brake();
car1.go();
car1.openTrunk();
car2.openTrunk();
car2.closeTrunk();
car2.go();
raceCar1.go();
raceCar1.go();
raceCar1.go();

car1.brand = 'hi'

car1.displayInfo()
car2.displayInfo();
raceCar1.displayInfo();

*/
