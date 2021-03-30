/** Got this from NGXS's Action decorator definition */

export interface ActionDef {
  type: string;
}

export interface ActionObj<T = any, U = any> {
  type: string;

  new (...args: T[]): U;
}

export type ActionType = ActionObj | ActionDef;

/** A class decorator to automatically add the 'type' property with the given value to an action class.
 * @remarks Unfortunately, TS isn't able to automatically infer that the property is on the decorated class. See https://github.com/Microsoft/TypeScript/issues/4881. */
export function Action(type: string) {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      type = type;
    };
  };
}

// const getClassNameSymbol = Symbol();
// class C {
//   [getClassNameSymbol]() {
//     return "C";
//   }
// }
// let c = new C();
// let className = c[getClassNameSymbol](); // "C"

// const type = Symbol();
// abstract class BaseTest {
//   abstract [type]();
// }

// class Test extends BaseTest {
//   [type]() {
//     return "Test";
//   }
// }

// const x = new Test();
// x[type];
