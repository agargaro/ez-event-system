import { BufferGeometry, Mesh, MeshBasicMaterial } from 'three';

// TODO: Can we just use an Object3D instead of a Mesh?

const sharedMaterial = new MeshBasicMaterial();

/**
 * Hitbox for collision detection.
 */
export class Hitbox extends Mesh {
  constructor(geometry: BufferGeometry) {
    super(geometry, sharedMaterial);
  }
}
