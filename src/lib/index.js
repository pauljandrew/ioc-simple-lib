import "./index.css";

class SimpleIoC {
  constructor(logLevel = 'INFO') {
    console.log("IoC constructor loaded");
    this._iocRegistry = new Map();
    this._logLevel = logLevel;

    this._lifecycleTypes = {
      TRANSIENT: 'transient',
      SINGLETON: 'singleton'
    }
  }

  /*******************************/
  /**        Public             **/
  /*******************************/

  /**
   * @param  {string}
   * @param  {string}
   * @param  {Array}
   * @return {boolean}
   */

  register = (name, type, dependencies) => {
    this._logger("Registering", name);
    
    if (this._iocRegistry.has(name)) {
      this._logger("Registration failed, name already in use")
      return false;
    } else {
      this._iocRegistry.set(name, {type, dependencies})
      return true;
    }
    
  };

  /**
   * @param  {string}
   * @return {{boolean}}
   */

  isRegistered = (name) => {
    return this._iocRegistry.has(name);
  }

  /**
   * @param  {string}
   * @return {(Object|boolean)}
   */

  resolve = (name) => {
    this._logger("Resolving", name);
    if (this._iocRegistry.has(name)) {
      const toResolve = this._iocRegistry.get(name)
      if (this._isClass(toResolve.type)) {
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
    // TODO: Need to make this check more strict
    return typeof resolvable === 'function';
  }

  /**
   * @param  {[type]}
   * @return {[type]}
   */

  _injectDependencies = function (transient) {
    const resolvedDeps = transient.dependencies ? transient.dependencies.map((dep) => this.resolve(dep)) : [];
    if (transient.type) {
      return new transient.type(...resolvedDeps);  
    }
    
  }
}

export default SimpleIoC;
