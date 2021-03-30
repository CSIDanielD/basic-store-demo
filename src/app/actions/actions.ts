import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { StoreService } from "../services/store.service";
import { AppState } from "../types/appState";
import { Action, ActionDef, ActionType } from "../types/basic-store/action";
import { User } from "../types/user";
import { UserTask } from "../types/userTask";

/* Each module could have an "Actions" file that defines the actions for the module */

abstract class BaseAction implements ActionDef {
  type: string;
}

@Action("GetUsersAndTasks")
export class GetUsersAndTasks extends BaseAction {}

@Action("AddUser")
export class AddUser extends BaseAction {
  constructor(user: User) {
    super();
  }
}

@Action("UpdateUser")
export class UpdateUser extends BaseAction {
  constructor(public userId: number, public user: User) {
    super();
  }
}

@Action("RemoveUser")
export class RemoveUser extends BaseAction {
  constructor(public userId: number) {
    super();
  }
}

@Action("AddTask")
export class AddTask extends BaseAction {
  constructor(task: UserTask) {
    super();
  }
}

@Action("UpdateTask")
export class UpdateTask extends BaseAction {
  constructor(taskId: number, task: UserTask) {
    super();
  }
}

@Action("RemoveTask")
export class RemoveTask extends BaseAction {
  constructor(taskId: number) {
    super();
  }
}

interface ActionProvider {
  actions: { [actionType: string]: ActionType };
}

export function ActionProvider() {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      actions: { [actionType: string]: ActionType } = {};

      // constructor(store...args: any[]) {
      //   super();
      // }
    };
  };
}

export function HandleAction(action: ActionType): MethodDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const providerActions = ((target.constructor as unknown) as ActionProvider)
      .actions;

    const actionType = action.type;
    if (providerActions[actionType]) {
      throw new Error(`Action '${actionType}' already exists on provider.`);
    }

    providerActions[actionType] = target[propertyKey];
    return descriptor;
  };
}

@Injectable({ providedIn: "root" })
@ActionProvider()
class TestActionProvider {
  // Automatically register methods decorated with HandleAction on the injected store.

  constructor(store: StoreService) {}
}

// type DirectReducer<S, P = any> =
//   | ((props: P, getState: () => S) => S)
//   | ((props: P, getState: () => S) => Promise<S>);

// interface DirectAction<S, P = any> {
//   actionType: string;
//   props: P;
//   reducer: DirectReducer<S>;
// }

// type ActionCreator<S, P = any> = (props: P) => DirectAction<S, P>;

// class DirectStore<S> {
//   protected _appState: BehaviorSubject<S>;
//   protected _dispatcher = new Subject<DirectAction<S>>();

//   select<T>(selector: (state: S) => T) {
//     return { ...this._appState.value };
//   }

//   selectAsync<T>(selector: (state: S) => T) {
//     return this._appState.asObservable().pipe(map(selector));
//   }

//   dispatchAction(action: DirectAction<S>) {
//     this._dispatcher.next(action);
//   }

//   protected async _commitAction(dispatched: DirectAction<S>) {
//     const evaluatedState = new Promise<S>((resolve, reject) => {
//       const stateFn = () => {
//         return this.select(s => s);
//       };

//       const result = dispatched.reducer(dispatched.props, stateFn);
//       resolve(result);
//     });

//     const newState = await evaluatedState;
//     this._appState.next(newState);
//   }

//   constructor(initialState: S) {
//     this._appState = new BehaviorSubject(initialState);
//     this._dispatcher.subscribe(action => this._commitAction(action));
//   }
// }

// class TestStore extends DirectStore<AppState> {}
// const x = new TestStore({ users: [], tasks: [], notes: [] });

// const removeAllUsers: DirectReducer<AppState, number> = (userId, getState) => {
//   const state = getState();
//   state.users = [];
//   return state;
// };

// // function createAction<S, P=any>(actionType: string, reducer: DirectReducer<S, P>): ActionCreator<S, P> {
// //   return ()
// // }

// function createAction<S, P = any>(
//   actionType: string,
//   reducer: DirectReducer<S, P>
// ) {}

// function removeUser(userId: number): DirectAction<AppState, number> {
//   return { actionType: "removeUser", props: userId, reducer };
// }
