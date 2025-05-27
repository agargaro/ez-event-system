import { Object3D, Scene } from 'three';
import { EzIntersection } from '../events/Intersection';
import { registerAll, unregisterAll } from '../core/MiscEventsManager';
import { INTERACTION_DEFAULT } from '../core/InteractionDefault';
import { addBase, removeBase } from './Object3D';
import { EzFocusEvent } from '../events/FocusEvent';

// TODO: setSceneReference and removeSceneReference should have an event

Scene.prototype.continuousRaycasting = false;
Scene.prototype.continuousRaycastingDropTarget = false;
Scene.prototype.blurOnClickOut = false;
Scene.prototype.timeScale = 1;
Scene.prototype.totalTime = 0;

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

Object.defineProperty(Scene.prototype, 'userData', { // needed to inject code in constructor
  set: function (this: Scene, value) {
    this.focusable = false;
    this.draggable = INTERACTION_DEFAULT.draggable;
    this.interceptByRaycaster = INTERACTION_DEFAULT.interceptByRaycaster;

    this.intersections = [];
    this.intersectionsDropTarget = [];
    this.scene = this;

    Object.defineProperty(this, 'userData', {
      value, writable: true, configurable: true
    });
  },
  configurable: true
});

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
