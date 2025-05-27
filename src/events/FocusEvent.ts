import { Object3D } from 'three';
import { EzEvent } from './Event';

export class EzFocusEvent extends EzEvent<never> {
  /** The secondary target for the event. */
  public readonly relatedTarget: Object3D | null;
  /** TODO */
  public readonly relatedTargetInstanceId?: number;

  /**
   * @param relatedTarget The secondary target for the event.
   * @param relatedTargetInstanceId TODO
   */
  constructor(relatedTarget: Object3D | null, relatedTargetInstanceId?: number) {
    super();
    this.relatedTarget = relatedTarget;
    this.relatedTargetInstanceId = relatedTargetInstanceId;
  }
}
