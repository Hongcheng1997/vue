import Dep from './dep'

class Observer {
  data = Object.create(null)

  constructor(data: any) {
    this.data = data;
    this.walk(data);
  }

  walk(data: any) {
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }

  defineReactive(data: any, key: string, val: any) {
    var dep = new Dep();
    var childObj = initState(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        if (Dep.target) {
          dep.depend()
        }
        return val;
      },
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        dep.notify();
      }
    });
  }
}

export function initState(value: any) {
  if (!value || typeof value !== 'object') {
    return;
  }

  return new Observer(value);
};
