import { Object3D } from 'three';
import { EzEventsList } from './EventsList.js';

/**
 * Represents a custom extended event.
 */
export class EzEvent<Ev extends Event = Event> {
  /** Original dom event. */
  public readonly domEvent: Ev | null;
  /** The case-insensitive name identifying the type of the event. */
  public readonly type!: keyof EzEventsList;
  /** A reference to the object to which the event was originally dispatched. */
  public readonly target!: Object3D;
  /** TODO */
  public readonly targetInstanceId?: number;
  /** A reference to the currently registered target for the event. This is the object to which the event is currently slated to be sent. It's possible this has been changed along the way through retargeting. */
  public readonly currentTarget!: Object3D;
  /** TODO */
  public readonly currentTargetInstanceId?: number;
  /** The time at which the event was created (in milliseconds). By specification, this value is time since epoch—but in reality, browsers' definitions vary. In addition, work is underway to change this to be a DOMHighResTimeStamp instead. */
  public readonly timeStamp = performance.now();
  /** A boolean value indicating whether the event is cancelable. */
  public readonly cancelable: boolean;
  /** A boolean value indicating whether or not the event bubbles up through the DOM. */
  public bubbles = true;
  /** Indicates whether or not the call to event.preventDefault() canceled the event. */
  public defaultPrevented = false;

  protected _stoppedImmediatePropagation = false;

  /**
   * @param domEvent Original dom event.
   * @param cancelable A boolean value indicating whether the event is cancelable. Default is `false`.
   */
  constructor(domEvent: Ev | null = null, cancelable = false) {
    this.domEvent = domEvent;
    this.cancelable = cancelable;
  }

  /** Cancels the event. */
  public preventDefault(): void {
    this.defaultPrevented = true;
  }

  /** For this particular event, prevent all other listeners from being called. This includes listeners attached to the same element as well as those attached to elements that will be traversed later (during the capture phase, for instance). */
  public stopImmediatePropagation(): void {
    this._stoppedImmediatePropagation = true;
  }

  /** Stops the propagation of events further along in the Object3D hierarchy. */
  public stopPropagation(): void {
    this.bubbles = false;
  }
}
