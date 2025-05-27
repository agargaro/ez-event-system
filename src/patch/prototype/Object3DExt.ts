import { Object3D, Scene } from 'three';
import { EventCallback, EventsDispatcher } from '../../core/EventsDispatcher';
import { Hitbox } from '../../core/Hitbox';
import { Cursor } from '../../core/CursorManager';
import { EzEventsList, EzInteractionEvents } from '../../events/EventsList';

/**
 * Represents the prototype for extended Object3D functionality.
 */
export interface Object3DExt {
  /** @internal */ __eventsDispatcher?: EventsDispatcher;
  /** @internal */ __enabled: boolean;
  /** @internal */ __visible: boolean;
  /** @internal */ __hovered: boolean;
  /** @internal */ __focused: boolean;
  /** @internal */ __clicking: boolean;
  /** @internal */ __dragging: boolean;
  /** @internal */ __isDropTarget: boolean;
  /** @internal */ __isInteractable: boolean;
  /** @internal */ __baseVisibleDescriptor?: PropertyDescriptor;
  /** @internal */ __onChangeEulerBase?: () => void;
  /** @internal */ __onChangeQuaternionBase?: () => void;

  /**
   * Determines if the object is enabled. Default is `true`.
   * If set to true, it allows triggering all InteractionEvents; otherwise, events are disabled.
   */
  enabled: boolean;
  /**
   * Determines if the **object** and **all of its children** can be intercepted by the main raycaster.
   * @default INTERACTION_DEFAULT.interceptByRaycaster (true).
   */
  interceptByRaycaster: boolean;
  /** Array of hitboxes for collision detection. */
  hitboxes?: Hitbox[];
  /** Indicates which object will be dragged instead of this one. */
  dragTarget?: Object3D;
  /**
   * Indicates whether the object can receive focus.
   * @default INTERACTION_DEFAULT.focusable (true).
   */
  focusable: boolean;
  /**
   * Indicates whether the object is draggable.
   * @default INTERACTION_DEFAULT.draggable (false).
   */
  draggable: boolean;
  /** Determines when the object is dragged, whether it will have to search for any drop targets. Default is `false`. */
  findDropTarget: boolean;
  /** Reference to the scene the object belongs to. */
  scene?: Scene;
  /** Cursor style when interacting with the object. */
  cursor?: Cursor;
  /** Cursor style when dragging the object. */
  cursorDrag?: Cursor;
  /** Cursor style when dropping an object onto this one. */
  cursorDrop?: Cursor;

  /** Indicates if the primary pointer is over this object. */
  get hovered(): boolean;
  /** Indicates if the object is currently focused. */
  get focused(): boolean;
  /** Indicates if the object is currently being clicked. */
  get clicking(): boolean;
  /** Indicates if the object is currently being dragged. */
  get isDragging(): boolean;
  /** Retrieves the combined enabled state considering parent objects. */
  get enabledState(): boolean;
  /** Retrieves the combined visibility state considering parent objects. */
  get visibilityState(): boolean;
  /** Retrieves the first possible focusable object. */
  get firstFocusable(): Object3D | null;

  /**
   * Applies focus to the object.
   */
  applyFocus(): void;
  /**
   * Applies blur (removes focus) from the object.
   */
  applyBlur(): void;
  /**
   * Attaches an event listener to the object.
   * @param type - The type of event to listen for.
   * @param listener - The callback function to execute when the event occurs.
   * @returns A function to remove the event listener.
   */
  on<K extends keyof EzEventsList>(type: K | K[], listener: EventCallback<K>): EventCallback<K>;
  /**
   * Checks if the object has a specific event listener.
   * @param type - The type of event to check for.
   * @param listener - The callback function to check.
   * @returns `true` if the event listener is attached; otherwise, `false`.
   */
  hasEvent<K extends keyof EzEventsList>(type: K, listener: EventCallback<K>): boolean;
  /**
   * Removes an event listener from the object.
   * @param type - The type of event to remove the listener from.
   * @param listener - The callback function to remove.
   */
  off<K extends keyof EzEventsList>(type: K, listener: EventCallback<K>): void;
  /**
   * Triggers a specific event on the object.
   * @param type - The type of event to trigger.
   * @param event - Optional event data to pass to the listeners.
   */
  trigger<K extends keyof EzEventsList>(type: K, event?: EzEventsList[K]): void;
  /**
   * Triggers a specific event on the object and all its ancestors.
   * @param type - The type of event to trigger.
   * @param event - Optional event data to pass to the listeners.
   */
  triggerAncestor<K extends keyof EzInteractionEvents>(type: K, event?: EzInteractionEvents[K]): void;
}
