import { Object3D } from 'three';
import { EzIntersection } from '../../events/Intersection';

/**
 * Represents the prototype for extending Scene functionality.
 */
export interface SceneExt {
  /** @internal */ __registeredEventsObjects?: { [x: string]: Set<Object3D> };

  /**
   * A flag indicating whether continuous raycasting is enabled (default: false).
   * When set to true, main raycasting occurs every frame, while false triggers raycasting only upon mouse movement.
   * Additionally, if set to true, the 'pointerintersection' event will be fired every frame.
   */
  continuousRaycasting: boolean;
  /**
   * A flag indicating whether continuous raycasting is enabled when searching for drop targets (default: false).
   * When set to true, main raycasting for drop targets occurs every frame, while false triggers it only upon mouse movement.
   * Additionally, if set to true, the 'dragover' event will be fired every frame.
   */
  continuousRaycastingDropTarget: boolean;
  /** An array of intersections computed from the pointer (primary pointer only). */
  intersections?: EzIntersection[];
  /** An array of intersections computed from the pointer if an object is dragged and has 'findDropTarget' set to true (primary pointer only). */
  intersectionsDropTarget?: EzIntersection[];
  /** A reference to the currently focused Object3D within the scene. */
  focusedObject: Object3D | null;
  /**
   * A flag indicating whether to blur the focused Object3D when clicking outside of any object.
   */
  blurOnClickOut: boolean;
  /** The time scale for scene animations. */
  timeScale: number;
  /** The total time elapsed in the scene. */
  totalTime: number;

  /** Reference to the scene the object belongs to. */
  get scene(): this;

  /**
   * Sets the focus to the specified Object3D within the scene, or clears the focus if no target is provided.
   * @param target Optional. The Object3D to focus on. If not provided, the focus is cleared.
   */
  focus(target?: Object3D): void;
}
