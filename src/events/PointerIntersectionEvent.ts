import { Object3D } from 'three';
import { EzEventsList } from './EventsList.js';
import { EzIntersection } from './Intersection.js';
import { EzEvent } from './Event.js';

/**
 * Represents a pointer intersection event.
 */
export class EzPointerIntersectionEvent extends EzEvent<never> {
  /** Returns the intersection information between the mouse event and 3D objects in the scene. */
  public readonly intersection: EzIntersection;

  /**
   * @param intersection The intersection information between the mouse event and 3D objects in the scene.
   */
  constructor(type: keyof EzEventsList, intersection: EzIntersection, target: Object3D, targetInstanceId?: number, currentTarget?: Object3D, currentTargetInstanceId?: number, cancelable?: boolean) {
    super(null, type, target, targetInstanceId, currentTarget, currentTargetInstanceId, cancelable);
    this.intersection = intersection;
  }
}
