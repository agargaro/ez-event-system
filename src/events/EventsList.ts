import { EzAnimateEvent } from './AnimateEvent.js';
import { EzDragEvent } from './DragEvent.js';
import { EzEvent } from './Event.js';
import { EzFocusEvent } from './FocusEvent.js';
import { EzPointerEvent } from './PointerEvent.js';
import { EzPointerIntersectionEvent } from './PointerIntersectionEvent.js';
import { EzPropertyChangeEvent } from './PropertyChangeEvent.js';
import { EzViewportResizeEvent } from './ViewportResizeEvent.js';

export type EzMiscUpdateEventsList = EzMiscEventsList & EzUpdateEventsList;
export type EzEventsList = EzInteractionEvents & EzMiscUpdateEventsList;

/**
 * Represents events related to updates. These events do not propagate to parents.
 */
export interface EzUpdateEventsList {
  /** Event triggered when the position of the object changes. */
  positionchange: never;
  /** Event triggered when the scale of the object changes. */
  scalechange: never;
  /** Event triggered when the rotation of the object changes. */
  rotationchange: never;
  /** Event triggered when the enabledState of the object changes (either its own or the parent's `enabled` property). */
  enabledchange: EzPropertyChangeEvent<boolean>;
  /** Event triggered when the visibilityState of the object changes (either its own or the parent's `visible` property). */
  visiblechange: EzPropertyChangeEvent<boolean>;
}

/**
 * Represents miscellaneous events. These events do not propagate to parents.
 */
export interface EzMiscEventsList {
  /** Event triggered on first render and every time an object is rendered with a different viewport size from the previous one. */
  viewportresize: EzViewportResizeEvent;
  /** Event triggered every frame, before 'animate'. Usually used to prepare object animations. */
  beforeanimate: EzAnimateEvent;
  /** Event triggered every frame. Used to animate objects. */
  animate: EzAnimateEvent;
  /** Event triggered every frame, after 'animate'. Usually used if you want to operate after the animation is computed. */
  afteranimate: EzAnimateEvent;
}

/**
 * Represents interaction events. These events propagate to parents.
 */
export interface EzInteractionEvents {
  /** Event triggered when a pointer enters the target. */
  pointerover: EzPointerEvent;
  /** Event triggered when a pointer enters the target (no propagation). */
  pointerenter: EzPointerEvent;
  /** Event triggered when a pointer leaves the target. */
  pointerout: EzPointerEvent;
  /** Event triggered when a pointer leaves the target (no propagation). */
  pointerleave: EzPointerEvent;
  /** Event triggered when a pointer moves over the target. */
  pointermove: EzPointerEvent;
  /** Event triggered when a pointer button is pressed. */
  pointerdown: EzPointerEvent;
  /** Event triggered when a pointer button is released. */
  pointerup: EzPointerEvent;
  /** Event triggered if pointer is on target. Triggers every frame and only works if the scene has 'continuousRaycasting' equal to true. */
  pointerintersection: EzPointerIntersectionEvent;
  /** Event triggered when a click event occurs. */
  click: EzPointerEvent;
  /** Event triggered when a double click event occurs. */
  dblclick: EzPointerEvent;
  /** Event triggered when scrolling the mouse wheel. */
  wheel: EzPointerEvent<WheelEvent>;
  /** Event triggered when target gains focus (no propagation). */
  focusin: EzFocusEvent;
  /** Event triggered when target loses focus (no propagation). */
  focusout: EzFocusEvent;
  /** Event triggered when target gains focus. */
  focus: EzFocusEvent;
  /** Event triggered when target loses focus. */
  blur: EzFocusEvent;
  /** Event triggered on the focused object when a key is pressed. */
  keydown: EzEvent<KeyboardEvent>;
  /** Event triggered on the focused object when a key is released. */
  keyup: EzEvent<KeyboardEvent>;
  /** Event triggered when the target is dragged. */
  drag: EzDragEvent;
  /** Event triggered when dragging starts. */
  dragstart: EzDragEvent;
  /** Event triggered when dragging ends. */
  dragend: EzDragEvent;
  /** Event triggered when dragging is canceled (Can be canceled pressing 'ESC'). This is triggered on target and dropTarget. */
  dragcancel: EzDragEvent;
  /** Event triggered when a draggable object enters a drop target. */
  dragenter: EzDragEvent;
  /**
   * Event triggered when a draggable object moves over the drop target.
   * Triggers every frame if the scene has 'continuousRaycastingDropTarget' equal to true.
   */
  dragover: EzDragEvent;
  /** Event triggered when a draggable object leaves a drop target. */
  dragleave: EzDragEvent;
  /** Event triggered when a draggable object is dropped onto a drop target. */
  drop: EzDragEvent;
}
