/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Command, CommandRequest } from '@dolittle/commands';

const beforeHandleCallbacks = [];

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

        return fetch(`${CommandCoordinator.apiBaseUrl}/api/Dolittle/Commands`, options)
            .then(response => response.json());
    }
}
