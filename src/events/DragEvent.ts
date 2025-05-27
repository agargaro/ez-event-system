import { Object3D, Vector3 } from 'three';
import { EzEventsList } from './EventsList.js';
import { EzPointerEvent } from './PointerEvent.js';
import { EzIntersection } from './Intersection.js';

/**
 * Represents a custom extended drag event.
 */
export class EzDragEvent extends EzPointerEvent {
  /** The data that is transferred during a drag and drop interaction. */
  public readonly dataTransfer: { [x: string]: any };
  /** Returns the new position of the dragged object. */
  public readonly position?: Vector3;

  /**
   * @param dataTransfer The data that is transferred during a drag and drop interaction.
   * @param position Returns the new position of the dragged object.
   */
  constructor(domEvent: PointerEvent, type: keyof EzEventsList, target: Object3D, intersection: EzIntersection, dataTransfer: { [x: string]: any } = {},
    position?: Vector3, targetInstanceId?: number, currentTarget?: Object3D, currentTargetInstanceId?: number, relatedTarget?: Object3D,
    relatedTargetInstanceId?: number, cancelable?: boolean) {
    super(domEvent, type, intersection, target, targetInstanceId, currentTarget, currentTargetInstanceId, relatedTarget, relatedTargetInstanceId, cancelable);
    this.position = position;
    this.dataTransfer = dataTransfer;
  }
}
