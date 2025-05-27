import type { Object3DExt } from './patch/prototype/Object3DExt';
import type { SceneExt } from './patch/prototype/SceneExt';

export * from './core/CursorManager';
export * from './core/EventsDispatcher';
export * from './core/Hitbox';
export * from './core/InteractionDefault';
export * from './core/MiscEventsManager';

export * from './events/AnimateEvent';
export * from './events/DragEvent';
export * from './events/Event';
export * from './events/EventsList';
export * from './events/FocusEvent';
export * from './events/Intersection';
export * from './events/PointerEvent';
export * from './events/PointerIntersectionEvent';
export * from './events/PropertyChangeEvent';
export * from './events/ViewportResizeEvent';

export * from './patch/Euler';
export * from './patch/Object3D';
export * from './patch/Quaternion';
export * from './patch/Scene';
export * from './patch/Vector3';
// export * from './patch/WebGLRenderer';

export * from './patch/prototype/Object3DExt';
export * from './patch/prototype/SceneExt';
export * from './patch/prototype/Vector3Ext';

declare module 'three/src/core/Object3D.js' {
  export interface Object3D extends Object3DExt { }
}

declare module 'three/src/scenes/Scene.js' {
  export interface Scene extends SceneExt { }
}
