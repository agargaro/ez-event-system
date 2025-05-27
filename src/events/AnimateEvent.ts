/**
 * Represents an event related to animation.
 */
export interface EzAnimateEvent {
  /** The difference in time between the current animation frame and the previous one (in milliseconds). */
  readonly delta: DOMHighResTimeStamp;
  /** The total amount of time that has passed since the animation started (in milliseconds). */
  readonly total: DOMHighResTimeStamp;
}
