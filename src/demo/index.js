import SimpleIoC from "../lib";
const iocContainer = new SimpleIoC();

document.querySelector("body").innerHTML = `<h1>IoC</h1>`;

class Engine {
  constructor (fuel) {
    this.fuel = fuel
    this.name = `${fuel}-powered`
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
    super('Electric')
  }
}

class Car {
  constructor (engine) {
    this.engine = engine;
    this.name = 'Test'
  }

  driveTo (destination) {
    if (this.engine.start()) {
    	console.log(`Driving to ${destination}, with an ${this.engine.name} engine`)
    	return true
    } else {
    	return false
    }
  }
}

iocContainer.register("fuel", "diesel")
iocContainer.register("engine", Engine, ["fuel"]);
iocContainer.register("car", Car, ["engine"])


const car1 = iocContainer.resolve("car");

car1.driveTo('The city')

iocContainer.remove("engine");

iocContainer.register("engine", ElectricEngine)

const car2 = iocContainer.resolve("car");

car2.driveTo('The suburbs')

iocContainer.remove("fuel")
iocContainer.remove("engine")
iocContainer.remove("car")


iocContainer.register('test1', Engine, ['test2'])
iocContainer.register('test2', Engine, ['test1'])

const test1 = iocContainer.resolve('test1');
