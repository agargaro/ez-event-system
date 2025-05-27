import { Object3D } from 'three';
import { EzEvent } from './Event.js';
import { EzIntersection } from './Intersection.js';

/**
 * Represents a custom extended pointer event.
 */
export class EzPointerEvent<Ev extends MouseEvent = PointerEvent> extends EzEvent<Ev> {
  /** Returns the intersection information between the mouse event and 3D objects in the scene. */
  public readonly intersection: EzIntersection;
  /** The secondary target for the event, if there is one. */
  public readonly relatedTarget: Object3D | null;
  /** TODO */
  public readonly relatedTargetInstanceId?: number;

  /**
   * @param intersection Returns the intersection information between the mouse event and 3D objects in the scene.
   * @param relatedTarget The secondary target for the event, if there is one.
   * @param relatedTargetInstanceId TODO
   */
  constructor(domEvent: Ev, intersection: EzIntersection, relatedTarget?: Object3D, relatedTargetInstanceId?: number, cancelable?: boolean) {
    super(domEvent, cancelable);
    this.relatedTarget = relatedTarget;
    this.relatedTargetInstanceId = relatedTargetInstanceId;
    this.intersection = intersection;
  }
}
