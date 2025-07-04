import { Object3D } from 'three';
import { applyObject3DRotationPatch } from '../patch/Object3D.js';
import { patchPosition, patchScale } from '../patch/Vector3.js';
import { register, unregister } from './MiscEventsManager.js';
import { EzEventsList, EzInteractionEvents } from '../events/EventsList.js';
import { patchVisibility } from '../patch/Visibility.js';

export type EventCallback<K extends keyof EzEventsList> = (event?: EzEventsList[K]) => void;

/** @internal */
export class EventsDispatcher {
  public parent: Object3D;
  public listeners: { [K in keyof EzEventsList]?: EventCallback<K>[] } = {};

  constructor(parent: Object3D) {
    this.parent = parent;
  }

  public add<K extends keyof EzEventsList>(type: K, event: EventCallback<K>): EventCallback<K> {
    if (!this.listeners[type]) {
      this.listeners[type] = [];

      switch (type) {
        case 'positionchange':
          patchPosition(this.parent);
          break;
        case 'scalechange':
          patchScale(this.parent);
          break;
        case 'rotationchange':
          applyObject3DRotationPatch(this.parent);
          break;
        case 'visiblechange':
          patchVisibility(this.parent);
          break;
        case 'drop':
        case 'dragenter':
        case 'dragleave':
        case 'dragover':
          this.parent.__isDropTarget = true;
          break;
      }
    }

    if (this.listeners[type].indexOf(event) === -1) {
      this.listeners[type].push(event);
    }

    register(type, this.parent);

    return event;
  }

  public has<K extends keyof EzEventsList>(type: K, event: EventCallback<K>): boolean {
    const index = this.listeners[type]?.indexOf(event) ?? -1;
    return index > -1;
  }

  public remove<K extends keyof EzEventsList>(type: K, event: EventCallback<K>): void {
    const listener = this.listeners[type];
    const index = listener?.indexOf(event) ?? -1;

    if (index > -1) {
      listener!.splice(index, 1);

      if (listener!.length === 0) {
        unregister(type, this.parent);
        this.parent.__isDropTarget = this.isDropTarget();
      }
    }
  }

  private isDropTarget(): boolean {
    return this.someEvent('drop') || this.someEvent('dragenter') || this.someEvent('dragleave') || this.someEvent('dragover');
  }

  private someEvent(type: keyof EzEventsList): boolean {
    return (this.listeners[type]?.length ?? 0) > 0;
  }

  public dispatchDOM<K extends keyof EzInteractionEvents>(type: K, event: EzInteractionEvents[K]): void {
    event._bubbles = false;
    event._stoppedImmediatePropagation = false;
    event._defaultPrevented = false;
    event._type = type;
    event._target = this.parent;
    this.executeDOM(type, event);
  }

  public dispatchDOMAncestor<K extends keyof EzInteractionEvents>(type: K, event: EzInteractionEvents[K]): void {
    let target = this.parent;
    event._bubbles = true;
    event._stoppedImmediatePropagation = false;
    event._defaultPrevented = false;
    event._type = type;
    event._target = target;
    while (target && event._bubbles) {
      target.__eventsDispatcher.executeDOM(type, event);
      target = target.parent;
    }
  }

  private executeDOM<K extends keyof EzInteractionEvents>(type: K, event: EzInteractionEvents[K]): void {
    if (!this.listeners[type]) return;
    const target = event.currentTarget = this.parent;
    for (const callback of this.listeners[type]) {
      if (event._stoppedImmediatePropagation) break;
      callback.call(target, event as any);
    }
  }

  public dispatch<T extends keyof EzMiscUpdateEvents>(type: T, event?: EzMiscUpdateEvents[T]): void {
    if (!this.listeners[type]) return;
    for (const callback of this.listeners[type]) {
      callback.call(this.parent, event as any);
    }
  }

  public dispatchDescendant<T extends keyof EzUpdateEvents>(type: T, event?: EzUpdateEvents[T]): void {
    const target = this.parent;
    target.__eventsDispatcher.dispatch(type, event as any);
    if (!target.children) return;
    for (const child of target.children) {
      child.__eventsDispatcher.dispatchDescendant(type, event);
    }
  }

  public dispatchManual<T extends keyof EzEvents>(type: T, event?: EzEvents[T]): void {
    if ((event as EzEvent)?.cancelable !== undefined) {
      return this.dispatchDOM(type as keyof EzInteractionEvents, event as any);
    }
    this.dispatch(type as keyof EzMiscUpdateEvents, event as any);
  }

  public dispatchAncestorManual<T extends keyof EzEvents>(type: T, event?: EzEvents[T]): void {
    if ((event as EzEvent)?.cancelable !== undefined) {
      this.dispatchDOMAncestor(type as keyof EzInteractionEvents, event as any);
    }
  }
}
