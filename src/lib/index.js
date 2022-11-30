class SimpleIoC {
  constructor(logLevel = 'INFO') {
    this._iocRegistry = new Map();
    this._logLevel = logLevel;
  }

  /*******************************/
  /**        Public             **/
  /*******************************/

  /**
   * @since 0.1
   * @param  {string} The keyname of the module to be registered
   * @param  {string} The value to be registered
   * @param  {Array} Array of dependencies
   * @return {boolean}
   */

  registerModule = (name, type, dependencies) => {
    return this._register(name, type, dependencies, false);
  };

  /**
   * @since 0.1
   * @param  {string} The keyname of the class to be registered
   * @param  {string} The class to be registered
   * @param  {Array} Array of dependencies
   * @return {boolean}
   */

  registerClass = (name, type, dependencies) => {
    return this._register(name, type, dependencies, true);
    
  };

  /**
   * @since 0.1
   * @param  {string}
   * @return {{boolean}}
   */

  isRegistered = (name) => {
    return this._iocRegistry.has(name);
  }

  /**
   * @since 0.1
   * @param  {string}
   * @return {(Object|boolean)}
   */

  resolve = (name) => {
    this._logger("Resolving", name);
    if (this._iocRegistry.has(name)) {
      const toResolve = this._iocRegistry.get(name)
      if (toResolve.isClass && this._isClass(toResolve.type)) {
        const classInstance = this._injectDependencies(toResolve)
        return classInstance
      } else {
        return toResolve.type
      }
    } else {
      this._logger("Resolve failed, no such name registered")
      return false;
    }
    return toResolve;
  }

  /**
   * @since 0.1
   * @param  {string}
   * @return {boolean}
   */

  remove = (name) => {
    this._logger("Removing", name);
    this._iocRegistry.get(name)

    if (this._iocRegistry.has(name)) {
      this._iocRegistry.delete(name)
      return true;
    } else {
      return false;
    }
  };


  /*******************************/
  /**        Private            **/
  /*******************************/

  /**
   * @param  {[type]}
   */

  _logger = function () {
    if (this._logLevel === 'INFO') {
      console.info(...arguments)
    }
  }

  /**
   * @param  {Object}
   * @return {boolean}
   */
  
  _isClass = function (resolvable) {
    // Check if element is an ECMA class
    // TODO: Need to make this check more strict - to be able to distinguish between constructor and regular function
    return typeof resolvable === 'function';
  }

  /**
   * @param  {[type]}
   * @return {[type]}
   */

  _injectDependencies = function (module) {
    const resolvedDeps = module.dependencies ? module.dependencies.map((dep) => this.resolve(dep)) : [];
    if (module.type) {
      return new module.type(...resolvedDeps);  
    }
  }


  /**
   * @param  {string} The keyname to be registered
   * @param  {string} The type to be registered
   * @param  {Array} Array of dependencies
   * @return {boolean}
   */

    _register = function (name, type, dependencies, isClass) {
      this._logger("Registering", name);

      if (this._iocRegistry.has(name)) {
        this._logger("Registration failed, name already in use")
        return false;
      } else {
        this._iocRegistry.set(name, {type, dependencies, isClass})
        return true;
      }
    }
  }

  export default SimpleIoC;
