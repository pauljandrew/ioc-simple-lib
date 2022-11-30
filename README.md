 
# IoC Simple Library

## Main files to read

- lib/index.js
- demo/index.js

## Notes on code:

- The library exposes 4 main public functions: registerClass, registerObject, resolve and remove

- Only supports registering of classes and objects, no support for singletons or more advanced lifecycle management

  As the functionality is so simple, the only major API design decision I felt I had to make was whether to use a single `register()` interface, or provide more granular `registerX()` interfaces, and let the user decide which to use. 

  If this was a real project, there would be more context to go off to make the actual decision, but for this example I decided to go with what would be my likely preference - `registerX/Y()` - which would be giving the user a bit more involvement and responsibility.

- JSDoc is used to document each function - could be used for validation in a further iteration. Use @since on all public functions to help with versioning in the future.

- Private functions are prefixed with _

- Example functionality of Car and Engine can be seen in src/demo/index.js and in console logs of the page loaded by `npm start`.

- Logging functionality can be left enabled or disabled by the client.

- Used a Map as the container data structure as I initially thought I may need to keep track of ordering. In retrospect this may not be necessary and a Map may have a larger memory overhead - something to be considered for future versions

- TODOS: Error-checking, circular dependency checking, more advanced lifecycle management

## Other notes: 

- Some example unit tests in lib/test.js, code coverage report can be generated using `npm run coverage`. For a library like this, I would implement 100% code and branch coverage as a push or build requirement. 

- Some basic docs in docs/intro.md, to demonstrate that I think any library like this should always be well-documented

- Currently missing autolinting

- https://github.com/DevUnltd/js-library-boilerplate-basic was used to get a quick library boilerplate starting point

## 📦 Getting Started

```
npm i;
npm start;
```
