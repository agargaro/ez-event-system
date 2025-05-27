import { Intersection } from 'three';
import { Hitbox } from '../core/Hitbox.js';

/**
 * Represents an extended intersection between a ray and 3D objects in a scene.
 */
export interface EzIntersection extends Intersection {
  /** The hitbox hit by the raycaster. */
  hitbox: Hitbox;
}
