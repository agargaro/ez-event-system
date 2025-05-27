import { Object3D } from 'three';

/**
 * Represents a property change event.
 * @template V - The type of the new value associated with the property change.
 */
export interface EzPropertyChangeEvent<V> {
  /** A reference to the object to which the event was originally dispatched. */
  readonly target: Object3D;
  /** The new value associated with the property change. */
  readonly value: V;
}
