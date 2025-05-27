import { Camera, WebGLRenderer } from 'three';
import { Renderer } from 'three/webgpu';

/**
 * Represents an event related to resizing of a renderer.
 */
export interface EzViewportResizeEvent {
  /** Returns new render width. */
  readonly width: number;
  /** Returns the render height. */
  readonly height: number;
  /** Returns renderer. */
  readonly renderer: WebGLRenderer | Renderer;
  /** Returns rendering camera. */
  readonly camera: Camera;
}
