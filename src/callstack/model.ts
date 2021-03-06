// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { ISignal, Signal } from '@phosphor/signaling';

import { DebugProtocol } from 'vscode-debugprotocol';

/**
 * A model for a callstack.
 */
export class CallstackModel {
  /**
   * Get all the frames.
   */
  get frames(): CallstackModel.IFrame[] {
    return this._state;
  }

  /**
   * Set the frames.
   */
  set frames(newFrames: CallstackModel.IFrame[]) {
    this._state = newFrames;
    // default to the new frame is the previous one can't be found
    if (!this.frame || !newFrames.find(frame => frame.id === this.frame.id)) {
      this.frame = newFrames[0];
    }
    this._framesChanged.emit(newFrames);
  }

  /**
   * Get the current frame.
   */
  get frame(): CallstackModel.IFrame {
    return this._currentFrame;
  }

  /**
   * Set the current frame.
   */
  set frame(frame: CallstackModel.IFrame) {
    this._currentFrame = frame;
    this._currentFrameChanged.emit(frame);
  }

  /**
   * Signal emitted when the frames have changed.
   */
  get framesChanged(): ISignal<this, CallstackModel.IFrame[]> {
    return this._framesChanged;
  }

  /**
   * Signal emitted when the current frame has changed.
   */
  get currentFrameChanged(): ISignal<this, CallstackModel.IFrame> {
    return this._currentFrameChanged;
  }

  private _state: CallstackModel.IFrame[] = [];
  private _currentFrame: CallstackModel.IFrame;
  private _framesChanged = new Signal<this, CallstackModel.IFrame[]>(this);
  private _currentFrameChanged = new Signal<this, CallstackModel.IFrame>(this);
}

/**
 * A namespace for CallstackModel `statics`.
 */
export namespace CallstackModel {
  /**
   * An interface for a frame.
   */
  export interface IFrame extends DebugProtocol.StackFrame {}
}
