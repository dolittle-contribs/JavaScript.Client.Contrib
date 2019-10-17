/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CommandCoordinator } from '../CommandCoordinator';

describe('when handling with response handler callback', () => {
    let commandResult = {'something': 'result'};
    global.fetch = (request, options) => {
        return Promise.resolve({ json: () => commandResult });
    };
    let commandCoordinator = new CommandCoordinator();
    let command = {};
    let result = null;

    (async beforeEach => {
        CommandCoordinator.responseHandler((response) => "my response");
        result = await commandCoordinator.handle(command);
    })();

    it("should call the response handler", () => result.should.equal("my response"));
});
