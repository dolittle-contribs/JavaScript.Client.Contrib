/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Command, CommandRequest } from '@dolittle/commands';

const beforeHandleCallbacks = [];
let responseHandlerCallback = undefined;

/**
 * Represents the coordinator of a {Command}
 */
export class CommandCoordinator {
  static apiBaseUrl = '';

  /**
   * Add a callback that gets called before handling a command with the fetch API option object
   * @param {function} callback
   */
  static beforeHandle(callback) {
    beforeHandleCallbacks.push(callback);
  }

  /**
   * Add a callback that handles the response coming back from the fetch request. The returned value will be used in the regular request chain
   * @param {function} callback
   */
  static responseHandler(callback) {
    responseHandlerCallback = callback;
  }

  /**
   * Handle a {Command}
   * @param {Command} command
   */
  handle(command) {
    let options = {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(CommandRequest.createFrom(command)),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    beforeHandleCallbacks.forEach(_ => _(options));

    return fetch(`${CommandCoordinator.apiBaseUrl}/api/Dolittle/Commands`, options).then(response =>
      responseHandlerCallback ? responseHandlerCallback(response) : response.json()
    );
  }
}
