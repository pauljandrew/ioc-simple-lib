import SimpleIoC from "../lib";
const iocContainer = new SimpleIoC();

document.querySelector("body").innerHTML = `<h1>IoC</h1>`;

class Engine {
  constructor (fuel) {
    this.fuel = fuel;
  }

  start = () => {
    if (this.fuel) {
    	return true;
    } else {
    	return false
    }
  }
}

class ElectricEngine extends Engine {
  constructor () {
    super('Electricity')
  }
}

class Car {
  constructor (engine) {
    this.engine = engine;
  }

  driveTo (destination) {
    if (this.engine.start()) {
    	console.log(`Driving to ${destination}, engine powered by ${this.engine.fuel}`)
    	return true
    } else {
    	return false
    }
  }
}

iocContainer.registerModule("fuel", "Diesel")
iocContainer.registerClass("engine", Engine, ["fuel"]);
iocContainer.registerClass("car", Car, ["engine"])


const car1 = iocContainer.resolve("car");

car1.driveTo('the city')

iocContainer.remove("engine");

iocContainer.registerClass("engine", ElectricEngine)

const car2 = iocContainer.resolve("car");

car2.driveTo('the suburbs')

iocContainer.remove("fuel")
iocContainer.remove("engine")
iocContainer.remove("car")



