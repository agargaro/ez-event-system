import { Object3D } from 'three';

/** @internal */
export function patchVisibility(target: Object3D): void {
  if (target.__visible === undefined) {
    target.__visible = target.visible;

    Object.defineProperty(target, 'visible', {
      get: getVisible,
      set: setVisible,
      configurable: true
    });
  }
}

function getVisible(this: Object3D): boolean {
  return this.__visible!;
}

function setVisible(this: Object3D, value: boolean): void {
  if (this.__visible !== value) {
    this.__visible = value;
    this.__eventsDispatcher?.dispatchDescendant('visiblechange', { value, target: this });
  }
}
