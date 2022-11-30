## Library API:

- `register()`

    Add a module to the container

- `resolve()`

    Resolve a module from the container

- `remove()`

    Remove a module from the container

## Usage example:

```
const iocContainer = new SimpleIoC();
iocContainer.register("test1", TestClass, ["test2"])
iocContainer.register("test2", OtherTestClass, [])
iocContainer.resolve("test1")
iocContainer.remove("test1")
```
