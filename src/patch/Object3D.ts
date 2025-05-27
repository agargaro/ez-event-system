import { Object3D } from 'three';
import { EzEventsList } from '../events/EventsList';
import { EventsDispatcher } from '../core/EventsDispatcher';
import { removeSceneReference, setSceneReference } from './Scene';
import { patchPosition, patchScale } from './Vector3';
import { patchQuaternion } from './Quaternion';
import { patchRotation } from './Euler';
import { INTERACTION_DEFAULT } from '../core/InteractionDefault';

// TODO: override matrix4 prototype to use new props like _x instead of x?

Object.defineProperty(Object3D.prototype, 'visible', {
  get: function (this: Object3D) { return this.__visible; },
  set: function (this: Object3D, value: boolean) {
    if (this.__visible !== value) {
      this.__visible = value;
      this.__eventsDispatcher?.dispatchDescendant('visiblechange', { value, target: this });
    }
  },
  configurable: true
});

Object.defineProperty(Object3D.prototype, 'enabled', {
  get: function (this: Object3D) { return this.__enabled; },
  set: function (this: Object3D, value: boolean) {
    if (this.__enabled !== value) {
      if (!value) {
        this.applyBlur();
      }
      this.__enabled = value;
      this.__eventsDispatcher?.dispatchDescendant('enabledchange', { value, target: this });
    }
  },
  configurable: true
});

Object.defineProperty(Object3D.prototype, 'firstFocusable', {
  get: function (this: Object3D) {
    let obj: Object3D | null = this;
    while (obj?.focusable === false) {
      obj = obj.parent;
    }
    return obj;
  }
});

Object.defineProperty(Object3D.prototype, 'enabledState', {
  get: function (this: Object3D) {
    let obj: Object3D | null = this;
    do {
      if (!obj.enabled) return false;
    } while ((obj = obj.parent));
    return true;
  }
});

Object.defineProperty(Object3D.prototype, 'visibilityState', {
  get: function (this: Object3D) {
    let obj: Object3D | null = this;
    do {
      if (!obj.visible) return false;
    } while ((obj = obj.parent));
    return true;
  }
});

Object.defineProperty(Object3D.prototype, 'hovered', {
  get: function (this: Object3D) {
    return this.__hovered;
  }
});

Object.defineProperty(Object3D.prototype, 'focused', {
  get: function (this: Object3D) {
    return this.__focused;
  }
});

Object.defineProperty(Object3D.prototype, 'clicking', {
  get: function (this: Object3D) {
    return this.__clicking;
  }
});

Object.defineProperty(Object3D.prototype, 'isDragging', {
  get: function (this: Object3D) {
    return this.__dragging;
  }
});

Object3D.prototype.on = function <K extends keyof EzEventsList>(this: Object3D, types: K | K[], listener: (event: EzEventsList[K]) => void): (event: EzEventsList[K]) => void {
  this.__eventsDispatcher ??= new EventsDispatcher(this);

  if (typeof types === 'string') {
    return this.__eventsDispatcher.add(types, listener);
  }
  for (const type of types) {
    this.__eventsDispatcher.add(type, listener);
  }
  return listener;
};

Object3D.prototype.hasEvent = function <K extends keyof EzEventsList>(type: K, listener: (event: EzEventsList[K]) => void): boolean {
  return this.__eventsDispatcher?.has(type, listener) ?? false;
};

Object3D.prototype.off = function <K extends keyof EzEventsList>(type: K, listener: (event: EzEventsList[K]) => void): void {
  this.__eventsDispatcher?.remove(type, listener);
};

Object3D.prototype.trigger = function <T extends keyof EzEventsList>(type: T, event?: EzEventsList[T]): void {
  this.__eventsDispatcher?.dispatchManual(type, event);
};

Object3D.prototype.triggerAncestor = function <T extends keyof EzEventsList>(type: T, event?: EzEventsList[T]): void {
  this.__eventsDispatcher?.dispatchAncestorManual(type, event);
};

// TODO find a better way
Object.defineProperty(Object3D.prototype, 'userData', { // needed to inject code in constructor
  set: function (this: Object3D, value) {
    this.focusable = INTERACTION_DEFAULT.focusable;
    this.draggable = INTERACTION_DEFAULT.draggable;
    this.interceptByRaycaster = INTERACTION_DEFAULT.interceptByRaycaster;
    this.findDropTarget = false;
    this.__focused = false;
    this.__clicking = false;
    this.__dragging = false;
    this.__hovered = false;
    this.__visible = true;
    this.__enabled = true;
    this.__isDropTarget = false;

    Object.defineProperty(this, 'userData', {
      value, writable: true, configurable: true
    });
  },
  configurable: true
});

Object3D.prototype.applyFocus = function () {
  this.scene?.focus(this);
};

Object3D.prototype.applyBlur = function () {
  if (this === this.scene?.focusedObject) {
    this.scene.focus();
  }
};

/** @internal */
export const addBase = Object3D.prototype.add;
Object3D.prototype.add = function (object: Object3D) {
  addBase.call(this, ...arguments);
  if (arguments.length === 1 && object?.isObject3D && object !== this && this.scene) {
    setSceneReference(object, this.scene);
  }
  return this;
};

/** @internal */
export const removeBase = Object3D.prototype.remove;
Object3D.prototype.remove = function (object: Object3D) {
  if (arguments.length === 1 && this.children.indexOf(object) > -1) {
    if (this.scene) {
      removeSceneReference(object);
    }
  }
  removeBase.call(this, ...arguments);
  return this;
};

/** @internal TODO remove? */
export function applyObject3DVector3Patch(target: Object3D): void {
  // TODO: we can patch matrix4 too?
  patchPosition(target);
  patchScale(target);
}

/** @internal */
export function applyObject3DRotationPatch(target: Object3D): void {
  patchQuaternion(target);
  patchRotation(target);
}
