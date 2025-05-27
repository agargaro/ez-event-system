import { Object3D, Scene } from 'three';
import { registerAll, unregisterAll } from '../core/MiscEventsManager';
import { EzFocusEvent } from '../events/FocusEvent';
import { addBase, removeBase } from './Object3D';

// TODO: setSceneReference and removeSceneReference should have an event
// TODO: should we remove this rmeove/add override?

Scene.prototype.continuousRaycasting = false;
Scene.prototype.continuousRaycastingDropTarget = false;
Scene.prototype.focusedObject = null;
Scene.prototype.blurOnClickOut = false;
Scene.prototype.timeScale = 1;
Scene.prototype.totalTime = 0;

Object.defineProperty(Scene.prototype, 'scene', {
  get: function (this: Scene) { return this; }
});

Scene.prototype.focus = function (target?: Object3D): void {
  const focusableObj = target?.firstFocusable ?? null;

  if ((!target || focusableObj?.enabledState) && this.focusedObject !== focusableObj) {
    const oldFocusedObj = this.focusedObject;
    this.focusedObject = focusableObj;

    if (oldFocusedObj?.enabledState) {
      oldFocusedObj.__focused = false;
      oldFocusedObj.__eventsDispatcher?.dispatchDOMAncestor('blur', new EzFocusEvent(focusableObj));
      oldFocusedObj.__eventsDispatcher?.dispatchDOM('focusout', new EzFocusEvent(focusableObj));
    }

    if (focusableObj) {
      focusableObj.__focused = true;
      focusableObj.__eventsDispatcher?.dispatchDOMAncestor('focus', new EzFocusEvent(oldFocusedObj));
      focusableObj.__eventsDispatcher?.dispatchDOM('focusin', new EzFocusEvent(oldFocusedObj));
    }
  }
};

Scene.prototype.add = function (object: Object3D) {
  addBase.call(this, ...arguments);
  if (arguments.length === 1 && object?.isObject3D && object !== this) {
    setSceneReference(object, this);
  }
  return this;
};

Scene.prototype.remove = function (object: Object3D) {
  if (arguments.length === 1 && this.children.indexOf(object) > -1) {
    removeSceneReference(object);
  }
  removeBase.call(this, ...arguments);
  return this;
};

/** @internal */
export function setSceneReference(target: Object3D, scene: Scene): void {
  target.scene = scene;
  registerAll(target);

  for (const object of target.children) {
    setSceneReference(object, scene);
  }
}

/** @internal */
export function removeSceneReference(target: Object3D): void {
  unregisterAll(target);
  target.scene = undefined;

  for (const object of target.children) {
    removeSceneReference(object);
  }
}
